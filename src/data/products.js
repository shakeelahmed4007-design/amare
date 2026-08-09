import p1 from '../assets/p1.png';
import p2 from '../assets/12.PNG';
import p3 from '../assets/12.PNG';
import p4 from '../assets/14.PNG';
import p5 from '../assets/6.PNG';
import p6 from '../assets/q.PNG';
import p7 from '../assets/r.PNG';
import p8 from '../assets/s.PNG';
import p9 from '../assets/w.PNG';

// Category Images
import faceImg from '../assets/Face1.PNG';
import lipsImg from '../assets/lips1.PNG';
import brushImg from '../assets/12.PNG';
import nailImg from '../assets/nail1.PNG';
import makeupImg from '../assets/cosmatic1.PNG';
import hairImg from '../assets/hair1.PNG';
import skinImg from '../assets/skin1.PNG';
import eyesImg from '../assets/eyes0.PNG';
import setImg from '../assets/set1.PNG';

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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
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
    image: p1
  }
];

export const categories = [
  { title: "Face", slug: "face", image: faceImg },
  { title: "Lips", slug: "lips", image: lipsImg },
  { title: "Brushes", slug: "brushes", image: brushImg },
  { title: "Nails", slug: "nails", image: nailImg },
  { title: "Makeup", slug: "makeup", image: makeupImg },
  { title: "Hair", slug: "hair", image: hairImg },
  { title: "Skincare", slug: "skincare", image: skinImg },
  { title: "Eyes", slug: "eyes", image: eyesImg },
  { title: "Sets & Kits", slug: "sets", image: setImg }
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
      image: p1
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
      image: p1
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
      image: p1
    }
  }
];

