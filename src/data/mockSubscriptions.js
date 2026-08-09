export const initialSubscriptions = [
  {
    id: "sub-1",
    name: "Beauty VIP Pass",
    discountPercent: 10, // Max cap 10%
    duration: "Monthly",
    applicableCategories: ["all"],
    status: "Active",
    pricePerPeriod: 9.99,
    description: "Get 10% OFF all items, free standard shipping & exclusive early product drops."
  },
  {
    id: "sub-2",
    name: "Skincare Lover Plan",
    discountPercent: 7.5,
    duration: "Yearly",
    applicableCategories: ["skincare"],
    status: "Active",
    pricePerPeriod: 49.99,
    description: "Save 7.5% on all skincare & treatment oils year round."
  },
  {
    id: "sub-3",
    name: "Starter Club Member",
    discountPercent: 5,
    duration: "Monthly",
    applicableCategories: ["makeup"],
    status: "Inactive",
    pricePerPeriod: 4.99,
    description: "Enjoy 5% OFF makeup essentials."
  }
];
