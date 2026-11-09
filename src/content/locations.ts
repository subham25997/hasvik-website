// Local SEO landing pages: /locations/[city]. Each city has its own copy
// (no duplicated text across pages). TODO(owner): add client names/projects per city as they happen.
import type { Localized } from "@/i18n/config";

export type City = {
  slug: string;
  name: Localized;
  district: string;
  intro: Localized;
  focus: Localized[]; // business types we commonly help in this area
  angle: Localized; // what makes our offer relevant here
  nearby: string[]; // slugs
};

export const cities: City[] = [
  {
    slug: "ballia",
    name: { en: "Ballia", hi: "बलिया" },
    district: "Ballia",
    intro: {
      en: "Ballia is our home district. From the shops around Chowk to schools across every block, we help Ballia businesses look professional online and get found on Google.",
      hi: "बलिया हमारा गृह ज़िला है। चौक की दुकानों से लेकर हर ब्लॉक के स्कूलों तक, हम बलिया के व्यवसायों को ऑनलाइन प्रोफ़ेशनल दिखने और Google पर मिलने में मदद करते हैं।",
    },
    focus: [
      { en: "Schools and coaching centres", hi: "स्कूल और कोचिंग सेंटर" },
      { en: "Retail shops and showrooms", hi: "रिटेल दुकानें और शोरूम" },
      { en: "Doctors, clinics and pharmacies", hi: "डॉक्टर, क्लिनिक और फ़ार्मेसी" },
    ],
    angle: {
      en: "Being local means we can meet you in person, understand your customers and deliver a website in Hindi or English that Ballia trusts.",
      hi: "लोकल होने से हम आपसे मिल सकते हैं, आपके ग्राहकों को समझते हैं और हिंदी या अंग्रेज़ी में ऐसी वेबसाइट देते हैं जिस पर बलिया भरोसा करे।",
    },
    nearby: ["maniar", "bansdih", "sahatwar", "sikanderpur"],
  },
  {
    slug: "maniar",
    name: { en: "Maniar", hi: "मनियर" },
    district: "Ballia",
    intro: {
      en: "Our office is in Ward No 6, Uttar Tola, Maniar. Local schools like RM Suncity Public School already run on websites we built, and we'd love to help your business next.",
      hi: "हमारा ऑफ़िस वार्ड नंबर 6, उत्तर टोला, मनियर में है। RM सनसिटी पब्लिक स्कूल जैसे स्थानीय स्कूल हमारी बनाई वेबसाइट पर चलते हैं। अगला आपका व्यवसाय हो सकता है।",
    },
    focus: [
      { en: "Schools and educational institutes", hi: "स्कूल और शैक्षणिक संस्थान" },
      { en: "Market shops and traders", hi: "बाज़ार की दुकानें और व्यापारी" },
      { en: "Event, tent and catering services", hi: "इवेंट, टेंट और कैटरिंग सेवाएँ" },
    ],
    angle: {
      en: "Walk into our office, see live examples, and talk face to face. Website banane wala right in your town.",
      hi: "हमारे ऑफ़िस आइए, लाइव उदाहरण देखिए और आमने-सामने बात कीजिए। आपके अपने कस्बे में वेबसाइट बनाने वाले।",
    },
    nearby: ["ballia", "sikanderpur", "bansdih", "belthara-road"],
  },
  {
    slug: "bansdih",
    name: { en: "Bansdih", hi: "बाँसडीह" },
    district: "Ballia",
    intro: {
      en: "We built Ashok Tent House in Adar, Bansdih, a professional website delivered within a week and listed on Google Maps. Bansdih businesses can grow the same way.",
      hi: "हमने अदर, बाँसडीह के अशोक टेंट हाउस की वेबसाइट एक हफ़्ते में बनाई और Google मैप्स पर लिस्ट की। बाँसडीह के व्यवसाय भी इसी तरह बढ़ सकते हैं।",
    },
    focus: [
      { en: "Tent houses and wedding services", hi: "टेंट हाउस और शादी सेवाएँ" },
      { en: "Local retailers", hi: "लोकल रिटेलर" },
      { en: "Private schools", hi: "निजी स्कूल" },
    ],
    angle: {
      en: "Fast delivery and Google Maps setup so customers searching nearby actually find and call you.",
      hi: "तेज़ डिलीवरी और Google मैप्स सेटअप ताकि आस-पास खोजने वाले ग्राहक आपको ढूँढ़ें और कॉल करें।",
    },
    nearby: ["ballia", "maniar", "sahatwar"],
  },
  {
    slug: "sahatwar",
    name: { en: "Sahatwar", hi: "सहतवार" },
    district: "Ballia",
    intro: {
      en: "For Sahatwar's shops, clinics and institutes, a simple website plus a verified Google Business Profile is the quickest way to win customers who search before they visit.",
      hi: "सहतवार की दुकानों, क्लिनिक और संस्थानों के लिए आसान वेबसाइट और वेरिफ़ाइड Google बिज़नेस प्रोफ़ाइल उन ग्राहकों तक पहुँचने का सबसे तेज़ तरीका है जो आने से पहले सर्च करते हैं।",
    },
    focus: [
      { en: "Clinics and diagnostic centres", hi: "क्लिनिक और जाँच केंद्र" },
      { en: "General and hardware stores", hi: "जनरल और हार्डवेयर स्टोर" },
      { en: "Tuition and coaching", hi: "ट्यूशन और कोचिंग" },
    ],
    angle: {
      en: "Affordable starter packages built for small-town budgets, without cutting corners on quality.",
      hi: "छोटे शहरों के बजट के लिए किफ़ायती स्टार्टर पैकेज, गुणवत्ता से कोई समझौता नहीं।",
    },
    nearby: ["bansdih", "ballia", "maniar"],
  },
  {
    slug: "ghazipur",
    name: { en: "Ghazipur", hi: "ग़ाज़ीपुर" },
    district: "Ghazipur",
    intro: {
      en: "Ghazipur's traders, agri-businesses and schools are increasingly searched online. We build fast websites and Google listings that turn those searches into calls.",
      hi: "ग़ाज़ीपुर के व्यापारी, कृषि व्यवसाय और स्कूल अब ऑनलाइन खोजे जाते हैं। हम तेज़ वेबसाइट और Google लिस्टिंग बनाते हैं जो इन खोजों को कॉल में बदलती हैं।",
    },
    focus: [
      { en: "Agri-input and farm-equipment dealers", hi: "कृषि इनपुट और कृषि उपकरण डीलर" },
      { en: "Schools and colleges", hi: "स्कूल और कॉलेज" },
      { en: "Wholesale traders", hi: "थोक व्यापारी" },
    ],
    angle: {
      en: "Product catalogues and WhatsApp ordering make it easy for dealers to take enquiries from surrounding villages.",
      hi: "प्रोडक्ट कैटलॉग और WhatsApp ऑर्डरिंग से डीलर आस-पास के गाँवों से आसानी से पूछताछ ले सकते हैं।",
    },
    nearby: ["varanasi", "mau", "ballia"],
  },
  {
    slug: "varanasi",
    name: { en: "Varanasi", hi: "वाराणसी" },
    district: "Varanasi",
    intro: {
      en: "In a city that welcomes visitors from all over the world, Varanasi businesses need websites that impress at first glance and work perfectly on every phone.",
      hi: "दुनिया भर के आगंतुकों वाले शहर में, वाराणसी के व्यवसायों को ऐसी वेबसाइट चाहिए जो पहली नज़र में प्रभावित करे और हर फ़ोन पर बेहतरीन चले।",
    },
    focus: [
      { en: "Guest houses, hotels and travel", hi: "गेस्ट हाउस, होटल और ट्रैवल" },
      { en: "Banarasi saree and handicraft sellers", hi: "बनारसी साड़ी और हस्तशिल्प विक्रेता" },
      { en: "Coaching institutes", hi: "कोचिंग संस्थान" },
    ],
    angle: {
      en: "E-commerce stores and bilingual sites help Varanasi sellers reach buyers beyond the city.",
      hi: "ई-कॉमर्स स्टोर और द्विभाषी वेबसाइट वाराणसी के विक्रेताओं को शहर के बाहर के ख़रीदारों तक पहुँचाती हैं।",
    },
    nearby: ["ghazipur", "prayagraj", "mau"],
  },
  {
    slug: "prayagraj",
    name: { en: "Prayagraj", hi: "प्रयागराज" },
    district: "Prayagraj",
    intro: {
      en: "Prayagraj is home to thousands of students and coaching centres. We build educational websites that make courses, results and admissions easy to find.",
      hi: "प्रयागराज हज़ारों छात्रों और कोचिंग सेंटरों का घर है। हम ऐसी एजुकेशनल वेबसाइट बनाते हैं जिनमें कोर्स, रिज़ल्ट और एडमिशन आसानी से मिलें।",
    },
    focus: [
      { en: "Competitive-exam coaching", hi: "प्रतियोगी परीक्षा कोचिंग" },
      { en: "Libraries and hostels", hi: "लाइब्रेरी और हॉस्टल" },
      { en: "Professional services", hi: "प्रोफ़ेशनल सेवाएँ" },
    ],
    angle: {
      en: "Course pages, notice boards and enquiry forms designed for students who search on mobile.",
      hi: "मोबाइल पर सर्च करने वाले छात्रों के लिए कोर्स पेज, नोटिस बोर्ड और पूछताछ फ़ॉर्म।",
    },
    nearby: ["varanasi", "ghazipur"],
  },
  {
    slug: "gorakhpur",
    name: { en: "Gorakhpur", hi: "गोरखपुर" },
    district: "Gorakhpur",
    intro: {
      en: "Gorakhpur's growing market of hospitals, shops and institutes is competitive online. A modern website and optimised Google profile help you stand out.",
      hi: "गोरखपुर में अस्पतालों, दुकानों और संस्थानों का बढ़ता बाज़ार ऑनलाइन प्रतिस्पर्धी है। आधुनिक वेबसाइट और ऑप्टिमाइज़्ड Google प्रोफ़ाइल आपको अलग दिखाती है।",
    },
    focus: [
      { en: "Hospitals and clinics", hi: "अस्पताल और क्लिनिक" },
      { en: "Showrooms and retail chains", hi: "शोरूम और रिटेल चेन" },
      { en: "Schools and institutes", hi: "स्कूल और संस्थान" },
    ],
    angle: {
      en: "SEO-ready builds and review strategies to compete in a busier local search market.",
      hi: "व्यस्त लोकल सर्च में मुक़ाबले के लिए SEO-तैयार वेबसाइट और रिव्यू रणनीति।",
    },
    nearby: ["deoria", "mau"],
  },
  {
    slug: "deoria",
    name: { en: "Deoria", hi: "देवरिया" },
    district: "Deoria",
    intro: {
      en: "Deoria businesses, from sweet shops to schools, can now get a professional website without travelling to a big city agency.",
      hi: "देवरिया के व्यवसाय, मिठाई की दुकान से लेकर स्कूल तक, अब बड़े शहर की एजेंसी गए बिना प्रोफ़ेशनल वेबसाइट पा सकते हैं।",
    },
    focus: [
      { en: "Sweet shops and restaurants", hi: "मिठाई की दुकानें और रेस्टोरेंट" },
      { en: "Schools", hi: "स्कूल" },
      { en: "Local service providers", hi: "लोकल सर्विस प्रोवाइडर" },
    ],
    angle: {
      en: "Remote-friendly process over WhatsApp and calls, with the same quality as an in-person project.",
      hi: "WhatsApp और कॉल पर आसान प्रक्रिया, आमने-सामने जैसी ही गुणवत्ता के साथ।",
    },
    nearby: ["gorakhpur", "belthara-road", "mau"],
  },
  {
    slug: "sikanderpur",
    name: { en: "Sikanderpur", hi: "सिकंदरपुर" },
    district: "Ballia",
    intro: {
      en: "Just next to Maniar, Sikanderpur shops and schools can work with us in person, from the first discussion to the day the website goes live.",
      hi: "मनियर के पास ही, सिकंदरपुर की दुकानें और स्कूल पहली बातचीत से वेबसाइट लाइव होने तक हमारे साथ आमने-सामने काम कर सकते हैं।",
    },
    focus: [
      { en: "Retail and kirana stores", hi: "रिटेल और किराना स्टोर" },
      { en: "Schools", hi: "स्कूल" },
      { en: "Mobile and electronics shops", hi: "मोबाइल और इलेक्ट्रॉनिक्स दुकानें" },
    ],
    angle: {
      en: "Google Maps listing first, then a website: the fastest route to more walk-in customers.",
      hi: "पहले Google मैप्स लिस्टिंग, फिर वेबसाइट: ज़्यादा ग्राहकों तक पहुँचने का सबसे तेज़ रास्ता।",
    },
    nearby: ["maniar", "ballia", "belthara-road"],
  },
  {
    slug: "belthara",
    name: { en: "Belthara", hi: "बेल्थरा" },
    district: "Ballia",
    intro: {
      en: "Businesses in and around Belthara can reach customers across the region with a clear, mobile-friendly website and an accurate Google listing.",
      hi: "बेल्थरा और आस-पास के व्यवसाय साफ़, मोबाइल-फ़्रेंडली वेबसाइट और सही Google लिस्टिंग से पूरे क्षेत्र के ग्राहकों तक पहुँच सकते हैं।",
    },
    focus: [
      { en: "Agricultural traders", hi: "कृषि व्यापारी" },
      { en: "Local schools", hi: "स्थानीय स्कूल" },
      { en: "Workshops and repair services", hi: "वर्कशॉप और रिपेयर सेवाएँ" },
    ],
    angle: {
      en: "Simple one-page websites that are sasta, fast and easy to share on WhatsApp.",
      hi: "आसान वन-पेज वेबसाइट जो सस्ती, तेज़ और WhatsApp पर शेयर करने में आसान हो।",
    },
    nearby: ["belthara-road", "sikanderpur", "maniar"],
  },
  {
    slug: "belthara-road",
    name: { en: "Belthara Road", hi: "बेल्थरा रोड" },
    district: "Ballia",
    intro: {
      en: "Belthara Road's busy market deserves to be online. We help shops, hotels and institutes near the station show up when people search nearby.",
      hi: "बेल्थरा रोड का व्यस्त बाज़ार ऑनलाइन होना चाहिए। हम स्टेशन के पास की दुकानों, होटलों और संस्थानों को नज़दीकी सर्च में दिखने में मदद करते हैं।",
    },
    focus: [
      { en: "Hotels and lodges", hi: "होटल और लॉज" },
      { en: "Market shops", hi: "बाज़ार की दुकानें" },
      { en: "Coaching centres", hi: "कोचिंग सेंटर" },
    ],
    angle: {
      en: "Click-to-call and WhatsApp buttons so travellers and locals can reach you instantly.",
      hi: "क्लिक-टू-कॉल और WhatsApp बटन ताकि यात्री और स्थानीय लोग तुरंत संपर्क कर सकें।",
    },
    nearby: ["belthara", "mau", "sikanderpur"],
  },
  {
    slug: "mau",
    name: { en: "Mau", hi: "मऊ" },
    district: "Mau",
    intro: {
      en: "Mau is known for its weaving and textile trade. We help textile units, traders and schools showcase their work and take enquiries online.",
      hi: "मऊ अपनी बुनाई और कपड़ा व्यापार के लिए जाना जाता है। हम कपड़ा इकाइयों, व्यापारियों और स्कूलों को उनका काम ऑनलाइन दिखाने और पूछताछ लेने में मदद करते हैं।",
    },
    focus: [
      { en: "Textile and saree businesses", hi: "कपड़ा और साड़ी व्यवसाय" },
      { en: "Wholesale traders", hi: "थोक व्यापारी" },
      { en: "Schools and colleges", hi: "स्कूल और कॉलेज" },
    ],
    angle: {
      en: "Catalogue websites and online stores that let buyers browse designs and order on WhatsApp.",
      hi: "कैटलॉग वेबसाइट और ऑनलाइन स्टोर जिनमें ख़रीदार डिज़ाइन देखकर WhatsApp पर ऑर्डर कर सकें।",
    },
    nearby: ["ghazipur", "belthara-road", "deoria"],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
