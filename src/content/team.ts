import type { Localized } from "@/i18n/config";

export type TeamMember = {
  name: string;
  role: Localized;
  bio: Localized;
  photo?: { src: string; width: number; height: number };
};

export const team: TeamMember[] = [
  {
    name: "BB Singh",
    role: { en: "Business Development Executive", hi: "बिज़नेस डेवलपमेंट एग्ज़ीक्यूटिव" },
    bio: {
      en: "BCA graduate from Sharda University, supporting business development and client relationships at HASVIK TECHNOLOGIES.",
      hi: "शारदा यूनिवर्सिटी से BCA स्नातक, HASVIK TECHNOLOGIES में बिज़नेस डेवलपमेंट और क्लाइंट संबंधों में सहयोग करते हैं।",
    },
    photo: { src: "/images/team/balwant.webp", width: 640, height: 636 },
  },
  {
    name: "Akankshya Mishra",
    role: { en: "Frontend Expert", hi: "फ़्रंटएंड एक्सपर्ट" },
    bio: {
      en: "B.Tech graduate focused on frontend development with Next.js, React and related web technologies.",
      hi: "B.Tech स्नातक, Next.js, React और संबंधित वेब तकनीकों के साथ फ़्रंटएंड डेवलपमेंट पर केंद्रित।",
    },
    photo: { src: "/images/team/akankshya.webp", width: 460, height: 425 },
  },
  {
    name: "Annu Singh",
    role: { en: "Sales Expert", hi: "सेल्स एक्सपर्ट" },
    bio: {
      en: "A highly motivated sales professional who helps clients explore solutions suited to their business needs.",
      hi: "एक उत्साही सेल्स प्रोफ़ेशनल, जो क्लाइंट को उनकी व्यावसायिक ज़रूरतों के अनुसार समाधान समझने में मदद करती हैं।",
    },
    photo: { src: "/images/team/annu.webp", width: 640, height: 652 },
  },
  {
    name: "Aakriti Singh",
    role: { en: "Sales Expert", hi: "सेल्स एक्सपर्ट" },
    bio: {
      en: "Communicates with clients in a clear, direct way to understand their needs and discuss suitable services.",
      hi: "क्लाइंट की ज़रूरतें समझने और उपयुक्त सेवाओं पर चर्चा करने के लिए स्पष्ट और सीधे संवाद करती हैं।",
    },
    photo: { src: "/images/team/aakriti.webp", width: 485, height: 514 },
  },
  {
    name: "Youvraj Singh",
    role: { en: "Software Development Intern", hi: "सॉफ़्टवेयर डेवलपमेंट इंटर्न" },
    bio: {
      en: "B.Tech graduate working across frontend technologies such as Next.js and React, and backend tools including Node.js and NestJS.",
      hi: "B.Tech स्नातक, Next.js और React जैसी फ़्रंटएंड तकनीकों तथा Node.js और NestJS जैसे बैकएंड टूल्स पर काम करते हैं।",
    },
    photo: { src: "/images/team/YouvrajPhoto.webp", width: 640, height: 640 },
  },
  {
    name: "Abhishek Gupta",
    role: { en: "Software Development Intern", hi: "सॉफ़्टवेयर डेवलपमेंट इंटर्न" },
    bio: {
      en: "B.Tech graduate from LPU, working with Next.js and React alongside Java, Python and AI-related technologies.",
      hi: "LPU से B.Tech स्नातक, Next.js और React के साथ Java, Python तथा AI-संबंधित तकनीकों पर काम करते हैं।",
    },
    photo: { src: "/images/team/AbhishekPhoto.webp", width: 640, height: 640 },
  },
  {
    name: "Aman Singh",
    role: { en: "Sales Expert", hi: "सेल्स एक्सपर्ट" },
    bio: {
      en: "A newly joined member of the HASVIK TECHNOLOGIES sales team, helping clients learn about our services and discuss their requirements.",
      hi: "HASVIK TECHNOLOGIES की सेल्स टीम में नए सदस्य, जो क्लाइंट को हमारी सेवाओं की जानकारी देने और उनकी ज़रूरतों पर चर्चा करने में मदद करते हैं।",
    },
  },
];

// Mentor names are withheld on purpose (as on the old site).
// TODO(owner): add `name` / photo if the mentors agree to be named.
export const mentors: { title: Localized; body: Localized; icon: "monitor" | "server" }[] = [
  {
    icon: "monitor",
    title: { en: "Frontend Mentor", hi: "फ़्रंटएंड मेंटर" },
    body: {
      en: "Experienced UI architect with extensive expertise in building enterprise-grade products for leading global tech companies.",
      hi: "अग्रणी वैश्विक टेक कंपनियों के लिए एंटरप्राइज़-ग्रेड प्रोडक्ट बनाने में व्यापक अनुभव वाले UI आर्किटेक्ट।",
    },
  },
  {
    icon: "server",
    title: { en: "Backend Mentor", hi: "बैकएंड मेंटर" },
    body: {
      en: "Highly experienced system design specialist with strong corporate exposure in scalable backend infrastructure and cloud systems.",
      hi: "स्केलेबल बैकएंड इंफ़्रास्ट्रक्चर और क्लाउड सिस्टम में मज़बूत कॉर्पोरेट अनुभव वाले सिस्टम डिज़ाइन विशेषज्ञ।",
    },
  },
];
