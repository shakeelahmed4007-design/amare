import { supabase } from '../supabase';

export const orderService = {
  async createOrder(cartItems, totalAmount, shippingDetails, paymentMethod) {
    // Determine user_id if logged in
    const { data: { user } } = await supabase.auth.getUser();
    
    // 1. Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user?.id || null,
          total_amount: totalAmount,
          shipping_details: shippingDetails,
          status: 'processing'
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

    // 3. Reduce stock quantity
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

    return order;
  }
};
