import type { Localized } from "@/i18n/config";

export type Faq = { q: Localized; a: Localized; needsReview?: boolean };

export const faqs: Faq[] = [
  {
    q: { en: "What types of websites do you develop?", hi: "आप किस तरह की वेबसाइट बनाते हैं?" },
    a: {
      en: "We specialize in developing business websites, e-commerce platforms, educational websites, and custom digital solutions. Every project is tailored to your goals, from design to deployment.",
      hi: "हम बिज़नेस वेबसाइट, ई-कॉमर्स प्लेटफ़ॉर्म, एजुकेशनल वेबसाइट और कस्टम डिजिटल सॉल्यूशन बनाते हैं। डिज़ाइन से लॉन्च तक हर प्रोजेक्ट आपके लक्ष्य के अनुसार बनता है।",
    },
  },
  {
    q: { en: "How long does it take to build a website?", hi: "वेबसाइट बनने में कितना समय लगता है?" },
    a: {
      en: "The timeline depends on the complexity and features required. Typically, a basic website takes 2–4 weeks, while more complex projects may take 6–8 weeks or longer.",
      hi: "समय ज़रूरी फ़ीचर और जटिलता पर निर्भर है। आमतौर पर बेसिक वेबसाइट 2–4 हफ़्ते में और बड़े प्रोजेक्ट 6–8 हफ़्ते या ज़्यादा में बनते हैं।",
    },
  },
  {
    q: { en: "Do you provide website maintenance and support?", hi: "क्या आप वेबसाइट मेंटेनेंस और सपोर्ट देते हैं?" },
    a: {
      en: "Yes, we offer ongoing maintenance and support to keep your website up to date, secure, and running smoothly after launch.",
      hi: "हाँ, लॉन्च के बाद आपकी वेबसाइट को अपडेटेड, सुरक्षित और सुचारु रखने के लिए हम लगातार मेंटेनेंस और सपोर्ट देते हैं।",
    },
  },
  {
    q: { en: "How do I get started with my project?", hi: "मैं अपना प्रोजेक्ट कैसे शुरू करूँ?" },
    a: {
      en: "Contact us by email or start a WhatsApp chat. We'll discuss your requirements and guide you through the next steps.",
      hi: "ईमेल करें या WhatsApp पर चैट शुरू करें। हम आपकी ज़रूरतें समझकर अगले कदमों में मार्गदर्शन करेंगे।",
    },
  },
  // TODO(owner): review the four answers below before launch (pricing / terms are business decisions).
  {
    needsReview: true,
    q: { en: "How much does a website cost?", hi: "वेबसाइट बनवाने में कितना ख़र्च आता है?" },
    a: {
      en: "Pricing depends on the number of pages and features. We keep packages affordable for small businesses, schools and shops. Share your requirements and we'll send a clear, fixed quote with no hidden charges.",
      hi: "कीमत पेज और फ़ीचर की संख्या पर निर्भर है। हमारे पैकेज छोटे व्यवसायों, स्कूलों और दुकानों के बजट में रहते हैं। अपनी ज़रूरत बताइए, हम बिना छिपे शुल्क के साफ़ कोटेशन भेजेंगे।",
    },
  },
  {
    needsReview: true,
    q: { en: "Do you offer non-tech services too?", hi: "क्या आप नॉन-टेक सेवाएँ भी देते हैं?" },
    a: {
      en: "Yes. HASVIK is registered for both tech and non-tech work. Alongside websites and Google listings, we provide services such as data entry and processing. Ask us about your requirement.",
      hi: "हाँ। HASVIK टेक और नॉन-टेक दोनों कामों के लिए पंजीकृत है। वेबसाइट और Google लिस्टिंग के साथ हम डेटा एंट्री और प्रोसेसिंग जैसी सेवाएँ भी देते हैं।",
    },
  },
  {
    needsReview: true,
    q: { en: "Do you help with domain and hosting?", hi: "क्या आप डोमेन और होस्टिंग में मदद करते हैं?" },
    a: {
      en: "Yes. We help you choose and register a domain in your business's name and set up fast, secure hosting. You stay the owner of your domain.",
      hi: "हाँ। हम आपके व्यवसाय के नाम पर डोमेन चुनने, रजिस्टर करने और तेज़, सुरक्षित होस्टिंग सेट करने में मदद करते हैं। डोमेन के मालिक आप ही रहते हैं।",
    },
  },
  {
    needsReview: true,
    q: { en: "What are your payment terms?", hi: "भुगतान की शर्तें क्या हैं?" },
    a: {
      en: "Typically an advance to start the project and the balance before go-live. We accept UPI and bank transfer, and every payment is receipted.",
      hi: "आमतौर पर प्रोजेक्ट शुरू करने के लिए अग्रिम राशि और लाइव होने से पहले बाक़ी भुगतान। हम UPI और बैंक ट्रांसफ़र लेते हैं और हर भुगतान की रसीद देते हैं।",
    },
  },
];
