-- Create products table schema
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image TEXT NOT NULL,
  badge TEXT,
  description TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  in_stock BOOLEAN DEFAULT TRUE,
  how_to_use TEXT,
  ingredients TEXT,
  sustainability TEXT
);

-- Seed initial products data
INSERT INTO products (id, name, category, price, image, badge, description, rating, in_stock, how_to_use, ingredients, sustainability)
VALUES
  (
    1,
    'Purifying Gel Cleanser',
    'Cleanse',
    38.00,
    '/products/cleanser.png',
    'Bestseller',
    'A gentle gel cleanser formulated to purify pores and restore skin balance without stripping the protective moisture barrier.',
    4.8,
    TRUE,
    'Apply a small amount to damp skin, massage gently in circular motions, then rinse thoroughly with warm water. Use daily, morning and night.',
    'Water (Aqua), Glycerin, Organic Aloe Barbadensis Leaf Juice, Centella Asiatica Extract, Coco-Glucoside, Sodium Hyaluronate, Panthenol (Vitamin B5), Chamomilla Recutita (Matricaria) Flower Extract.',
    'Packaged in a 100% recyclable green glass bottle with a BPA-free pump. Outer carton printed with soy inks on FSC-certified cardboard.'
  ),
  (
    2,
    'Exfoliating Skin Toner',
    'Exfoliate',
    45.00,
    '/products/toner.png',
    'New',
    'An AHA/BHA complex toner that gently sweeps away dead cells, unclogs pores, and prepares the skin for maximum absorption of treatments.',
    4.6,
    TRUE,
    'Sweep over clean face and neck with a reusable cotton pad, avoiding the eye area. Use 2-3 times per week at night, gradually increasing frequency as tolerated.',
    'Water (Aqua), Glycolic Acid, Salicylic Acid (BHA), Lactic Acid, Hamamelis Virginiana (Witch Hazel) Water, Niacinamide, Glycerin, Sodium Hydroxide.',
    'Packaged in an amber glass bottle with a recyclable plastic screw cap. Clean bottle thoroughly before disposing in local recycling bin.'
  ),
  (
    3,
    'Vitamin C Radiance Serum',
    'Treat',
    68.00,
    '/products/serum.png',
    NULL,
    'Potent vitamin C and ferulic acid serum designed to brighten skin tone, fade hyperpigmentation, and defend against environmental stressors.',
    4.9,
    TRUE,
    'Smooth 3-4 drops over face and neck after cleansing and toning. Press gently until absorbed. Follow with moisturizer and always apply broad-spectrum sunscreen in the morning.',
    'Water (Aqua), Ascorbic Acid (Vitamin C), Ferulic Acid, Tocopherol (Vitamin E), Hyaluronic Acid, Propylene Glycol, Panthenol, Phenoxyethanol.',
    'Dark frosted glass protects active Vitamin C from UV light degradation. Dropper is recyclable once glass pipette is separated from rubber bulb.'
  ),
  (
    4,
    'Barrier Support Face Cream',
    'Hydrate',
    52.00,
    '/products/cream.png',
    'Formulated for all',
    'A rich, ceramide-infused cream that fortifies the moisture barrier, locks in deep hydration, and calms irritated or dry skin states.',
    4.7,
    TRUE,
    'Massage a dime-sized amount into clean face and neck as the final step of your skincare routine. Can be used morning and night.',
    'Water (Aqua), Caprylic/Capric Triglyceride, Squalane, Ceramide NP, Ceramide AP, Phytosphingosine, Cholesterol, Shea Butter, Sodium Hyaluronate.',
    'Glass jar is fully recyclable. Outer lid is made from 50% post-consumer recycled plastic. Box is compostable.'
  ),
  (
    5,
    'Advanced Renewal Treatment',
    'Treat',
    75.00,
    '/products/serum.png',
    'Limited Edition',
    'A concentrated evening treatment containing gentle encapsulated retinol to improve cell turn-over, diminish fine lines, and smooth skin texture.',
    5.0,
    FALSE,
    'Apply 2-3 drops to clean, dry skin in the evening, starting twice a week and slowly building up. Limit sun exposure and wear SPF daily while using this product.',
    'Water (Aqua), Retinol, Bakuchiol, Ceramide EOP, Sodium Hyaluronate, Rosehip Seed Oil, Allantoin, Glycerin.',
    'Frosted white glass bottle is recyclable. Ships in an ultra-minimal carton constructed from recycled coffee husk fibers.'
  ),
  (
    6,
    'Intense Ceramide Cream',
    'Hydrate',
    58.00,
    '/products/cream.png',
    NULL,
    'Deep relief face and neck balm for ultra-dry or compromised skin barriers, delivering immediate comfort and moisture.',
    4.5,
    TRUE,
    'Warm a pea-sized amount between fingertips and press gently into areas experiencing severe dryness, peeling, or windburn. Ideal for night-time recovery.',
    'Water (Aqua), Ceramide EOP, Squalane, Jojoba Esters, Glycerin, Avena Sativa (Oat) Kernel Flour, Centella Extract.',
    'Glass jar is fully recyclable. Lid is crafted from sustainably harvested bamboo. Outer boxes are plastic-free.'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  rating = EXCLUDED.rating,
  in_stock = EXCLUDED.in_stock,
  how_to_use = EXCLUDED.how_to_use,
  ingredients = EXCLUDED.ingredients,
  sustainability = EXCLUDED.sustainability;


-- Create profiles table linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  address_name TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  address_country TEXT,
  address_phone TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Safely recreate policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Create orders table linked to profiles
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Fulfilled',
  total NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders table
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Safely recreate orders policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
CREATE POLICY "Users can insert their own orders" ON public.orders 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create trigger function to sync new user signup to profiles table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'Customer'),
    new.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
