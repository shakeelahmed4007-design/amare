import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';
import p4 from '../assets/p4.png';
import p5 from '../assets/p5.png';
import p6 from '../assets/p6.png';
import p7 from '../assets/p7.png';
import p8 from '../assets/p8.png';
import p9 from '../assets/p9.png';

export const products = [
  {
    id: 1,
    title: "Suntouchable Invisi-Stick",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 5.0,
    reviews: 1,
    description: "Smooth-glide sparkling sunscreen stick.",
    price: 13,
    originalPrice: 15,
    buttonText: "ADD TO BAG",
    category: "skincare",
    image: p1
  },
  {
    id: 2,
    title: "Power Grip Primer",
    badge: "HOLY GRAIL",
    badgeColor: "bg-orange-600 text-white",
    rating: 4.8,
    reviews: 709,
    description: "Gel face primer for long-lasting makeup.",
    price: 10,
    buttonText: "SELECT SIZE",
    category: "makeup",
    image: p2
  },
  {
    id: 3,
    title: "Gloss Mode Treatment Oil",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 4.9,
    reviews: 165,
    description: "Shine-boosting treatment oil.",
    price: 10,
    buttonText: "ADD TO BAG",
    category: "skincare",
    image: p3
  },
  {
    id: 4,
    title: "Set It Bright Powder",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 4.7,
    reviews: 108,
    description: "A loose setting powder quad.",
    price: 12,
    buttonText: "SELECT SHADE",
    shades: ["#fce7f3", "#fed7aa", "#ddd6fe", "#d1fae5"],
    category: "makeup",
    image: p4
  },
  {
    id: 5,
    title: "Humidity Hero Styling Spray",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 4.8,
    reviews: 148,
    description: "Frizz-fighting styling spray.",
    price: 9,
    buttonText: "ADD TO BAG",
    category: "hair",
    image: p5
  },
  {
    id: 6,
    title: "Halo Glow Liquid Filter",
    badge: "HOLY GRAIL",
    badgeColor: "bg-orange-600 text-white",
    rating: 4.9,
    reviews: 9548,
    description: "Dewy finish foundation mix-in.",
    price: 14,
    originalPrice: 15,
    buttonText: "SELECT SHADE",
    shades: ["#fde047", "#f97316", "#ea580c", "#b45309", "#78350f"],
    extraShades: "+9",
    category: "makeup",
    image: p6
  },
  {
    id: 7,
    title: "Soft Glam Satin Concealer",
    badge: "BEST SELLER",
    badgeColor: "bg-pink-600 text-white",
    rating: 4.8,
    reviews: 1099,
    description: "Hydrating, medium buildable coverage.",
    price: 5,
    buttonText: "SELECT SHADE",
    shades: ["#fef08a", "#fde047", "#ca8a04", "#854d0e"],
    extraShades: "+30",
    category: "makeup",
    image: p7
  },
  {
    id: 8,
    title: "Cream Bronzer",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 4.6,
    reviews: 161,
    description: "Easy glide cream bronzer stick.",
    price: 7,
    buttonText: "SELECT SHADE",
    shades: ["#d97706", "#b45309", "#78350f"],
    extraShades: "+2",
    category: "makeup",
    image: p8
  },
  {
    id: 9,
    title: "Setting Powder",
    badge: "BEST SELLER",
    badgeColor: "bg-pink-600 text-white",
    rating: 4.8,
    reviews: 1793,
    description: "Loose setting powder for airbrushed finish.",
    price: 8,
    originalPrice: 9,
    buttonText: "SELECT SHADE",
    shades: ["#fef3c7", "#fed7aa"],
    category: "makeup",
    image: p9
  },
  {
    id: 10,
    title: "Silky Powder Highlighter",
    badge: "NEW SHADE",
    badgeColor: "bg-pink-500 text-white",
    rating: 4.7,
    reviews: 314,
    description: "Gives a glowy, glass-skin finish.",
    price: 9,
    buttonText: "SELECT SHADE",
    shades: ["#fbcfe8", "#d97706"],
    category: "makeup",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    title: "Luminous Putty Blush",
    badge: "BEST SELLER",
    badgeColor: "bg-pink-600 text-white",
    rating: 4.7,
    reviews: 521,
    description: "Putty-to-powder buildable blush.",
    price: 7,
    buttonText: "ADD TO BAG",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    title: "Stay All Night Setting Mist",
    badge: "HOLY GRAIL",
    badgeColor: "bg-orange-600 text-white",
    rating: 4.9,
    reviews: 1022,
    description: "Locks in makeup for 16 hours.",
    price: 10,
    buttonText: "ADD TO BAG",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 13,
    title: "Lip Plumping Gloss",
    badge: "NEW DROP",
    badgeColor: "bg-blue-600 text-white",
    rating: 4.6,
    reviews: 341,
    description: "High-shine lip plumper.",
    price: 7,
    buttonText: "SELECT SHADE",
    shades: ["#fda4af", "#f43f5e"],
    category: "lips",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    title: "Bite-Size Eyeshadow",
    badge: "",
    badgeColor: "",
    rating: 4.8,
    reviews: 2005,
    description: "Ultra-pigmented mini eyeshadow quad.",
    price: 3,
    buttonText: "ADD TO BAG",
    category: "eyes",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    title: "Holy Hydration! Face Cream",
    badge: "BEST SELLER",
    badgeColor: "bg-pink-600 text-white",
    rating: 4.9,
    reviews: 3402,
    description: "Nourishing daily face moisturizer.",
    price: 13,
    buttonText: "ADD TO BAG",
    category: "skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    title: "Camo CC Cream",
    badge: "HOLY GRAIL",
    badgeColor: "bg-orange-600 text-white",
    rating: 4.7,
    reviews: 4890,
    description: "Color correcting full coverage foundation.",
    price: 15,
    buttonText: "SELECT SHADE",
    shades: ["#fef08a", "#d97706"],
    category: "makeup",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 17,
    title: "Clear Brow & Lash Mascara",
    badge: "",
    badgeColor: "",
    rating: 4.5,
    reviews: 1520,
    description: "Dual-ended clear gel mascara.",
    price: 3,
    buttonText: "ADD TO BAG",
    category: "eyes",
    image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 18,
    title: "Poreless Putty Primer",
    badge: "BEST SELLER",
    badgeColor: "bg-pink-600 text-white",
    rating: 4.8,
    reviews: 5612,
    description: "Skin perfecting poreless primer.",
    price: 10,
    buttonText: "ADD TO BAG",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800"
  }
];

export const categories = [
  { title: "hair", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800" },
  { title: "cosmetics", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" },
  { title: "skin", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800" },
  { title: "eyes", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800" },
  { title: "face", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800" },
  { title: "lips", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800" },
  { title: "brushes", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800" },
  { title: "sets & kits", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800" }
];

export const featuredCallouts = [
  {
    heading: "1. PREP & GRIP",
    subheading: "Start with America's #1 Power Grip Primer for all-day makeup hold.",
    product: {
      id: 2,
      title: "Power Grip Primer",
      badge: "HOLY GRAIL",
      rating: 4.8,
      reviews: 709,
      price: 10,
      buttonText: "ADD TO BAG",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"
    }
  },
  {
    heading: "2. GLOW & BASE",
    subheading: "Layer Halo Glow Liquid Filter for an effortless soft-focus glow.",
    product: {
      id: 6,
      title: "Halo Glow Liquid Filter",
      badge: "HOLY GRAIL",
      rating: 4.9,
      reviews: 9548,
      price: 14,
      buttonText: "ADD TO BAG",
      image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800"
    }
  },
  {
    heading: "3. SET & LOCK",
    subheading: "Finish with Stay All Night Setting Mist to lock in your glow for 16 hours.",
    product: {
      id: 12,
      title: "Stay All Night Setting Mist",
      badge: "HOLY GRAIL",
      rating: 4.9,
      reviews: 1022,
      price: 10,
      buttonText: "ADD TO BAG",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800"
    }
  }
];

