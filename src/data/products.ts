import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
  rating: number;
  inStock: boolean;
  howToUse?: string;
  ingredients?: string;
  sustainability?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Purifying Gel Cleanser",
    category: "Cleanse",
    price: 38,
    image: "/products/cleanser.png",
    badge: "Bestseller",
    description: "A gentle gel cleanser formulated to purify pores and restore skin balance without stripping the protective moisture barrier.",
    rating: 4.8,
    inStock: true,
    howToUse: "Apply a small amount to damp skin, massage gently in circular motions, then rinse thoroughly with warm water. Use daily, morning and night.",
    ingredients: "Water (Aqua), Glycerin, Organic Aloe Barbadensis Leaf Juice, Centella Asiatica Extract, Coco-Glucoside, Sodium Hyaluronate, Panthenol (Vitamin B5), Chamomilla Recutita (Matricaria) Flower Extract.",
    sustainability: "Packaged in a 100% recyclable green glass bottle with a BPA-free pump. Outer carton printed with soy inks on FSC-certified cardboard."
  },
  {
    id: "2",
    name: "Exfoliating Skin Toner",
    category: "Exfoliate",
    price: 45,
    image: "/products/toner.png",
    badge: "New",
    description: "An AHA/BHA complex toner that gently sweeps away dead cells, unclogs pores, and prepares the skin for maximum absorption of treatments.",
    rating: 4.6,
    inStock: true,
    howToUse: "Sweep over clean face and neck with a reusable cotton pad, avoiding the eye area. Use 2-3 times per week at night, gradually increasing frequency as tolerated.",
    ingredients: "Water (Aqua), Glycolic Acid, Salicylic Acid (BHA), Lactic Acid, Hamamelis Virginiana (Witch Hazel) Water, Niacinamide, Glycerin, Sodium Hydroxide.",
    sustainability: "Packaged in an amber glass bottle with a recyclable plastic screw cap. Clean bottle thoroughly before disposing in local recycling bin."
  },
  {
    id: "3",
    name: "Vitamin C Radiance Serum",
    category: "Treat",
    price: 68,
    image: "/products/serum.png",
    description: "Potent vitamin C and ferulic acid serum designed to brighten skin tone, fade hyperpigmentation, and defend against environmental stressors.",
    rating: 4.9,
    inStock: true,
    howToUse: "Smooth 3-4 drops over face and neck after cleansing and toning. Press gently until absorbed. Follow with moisturizer and always apply broad-spectrum sunscreen in the morning.",
    ingredients: "Water (Aqua), Ascorbic Acid (Vitamin C), Ferulic Acid, Tocopherol (Vitamin E), Hyaluronic Acid, Propylene Glycol, Panthenol, Phenoxyethanol.",
    sustainability: "Dark frosted glass protects active Vitamin C from UV light degradation. Dropper is recyclable once glass pipette is separated from rubber bulb."
  },
  {
    id: "4",
    name: "Barrier Support Face Cream",
    category: "Hydrate",
    price: 52,
    image: "/products/cream.png",
    badge: "Formulated for all",
    description: "A rich, ceramide-infused cream that fortifies the moisture barrier, locks in deep hydration, and calms irritated or dry skin states.",
    rating: 4.7,
    inStock: true,
    howToUse: "Massage a dime-sized amount into clean face and neck as the final step of your skincare routine. Can be used morning and night.",
    ingredients: "Water (Aqua), Caprylic/Capric Tryglyceride, Squalane, Ceramide NP, Ceramide AP, Phytosphingosine, Cholesterol, Shea Butter, Sodium Hyaluronate.",
    sustainability: "Glass jar is fully recyclable. Outer lid is made from 50% post-consumer recycled plastic. Box is compostable."
  },
  {
    id: "5",
    name: "Advanced Renewal Treatment",
    category: "Treat",
    price: 75,
    image: "/products/serum.png",
    badge: "Limited Edition",
    description: "A concentrated evening treatment containing gentle encapsulated retinol to improve cell turn-over, diminish fine lines, and smooth skin texture.",
    rating: 5.0,
    inStock: false,
    howToUse: "Apply 2-3 drops to clean, dry skin in the evening, starting twice a week and slowly building up. Limit sun exposure and wear SPF daily while using this product.",
    ingredients: "Water (Aqua), Retinol, Bakuchiol, Ceramide EOP, Sodium Hyaluronate, Rosehip Seed Oil, Allantoin, Glycerin.",
    sustainability: "Frosted white glass bottle is recyclable. Ships in an ultra-minimal carton constructed from recycled coffee husk fibers."
  },
  {
    id: "6",
    name: "Intense Ceramide Cream",
    category: "Hydrate",
    price: 58,
    image: "/products/cream.png",
    description: "Deep relief face and neck balm for ultra-dry or compromised skin barriers, delivering immediate comfort and moisture.",
    rating: 4.5,
    inStock: true,
    howToUse: "Warm a pea-sized amount between fingertips and press gently into areas experiencing severe dryness, peeling, or windburn. Ideal for night-time recovery.",
    ingredients: "Water (Aqua), Ceramide EOP, Squalane, Jojoba Esters, Glycerin, Avena Sativa (Oat) Kernel Flour, Centella Extract.",
    sustainability: "Glass jar is fully recyclable. Lid is crafted from sustainably harvested bamboo. Outer boxes are plastic-free."
  }
];

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) {
    console.log("Supabase URL or Anon key is missing. Using mock product data.");
    return PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching products from Supabase:", error);
      return PRODUCTS;
    }

    if (!data || data.length === 0) {
      console.log("No products returned from database. Using mock product data.");
      return PRODUCTS;
    }

    return data.map((item: any) => ({
      id: String(item.id),
      name: item.name,
      category: item.category,
      price: Number(item.price),
      image: item.image,
      badge: item.badge || undefined,
      description: item.description || "",
      rating: Number(item.rating || 5.0),
      inStock: Boolean(item.in_stock),
      howToUse: item.how_to_use || undefined,
      ingredients: item.ingredients || undefined,
      sustainability: item.sustainability || undefined,
    }));
  } catch (err) {
    console.error("Unexpected error in fetchProducts:", err);
    return PRODUCTS;
  }
}
