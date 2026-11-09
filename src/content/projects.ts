// Portfolio + case studies. Add a project by appending an object.
// TODO(owner): replace placeholder screenshots/links as new projects ship and
// review every `caseStudy` text (drafted from the old site's descriptions).
import type { Localized } from "@/i18n/config";

export type ProjectStatus = "completed" | "in-progress" | "demo";
export type ProjectCategory = "education" | "business" | "ecommerce";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  category: ProjectCategory;
  location?: string;
  description: Localized;
  liveUrl: string;
  image: { src: string; width: number; height: number; alt: Localized };
  services: string[]; // service slugs
  testimonialId?: string;
  caseStudy: {
    problem: Localized;
    solution: Localized;
    highlights: Localized[];
    gallery?: { src: string; width: number; height: number; alt: Localized; caption: Localized; href?: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "lr-engineering-solutions",
    name: "LR Engineering Solutions",
    status: "completed",
    category: "business",
    location: "Noida, UP",
    description: {
      en: "Contact information and WhatsApp booking system",
      hi: "संपर्क जानकारी और WhatsApp बुकिंग सिस्टम",
    },
    liveUrl: "https://www.lrengineerings.com/",
    image: {
      src: "/images/lreng.webp",
      width: 1600,
      height: 732,
      alt: { en: "LR Engineering Solutions website homepage", hi: "LR इंजीनियरिंग सॉल्यूशंस वेबसाइट का होमपेज" },
    },
    services: ["custom-website-development", "google-business-profile"],
    testimonialId: "yaswant-singh",
    caseStudy: {
      problem: {
        en: "An industrial engineering business needed a premium web presence that reflected its expertise and made product enquiries easy.",
        hi: "एक इंडस्ट्रियल इंजीनियरिंग व्यवसाय को ऐसी प्रीमियम वेबसाइट चाहिए थी जो उसकी विशेषज्ञता दिखाए और प्रोडक्ट पूछताछ आसान बनाए।",
      },
      solution: {
        en: "We designed a professional, fast website with clear service sections and WhatsApp integration so customers can enquire and book in one tap.",
        hi: "हमने साफ़ सर्विस सेक्शन और WhatsApp इंटीग्रेशन वाली प्रोफ़ेशनल, तेज़ वेबसाइट बनाई ताकि ग्राहक एक टैप में पूछताछ और बुकिंग कर सकें।",
      },
      highlights: [
        { en: "One-tap WhatsApp enquiries", hi: "एक टैप में WhatsApp पूछताछ" },
        { en: "Premium industrial look", hi: "प्रीमियम इंडस्ट्रियल लुक" },
        { en: "Mobile-first and fast", hi: "मोबाइल-फ़र्स्ट और तेज़" },
      ],
    },
  },
  {
    slug: "rm-suncity-public-school",
    name: "RM Suncity Public School",
    status: "completed",
    category: "education",
    location: "Maniar, Ballia, UP",
    description: {
      en: "Modern website for the school with student information and updates",
      hi: "छात्र जानकारी और अपडेट के साथ स्कूल की आधुनिक वेबसाइट",
    },
    liveUrl: "https://rmsuncitymaniar.in/",
    image: {
      src: "/images/rm-suncity.webp",
      width: 1600,
      height: 732,
      alt: { en: "RM Suncity Public School website homepage", hi: "RM सनसिटी पब्लिक स्कूल वेबसाइट का होमपेज" },
    },
    services: ["educational-website-development", "google-map-listing"],
    testimonialId: "rajesh-soni",
    caseStudy: {
      problem: {
        en: "Parents and visitors had no single trusted place to find school information, academics, notices and event photos.",
        hi: "अभिभावकों और आगंतुकों के पास स्कूल जानकारी, शिक्षा, नोटिस और कार्यक्रम फ़ोटो के लिए कोई एक भरोसेमंद जगह नहीं थी।",
      },
      solution: {
        en: "A modern, responsive website designed to provide students, parents, and visitors with easy access to important school information, with dedicated Academics and Gallery sections.",
        hi: "एक आधुनिक, रिस्पॉन्सिव वेबसाइट जिससे छात्र, अभिभावक और आगंतुक ज़रूरी स्कूल जानकारी आसानी से पा सकें, अलग शिक्षा और गैलरी सेक्शन के साथ।",
      },
      highlights: [
        { en: "Notices & admissions info", hi: "नोटिस और एडमिशन जानकारी" },
        { en: "Campus gallery", hi: "कैंपस गैलरी" },
        { en: "Live and optimised", hi: "लाइव और ऑप्टिमाइज़्ड" },
      ],
      gallery: [
        {
          src: "/images/rm-suncity-home.webp",
          width: 768,
          height: 1024,
          alt: { en: "RM Suncity Public School home page", hi: "RM सनसिटी पब्लिक स्कूल होम पेज" },
          caption: { en: "Home: a welcoming first impression with key contacts", hi: "होम: मुख्य संपर्क के साथ स्वागत करता पहला पेज" },
          href: "https://rmsuncitymaniar.in/",
        },
        {
          src: "/images/rm-suncity-about.webp",
          width: 768,
          height: 1024,
          alt: { en: "RM Suncity Public School about page", hi: "RM सनसिटी पब्लिक स्कूल परिचय पेज" },
          caption: {
            en: "About Us: showcasing 15+ years of excellence, values, vision, classroom infrastructure, and mission statement",
            hi: "परिचय: 15+ वर्षों की उत्कृष्टता, मूल्य, दृष्टि, कक्षा सुविधाएँ और मिशन",
          },
          href: "https://rmsuncitymaniar.in/about",
        },
        {
          src: "/images/rm-suncity-academics.webp",
          width: 768,
          height: 1024,
          alt: { en: "RM Suncity Public School academics page", hi: "RM सनसिटी पब्लिक स्कूल शिक्षा पेज" },
          caption: { en: "Academics: curriculum, classes and learning approach", hi: "शिक्षा: पाठ्यक्रम, कक्षाएँ और पढ़ाने का तरीका" },
          href: "https://rmsuncitymaniar.in/academics",
        },
        {
          src: "/images/rm-suncity-gallery.webp",
          width: 768,
          height: 1024,
          alt: { en: "RM Suncity Public School gallery page", hi: "RM सनसिटी पब्लिक स्कूल गैलरी पेज" },
          caption: {
            en: "Gallery: vibrant campus moments capturing student talent, celebrations, cultural events, and award ceremonies",
            hi: "गैलरी: छात्र प्रतिभा, उत्सव, सांस्कृतिक कार्यक्रम और पुरस्कार समारोह के पल",
          },
          href: "https://rmsuncitymaniar.in/gallery",
        },
      ],
    },
  },
  {
    slug: "noza-convent-school",
    name: "Noza Convent School",
    status: "in-progress",
    category: "education",
    description: {
      en: "Modern website for the school with student information and updates",
      hi: "छात्र जानकारी और अपडेट के साथ स्कूल की आधुनिक वेबसाइट",
    },
    liveUrl: "https://nozaconventschool.vercel.app/",
    image: {
      src: "/images/Noza-Convent-School.webp",
      width: 1600,
      height: 929,
      alt: { en: "Noza Convent School website preview", hi: "नोज़ा कॉन्वेंट स्कूल वेबसाइट प्रीव्यू" },
    },
    services: ["educational-website-development"],
    caseStudy: {
      problem: {
        en: "The school needed an online home for admissions, notices and student information.",
        hi: "स्कूल को एडमिशन, नोटिस और छात्र जानकारी के लिए ऑनलाइन जगह चाहिए थी।",
      },
      solution: {
        en: "We are building a clean, mobile-friendly school website with structured academic and update sections.",
        hi: "हम व्यवस्थित शिक्षा और अपडेट सेक्शन वाली साफ़, मोबाइल-फ़्रेंडली स्कूल वेबसाइट बना रहे हैं।",
      },
      highlights: [
        { en: "Admissions-ready", hi: "एडमिशन के लिए तैयार" },
        { en: "Notice updates", hi: "नोटिस अपडेट" },
        { en: "Responsive design", hi: "रिस्पॉन्सिव डिज़ाइन" },
      ],
    },
  },
  {
    slug: "parlour-website",
    name: "Parlour Website",
    status: "in-progress",
    category: "business",
    description: {
      en: "Modern website for a beauty parlour with service listings and booking system",
      hi: "सर्विस लिस्टिंग और बुकिंग सिस्टम वाली ब्यूटी पार्लर वेबसाइट",
    },
    liveUrl: "https://parlour-website-mu.vercel.app/",
    image: {
      src: "/images/parlour.webp",
      width: 1600,
      height: 727,
      alt: { en: "Beauty parlour website preview", hi: "ब्यूटी पार्लर वेबसाइट प्रीव्यू" },
    },
    services: ["custom-website-development"],
    caseStudy: {
      problem: {
        en: "A beauty parlour wanted customers to see services and prices and book appointments without phone back-and-forth.",
        hi: "एक ब्यूटी पार्लर चाहता था कि ग्राहक सर्विस और कीमत देखें और बिना बार-बार फ़ोन किए अपॉइंटमेंट बुक करें।",
      },
      solution: {
        en: "An elegant website with service listings and a simple booking flow.",
        hi: "सर्विस लिस्टिंग और आसान बुकिंग वाली एक सुंदर वेबसाइट।",
      },
      highlights: [
        { en: "Service & price listings", hi: "सर्विस और कीमत सूची" },
        { en: "Appointment booking", hi: "अपॉइंटमेंट बुकिंग" },
        { en: "Elegant visual style", hi: "सुंदर विज़ुअल स्टाइल" },
      ],
    },
  },
  {
    slug: "ashok-tent-house",
    name: "Ashok Tent House",
    status: "completed",
    category: "business",
    location: "Adar, Bansdih, UP",
    description: {
      en: "Website for showcasing services and booking",
      hi: "सेवाएँ दिखाने और बुकिंग के लिए वेबसाइट",
    },
    liveUrl: "https://ashok-tent-house.vercel.app/",
    image: {
      src: "/images/ath.webp",
      width: 1600,
      height: 733,
      alt: { en: "Ashok Tent House website homepage", hi: "अशोक टेंट हाउस वेबसाइट का होमपेज" },
    },
    services: ["custom-website-development", "google-map-listing", "google-business-profile"],
    testimonialId: "ankur-singh",
    caseStudy: {
      problem: {
        en: "A local tent house relied only on word of mouth and could not be found on Google.",
        hi: "एक लोकल टेंट हाउस केवल मुँह-ज़बानी प्रचार पर निर्भर था और Google पर नहीं मिलता था।",
      },
      solution: {
        en: "Delivered within a week: a professional website showcasing services and booking, plus Google Search and Google Maps listing.",
        hi: "एक हफ़्ते में डिलीवरी: सेवाएँ और बुकिंग दिखाने वाली प्रोफ़ेशनल वेबसाइट, साथ में Google सर्च और मैप्स लिस्टिंग।",
      },
      highlights: [
        { en: "Delivered in 1 week", hi: "1 हफ़्ते में डिलीवरी" },
        { en: "Listed on Google Maps", hi: "Google मैप्स पर लिस्टेड" },
        { en: "Booking enquiries", hi: "बुकिंग पूछताछ" },
      ],
    },
  },
  {
    slug: "woodwise-carpentry",
    name: "Woodwise Carpentry",
    status: "demo",
    category: "business",
    description: {
      en: "Showcasing custom woodworking projects and services",
      hi: "कस्टम लकड़ी के काम और सेवाओं का प्रदर्शन",
    },
    liveUrl: "https://woodwise-carpentry.vercel.app/",
    image: {
      src: "/images/woodwise.webp",
      width: 1600,
      height: 733,
      alt: { en: "Woodwise Carpentry demo website", hi: "वुडवाइज़ कारपेंट्री डेमो वेबसाइट" },
    },
    services: ["custom-website-development"],
    caseStudy: {
      problem: {
        en: "A demo concept showing how craftsmen can present their portfolio online.",
        hi: "एक डेमो कॉन्सेप्ट जो दिखाता है कि कारीगर अपना काम ऑनलाइन कैसे दिखा सकते हैं।",
      },
      solution: {
        en: "A warm, image-led portfolio site for custom woodworking projects and services.",
        hi: "कस्टम लकड़ी के काम और सेवाओं के लिए चित्रों वाली गर्मजोशी भरी पोर्टफ़ोलियो साइट।",
      },
      highlights: [
        { en: "Project showcase", hi: "प्रोजेक्ट प्रदर्शन" },
        { en: "Service catalogue", hi: "सर्विस कैटलॉग" },
        { en: "Enquiry-focused", hi: "पूछताछ पर केंद्रित" },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** The recently delivered project highlighted in the homepage hero carousel. */
export const featuredProjectSlug = "rm-suncity-public-school";
