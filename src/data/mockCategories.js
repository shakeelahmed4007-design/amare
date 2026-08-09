export const initialCategories = [
  {
    id: "cat-1",
    name: "Makeup",
    slug: "makeup",
    parentId: null,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "cat-2",
    name: "Skincare",
    slug: "skincare",
    parentId: null,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "cat-3",
    name: "Hair Care",
    slug: "hair",
    parentId: null,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "cat-4",
    name: "Face & Primers",
    slug: "face",
    parentId: "cat-1", // Subcategory of Makeup
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "cat-5",
    name: "Lips & Oils",
    slug: "lips",
    parentId: "cat-1", // Subcategory of Makeup
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  },
  {
    id: "cat-6",
    name: "Services & Pass",
    slug: "services",
    parentId: null,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    status: "Active"
  }
];
