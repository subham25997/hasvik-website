// Client quotes are kept in the client's original words (not translated).
export type Testimonial = {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  quote: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "yaswant-singh",
    name: "Yaswant Singh",
    company: "LR Engineering Solutions",
    location: "Noida, UP",
    rating: 5,
    projectSlug: "lr-engineering-solutions",
    quote:
      "HASVIK Technologies developed a premium and professional website for LR Engineering Solutions that perfectly represents our industrial expertise. The WhatsApp integration made customer communication and product inquiries much easier for our clients. We are extremely satisfied with their work and highly recommend their services.",
  },
  {
    id: "ankur-singh",
    name: "Ankur Kumar Singh",
    company: "Ashok Tent House",
    location: "Adar, Bansdih, UP",
    rating: 5,
    projectSlug: "ashok-tent-house",
    quote:
      "HASVIK Technologies delivered a professional website for our business within a week. Their team was responsive, supportive, and exceeded our expectations. They also helped list our business on Google Search and Google Maps. We are very satisfied with their service.",
  },
  {
    id: "rajesh-soni",
    name: "Rajesh Kr. Soni",
    company: "RM Suncity Public School",
    location: "Maniar, Ballia, UP",
    rating: 5,
    projectSlug: "rm-suncity-public-school",
    quote:
      "HASVIK Technologies delivered a great website for our business. I am very satisfied with the quality and support. They are very professional and responsive. I highly recommend their services to anyone looking for a high-quality website.",
  },
];

export function getTestimonial(id?: string) {
  return id ? testimonials.find((t) => t.id === id) : undefined;
}
