/** Copied from blocks/home/reviews.tsx (a client module) so the server page can read them */

export interface Review {
  id: number;
  name: string;
  position: string;
  review: string;
  image: string;
  companyLogo: string;
  when?: string;
}

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 101,
    name: "Luna Shree Nepal",
    position: "Masala Moves",
    review: "Huge thanks to the team at Resto Refine for helping with the branding for my dance classes. The quality of their work was excellent, and they really took the time to understand what I wanted as a small business owner. They listened carefully, communicated well throughout the process, and delivered something that truly reflected my vision. I'm really happy with the result and look forward to working with them again in the future.",
    image: "",
    companyLogo: "",
    when: "a month ago",
  },
  {
    id: 102,
    name: "Muhammad Arham",
    position: "DFW",
    review: "I had the pleasure of working with this marketing agency and the experience exceeded my expectations. Their expertise and strategic approach played a key role in taking my video viral, significantly increasing both reach and engagement across my platforms. What stood out most was their professionalism, clear communication, and commitment to delivering high-quality results. For anyone looking for proven results, you can check my page DFW on TikTok and Instagram to see the growth and impact firsthand.",
    image: "",
    companyLogo: "",
    when: "3 months ago",
  },
  {
    id: 103,
    name: "ZA Cleaning Team Ltd",
    position: "Za Cleaning",
    review: "They build our website, and it was an amazing service. Thanks to the team, for their support and professionalism. They were very accommodating to our repeated requests. We are happy to give them our marketing business. We are looking forward to a long lasting business relationship.",
    image: "",
    companyLogo: "",
    when: "2 months ago",
  },
  {
    id: 104,
    name: "Zaher Yassin",
    position: "Local Guide",
    review: "Huge thanks to Rohit and his team for the outstanding work on our website. The design, professionalism, and attention to detail were beyond our expectations. Truly impressed with the quality and support throughout the whole process. Highly recommended.",
    image: "",
    companyLogo: "",
    when: "2 months ago",
  },
  {
    id: 105,
    name: "Big Bites",
    position: "Big Bites, Glasgow",
    review: "Resto Refine did amazing job for our BigBites takeaway in Glasgow, they made our sign boards, takeaway menus, TikTok videos and handled all our social media marketing and branding which got over 500 thousand views and helped us have a very busy and successful launch.",
    image: "",
    companyLogo: "",
    when: "8 months ago",
  },
];

export const FEATURED_REVIEW_ID = 105;
