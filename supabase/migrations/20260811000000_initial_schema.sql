-- 1. profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    email TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('admin', 'staff')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    category_id UUID REFERENCES categories(id),
    image_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. order_items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL
);

-- 7. subscription_plans
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    billing_interval TEXT NOT NULL CHECK (billing_interval IN ('monthly', 'yearly')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    plan_id UUID REFERENCES subscription_plans(id),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    start_date TIMESTAMPTZ DEFAULT now(),
    end_date TIMESTAMPTZ
);

-- 9. reviews
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    customer_id UUID REFERENCES customers(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. activity_logs
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS setup
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if a user is an admin or staff (security definer bypasses RLS to prevent infinite recursion on profiles table)
CREATE OR REPLACE FUNCTION is_admin_or_staff() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies

-- profiles
CREATE POLICY "Admin/staff full access to profiles" 
ON profiles FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- categories
CREATE POLICY "Admin/staff full access to categories" 
ON categories FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- products
CREATE POLICY "Admin/staff full access to products" 
ON products FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- customers
CREATE POLICY "Admin/staff full access to customers" 
ON customers FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- orders
CREATE POLICY "Admin/staff full access to orders" 
ON orders FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- order_items
CREATE POLICY "Admin/staff full access to order_items" 
ON order_items FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- subscription_plans
CREATE POLICY "Admin/staff full access to subscription_plans" 
ON subscription_plans FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- subscriptions
CREATE POLICY "Admin/staff full access to subscriptions" 
ON subscriptions FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- reviews
CREATE POLICY "Admin/staff full access to reviews" 
ON reviews FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());

-- activity_logs
CREATE POLICY "Admin/staff full access to activity_logs" 
ON activity_logs FOR ALL TO authenticated 
USING (is_admin_or_staff()) WITH CHECK (is_admin_or_staff());
