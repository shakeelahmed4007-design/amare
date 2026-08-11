import { supabase } from '../supabase';

export const orderService = {
  async createOrder(cartItems, totalAmount, shippingDetails, paymentMethod, paymentProofUrl = null) {
    // Determine user_id if logged in
    const { data: { user } } = await supabase.auth.getUser();
    
    const isManualPayment = ['Bank Transfer', 'EasyPaisa', 'JazzCash'].includes(paymentMethod);
    const initialStatus = isManualPayment ? 'pending_payment_verification' : 'processing';

    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user?.id || null,
          total_amount: totalAmount,
          shipping_details: shippingDetails,
          status: initialStatus,
          payment_method: paymentMethod,
          payment_proof_url: paymentProofUrl
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 3. Reduce stock quantity ONLY if not pending manual verification
    if (!isManualPayment) {
      for (const item of cartItems) {
        const { data: product } = await supabase
          .from('products')
          .select('stock_quantity')
          .eq('id', item.id)
          .single();
          
        if (product) {
          await supabase
            .from('products')
            .update({ stock_quantity: Math.max(0, product.stock_quantity - item.quantity) })
            .eq('id', item.id);
        }
      }
    }

    return order;
  },

  async verifyManualPayment(orderId) {
    // Update status
    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Fetch order items to reduce stock
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (itemsError) throw itemsError;

    // Reduce stock
    for (const item of orderItems) {
      const { data: product } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single();
        
      if (product) {
        await supabase
          .from('products')
          .update({ stock_quantity: Math.max(0, product.stock_quantity - item.quantity) })
          .eq('id', item.product_id);
      }
    }

    return order;
  }
};
