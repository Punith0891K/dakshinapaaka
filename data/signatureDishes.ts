export interface SignatureDish {
  id: number;
  name: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  /** Optional rich detail used by the enhanced DishDetailSheet. */
  spiceLevel?: 0 | 1 | 2 | 3; // 0 = none, 3 = spicy
  prepTime?: string;
  servingSize?: string;
  dietary?: Array<"Veg" | "Vegan" | "Gluten-free" | "Contains Dairy" | "Nut-free">;
  ingredients?: string[];
  chefNote?: string;
  pairing?: string;
  /** Short chip labels shown on the homepage card */
  highlights?: string[];
}

export const signatureDishes: SignatureDish[] = [
  {
    id: 1,
    name: "Traditional South Indian Meals",
    category: "Meals",
    badge: "Signature Dish",
    description:
      "A wholesome traditional spread served with steamed rice, poori, curries, sambar, rasam and authentic accompaniments, bringing together the rich flavours of South India.",
    image: "/images/food/food1.png",
    spiceLevel: 2,
    prepTime: "25 min",
    servingSize: "Serves 1",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: [
      "Basmati Rice",
      "Toor Dal",
      "Fresh Vegetables",
      "Coconut",
      "Curry Leaves",
      "Tamarind",
      "Ghee",
      "Traditional Spices",
    ],
    chefNote:
      "Every element on this plate is prepared fresh, on demand, using recipes passed down through generations.",
    pairing: "Best paired with our filter coffee finale.",
    highlights: ["Traditional", "Fresh Daily", "Full Thali"],
  },
  {
    id: 2,
    name: "Andhra Meals",
    category: "Meals",
    badge: "Customer Favourite",
    description:
      "A traditional Andhra-style meal served with steamed rice, flavourful curries, dal, chutneys, rasam and classic accompaniments prepared with authentic regional recipes.",
    image: "/images/food/food3.png",
    spiceLevel: 3,
    prepTime: "25 min",
    servingSize: "Serves 1",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: [
      "Steamed Rice",
      "Gongura",
      "Andhra Spices",
      "Green Chillies",
      "Fresh Curry Leaves",
      "Tamarind",
      "Ghee",
    ],
    chefNote:
      "Bold, fiery, and unmistakably Andhra — this thali celebrates the spice-forward heritage of the Krishna valley.",
    pairing: "Cools beautifully with a glass of buttermilk.",
    highlights: ["Spicy", "Regional", "Full Thali"],
  },
  {
    id: 3,
    name: "Filter Coffee",
    category: "Beverages",
    badge: "Freshly Brewed",
    description:
      "Freshly brewed South Indian filter coffee made using premium coffee beans and creamy milk, delivering a rich aroma and timeless flavour in every cup.",
    image: "/images/food/food2.png",
    spiceLevel: 0,
    prepTime: "8 min",
    servingSize: "1 tumbler",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: ["Chikmagalur Beans", "Chicory", "Boiled Milk", "Jaggery / Sugar"],
    chefNote: "Brewed the traditional way in a stainless steel filter — no shortcuts.",
    pairing: "The perfect closer to any Southern meal.",
    highlights: ["Freshly Brewed", "Traditional"],
  },
  {
    id: 4,
    name: "Khara Bath",
    category: "Breakfast",
    badge: "Traditional Recipe",
    description:
      "A classic Karnataka breakfast delicacy prepared with roasted semolina, aromatic spices, fresh vegetables and traditional seasoning, served with coconut chutney.",
    image: "/images/food/food4.jpg",
    spiceLevel: 2,
    prepTime: "15 min",
    servingSize: "1 plate",
    dietary: ["Veg"],
    ingredients: ["Semolina", "Vegetables", "Curry Leaves", "Green Chilli", "Ghee"],
    chefNote: "A warm, spiced Karnataka morning classic.",
    highlights: ["Karnataka Classic", "Warm"],
  },
  {
    id: 5,
    name: "Mysore Masala Dosa",
    category: "Breakfast",
    badge: "Best Seller",
    description:
      "A crisp golden dosa layered with authentic Mysore chutney and filled with flavourful potato masala, served alongside fresh chutneys and hot sambar.",
    image: "/images/food/food5.png",
    spiceLevel: 2,
    prepTime: "15 min",
    servingSize: "1 dosa",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: [
      "Fermented Rice Batter",
      "Mysore Red Chutney",
      "Aloo Masala",
      "Fresh Coriander",
      "Ghee",
    ],
    chefNote:
      "The batter is fermented naturally overnight — that's the tang you taste in every bite.",
    pairing: "Coconut chutney and steaming sambar, always.",
    highlights: ["Best Seller", "Overnight Fermented"],
  },
  {
    id: 6,
    name: "Veg Lollipop",
    category: "Starters",
    badge: "Chef's Choice",
    description:
      "Crispy mixture of vegetable lollipops seasoned with aromatic herbs and spices, served with our signature dipping sauce for a deliciously crunchy experience.",
    image: "/images/food/food6.jpg",
    spiceLevel: 2,
    prepTime: "12 min",
    servingSize: "6 pieces",
    dietary: ["Veg"],
    ingredients: ["Mixed Vegetables", "Corn Flour", "Ginger-Garlic", "Herbs & Spices"],
    chefNote: "Crunch on the outside, tender bite inside — perfect starter.",
    highlights: ["Crispy", "Party Favourite"],
  },
  {
    id: 7,
    name: "Paneer Achari Tikka",
    category: "Starters",
    badge: "Smoky Delight",
    description:
      "Soft cubes of paneer marinated in traditional pickling spices and grilled to perfection, offering a smoky flavour with every bite.",
    image: "/images/food/food7.jpg",
    spiceLevel: 2,
    prepTime: "18 min",
    servingSize: "6 pieces",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: ["Fresh Paneer", "Achari Masala", "Yogurt", "Bell Peppers", "Onion"],
    chefNote: "Tandoor-kissed. Marinated for hours to soak in every note of the pickle spice.",
    highlights: ["Tandoor", "Smoky"],
  },
  {
    id: 8,
    name: "Mysore Pak",
    category: "Desserts",
    badge: "Sweet Classic",
    description:
      "A timeless Karnataka delicacy crafted with pure ghee, gram flour and sugar, famous for its rich texture and melt-in-the-mouth sweetness.",
    image: "/images/food/food8.jpg",
    spiceLevel: 0,
    prepTime: "20 min",
    servingSize: "2 pieces",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: ["Pure Ghee", "Gram Flour", "Sugar", "Cardamom"],
    chefNote:
      "Made fresh in-house every morning — the ghee is our secret.",
    highlights: ["House-Made", "Traditional Sweet"],
  },
  {
    id: 9,
    name: "Fresh Watermelon Juice",
    category: "Beverages",
    badge: "Summer Refreshment",
    description:
      "Freshly extracted watermelon juice served chilled, naturally sweet and incredibly refreshing for a perfect tropical experience.",
    image: "/images/food/food12.jpg",
    spiceLevel: 0,
    prepTime: "5 min",
    servingSize: "1 glass",
    dietary: ["Vegan", "Gluten-free"],
    ingredients: ["Fresh Watermelon", "Lime", "Mint", "Rock Salt"],
    chefNote: "No sugar added. Just fresh fruit, chilled and pressed.",
    highlights: ["Fresh Pressed", "No Sugar"],
  },
  {
    id: 10,
    name: "Open Butter Masala Dosa",
    category: "Breakfast",
    badge: "Chef's Favourite",
    description:
      "Crispy open dosa generously layered with butter, aromatic masala and authentic South Indian spices, served with coconut chutney and hot sambar.",
    image: "/images/food/food11.jpg",
    spiceLevel: 2,
    prepTime: "15 min",
    servingSize: "1 dosa",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: ["Rice Batter", "Fresh Butter", "Masala", "Coriander"],
    chefNote: "Golden, buttery, open-faced — a chef's love letter to dosa.",
    highlights: ["Buttery", "Golden Crisp"],
  },
  {
    id: 11,
    name: "Mix Bajji",
    category: "Starters",
    badge: "Tea Time Special",
    description:
      "A delightful assortment of crispy vegetable bajjis prepared with traditional gram flour batter and served hot with our signature chutneys.",
    image: "/images/food/food9.jpg",
    spiceLevel: 1,
    prepTime: "10 min",
    servingSize: "8 pieces",
    dietary: ["Veg"],
    ingredients: ["Gram Flour", "Onion", "Chilli", "Potato", "Bread"],
    chefNote: "Fried fresh to order — never sitting under a lamp.",
    highlights: ["Hot & Crispy", "Tea Time"],
  },
  {
    id: 12,
    name: "Mangalore Bajji",
    category: "Starters",
    badge: "Coastal Classic",
    description:
      "Soft and fluffy Mangalore bajjis fried to golden perfection, served with fresh coconut chutney for an authentic coastal Karnataka experience.",
    image: "/images/food/food10.jpg",
    spiceLevel: 1,
    prepTime: "10 min",
    servingSize: "6 pieces",
    dietary: ["Veg", "Contains Dairy"],
    ingredients: ["Maida", "Curd", "Coconut", "Curry Leaves"],
    chefNote: "Coastal Karnataka in a single bite.",
    highlights: ["Coastal", "Fluffy"],
  },
];
