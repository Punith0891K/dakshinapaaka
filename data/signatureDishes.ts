export interface SignatureDish {
  id: number;
  name: string;
  category: string;
  badge: string;
  description: string;
  image: string;
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
  },
  {
       id: 2,
    name: "Andhra Meals",
    category: "Meals",
    badge: "Customer Favourite",
    description:
      "A traditional Andhra-style meal served with steamed rice, flavourful curries, dal, chutneys, rasam and classic accompaniments prepared with authentic regional recipes.",
    image: "/images/food/food3.png",
  },
  {
    id: 3,
    name: "Filter Coffee",
    category: "Beverages",
    badge: "Freshly Brewed",
    description:
      "Freshly brewed South Indian filter coffee made using premium coffee beans and creamy milk, delivering a rich aroma and timeless flavour in every cup.",
    image: "/images/food/food2.png",
  },
  {
    id: 4,
    name: "Khara Bath",
    category: "Breakfast",
    badge: "Traditional Recipe",
    description:
      "A classic Karnataka breakfast delicacy prepared with roasted semolina, aromatic spices, fresh vegetables and traditional seasoning, served with coconut chutney.",
    image: "/images/food/food4.jpg",
  },
  {
    id: 5,
    name: "Mysore Masala Dosa",
    category: "Breakfast",
    badge: "Best Seller",
    description:
      "A crisp golden dosa layered with authentic Mysore chutney and filled with flavourful potato masala, served alongside fresh chutneys and hot sambar.",
    image: "/images/food/food5.png",
  },
  {
    id: 6,
    name: "Veg Lollipop",
    category: "Starters",
    badge: "Chef's Choice",
    description:
      "Crispy vegetable lollipops seasoned with aromatic herbs and spices, served with our signature dipping sauce for a deliciously crunchy experience.",
    image: "/images/food/food6.jpg",
  },
  {
    id: 7,
    name: "Paneer Achari Tikka",
    category: "Starters",
    badge: "Smoky Delight",
    description:
      "Soft cubes of paneer marinated in traditional pickling spices and grilled to perfection, offering a smoky flavour with every bite.",
    image: "/images/food/food7.jpg",
  },
  {
    id: 8,
    name: "Mysore Pak",
    category: "Desserts",
    badge: "Sweet Classic",
    description:
      "A timeless Karnataka delicacy crafted with pure ghee, gram flour and sugar, famous for its rich texture and melt-in-the-mouth sweetness.",
    image: "/images/food/food8.jpg",
  },
  {
  id: 9,
  name: "Fresh Watermelon Juice",
  category: "Beverages",
  badge: "Summer Refreshment",
  description:
    "Freshly extracted watermelon juice served chilled, naturally sweet and incredibly refreshing for a perfect tropical experience.",
  image: "/images/food/food12.jpg",
},

{
  id: 10,
  name: "Open Butter Masala Dosa",
  category: "Breakfast",
  badge: "Chef's Favourite",
  description:
    "Crispy open dosa generously layered with butter, aromatic masala and authentic South Indian spices, served with coconut chutney and hot sambar.",
  image: "/images/food/food11.jpg",
},

{
  id: 11,
  name: "Mix Bajji",
  category: "Starters",
  badge: "Tea Time Special",
  description:
    "A delightful assortment of crispy vegetable bajjis prepared with traditional gram flour batter and served hot with our signature chutneys.",
  image: "/images/food/food9.jpg",
},

{
  id: 12,
  name: "Mangalore Bajji",
  category: "Starters",
  badge: "Coastal Classic",
  description:
    "Soft and fluffy Mangalore bajjis fried to golden perfection, served with fresh coconut chutney for an authentic coastal Karnataka experience.",
  image: "/images/food/food10.jpg",
},
];