export interface Testimonial {
  id: number;
  name: string;
  role?: string; // "Local Guide"
  reviews?: number;
  photos?: number;
  rating: 1 | 2 | 3 | 4 | 5;
  timeAgo: string;
  body: string;
  /** Avatar accent — becomes the initial-circle gradient stop */
  accent: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chandrika Dinni",
    role: "Local Guide",
    reviews: 22,
    photos: 16,
    rating: 5,
    timeAgo: "2 months ago",
    accent: "#C8A44D",
    initials: "CD",
    body: "Recently we have visited Dakshin Paak for lunch last week during our stay at Mysore — the food was excellent, tasty, and delicious, and all the items were made with a homely touch. Our experience was really great and very satisfying — comfort food with great quality and perfect quantity was served. The food was served very hot and with super hygiene. I wholeheartedly recommend that one should visit and enjoy Mysore flavours. Special mention was about the Rasam and Majjige Huli — they were really tasty.",
  },
  {
    id: 2,
    name: "Savi Raj Shetty",
    reviews: 1,
    photos: 2,
    rating: 5,
    timeAgo: "5 months ago",
    accent: "#0F5B43",
    initials: "SR",
    body: "I recently visited Dakshina Paaka Restaurant, where I had the opportunity to paint the wall murals. They greeted me heartfully. It felt great to experience the place as a guest. I had both breakfast and lunch, and the food was incredible — truly finger-licking good. The ambience is warm and welcoming, and it's definitely a must-visit for anyone who loves authentic South Indian food.",
  },
  {
    id: 3,
    name: "Murali Ram",
    role: "Local Guide",
    reviews: 14,
    photos: 2,
    rating: 5,
    timeAgo: "2 months ago",
    accent: "#A8894B",
    initials: "MR",
    body: "Had a very good experience here. The food was delicious and definitely worth trying. The atmosphere is calm, peaceful, and comfortable. One thing I really liked was that even the non-AC section felt pleasant and airy. Compared to some restaurants in Mysore, the non-AC seating here is comfortable enough to feel almost like an AC section. Overall, the combination of good food, quiet ambience, and comfortable seating makes this place worth visiting. Highly recommended.",
  },
  {
    id: 4,
    name: "Surya V",
    role: "Local Guide",
    reviews: 10,
    photos: 8,
    rating: 5,
    timeAgo: "4 months ago",
    accent: "#1F6E4E",
    initials: "SV",
    body: "Excellent dinner experience — quick and peaceful yet tasty food. Tried their Mysore Masala Dosa and Ghee Podi Plain Dosa which were really good. Mini idlies were also delightful — perfect for kids.",
  },
  {
    id: 5,
    name: "Rahul Chiplunkar",
    role: "Local Guide",
    reviews: 12,
    photos: 18,
    rating: 5,
    timeAgo: "5 months ago",
    accent: "#8C6A2D",
    initials: "RC",
    body: "The restaurant location is good, also with good parking space for vehicles. The food was so delicious and fresh — I ordered the Breakfast Combo and Ms. Pavitra Madam served us nicely. All around the restaurant and staff was so good.",
  },
];

// Aggregate rating derived from the reviews above.
export const testimonialStats = {
  rating: 5.0,
  totalReviews: testimonials.length,
  displayText: "5-Star Experience",
};
