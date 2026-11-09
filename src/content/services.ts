// All services. `kind` decides the Tech / Non-Tech tab.
// Entries with `published: false` are owner TODOs: they are kept here for
// editing but never rendered or added to the sitemap until set to true.
import type { Localized } from "@/i18n/config";
import type { IconName } from "@/components/icon";

export type ServiceKind = "tech" | "non-tech";

export type Service = {
  slug: string;
  kind: ServiceKind;
  published: boolean;
  icon: IconName;
  image: { src: string; alt: Localized };
  title: Localized;
  short: Localized;
  description: Localized;
  features: Localized[];
  deliverables: Localized[];
  idealFor: Localized[];
  faqs: { q: Localized; a: Localized }[];
};

export const services: Service[] = [
  {
    slug: "custom-website-development",
    kind: "tech",
    published: true,
    icon: "layout",
    image: {
      src: "/images/services/custom-website-development.svg",
      alt: { en: "Custom business website shown on laptop and phone", hi: "लैपटॉप और फ़ोन पर दिखती कस्टम बिज़नेस वेबसाइट" },
    },
    title: { en: "Website Design & Development", hi: "वेबसाइट डिज़ाइन और डेवलपमेंट" },
    short: {
      en: "Professional websites for businesses, schools and hospitality teams, designed around your customers and goals.",
      hi: "व्यवसायों, स्कूलों और हॉस्पिटैलिटी टीमों के लिए ग्राहकों और लक्ष्यों के अनुसार प्रोफ़ेशनल वेबसाइटें।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES designs and develops business and corporate websites, school and educational websites, and hotel and hospitality websites. We also support website redesigns and ongoing maintenance, with responsive layouts and clear paths for customers to get in touch.",
      hi: "HASVIK TECHNOLOGIES व्यवसाय और कॉर्पोरेट वेबसाइटें, स्कूल और शैक्षिक वेबसाइटें तथा होटल और हॉस्पिटैलिटी वेबसाइटें डिज़ाइन और विकसित करता है। हम वेबसाइट री-डिज़ाइन और नियमित मेंटेनेंस में भी मदद करते हैं, साथ ही मोबाइल-फ़्रेंडली लेआउट और संपर्क के स्पष्ट विकल्प देते हैं।",
    },
    features: [
      { en: "Mobile-first, modern design", hi: "मोबाइल-फ़र्स्ट, आधुनिक डिज़ाइन" },
      { en: "WhatsApp & call buttons built in", hi: "WhatsApp और कॉल बटन शामिल" },
      { en: "SEO-ready and fast loading", hi: "SEO के लिए तैयार और तेज़" },
    ],
    deliverables: [
      { en: "Up to 5–8 custom-designed pages", hi: "5–8 कस्टम डिज़ाइन पेज" },
      { en: "Contact form, map and WhatsApp integration", hi: "संपर्क फ़ॉर्म, मैप और WhatsApp इंटीग्रेशन" },
      { en: "Basic on-page SEO and Google indexing", hi: "बेसिक ऑन-पेज SEO और Google इंडेक्सिंग" },
      { en: "Training so you can update content", hi: "कंटेंट अपडेट करने की ट्रेनिंग" },
      { en: "Corporate, school, education and hospitality website design", hi: "कॉर्पोरेट, स्कूल, शिक्षा और हॉस्पिटैलिटी वेबसाइट डिज़ाइन" },
      { en: "Website redesign and maintenance options", hi: "वेबसाइट री-डिज़ाइन और मेंटेनेंस विकल्प" },
    ],
    idealFor: [
      { en: "Beauty parlours & salons", hi: "ब्यूटी पार्लर और सैलून" },
      { en: "Shops, tent houses & local services", hi: "दुकानें, टेंट हाउस और लोकल सर्विस" },
      { en: "Professionals & engineering firms", hi: "प्रोफ़ेशनल और इंजीनियरिंग फ़र्म" },
    ],
    faqs: [
      {
        q: { en: "Can I update the website myself?", hi: "क्या मैं ख़ुद वेबसाइट अपडेट कर सकता हूँ?" },
        a: {
          en: "Yes. We hand over a simple editing workflow and a short training session. If you prefer, our maintenance plan covers updates for you.",
          hi: "हाँ। हम आसान एडिटिंग तरीका और छोटी ट्रेनिंग देते हैं। चाहें तो हमारा मेंटेनेंस प्लान आपके लिए अपडेट करता है।",
        },
      },
    ],
  },
  {
    slug: "ecommerce-website-development",
    kind: "tech",
    published: true,
    icon: "shopping-bag",
    image: {
      src: "/images/services/ecommerce-website-development.svg",
      alt: { en: "Online store interface with products and cart", hi: "प्रोडक्ट और कार्ट वाला ऑनलाइन स्टोर" },
    },
    title: { en: "E-Commerce Website Development", hi: "ई-कॉमर्स वेबसाइट डेवलपमेंट" },
    short: {
      en: "Online stores that let you sell products with secure payments and easy management.",
      hi: "सुरक्षित पेमेंट और आसान मैनेजमेंट के साथ अपने प्रोडक्ट ऑनलाइन बेचें।",
    },
    description: {
      en: "Online stores that allow businesses to sell their products with secure payment and easy management. From product catalogue to checkout and order tracking, we build stores that are simple for you to run and easy for customers to buy from.",
      hi: "ऑनलाइन स्टोर जिनसे व्यवसाय सुरक्षित पेमेंट और आसान मैनेजमेंट के साथ प्रोडक्ट बेच सकें। प्रोडक्ट कैटलॉग से चेकआउट और ऑर्डर ट्रैकिंग तक, हम ऐसा स्टोर बनाते हैं जो चलाने में आसान हो।",
    },
    features: [
      { en: "Secure UPI & card payments", hi: "सुरक्षित UPI और कार्ड पेमेंट" },
      { en: "Easy product & order management", hi: "आसान प्रोडक्ट और ऑर्डर मैनेजमेंट" },
      { en: "Mobile-friendly shopping", hi: "मोबाइल-फ़्रेंडली शॉपिंग" },
    ],
    deliverables: [
      { en: "Product catalogue with categories and search", hi: "कैटेगरी और सर्च के साथ प्रोडक्ट कैटलॉग" },
      { en: "Cart, checkout and payment gateway setup", hi: "कार्ट, चेकआउट और पेमेंट गेटवे सेटअप" },
      { en: "Order notifications on email / WhatsApp", hi: "ईमेल / WhatsApp पर ऑर्डर नोटिफ़िकेशन" },
      { en: "Admin dashboard for stock and orders", hi: "स्टॉक और ऑर्डर के लिए एडमिन डैशबोर्ड" },
    ],
    idealFor: [
      { en: "Retail & kirana shops going online", hi: "ऑनलाइन आने वाली रिटेल और किराना दुकानें" },
      { en: "Handicraft and home-business sellers", hi: "हस्तशिल्प और होम-बिज़नेस विक्रेता" },
      { en: "Brands selling direct to customers", hi: "सीधे ग्राहकों को बेचने वाले ब्रांड" },
    ],
    faqs: [
      {
        q: { en: "Which payment methods can I accept?", hi: "मैं कौन-से पेमेंट तरीक़े ले सकता हूँ?" },
        a: {
          en: "We integrate popular Indian gateways that support UPI, cards, net banking and wallets. Gateway fees are charged by the provider.",
          hi: "हम लोकप्रिय भारतीय गेटवे जोड़ते हैं जो UPI, कार्ड, नेट बैंकिंग और वॉलेट सपोर्ट करते हैं। गेटवे शुल्क प्रदाता लेता है।",
        },
      },
    ],
  },
  {
    slug: "educational-website-development",
    kind: "tech",
    published: false,
    icon: "graduation-cap",
    image: {
      src: "/images/education.webp",
      alt: { en: "School website on a laptop with course information", hi: "कोर्स जानकारी वाली स्कूल वेबसाइट" },
    },
    title: { en: "Educational Website Development", hi: "एजुकेशनल वेबसाइट डेवलपमेंट" },
    short: {
      en: "Websites for schools, institutes and training centres to share information, courses and updates.",
      hi: "स्कूल, संस्थान और ट्रेनिंग सेंटर के लिए जानकारी, कोर्स और अपडेट साझा करने वाली वेबसाइट।",
    },
    description: {
      en: "Websites for schools, institutes, and training centers to manage courses and share learning materials. Parents and students get notices, admissions information, galleries and contact details in one trusted place.",
      hi: "स्कूल, संस्थान और ट्रेनिंग सेंटर के लिए वेबसाइट जहाँ कोर्स मैनेज हों और पढ़ाई की सामग्री साझा हो। अभिभावकों और छात्रों को नोटिस, एडमिशन जानकारी, गैलरी और संपर्क एक भरोसेमंद जगह मिलते हैं।",
    },
    features: [
      { en: "Notices, admissions & gallery", hi: "नोटिस, एडमिशन और गैलरी" },
      { en: "Easy course & content management", hi: "आसान कोर्स और कंटेंट मैनेजमेंट" },
      { en: "Highly professional & mobile friendly", hi: "प्रोफ़ेशनल और मोबाइल फ़्रेंडली" },
    ],
    deliverables: [
      { en: "Home, About, Academics, Admissions, Gallery, Contact", hi: "होम, परिचय, शिक्षा, एडमिशन, गैलरी, संपर्क" },
      { en: "Notice board with latest announcements", hi: "नई सूचनाओं वाला नोटिस बोर्ड" },
      { en: "Photo gallery for events and achievements", hi: "कार्यक्रमों और उपलब्धियों की फ़ोटो गैलरी" },
      { en: "Google Maps & Business Profile setup", hi: "Google मैप्स और बिज़नेस प्रोफ़ाइल सेटअप" },
    ],
    idealFor: [
      { en: "CBSE / state-board schools", hi: "CBSE / राज्य बोर्ड स्कूल" },
      { en: "Coaching & training institutes", hi: "कोचिंग और ट्रेनिंग संस्थान" },
      { en: "Colleges and skill centres", hi: "कॉलेज और स्किल सेंटर" },
    ],
    faqs: [
      {
        q: { en: "Can the school staff post notices?", hi: "क्या स्कूल स्टाफ़ नोटिस डाल सकता है?" },
        a: {
          en: "Yes. Notices and gallery updates can be published by your staff without any coding.",
          hi: "हाँ। आपका स्टाफ़ बिना कोडिंग के नोटिस और गैलरी अपडेट कर सकता है।",
        },
      },
    ],
  },
  {
    slug: "website-maintenance-support",
    kind: "tech",
    published: true,
    icon: "wrench",
    image: {
      src: "/images/services/website-maintenance-support.svg",
      alt: { en: "Website and application maintenance on a computer", hi: "कंप्यूटर पर वेबसाइट और एप्लिकेशन मेंटेनेंस" },
    },
    title: { en: "Software Maintenance & Support", hi: "सॉफ़्टवेयर मेंटेनेंस और सपोर्ट" },
    short: {
      en: "Ongoing maintenance for websites and applications, from bug fixes and upgrades to monitoring and technical support.",
      hi: "वेबसाइट और एप्लिकेशन के लिए नियमित मेंटेनेंस: बग फ़िक्स और अपग्रेड से लेकर मॉनिटरिंग और तकनीकी सहायता तक।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES provides ongoing website and application maintenance, including annual maintenance contract options, bug fixing, upgrades, technical support and application monitoring. Scope is agreed around your product and support needs.",
      hi: "HASVIK TECHNOLOGIES वेबसाइट और एप्लिकेशन के लिए नियमित मेंटेनेंस देता है, जिसमें वार्षिक मेंटेनेंस कॉन्ट्रैक्ट विकल्प, बग फ़िक्स, अपग्रेड, तकनीकी सहायता और एप्लिकेशन मॉनिटरिंग शामिल हैं। काम का दायरा आपके प्रोडक्ट और सहायता की ज़रूरत के अनुसार तय होता है।",
    },
    features: [
      { en: "Security patches & regular backups", hi: "सिक्योरिटी पैच और नियमित बैकअप" },
      { en: "Uptime & performance monitoring", hi: "अपटाइम और परफ़ॉर्मेंस मॉनिटरिंग" },
      { en: "Content updates on request", hi: "ज़रूरत पर कंटेंट अपडेट" },
    ],
    deliverables: [
      { en: "Monthly dependency and security updates", hi: "मासिक डिपेंडेंसी और सिक्योरिटी अपडेट" },
      { en: "Automated backups with quick restore", hi: "जल्दी रीस्टोर वाले ऑटोमैटिक बैकअप" },
      { en: "Uptime alerts and speed checks", hi: "अपटाइम अलर्ट और स्पीड जाँच" },
      { en: "Text, image and price changes", hi: "टेक्स्ट, इमेज और कीमत में बदलाव" },
      { en: "Annual Maintenance Contract options", hi: "वार्षिक मेंटेनेंस कॉन्ट्रैक्ट विकल्प" },
      { en: "Bug fixes, upgrades and technical support", hi: "बग फ़िक्स, अपग्रेड और तकनीकी सहायता" },
      { en: "Application monitoring", hi: "एप्लिकेशन मॉनिटरिंग" },
    ],
    idealFor: [
      { en: "Businesses without an in-house developer", hi: "बिना इन-हाउस डेवलपर वाले व्यवसाय" },
      { en: "Schools with frequent notices", hi: "बार-बार नोटिस देने वाले स्कूल" },
      { en: "Online stores that change prices often", hi: "बार-बार कीमत बदलने वाले ऑनलाइन स्टोर" },
    ],
    faqs: [
      {
        q: { en: "Do you maintain websites you didn't build?", hi: "क्या आप दूसरों की बनाई वेबसाइट भी संभालते हैं?" },
        a: {
          en: "Usually yes. We first review the existing site and then suggest a maintenance plan.",
          hi: "आमतौर पर हाँ। हम पहले मौजूदा साइट की समीक्षा करते हैं, फिर मेंटेनेंस प्लान सुझाते हैं।",
        },
      },
    ],
  },
  {
    slug: "google-map-listing",
    kind: "non-tech",
    published: true,
    icon: "map-pin",
    image: {
      src: "/images/services/google-map-listing.svg",
      alt: { en: "Business online listing and local visibility", hi: "बिज़नेस की ऑनलाइन लिस्टिंग और स्थानीय पहचान" },
    },
    title: { en: "Google Map Listing", hi: "Google मैप लिस्टिंग" },
    short: {
      en: "Get found on Google Maps: optimised listings that increase local reach and bring nearby customers.",
      hi: "Google मैप्स पर दिखें: ऑप्टिमाइज़्ड लिस्टिंग से लोकल पहुँच बढ़ाएँ और नज़दीकी ग्राहक पाएँ।",
    },
    description: {
      en: "Helping businesses improve their online visibility by optimizing Google Maps listings, increasing local reach, and attracting more customers. We set the right category, location pin, photos and details so people nearby can find, call and visit you.",
      hi: "Google मैप्स लिस्टिंग ऑप्टिमाइज़ करके व्यवसायों की ऑनलाइन पहचान बढ़ाना, लोकल पहुँच बढ़ाना और ज़्यादा ग्राहक लाना। सही कैटेगरी, लोकेशन पिन, फ़ोटो और जानकारी ताकि आस-पास के लोग आपको ढूँढ़ें, कॉल करें और आएँ।",
    },
    features: [
      { en: "Accurate pin, category & hours", hi: "सही पिन, कैटेगरी और समय" },
      { en: "Photos and service details", hi: "फ़ोटो और सर्विस विवरण" },
      { en: "More calls & direction requests", hi: "ज़्यादा कॉल और दिशा अनुरोध" },
    ],
    deliverables: [
      { en: "New listing or claim of existing listing", hi: "नई लिस्टिंग या मौजूदा लिस्टिंग क्लेम" },
      { en: "Category, keywords and description optimisation", hi: "कैटेगरी, कीवर्ड और विवरण ऑप्टिमाइज़ेशन" },
      { en: "Photo upload and contact details", hi: "फ़ोटो अपलोड और संपर्क विवरण" },
      { en: "Guidance on collecting reviews", hi: "रिव्यू जुटाने का मार्गदर्शन" },
    ],
    idealFor: [
      { en: "Shops and showrooms", hi: "दुकानें और शोरूम" },
      { en: "Clinics, schools and institutes", hi: "क्लिनिक, स्कूल और संस्थान" },
      { en: "Service providers with a local area", hi: "लोकल क्षेत्र में सर्विस देने वाले" },
    ],
    faqs: [
      {
        q: { en: "How long until my business shows on Maps?", hi: "मेरा व्यवसाय मैप्स पर कब दिखेगा?" },
        a: {
          en: "Once Google verifies the listing it usually appears within a few days. Verification time depends on Google.",
          hi: "Google के वेरिफ़ाई करने के बाद आमतौर पर कुछ दिनों में दिखता है। वेरिफ़िकेशन का समय Google पर निर्भर है।",
        },
      },
    ],
  },
  {
    slug: "google-business-profile",
    kind: "non-tech",
    published: true,
    icon: "badge-check",
    image: {
      src: "/images/services/google-business-profile.svg",
      alt: { en: "Business profile and digital content", hi: "बिज़नेस प्रोफ़ाइल और डिजिटल कंटेंट" },
    },
    title: { en: "Digital Business Support", hi: "डिजिटल बिज़नेस सहायता" },
    short: {
      en: "Practical support for business profiles, product descriptions and digital content across online channels.",
      hi: "ऑनलाइन चैनलों पर बिज़नेस प्रोफ़ाइल, प्रोडक्ट विवरण और डिजिटल कंटेंट के लिए व्यावहारिक सहायता।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES helps businesses prepare their digital presence with Google Business Profile setup assistance, business profile updates, product description writing, digital content preparation and marketplace profile optimization. Marketplace names refer to independent support; no official partnership is implied.",
      hi: "HASVIK TECHNOLOGIES Google Business Profile सेटअप सहायता, बिज़नेस प्रोफ़ाइल अपडेट, प्रोडक्ट विवरण लेखन, डिजिटल कंटेंट तैयारी और मार्केटप्लेस प्रोफ़ाइल ऑप्टिमाइज़ेशन में मदद करता है। मार्केटप्लेस का उल्लेख स्वतंत्र सहायता के लिए है; किसी आधिकारिक साझेदारी का दावा नहीं है।",
    },
    features: [
      { en: "Profile setup and update assistance", hi: "प्रोफ़ाइल सेटअप और अपडेट में सहायता" },
      { en: "Clear, customer-focused product descriptions", hi: "स्पष्ट और ग्राहक-केंद्रित प्रोडक्ट विवरण" },
      { en: "Prepared digital content for online channels", hi: "ऑनलाइन चैनलों के लिए तैयार डिजिटल कंटेंट" },
    ],
    deliverables: [
      { en: "Google Business Profile setup assistance", hi: "Google Business Profile सेटअप सहायता" },
      { en: "Business profile content and updates", hi: "बिज़नेस प्रोफ़ाइल कंटेंट और अपडेट" },
      { en: "Product description writing and digital content preparation", hi: "प्रोडक्ट विवरण लेखन और डिजिटल कंटेंट तैयारी" },
      { en: "Marketplace profile optimization support", hi: "मार्केटप्लेस प्रोफ़ाइल ऑप्टिमाइज़ेशन सहायता" },
    ],
    idealFor: [
      { en: "Businesses preparing or updating their online profiles", hi: "ऑनलाइन प्रोफ़ाइल तैयार या अपडेट करने वाले व्यवसाय" },
      { en: "Sellers who need product content support", hi: "प्रोडक्ट कंटेंट सहायता चाहने वाले विक्रेता" },
      { en: "Teams preparing digital business content", hi: "डिजिटल बिज़नेस कंटेंट तैयार करने वाली टीमें" },
    ],
    faqs: [
      {
        q: {
          en: "Can you help prepare our business profiles and content?",
          hi: "क्या आप हमारी बिज़नेस प्रोफ़ाइल और कंटेंट तैयार करने में मदद कर सकते हैं?",
        },
        a: {
          en: "Yes. Share the channels and content you need help with, and we can discuss a suitable scope.",
          hi: "हाँ। जिन चैनलों और कंटेंट में मदद चाहिए, उनकी जानकारी दें ताकि काम का सही दायरा तय किया जा सके।",
        },
      },
    ],
  },

  {
    slug: "custom-software-development",
    kind: "tech",
    published: true,
    icon: "code",
    image: {
      src: "/images/services/custom-software-development.svg",
      alt: { en: "Custom business software displayed on a computer", hi: "कंप्यूटर पर दिखता कस्टम बिज़नेस सॉफ़्टवेयर" },
    },
    title: { en: "Custom Software Development", hi: "कस्टम सॉफ़्टवेयर डेवलपमेंट" },
    short: {
      en: "Purpose-built business applications shaped around your workflows, users and operational needs.",
      hi: "आपके वर्कफ़्लो, उपयोगकर्ताओं और संचालन की ज़रूरतों के अनुसार बनाए गए बिज़नेस एप्लिकेशन।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES plans and builds custom business software around your requirements. Solutions can include CRM and sales management systems, ERP and HRM applications, inventory tools, hotel booking and reservation platforms, and SaaS products.",
      hi: "HASVIK TECHNOLOGIES आपकी आवश्यकताओं के अनुसार कस्टम बिज़नेस सॉफ़्टवेयर की योजना और विकास करता है। समाधान में CRM और सेल्स मैनेजमेंट सिस्टम, ERP और HRM एप्लिकेशन, इन्वेंटरी टूल, होटल बुकिंग और रिज़र्वेशन प्लेटफ़ॉर्म तथा SaaS प्रोडक्ट शामिल हो सकते हैं।",
    },
    features: [
      { en: "Workflows tailored to your business", hi: "आपके व्यवसाय के अनुसार वर्कफ़्लो" },
      { en: "Role-based tools for teams and customers", hi: "टीम और ग्राहकों के लिए भूमिका-आधारित टूल" },
      { en: "A clear path for future improvements", hi: "भविष्य के सुधार के लिए स्पष्ट योजना" },
    ],
    deliverables: [
      { en: "CRM and sales management systems", hi: "CRM और सेल्स मैनेजमेंट सिस्टम" },
      { en: "ERP and HRM applications", hi: "ERP और HRM एप्लिकेशन" },
      { en: "Inventory management systems", hi: "इन्वेंटरी मैनेजमेंट सिस्टम" },
      { en: "Hotel booking and reservation platforms", hi: "होटल बुकिंग और रिज़र्वेशन प्लेटफ़ॉर्म" },
      { en: "Custom business applications and SaaS solutions", hi: "कस्टम बिज़नेस एप्लिकेशन और SaaS समाधान" },
    ],
    idealFor: [
      { en: "Businesses coordinating work across teams", hi: "टीमों के बीच काम का समन्वय करने वाले व्यवसाय" },
      { en: "Organizations replacing manual workflows", hi: "मैनुअल वर्कफ़्लो बदलने वाले संगठन" },
      { en: "Founders validating a software product idea", hi: "सॉफ़्टवेयर प्रोडक्ट आइडिया पर काम करने वाले संस्थापक" },
    ],
    faqs: [
      {
        q: {
          en: "Can you scope a software project before development?",
          hi: "क्या डेवलपमेंट से पहले सॉफ़्टवेयर प्रोजेक्ट का दायरा तय कर सकते हैं?",
        },
        a: {
          en: "Yes. We can discuss your users, workflows and priorities first, then define a suitable scope together.",
          hi: "हाँ। पहले उपयोगकर्ताओं, वर्कफ़्लो और प्राथमिकताओं पर चर्चा करके मिलकर उपयुक्त दायरा तय किया जा सकता है।",
        },
      },
    ],
  },
  {
    slug: "ui-ux-design",
    kind: "tech",
    published: true,
    icon: "palette",
    image: {
      src: "/images/services/ui-ux-design.svg",
      alt: { en: "User interface design displayed on a computer", hi: "कंप्यूटर पर दिखता यूज़र इंटरफ़ेस डिज़ाइन" },
    },
    title: { en: "UI/UX Design", hi: "UI/UX डिज़ाइन" },
    short: {
      en: "Clear, responsive interfaces that make websites and applications easier to understand and use.",
      hi: "वेबसाइट और एप्लिकेशन को समझने और इस्तेमाल करने में आसान बनाने वाले स्पष्ट, रिस्पॉन्सिव इंटरफ़ेस।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES designs web and application interfaces around real user needs. The design process can include wireframes, interactive prototypes, responsive layouts and dashboards, creating a clear foundation for development.",
      hi: "HASVIK TECHNOLOGIES वास्तविक उपयोगकर्ता ज़रूरतों के अनुसार वेब और एप्लिकेशन इंटरफ़ेस डिज़ाइन करता है। डिज़ाइन प्रक्रिया में वायरफ़्रेम, इंटरैक्टिव प्रोटोटाइप, रिस्पॉन्सिव लेआउट और डैशबोर्ड शामिल हो सकते हैं, जो डेवलपमेंट के लिए स्पष्ट आधार देते हैं।",
    },
    features: [
      { en: "Layouts designed for different screen sizes", hi: "अलग-अलग स्क्रीन के लिए डिज़ाइन लेआउट" },
      { en: "Clickable prototypes to review ideas", hi: "आइडिया की समीक्षा के लिए क्लिक करने योग्य प्रोटोटाइप" },
      { en: "Consistent, easy-to-follow visual patterns", hi: "सुसंगत और समझने में आसान विज़ुअल पैटर्न" },
    ],
    deliverables: [
      { en: "Web and application interface design", hi: "वेब और एप्लिकेशन इंटरफ़ेस डिज़ाइन" },
      { en: "Wireframing and prototyping", hi: "वायरफ़्रेमिंग और प्रोटोटाइपिंग" },
      { en: "Responsive interface design", hi: "रिस्पॉन्सिव इंटरफ़ेस डिज़ाइन" },
      { en: "Dashboard design", hi: "डैशबोर्ड डिज़ाइन" },
    ],
    idealFor: [
      { en: "Teams planning a new website or application", hi: "नई वेबसाइट या एप्लिकेशन की योजना बनाने वाली टीमें" },
      { en: "Businesses improving an existing user experience", hi: "मौजूदा यूज़र अनुभव बेहतर करने वाले व्यवसाय" },
      { en: "Product teams aligning before development", hi: "डेवलपमेंट से पहले तालमेल करने वाली प्रोडक्ट टीमें" },
    ],
    faqs: [
      {
        q: { en: "Can you provide designs before development starts?", hi: "क्या डेवलपमेंट शुरू होने से पहले डिज़ाइन मिल सकता है?" },
        a: {
          en: "Yes. Wireframes and prototypes can be reviewed with your team before implementation.",
          hi: "हाँ। लागू करने से पहले आपकी टीम वायरफ़्रेम और प्रोटोटाइप की समीक्षा कर सकती है।",
        },
      },
    ],
  },
  {
    slug: "cloud-it-solutions",
    kind: "tech",
    published: false,
    icon: "server",
    image: {
      src: "/images/Computer-Screen.webp",
      alt: { en: "Cloud and IT services for digital products", hi: "डिजिटल प्रोडक्ट के लिए क्लाउड और IT सेवाएँ" },
    },
    title: { en: "Cloud & IT Solutions", hi: "क्लाउड और IT समाधान" },
    short: {
      en: "Practical cloud, deployment, API and database support for your digital products.",
      hi: "आपके डिजिटल प्रोडक्ट के लिए व्यावहारिक क्लाउड, डिप्लॉयमेंट, API और डेटाबेस सहायता।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES helps plan and implement cloud hosting and deployment, including AWS and Vercel deployments. Support can also cover API development and integration, database management and IT consulting based on your requirements.",
      hi: "HASVIK TECHNOLOGIES AWS और Vercel डिप्लॉयमेंट सहित क्लाउड होस्टिंग और डिप्लॉयमेंट की योजना और कार्यान्वयन में मदद करता है। ज़रूरत के अनुसार API डेवलपमेंट और इंटीग्रेशन, डेटाबेस मैनेजमेंट और IT कंसल्टिंग भी शामिल हो सकते हैं।",
    },
    features: [
      { en: "Deployment choices matched to your project", hi: "प्रोजेक्ट के अनुसार डिप्लॉयमेंट विकल्प" },
      { en: "Connected APIs and managed data workflows", hi: "जुड़े हुए APIs और व्यवस्थित डेटा वर्कफ़्लो" },
      { en: "Technical guidance for infrastructure decisions", hi: "इन्फ़्रास्ट्रक्चर फ़ैसलों के लिए तकनीकी मार्गदर्शन" },
    ],
    deliverables: [
      { en: "Cloud hosting and deployment", hi: "क्लाउड होस्टिंग और डिप्लॉयमेंट" },
      { en: "AWS and Vercel deployment", hi: "AWS और Vercel डिप्लॉयमेंट" },
      { en: "API development and integration", hi: "API डेवलपमेंट और इंटीग्रेशन" },
      { en: "Database management", hi: "डेटाबेस मैनेजमेंट" },
      { en: "IT consulting", hi: "IT कंसल्टिंग" },
    ],
    idealFor: [
      { en: "Businesses launching a new digital product", hi: "नया डिजिटल प्रोडक्ट लॉन्च करने वाले व्यवसाय" },
      { en: "Teams integrating systems and services", hi: "सिस्टम और सेवाएँ जोड़ने वाली टीमें" },
      { en: "Organizations seeking infrastructure guidance", hi: "इन्फ़्रास्ट्रक्चर मार्गदर्शन चाहने वाले संगठन" },
    ],
    faqs: [
      {
        q: { en: "Can you work with our existing cloud setup?", hi: "क्या आप हमारे मौजूदा क्लाउड सेटअप के साथ काम कर सकते हैं?" },
        a: {
          en: "We can review your current setup and discuss the deployment or integration work that fits your needs.",
          hi: "हम मौजूदा सेटअप की समीक्षा करके आपकी ज़रूरत के अनुसार डिप्लॉयमेंट या इंटीग्रेशन पर चर्चा कर सकते हैं।",
        },
      },
    ],
  },
  {
    slug: "mobile-app-development",
    kind: "tech",
    published: true,
    icon: "smartphone",
    image: {
      src: "/images/services/mobile-app-development.svg",
      alt: { en: "Mobile application interface for customers", hi: "ग्राहकों के लिए मोबाइल एप्लिकेशन इंटरफ़ेस" },
    },
    title: { en: "Mobile App Development", hi: "मोबाइल ऐप डेवलपमेंट" },
    short: {
      en: "Mobile experiences planned around your customers, product goals and day-to-day workflows.",
      hi: "आपके ग्राहकों, प्रोडक्ट लक्ष्यों और रोज़मर्रा के वर्कफ़्लो के अनुसार मोबाइल अनुभव।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES plans and develops mobile applications around your users and business requirements. We work with you to define the app's core features, platform needs and integration requirements before agreeing on a delivery scope.",
      hi: "HASVIK TECHNOLOGIES आपके उपयोगकर्ताओं और व्यावसायिक ज़रूरतों के अनुसार मोबाइल एप्लिकेशन की योजना और विकास करता है। काम का दायरा तय करने से पहले ऐप के मुख्य फ़ीचर, प्लेटफ़ॉर्म की ज़रूरतें और इंटीग्रेशन आवश्यकताओं पर चर्चा की जाती है।",
    },
    features: [
      { en: "Features scoped to real user needs", hi: "वास्तविक उपयोगकर्ता ज़रूरतों के अनुसार फ़ीचर" },
      { en: "Interfaces designed for mobile use", hi: "मोबाइल उपयोग के लिए डिज़ाइन इंटरफ़ेस" },
      { en: "Integration planning for existing services", hi: "मौजूदा सेवाओं के साथ इंटीग्रेशन की योजना" },
    ],
    deliverables: [
      { en: "Mobile application planning and development", hi: "मोबाइल एप्लिकेशन की योजना और डेवलपमेंट" },
      { en: "Feature and user-flow definition", hi: "फ़ीचर और यूज़र फ़्लो निर्धारण" },
      { en: "Mobile interface implementation", hi: "मोबाइल इंटरफ़ेस कार्यान्वयन" },
      { en: "Integration planning for APIs and business systems", hi: "APIs और बिज़नेस सिस्टम इंटीग्रेशन की योजना" },
    ],
    idealFor: [
      { en: "Businesses planning a mobile customer experience", hi: "मोबाइल ग्राहक अनुभव की योजना बनाने वाले व्यवसाय" },
      { en: "Teams extending a web product to mobile", hi: "वेब प्रोडक्ट को मोबाइल तक विस्तारित करने वाली टीमें" },
      { en: "Organizations digitizing on-the-go workflows", hi: "मोबाइल वर्कफ़्लो को डिजिटल बनाने वाले संगठन" },
    ],
    faqs: [
      {
        q: { en: "Which platforms can an app support?", hi: "ऐप किन प्लेटफ़ॉर्म पर काम कर सकता है?" },
        a: {
          en: "Platform requirements depend on your audience and project scope. We discuss those needs before recommending an approach.",
          hi: "प्लेटफ़ॉर्म की ज़रूरतें आपके उपयोगकर्ताओं और प्रोजेक्ट के दायरे पर निर्भर करती हैं। तरीका सुझाने से पहले हम इन ज़रूरतों पर चर्चा करते हैं।",
        },
      },
    ],
  },
  {
    slug: "software-testing-quality-assurance",
    kind: "tech",
    published: false,
    icon: "shield-check",
    image: {
      src: "/images/Computer-Screen.webp",
      alt: { en: "Software quality checks on a computer", hi: "कंप्यूटर पर सॉफ़्टवेयर क्वालिटी जाँच" },
    },
    title: { en: "Software Testing & Quality Assurance", hi: "सॉफ़्टवेयर टेस्टिंग और क्वालिटी एश्योरेंस" },
    short: {
      en: "Structured checks to help websites and applications work as intended across key user flows.",
      hi: "वेबसाइट और एप्लिकेशन के प्रमुख उपयोगकर्ता फ़्लो को सही ढंग से जाँचने की व्यवस्थित प्रक्रिया।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES helps teams review websites and applications through planned functional checks, responsive-layout reviews and regression testing. Findings are documented clearly to support informed fixes and releases.",
      hi: "HASVIK TECHNOLOGIES योजनाबद्ध फ़ंक्शनल जाँच, रिस्पॉन्सिव लेआउट समीक्षा और रिग्रेशन टेस्टिंग के ज़रिए वेबसाइट और एप्लिकेशन की समीक्षा करता है। सुधार और रिलीज़ में मदद के लिए निष्कर्ष स्पष्ट रूप से दर्ज किए जाते हैं।",
    },
    features: [
      { en: "Test coverage focused on important user flows", hi: "महत्वपूर्ण यूज़र फ़्लो पर केंद्रित टेस्ट कवरेज" },
      { en: "Issues documented for clear follow-up", hi: "आगे की कार्रवाई के लिए स्पष्ट रूप से दर्ज समस्याएँ" },
      { en: "Checks across supported screen sizes", hi: "समर्थित स्क्रीन साइज़ पर जाँच" },
    ],
    deliverables: [
      { en: "Functional testing of key features", hi: "मुख्य फ़ीचर की फ़ंक्शनल टेस्टिंग" },
      { en: "Responsive layout checks", hi: "रिस्पॉन्सिव लेआउट जाँच" },
      { en: "Regression checks after updates", hi: "अपडेट के बाद रिग्रेशन जाँच" },
      { en: "Documented findings and reproduction steps", hi: "दर्ज निष्कर्ष और समस्या दोहराने के चरण" },
    ],
    idealFor: [
      { en: "Teams preparing a website or app release", hi: "वेबसाइट या ऐप रिलीज़ की तैयारी करने वाली टीमें" },
      { en: "Businesses reviewing an existing digital product", hi: "मौजूदा डिजिटल प्रोडक्ट की समीक्षा करने वाले व्यवसाय" },
      { en: "Organizations checking changes before rollout", hi: "रोलआउट से पहले बदलाव जाँचने वाले संगठन" },
    ],
    faqs: [
      {
        q: {
          en: "Can you test an application built by another team?",
          hi: "क्या आप दूसरी टीम द्वारा बनाए गए एप्लिकेशन की टेस्टिंग कर सकते हैं?",
        },
        a: {
          en: "Yes. We can discuss access, supported environments and your priority user flows to define a suitable test scope.",
          hi: "हाँ। उपयुक्त टेस्ट दायरा तय करने के लिए हम एक्सेस, समर्थित एनवायरनमेंट और प्राथमिक यूज़र फ़्लो पर चर्चा कर सकते हैं।",
        },
      },
    ],
  },

  // ---------------- Non-tech services ----------------
  {
    slug: "ecommerce-marketplace-management",
    kind: "non-tech",
    published: true,
    icon: "shopping-bag",
    image: {
      src: "/images/services/ecommerce-marketplace-management.svg",
      alt: { en: "Online marketplace products ready for listing", hi: "लिस्टिंग के लिए तैयार ऑनलाइन मार्केटप्लेस प्रोडक्ट" },
    },
    title: {
      en: "E-commerce Product Listing & Marketplace Management",
      hi: "ई-कॉमर्स प्रोडक्ट लिस्टिंग और मार्केटप्लेस मैनेजमेंट",
    },
    short: {
      en: "Product catalog creation, listing uploads and seller account support using client-authorized access for Amazon, Flipkart and Meesho.",
      hi: "Amazon, Flipkart और Meesho पर ग्राहक की अधिकृत पहुँच से प्रोडक्ट कैटलॉग, लिस्टिंग अपलोड और सेलर अकाउंट सहायता।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES offers independent seller support for product listings on Amazon, Flipkart and Meesho. Services can include account setup assistance, catalog creation, bulk uploads, listing optimization, inventory and pricing updates, and seller account management. We work only with access authorized by the account owner; do not send passwords by email or WhatsApp. Clients are responsible for the accuracy and rights to their product information, images and claims, and for reviewing and approving listings before publication. Marketplace approval, ranking, sales and uninterrupted platform availability are not guaranteed. HASVIK TECHNOLOGIES is not affiliated with or endorsed by these marketplaces.",
      hi: "HASVIK TECHNOLOGIES Amazon, Flipkart और Meesho पर प्रोडक्ट लिस्टिंग के लिए स्वतंत्र सेलर सहायता देता है। सेवाओं में अकाउंट सेटअप सहायता, कैटलॉग निर्माण, बल्क अपलोड, लिस्टिंग ऑप्टिमाइज़ेशन, इन्वेंटरी और कीमत अपडेट तथा सेलर अकाउंट मैनेजमेंट शामिल हो सकते हैं। हम केवल अकाउंट मालिक द्वारा अधिकृत पहुँच से काम करते हैं; पासवर्ड ईमेल या WhatsApp से न भेजें। प्रोडक्ट जानकारी, तस्वीरों और दावों की सटीकता और उन पर अधिकार ग्राहक की ज़िम्मेदारी है; प्रकाशित करने से पहले लिस्टिंग की समीक्षा और मंज़ूरी भी ग्राहक को देनी होगी। मार्केटप्लेस की मंज़ूरी, रैंकिंग, बिक्री या प्लेटफ़ॉर्म की निरंतर उपलब्धता की गारंटी नहीं है। HASVIK TECHNOLOGIES इन मार्केटप्लेस से संबद्ध या समर्थित नहीं है।",
    },
    features: [
      { en: "Consistent product information across listings", hi: "लिस्टिंग में सुसंगत प्रोडक्ट जानकारी" },
      { en: "Support for bulk catalog workflows", hi: "बल्क कैटलॉग वर्कफ़्लो के लिए सहायता" },
      { en: "Ongoing listing, inventory and pricing updates", hi: "लिस्टिंग, इन्वेंटरी और कीमतों के नियमित अपडेट" },
      { en: "Account access only with the seller's authorization", hi: "सेलर की अनुमति से ही अकाउंट की पहुँच" },
    ],
    deliverables: [
      { en: "Amazon, Flipkart and Meesho product listing assistance", hi: "Amazon, Flipkart और Meesho प्रोडक्ट लिस्टिंग सहायता" },
      { en: "Seller account setup assistance", hi: "सेलर अकाउंट सेटअप सहायता" },
      { en: "Product catalog creation and bulk product uploads", hi: "प्रोडक्ट कैटलॉग निर्माण और बल्क अपलोड" },
      { en: "Product listing optimization", hi: "प्रोडक्ट लिस्टिंग ऑप्टिमाइज़ेशन" },
      { en: "Inventory and pricing updates", hi: "इन्वेंटरी और कीमत अपडेट" },
      { en: "Seller account management support", hi: "सेलर अकाउंट मैनेजमेंट सहायता" },
      { en: "Listing review and approval workflow agreed with the client", hi: "ग्राहक के साथ तय लिस्टिंग समीक्षा और मंज़ूरी प्रक्रिया" },
    ],
    idealFor: [
      { en: "Sellers organizing a growing product catalog", hi: "बढ़ता प्रोडक्ट कैटलॉग व्यवस्थित करने वाले विक्रेता" },
      { en: "Businesses preparing to sell through marketplaces", hi: "मार्केटप्लेस के ज़रिए बिक्री की तैयारी करने वाले व्यवसाय" },
      { en: "Teams needing ongoing listing updates", hi: "नियमित लिस्टिंग अपडेट चाहने वाली टीमें" },
    ],
    faqs: [
      {
        q: { en: "Are you officially connected with these marketplaces?", hi: "क्या इन मार्केटप्लेस के साथ आपकी आधिकारिक साझेदारी है?" },
        a: {
          en: "No. HASVIK TECHNOLOGIES provides independent seller support and is not affiliated with or endorsed by Amazon, Flipkart or Meesho.",
          hi: "नहीं। HASVIK TECHNOLOGIES स्वतंत्र सेलर सहायता देता है और Amazon, Flipkart या Meesho से संबद्ध या समर्थित नहीं है।",
        },
      },
      {
        q: { en: "Do you guarantee listing approval or sales?", hi: "क्या आप लिस्टिंग की मंज़ूरी या बिक्री की गारंटी देते हैं?" },
        a: {
          en: "No. Marketplace decisions, ranking, sales and platform availability are controlled by the marketplaces and market conditions. We do not guarantee those outcomes.",
          hi: "नहीं। मार्केटप्लेस के निर्णय, रैंकिंग, बिक्री और प्लेटफ़ॉर्म की उपलब्धता मार्केटप्लेस तथा बाज़ार की परिस्थितियों पर निर्भर करती है। हम इन परिणामों की गारंटी नहीं देते।",
        },
      },
      {
        q: { en: "How do you access our seller account?", hi: "आप हमारे सेलर अकाउंट तक कैसे पहुँचते हैं?" },
        a: {
          en: "We work only with access you authorize for the agreed tasks. Never send account passwords by email or WhatsApp; use the marketplace's supported user or delegated-access options where available.",
          hi: "हम तय कामों के लिए केवल आपके द्वारा अधिकृत पहुँच से काम करते हैं। अकाउंट पासवर्ड ईमेल या WhatsApp से कभी न भेजें; जहाँ उपलब्ध हो, मार्केटप्लेस के समर्थित यूज़र या डेलीगेटेड-एक्सेस विकल्प का उपयोग करें।",
        },
      },
    ],
  },
  {
    slug: "data-entry-processing",
    kind: "non-tech",
    published: true,
    icon: "database",
    image: {
      src: "/images/services/data-entry-processing.svg",
      alt: { en: "Data entry and processing work on a computer", hi: "कंप्यूटर पर डेटा एंट्री और प्रोसेसिंग" },
    },
    title: { en: "Data Entry & Catalog Management", hi: "डेटा एंट्री और कैटलॉग मैनेजमेंट" },
    short: {
      en: "Accurate data processing, spreadsheet support and structured product catalog management.",
      hi: "सटीक डेटा प्रोसेसिंग, स्प्रेडशीट सहायता और व्यवस्थित प्रोडक्ट कैटलॉग मैनेजमेंट।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES supports data entry and processing, spreadsheet management, data cleaning and validation, product catalog digitization and bulk data management. Records can be organized and delivered in the agreed format.",
      hi: "HASVIK TECHNOLOGIES डेटा एंट्री और प्रोसेसिंग, स्प्रेडशीट मैनेजमेंट, डेटा सफ़ाई और वैलिडेशन, प्रोडक्ट कैटलॉग डिजिटाइज़ेशन तथा बल्क डेटा मैनेजमेंट में सहायता करता है। रिकॉर्ड को तय फ़ॉर्मेट में व्यवस्थित करके दिया जा सकता है।",
    },
    features: [
      { en: "High accuracy, double-checked", hi: "उच्च सटीकता, दोबारा जाँचा गया" },
      { en: "Excel, Google Sheets or CSV", hi: "Excel, Google Sheets या CSV" },
      { en: "Confidential handling of records", hi: "रिकॉर्ड की गोपनीय हैंडलिंग" },
    ],
    deliverables: [
      { en: "Manual entry from paper or scanned records", hi: "काग़ज़ या स्कैन रिकॉर्ड से मैनुअल एंट्री" },
      { en: "Data cleaning and de-duplication", hi: "डेटा सफ़ाई और डुप्लीकेट हटाना" },
      { en: "Structured spreadsheets and reports", hi: "व्यवस्थित स्प्रेडशीट और रिपोर्ट" },
      { en: "Spreadsheet management and data validation", hi: "स्प्रेडशीट मैनेजमेंट और डेटा वैलिडेशन" },
      { en: "Product catalog digitization and bulk data management", hi: "प्रोडक्ट कैटलॉग डिजिटाइज़ेशन और बल्क डेटा मैनेजमेंट" },
    ],
    idealFor: [
      { en: "Schools managing student records", hi: "छात्र रिकॉर्ड संभालने वाले स्कूल" },
      { en: "Shops digitising stock and bills", hi: "स्टॉक और बिल डिजिटल करने वाली दुकानें" },
      { en: "Offices with backlog paperwork", hi: "पुराने काग़ज़ी काम वाले ऑफ़िस" },
    ],
    faqs: [
      {
        q: { en: "Is my data kept confidential?", hi: "क्या मेरा डेटा गोपनीय रहता है?" },
        a: {
          en: "Yes. Access is limited to the assigned team members and files are deleted after delivery on request.",
          hi: "हाँ। केवल नियुक्त टीम सदस्यों की पहुँच होती है और अनुरोध पर डिलीवरी के बाद फ़ाइलें हटा दी जाती हैं।",
        },
      },
    ],
  },
  {
    slug: "business-process-support",
    kind: "non-tech",
    published: true,
    icon: "briefcase",
    image: {
      src: "/images/services/business-process-support.svg",
      alt: { en: "Organized business records and data processing", hi: "व्यवस्थित बिज़नेस रिकॉर्ड और डेटा प्रोसेसिंग" },
    },
    title: { en: "Business Process Support", hi: "बिज़नेस प्रोसेस सहायता" },
    short: {
      en: "Dependable back-office and administrative support to help keep day-to-day work organized.",
      hi: "रोज़मर्रा के काम व्यवस्थित रखने के लिए भरोसेमंद बैक-ऑफ़िस और प्रशासनिक सहायता।",
    },
    description: {
      en: "HASVIK TECHNOLOGIES provides business process support for recurring operational tasks. Support can include back-office operations, documentation management, order processing assistance, business reporting and administrative support, with responsibilities agreed to suit your workflows.",
      hi: "HASVIK TECHNOLOGIES नियमित संचालन संबंधी कामों के लिए बिज़नेस प्रोसेस सहायता देता है। सहायता में बैक-ऑफ़िस संचालन, दस्तावेज़ मैनेजमेंट, ऑर्डर प्रोसेसिंग, बिज़नेस रिपोर्टिंग और प्रशासनिक सहायता शामिल हो सकती है; ज़िम्मेदारियाँ आपके वर्कफ़्लो के अनुसार तय होती हैं।",
    },
    features: [
      { en: "Structured support for recurring processes", hi: "नियमित प्रक्रियाओं के लिए व्यवस्थित सहायता" },
      { en: "Clear documentation and handoffs", hi: "स्पष्ट दस्तावेज़ीकरण और काम का हस्तांतरण" },
      { en: "Flexible support aligned with agreed tasks", hi: "तय कामों के अनुसार लचीली सहायता" },
    ],
    deliverables: [
      { en: "Back-office operations", hi: "बैक-ऑफ़िस संचालन" },
      { en: "Documentation management", hi: "दस्तावेज़ मैनेजमेंट" },
      { en: "Order processing support", hi: "ऑर्डर प्रोसेसिंग सहायता" },
      { en: "Business reporting", hi: "बिज़नेस रिपोर्टिंग" },
      { en: "Administrative support", hi: "प्रशासनिक सहायता" },
    ],
    idealFor: [
      { en: "Small teams managing recurring operational tasks", hi: "नियमित संचालन कार्य संभालने वाली छोटी टीमें" },
      { en: "Businesses organizing orders and records", hi: "ऑर्डर और रिकॉर्ड व्यवस्थित करने वाले व्यवसाय" },
      { en: "Organizations needing administrative assistance", hi: "प्रशासनिक सहायता चाहने वाले संगठन" },
    ],
    faqs: [
      {
        q: { en: "Can support be limited to specific tasks?", hi: "क्या सहायता कुछ चुने हुए कामों तक सीमित हो सकती है?" },
        a: {
          en: "Yes. We can discuss the tasks, handoffs and reporting needs and agree on a focused scope.",
          hi: "हाँ। काम, हस्तांतरण और रिपोर्टिंग की ज़रूरतों पर चर्चा करके सीमित दायरा तय किया जा सकता है।",
        },
      },
    ],
  },
  // TODO(owner): confirm, rewrite and set published: true for the non-tech services you offer.
  ...(
    [
      ["back-office-support", "briefcase", "Back-Office Support", "बैक-ऑफ़िस सपोर्ट", "/images/data_entry.webp"],
      ["document-digitization", "scan", "Document Digitization", "दस्तावेज़ डिजिटाइज़ेशन", "/images/data_entry.webp"],
      ["typing-form-filling", "keyboard", "Typing & Form Filling", "टाइपिंग और फ़ॉर्म भरना", "/images/Computer-Screen.webp"],
      ["social-media-management", "megaphone", "Social Media Management", "सोशल मीडिया मैनेजमेंट", "/images/Business.webp"],
      ["graphic-design-printing", "palette", "Graphic Design & Printing", "ग्राफ़िक डिज़ाइन और प्रिंटिंग", "/images/Computer-Screen.webp"],
    ] as const
  ).map(([slug, icon, en, hi, imageSrc]): Service => ({
    slug,
    kind: "non-tech",
    published: false,
    icon,
    image: { src: imageSrc, alt: { en, hi } },
    title: { en, hi },
    short: "TODO(owner): one-line description",
    description: "TODO(owner): full description",
    features: [],
    deliverables: [],
    idealFor: [],
    faqs: [],
  })),
];

export const publishedServices = services.filter((s) => s.published);
export const techServices = publishedServices.filter((s) => s.kind === "tech");
export const nonTechServices = publishedServices.filter((s) => s.kind === "non-tech");

export function getService(slug: string) {
  return publishedServices.find((s) => s.slug === slug);
}

/** "How We Work" process strip. */
export const processSteps: { icon: IconName; title: Localized; body: Localized }[] = [
  {
    icon: "messages",
    title: { en: "Discuss", hi: "चर्चा" },
    body: { en: "We understand your goals, audience and budget.", hi: "हम आपके लक्ष्य, ग्राहक और बजट समझते हैं।" },
  },
  {
    icon: "pen-tool",
    title: { en: "Design", hi: "डिज़ाइन" },
    body: { en: "A clean, on-brand design you approve first.", hi: "पहले आपकी मंज़ूरी वाला साफ़, ब्रांड के अनुरूप डिज़ाइन।" },
  },
  {
    icon: "code",
    title: { en: "Develop", hi: "डेवलप" },
    body: { en: "Fast, secure, mobile-first build with modern tech.", hi: "आधुनिक तकनीक से तेज़, सुरक्षित, मोबाइल-फ़र्स्ट निर्माण।" },
  },
  {
    icon: "shield-check",
    title: { en: "Testing", hi: "टेस्टिंग" },
    body: { en: "We check every detail across devices before launch.", hi: "लॉन्च से पहले हर डिवाइस पर सभी सुविधाओं की जाँच।" },
  },
  {
    icon: "rocket",
    title: { en: "Deploy", hi: "लॉन्च" },
    body: { en: "Go live on your domain, indexed on Google.", hi: "आपके डोमेन पर लाइव, Google पर इंडेक्स।" },
  },
  {
    icon: "life-buoy",
    title: { en: "Support", hi: "सपोर्ट" },
    body: { en: "Updates, fixes and help whenever you need it.", hi: "जब भी ज़रूरत हो, अपडेट, सुधार और मदद।" },
  },
];
