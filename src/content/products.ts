import type { Localized } from "@/i18n/config";

type ProductFaq = { q: Localized; a: Localized };

export const leadsCrm = {
  slug: "leads-crm",
  name: "HASVIK LEADS CRM",
  title: {
    en: "Lead management software for business teams",
    hi: "व्यवसायों के लिए लीड मैनेजमेंट सॉफ़्टवेयर",
  } satisfies Localized,
  description: {
    en: "HASVIK LEADS CRM helps teams organize business and individual leads, manage a visual sales pipeline, and keep follow-ups on track with list and calendar views.",
    hi: "HASVIK LEADS CRM व्यवसाय और व्यक्तिगत लीड व्यवस्थित करने, विज़ुअल सेल्स पाइपलाइन संभालने और सूची व कैलेंडर में फ़ॉलो-अप ट्रैक करने में टीमों की मदद करता है।",
  } satisfies Localized,
  intro: {
    en: "HASVIK LEADS CRM is a web-based lead management product for keeping lead records, pipeline stages, and follow-up activity together. See the overview, explore the product, or request a guided demo.",
    hi: "HASVIK LEADS CRM एक वेब-आधारित लीड मैनेजमेंट प्रोडक्ट है, जहाँ लीड रिकॉर्ड, पाइपलाइन के चरण और फ़ॉलो-अप गतिविधियाँ एक साथ व्यवस्थित रहती हैं। इसकी जानकारी देखें, प्रोडक्ट एक्सप्लोर करें या डेमो माँगें।",
  } satisfies Localized,
  imageAlt: {
    en: "HASVIK LEADS CRM dashboard with lead activity and upcoming follow-ups",
    hi: "लीड गतिविधि और आने वाले फ़ॉलो-अप दिखाता HASVIK LEADS CRM डैशबोर्ड",
  } satisfies Localized,
  features: [
    {
      title: { en: "Lead dashboard", hi: "लीड डैशबोर्ड" },
      description: {
        en: "Get a quick overview of lead activity, team metrics, and upcoming follow-ups.",
        hi: "लीड गतिविधि, टीम के आँकड़ों और आने वाले फ़ॉलो-अप का एक नज़र में सार देखें।",
      },
    },
    {
      title: { en: "Searchable lead directory", hi: "खोजने योग्य लीड डायरेक्टरी" },
      description: {
        en: "Browse and manage business and individual lead records in a searchable table.",
        hi: "खोजने योग्य टेबल में व्यवसाय और व्यक्तिगत लीड रिकॉर्ड देखें और व्यवस्थित करें।",
      },
    },
    {
      title: { en: "Visual lead pipeline", hi: "विज़ुअल लीड पाइपलाइन" },
      description: {
        en: "Track leads as they move through stages on a Kanban board.",
        hi: "Kanban बोर्ड पर चरणों के बीच आगे बढ़ती लीड को ट्रैक करें।",
      },
    },
    {
      title: { en: "Follow-up list and calendar", hi: "फ़ॉलो-अप सूची और कैलेंडर" },
      description: {
        en: "Keep calls, meetings, and next steps organized in list and monthly calendar views.",
        hi: "कॉल, मीटिंग और अगले कदम सूची व मासिक कैलेंडर में व्यवस्थित रखें।",
      },
    },
    {
      title: { en: "Lead follow-up history", hi: "लीड फ़ॉलो-अप इतिहास" },
      description: {
        en: "Review a lead record alongside its follow-up timeline.",
        hi: "लीड रिकॉर्ड के साथ उसके फ़ॉलो-अप का क्रम देखें।",
      },
    },
  ],
  faqs: [
    {
      q: { en: "What is HASVIK LEADS CRM?", hi: "HASVIK LEADS CRM क्या है?" },
      a: {
        en: "HASVIK LEADS CRM is a web-based product for organizing business and individual lead records, tracking pipeline stages, and managing follow-ups.",
        hi: "HASVIK LEADS CRM व्यवसाय और व्यक्तिगत लीड रिकॉर्ड व्यवस्थित करने, पाइपलाइन के चरण ट्रैक करने और फ़ॉलो-अप संभालने वाला वेब-आधारित प्रोडक्ट है।",
      },
    },
    {
      q: { en: "What can I manage with HASVIK LEADS CRM?", hi: "HASVIK LEADS CRM में क्या मैनेज कर सकते हैं?" },
      a: {
        en: "The product includes a lead dashboard, searchable lead directory, Kanban pipeline, follow-up list and calendar views, and lead follow-up history.",
        hi: "प्रोडक्ट में लीड डैशबोर्ड, खोजने योग्य लीड डायरेक्टरी, Kanban पाइपलाइन, फ़ॉलो-अप सूची व कैलेंडर और लीड फ़ॉलो-अप इतिहास शामिल हैं।",
      },
    },
    {
      q: { en: "How can I explore the product or request a demo?", hi: "प्रोडक्ट कैसे देखें या डेमो कैसे माँगें?" },
      a: {
        en: "Open the HASVIK LEADS CRM product site to explore it, or contact HASVIK Technologies to request a guided demo.",
        hi: "प्रोडक्ट देखने के लिए HASVIK LEADS CRM साइट खोलें या डेमो के लिए HASVIK Technologies से संपर्क करें।",
      },
    },
  ] satisfies ProductFaq[],
} as const;

export const leadsCrmUrl = process.env.NEXT_PUBLIC_LEADS_CRM_URL || "https://salescrm.hasviktech.com/explore-crm";
