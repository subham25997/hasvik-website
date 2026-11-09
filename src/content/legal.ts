// TODO(owner): have these terms and privacy disclosures reviewed by a legal professional before publication.
import type { Localized } from "@/i18n/config";

export type LegalDoc = { updatedISO: string; sections: { heading: Localized; body: Localized }[] };

export const privacy: LegalDoc = {
  updatedISO: "2026-11-09",
  sections: [
    {
      heading: { en: "Who we are", hi: "हम कौन हैं" },
      body: {
        en: "HASVIK Technologies (Ward No 6, Uttar Tola, Maniar, Ballia, Uttar Pradesh 277207) operates hasviktech.com. For any privacy question, write to info@hasviktech.com.",
        hi: "HASVIK Technologies (वार्ड नंबर 6, उत्तर टोला, मनियर, बलिया, उत्तर प्रदेश 277207) hasviktech.com चलाता है। गोपनीयता से जुड़े किसी भी सवाल के लिए info@hasviktech.com पर लिखें।",
      },
    },
    {
      heading: { en: "What we collect", hi: "हम क्या जानकारी लेते हैं" },
      body: {
        en: "When you submit a quote or demo request, we collect the details you provide, which may include your name, phone number, optional email, whether you are enquiring as an individual or business, service or CRM category, city, budget range and project description or notes. We also process your IP address for abuse prevention; it is included in our internal quote notification email. We do not ask for payment details on this website.",
        hi: "कोटेशन या डेमो अनुरोध भेजने पर, आपके दिए हुए विवरण लिए जाते हैं। इनमें आपका नाम, फ़ोन नंबर, वैकल्पिक ईमेल, व्यक्ति या व्यवसाय के रूप में पूछताछ, सेवा या CRM श्रेणी, शहर, बजट और प्रोजेक्ट का विवरण या नोट्स शामिल हो सकते हैं। दुरुपयोग रोकने के लिए आपका IP पता भी प्रोसेस किया जाता है; यह हमारी आंतरिक कोटेशन सूचना ईमेल में शामिल होता है। इस वेबसाइट पर हम भुगतान की जानकारी नहीं माँगते।",
      },
    },
    {
      heading: { en: "How we use it", hi: "हम इसका उपयोग कैसे करते हैं" },
      body: {
        en: "We use these details to respond to your enquiry, prepare a quote or demo, and provide requested services. Quote and demo requests are sent to our CRM provider to manage follow-up; quote requests may also be sent to our team by email using Resend. These providers process information to provide their services to us. We do not sell your personal information.",
        hi: "इन विवरणों का उपयोग आपकी पूछताछ का जवाब देने, कोटेशन या डेमो तैयार करने और माँगी गई सेवाएँ देने के लिए किया जाता है। आगे संपर्क करने के लिए कोटेशन और डेमो अनुरोध हमारे CRM प्रदाता को भेजे जाते हैं; कोटेशन अनुरोध Resend के माध्यम से ईमेल द्वारा हमारी टीम को भी भेजे जा सकते हैं। ये प्रदाता हमें अपनी सेवाएँ देने के लिए जानकारी प्रोसेस करते हैं। हम आपकी व्यक्तिगत जानकारी नहीं बेचते।",
      },
    },
    {
      heading: { en: "Analytics and third parties", hi: "एनालिटिक्स और तृतीय पक्ष" },
      body: {
        en: "When the site is deployed on Vercel, Vercel Analytics and Speed Insights help us understand site usage and performance. The Google Map on our contact page loads only after you choose to load it. WhatsApp links open WhatsApp, which has its own privacy policy. These third parties may process information under their own privacy terms.",
        hi: "जब साइट Vercel पर तैनात होती है, तब Vercel Analytics और Speed Insights साइट के उपयोग और प्रदर्शन को समझने में हमारी मदद करते हैं। संपर्क पेज का Google Map आपके उसे लोड करने का विकल्प चुनने के बाद ही लोड होता है। WhatsApp लिंक WhatsApp खोलते हैं, जिसकी अपनी गोपनीयता नीति है। ये तृतीय पक्ष अपनी गोपनीयता शर्तों के अनुसार जानकारी प्रोसेस कर सकते हैं।",
      },
    },
    {
      heading: { en: "Retention and your rights", hi: "रखने की अवधि और आपके अधिकार" },
      body: {
        en: "We retain enquiry details for as long as reasonably needed to respond, provide services, maintain business records and meet legal obligations, then delete or anonymise them where practicable. You can ask us to access, correct or delete your information by emailing info@hasviktech.com. We may need to retain some information where the law requires it.",
        hi: "पूछताछ के विवरण उतने समय तक रखे जाते हैं जितने समय तक जवाब देने, सेवाएँ देने, व्यावसायिक रिकॉर्ड रखने और कानूनी दायित्वों को पूरा करने के लिए उचित रूप से ज़रूरी हों; उसके बाद जहाँ संभव हो उन्हें हटाया या पहचान-रहित किया जाता है। आप info@hasviktech.com पर ईमेल करके अपनी जानकारी देखने, सुधारने या हटाने का अनुरोध कर सकते हैं। कानून की आवश्यकता होने पर कुछ जानकारी रखनी पड़ सकती है।",
      },
    },
    {
      heading: { en: "Information handled for client projects", hi: "ग्राहक प्रोजेक्ट के लिए प्रोसेस की गई जानकारी" },
      body: {
        en: "For marketplace or other client work, we may access information in a client's account only when authorized and needed for the agreed tasks. If a project requires access to buyer or other individuals' personal information, the permitted data, purposes, access, safeguards and deletion or return arrangements must be agreed with the client in writing before that access is provided. We use such information only for the agreed client work and do not use it for our own marketing. The client remains responsible for its own notices and obligations to buyers; the marketplace may separately process their information under its own privacy terms.",
        hi: "मार्केटप्लेस या अन्य ग्राहक प्रोजेक्ट के लिए, हम ग्राहक के अकाउंट की जानकारी तक केवल तभी पहुँचते हैं जब इसकी अनुमति हो और तय काम के लिए ज़रूरी हो। यदि किसी प्रोजेक्ट में खरीदारों या अन्य व्यक्तियों की व्यक्तिगत जानकारी तक पहुँच आवश्यक हो, तो उस डेटा, उसके उपयोग के उद्देश्यों, पहुँच, सुरक्षा उपायों और जानकारी हटाने या लौटाने की व्यवस्था पर पहुँच देने से पहले ग्राहक के साथ लिखित सहमति होनी चाहिए। ऐसी जानकारी का उपयोग केवल तय ग्राहक कार्य के लिए किया जाएगा, अपने मार्केटिंग के लिए नहीं। खरीदारों को अपनी सूचनाएँ देने और उनके प्रति अपने दायित्वों का पालन करने की ज़िम्मेदारी ग्राहक की रहती है; मार्केटप्लेस भी अपनी गोपनीयता शर्तों के अनुसार उनकी जानकारी प्रोसेस कर सकता है।",
      },
    },
    {
      heading: { en: "Security concerns", hi: "सुरक्षा संबंधी चिंताएँ" },
      body: {
        en: "To report a suspected security issue affecting this website, email info@hasviktech.com with details that help us investigate. Please avoid accessing, changing or deleting data that is not yours.",
        hi: "इस वेबसाइट को प्रभावित करने वाली किसी संदिग्ध सुरक्षा समस्या की सूचना देने के लिए, जाँच में मदद करने वाले विवरण info@hasviktech.com पर ईमेल करें। कृपया किसी ऐसे डेटा को न देखें, न बदलें और न हटाएँ जो आपका नहीं है।",
      },
    },
  ],
};

export const terms: LegalDoc = {
  updatedISO: "2026-11-09",
  sections: [
    {
      heading: { en: "Services", hi: "सेवाएँ" },
      body: {
        en: "HASVIK Technologies provides website development, Google listing, maintenance, data entry and related services. The exact scope, timeline and price of each project are agreed in writing (email or WhatsApp) before work starts.",
        hi: "HASVIK Technologies वेबसाइट डेवलपमेंट, Google लिस्टिंग, मेंटेनेंस, डेटा एंट्री और संबंधित सेवाएँ देता है। हर प्रोजेक्ट का दायरा, समय और क़ीमत काम शुरू होने से पहले लिखित (ईमेल या WhatsApp) में तय होती है।",
      },
    },
    {
      heading: { en: "Payments", hi: "भुगतान" },
      body: {
        en: "Payment amounts, milestones, due dates and any applicable taxes are set out in the written project agreement or invoice. Do not rely on a payment schedule unless it has been confirmed in writing.",
        hi: "भुगतान की राशि, चरण, देय तारीखें और लागू कर लिखित प्रोजेक्ट समझौते या इनवॉइस में दिए जाते हैं। लिखित पुष्टि के बिना किसी भुगतान कार्यक्रम को तय न मानें।",
      },
    },
    {
      heading: { en: "Ownership", hi: "स्वामित्व" },
      body: {
        en: "Ownership and handover of project deliverables are as stated in the written project agreement. Unless that agreement says otherwise, client-provided materials remain the client's responsibility, and third-party tools or assets remain subject to their own licence terms. We may show completed work in our portfolio unless you ask us not to.",
        hi: "प्रोजेक्ट के डिलिवरेबल्स का स्वामित्व और हस्तांतरण लिखित प्रोजेक्ट समझौते के अनुसार होगा। जब तक उस समझौते में कुछ और न कहा गया हो, ग्राहक द्वारा दी गई सामग्री की ज़िम्मेदारी ग्राहक की रहेगी और तृतीय-पक्ष टूल या सामग्री उनके अपने लाइसेंस नियमों के अधीन होंगे। आप मना न करें तो हम पूरा हुआ काम अपने पोर्टफ़ोलियो में दिखा सकते हैं।",
      },
    },
    {
      heading: { en: "Marketplace and account work", hi: "मार्केटप्लेस और अकाउंट का काम" },
      body: {
        en: "For marketplace services, the client must provide accurate product details and ensure it has the rights and permissions needed for supplied text, images, trademarks and product claims. The client must review and approve listing content before publication and remains responsible for its seller account, products and compliance with marketplace rules and applicable law. HASVIK Technologies will access accounts only with the account owner's authorization and only for the agreed tasks. Clients should use supported delegated or user access where available and must not send passwords by email or WhatsApp. If agreed work requires access to buyer or other individuals' personal information, the parties must agree in writing beforehand on permitted use, access, safeguards, retention and deletion or return. Marketplace approval, search ranking, sales, account status and uninterrupted platform availability are controlled by third parties and are not guaranteed by HASVIK Technologies. Marketplace names are used only to describe independent support; no affiliation or endorsement is implied.",
        hi: "मार्केटप्लेस सेवाओं के लिए, ग्राहक को सही प्रोडक्ट विवरण देना और यह सुनिश्चित करना होगा कि दिए गए टेक्स्ट, तस्वीरों, ट्रेडमार्क और प्रोडक्ट दावों के लिए उसके पास आवश्यक अधिकार और अनुमतियाँ हैं। प्रकाशित करने से पहले लिस्टिंग कंटेंट की समीक्षा और मंज़ूरी ग्राहक को देनी होगी; अपने सेलर अकाउंट, प्रोडक्ट और मार्केटप्लेस नियमों तथा लागू कानून के अनुपालन की ज़िम्मेदारी ग्राहक की रहेगी। HASVIK Technologies अकाउंट तक केवल अकाउंट मालिक की अनुमति से और तय कामों के लिए ही पहुँचेगा। जहाँ उपलब्ध हो, ग्राहक समर्थित डेलीगेटेड या यूज़र एक्सेस का उपयोग करें और पासवर्ड ईमेल या WhatsApp से न भेजें। यदि तय काम में खरीदारों या अन्य व्यक्तियों की व्यक्तिगत जानकारी तक पहुँच आवश्यक हो, तो अनुमत उपयोग, पहुँच, सुरक्षा उपायों, जानकारी रखने की अवधि तथा उसे हटाने या लौटाने पर दोनों पक्षों को पहले लिखित सहमति करनी होगी। मार्केटप्लेस की मंज़ूरी, सर्च रैंकिंग, बिक्री, अकाउंट की स्थिति और प्लेटफ़ॉर्म की निरंतर उपलब्धता तृतीय पक्षों के नियंत्रण में हैं और HASVIK Technologies इनकी गारंटी नहीं देता। मार्केटप्लेस के नाम केवल स्वतंत्र सहायता बताने के लिए हैं; किसी संबद्धता या समर्थन का दावा नहीं है।",
      },
    },
    {
      heading: { en: "Website use", hi: "वेबसाइट का उपयोग" },
      body: {
        en: "Content on hasviktech.com is for general information. Client names, logos and screenshots belong to their respective owners and are shown with permission.",
        hi: "hasviktech.com की सामग्री सामान्य जानकारी के लिए है। ग्राहकों के नाम, लोगो और स्क्रीनशॉट उनके मालिकों के हैं और अनुमति से दिखाए गए हैं।",
      },
    },
    {
      heading: { en: "Project changes and cancellation", hi: "प्रोजेक्ट में बदलाव और रद्द करना" },
      body: {
        en: "Any changes to scope, revisions, timelines, cancellation, refunds, warranties and liability should be set out in the written project agreement or otherwise agreed in writing. That agreement also governs dispute resolution and applicable law. If it conflicts with these general website terms, the project agreement controls for that project.",
        hi: "प्रोजेक्ट के दायरे में बदलाव, संशोधन, समय-सीमा, रद्दीकरण, रिफंड, वारंटी और देयता लिखित प्रोजेक्ट समझौते में या अन्य लिखित सहमति से तय होनी चाहिए। विवाद निपटान और लागू कानून भी उसी समझौते के अनुसार होंगे। इन सामान्य वेबसाइट शर्तों और प्रोजेक्ट समझौते में टकराव होने पर, उस प्रोजेक्ट के लिए प्रोजेक्ट समझौता लागू होगा।",
      },
    },
    {
      heading: { en: "Contact", hi: "संपर्क" },
      body: {
        en: "Questions about these terms: info@hasviktech.com or +91 94542 63965.",
        hi: "इन शर्तों के बारे में सवाल: info@hasviktech.com या +91 94542 63965।",
      },
    },
  ],
};
