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
    category: "Chef's Recommendation",
    badge: "Signature Dish",
    description:
      "A wholesome traditional spread served with steamed rice, poori, curries, sambar, rasam and authentic accompaniments, bringing together the rich flavours of South India.",
    image: "/images/food/food1.png",
  },
  {
    id: 2,
    name: "Andhra Meals",
    category: "Regional Speciality",
    badge: "Customer Favourite",
    description:
      "A traditional Andhra-style meal served with steamed rice, flavourful curries, dal, chutneys, rasam and classic accompaniments prepared with authentic regional recipes.",
    image: "/images/food/food3.png",
  },
  {
    id: 3,
    name: "Filter Coffee",
    category: "Traditional Beverage",
    badge: "Freshly Brewed",
    description:
      "Freshly brewed South Indian filter coffee made using premium coffee beans and creamy milk, delivering a rich aroma and timeless flavour in every cup.",
    image: "/images/food/food2.png",
  },
  {
    id: 4,
    name: "Khara Bath",
    category: "Karnataka Speciality",
    badge: "Traditional Recipe",
    description:
      "A classic Karnataka breakfast delicacy prepared with roasted semolina, aromatic spices, fresh vegetables and traditional seasoning, served with coconut chutney.",
    image: "/images/food/food4.jpg",
  },
  {
    id: 5,
    name: "Mysore Masala Dosa",
    category: "Mysuru Speciality",
    badge: "Best Seller",
    description:
      "A crisp golden dosa layered with authentic Mysore chutney and filled with flavourful potato masala, served alongside fresh chutneys and hot sambar.",
    image: "/images/food/food5.png",
  },
  {
    id: 6,
    name: "Veg Lollipop",
    category: "Starter",
    badge: "Chef's Choice",
    description:
      "Crispy vegetable lollipops seasoned with aromatic herbs and spices, served with our signature dipping sauce for a deliciously crunchy experience.",
    image: "/images/food/food6.jpg",
  },
  {
    id: 7,
    name: "Paneer Achari Tikka",
    category: "Tandoor Special",
    badge: "Smoky Delight",
    description:
      "Soft cubes of paneer marinated in traditional pickling spices and grilled to perfection, offering a smoky flavour with every bite.",
    image: "/images/food/food7.jpg",
  },
  {
    id: 8,
    name: "Mysore Pak",
    category: "Traditional Dessert",
    badge: "Sweet Classic",
    description:
      "A timeless Karnataka delicacy crafted with pure ghee, gram flour and sugar, famous for its rich texture and melt-in-the-mouth sweetness.",
    image: "/images/food/food8.jpg",
  },
];