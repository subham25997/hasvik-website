const defaultContentData = {
  hero: {
    title: "Building the Future with Technology",
    lead: "Empowering well-trained rural talent to deliver high-quality digital solutions.",
    subtitle: "Innovate. Automate. Grow",
    typedStrings: ["Static Websites", "Dynamic Websites", "Data Entry"],
    buttons: [
      {
        label: "Explore Services",
        href: "#services",
        classes: "btn btn-lg btn-light me-2 mb-2 shadow-sm",
      },
      {
        label: "Contact Us",
        href: "#contact",
        classes: "btn btn-lg btn-outline-light mb-2",
      },
    ],
    carousel: [
      {
        img: "./assets/images/shopping.jpg",
        alt: "E-commerce website development showcase - online shopping platform",
        title: "E-Commerce Websites",
        items: [
          "High Quality Design",
          "Mobile Friendly",
          "Secure & Easy Shopping",
        ],
      },
      {
        img: "./assets/images/education.jpg",
        alt: "Educational website development - learning management system",
        title: "Educational Websites",
        items: [
          "Highly Professional",
          "Mobile Friendly",
          "Easy Course Management",
        ],
      },
      {
        img: "./assets/images/Business.jpg",
        alt: "Professional business website development services",
        title: "Business Websites",
        items: [
          "User-Friendly Interface",
          "Mobile Friendly",
          "Fast & SEO Optimized",
        ],
      },
      {
        img: "./assets/images/data_entry.jpg",
        alt: "Accurate data entry and processing services",
        title: "Data Entry",
        items: [
          "Accurate & High-Quality Work",
          "Fast & Efficient Processing",
          "Secure Data Handling",
        ],
      },
    ],
  },
  about: {
    heading: "About Us",
    paragraphs: [
      "HASVIK Technologies is a team of skilled and well-trained professionals dedicated to delivering high-quality digital solutions for businesses, organizations, and individuals.",
      "Our mission is to combine technical expertise, creativity, and reliability to help our clients build a strong presence in the digital world.",
      "We believe that great talent exists everywhere. One of our core values is empowering well-trained rural professionals by providing them opportunities to work on modern digital technologies and contribute to impactful projects.",
      "By connecting talent with technology, we aim to create solutions that benefit both businesses and communities.",
    ],
    image: {
      src: "./assets/images/office.jpg",
      alt: "HASVIK Technologies professional team working in modern office environment",
    },
    highlights: [
      "High Quality Digital Solutions",
      "Client Focused Approach",
      "Empowering Rural Talent",
      "Affordable Pricing",
    ],
  },
  services: {
    heading: "Our Services",
    subtitle: "Smart, scalable digital services built for business success",
    items: [
      {
        icon: "bi bi-briefcase",
        title: "Business Website Development",
        text: "Online stores that allow businesses to sell their products with secure payment and easy management.",
      },
      {
        icon: "bi bi-cart",
        title: "E-Commerce Website Development",
        text: "Online stores that allow businesses to sell their products with secure payment and easy management.",
      },
      {
        icon: "bi bi-mortarboard",
        title: "Educational Website Development",
        text: "Websites for schools, institutes, and training centers to manage courses and share learning materials.",
      },
      {
        icon: "bi bi-keyboard",
        title: "Data Entry Services",
        text: "Accurate and organized data entry solutions for businesses and organizations.",
      },
      {
        icon: "bi bi-tools",
        title: "Website Maintenance & Support",
        text: "Regular updates, security checks, and technical support to keep websites running smoothly.",
      },
      {
        icon: "bi bi-brush",
        title: "Website Redesign",
        text: "Improving existing websites with modern design, better performance, and mobile responsiveness.",
      },
    ],
  },
  whyUs: {
    heading: "Why Choose Us",
    subtitle:
      "Delivering excellence through quality, innovation, and dedication",
    stats: [
      { target: 15, label: "Projects Completed" },
      { target: 12, label: "Happy Clients" },
      { target: 1, label: "Years Experience" },
    ],
    cards: [
      {
        icon: "bi bi-shield-check",
        title: "Quality Focused",
        text: "Clean, reliable, and scalable digital solutions.",
      },
      {
        icon: "bi bi-person-heart",
        title: "Passionate Team",
        text: "A team driven by learning and continuous improvement.",
      },
      {
        icon: "bi bi-cash-stack",
        title: "Affordable Pricing",
        text: "Smart pricing for startups and growing businesses.",
      },
      {
        icon: "bi bi-lightning",
        title: "Fast Delivery",
        text: "Timely execution without compromising quality.",
      },
    ],
  },
  portfolio: {
    heading: "Our Recent Works",
    subtitle: "Real projects. Real results. See what we’ve built.",
    items: [
      {
        href: "https://ashok-tent-house.vercel.app/",
        img: "./assets/images/ath.png",
        alt: "Ashok Tent House website project - event management and booking platform",
        title: "Ashok Tent House",
        description: "Website for showcasing services and booking",
        delay: 100,
      },
      {
        href: "https://lrengineering-eight.vercel.app/",
        img: "./assets/images/lreng.png",
        alt: "LR Engineering Solutions website - industrial engineering services platform",
        title: "LR Engineering Solutions Website",
        description: "Contact information and whatsapp booking system",
        delay: 0,
      },
      {
        href: "https://rm-suncity-website.vercel.app/",
        img: "./assets/images/rm-suncity.png",
        alt: "RM Suncity Public School website - educational institution platform",
        title: "RM Suncity Public School",
        description:
          "Modern website for the school with student information and updates",
        delay: 200,
      },
    ],
  },
  testimonials: {
    heading: "What Our Clients Say",
    subtitle: "Real feedback from our happy clients",
    items: [
      {
        rating: 5,
        text: "Excellent service and fast delivery. Highly professional team!",
        name: "Yaswant Singh",
        company: "LR Engineering Solutions",
        location: "Noida, Uttar Pradesh",
        delay: 0,
      },
      {
        rating: 4.5,
        text: "Accurate data entry work delivered on time. Great experience.",
        name: "Ankur Kumar Singh",
        company: "Ashok Tent House",
        location: "Adar, Bansdih, Uttar Pradesh",
        delay: 150,
      },
      {
        rating: 5,
        text: "Affordable pricing and excellent communication throughout the project.",
        name: "Rajesh Kr. Soni",
        company: "RM Suncity Public School",
        location: "Maniar, Ballia, Uttar Pradesh",
        delay: 250,
      },
    ],
  },
  contact: {
    header: {
      title: "Get in Touch",
      subtitle:
        "Have a project idea? We'd love to hear from you. Reach us through the options below.",
    },
    cards: [
      {
        icon: "bi bi-envelope-fill",
        title: "Email Us",
        text: "Send us your project requirements and we'll get back to you soon.",
        link: "mailto:hasviktechnologies@gmail.com",
        buttonText: "Email Us",
        buttonClass: "contact-btn email-btn",
      },
      {
        icon: "bi bi-whatsapp",
        title: "Chat on WhatsApp",
        text: "Want a quick response? Message us directly on WhatsApp.",
        link: "https://wa.me/919454263965?text=Hello%20HASVIK,%20I%20am%20interested%20in%20your%20website%20services",
        buttonText: "Start Chat",
        buttonClass: "contact-btn",
      },
    ],
    locationCard: {
      title: "Visit Our Office",
      addressLines: [
        "HASVIK Technologies",
        "Ward No 6, Uttar Tola, Maniar,",
        "Ballia, Uttar Pradesh - 277207",
      ],
      iframeSrc:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3586.38780373091!2d84.1769507!3d25.9881109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39925d000798f3c1%3A0x88a2cfa3d74437f5!2sHasvik%20technologies!5e0!3m2!1sen!2sin!4v1778164854135!5m2!1sen!2sin",
      mapAlt:
        "Google Maps location of HASVIK Technologies office in Maniar, Ballia, Uttar Pradesh",
    },
  },
};

function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === "class") el.className = value;
    else if (key === "dataset")
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        el.dataset[dataKey] = dataValue;
      });
    else if (key.startsWith("data-")) el.setAttribute(key, value);
    else if (key === "html") el.innerHTML = value;
    else el.setAttribute(key, value);
  });
  children.forEach((child) => {
    if (typeof child === "string")
      el.appendChild(document.createTextNode(child));
    else if (child instanceof Node) el.appendChild(child);
  });
  return el;
}

async function loadContentData() {
  try {
    const response = await fetch("./assets/js/content.json");
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn("Unable to load content.json, using fallback content.", error);
  }
  return defaultContentData;
}

function renderHero(hero) {
  const heroContent = document.getElementById("heroContent");
  const heroCarouselContent = document.getElementById("heroCarouselContent");
  if (!heroContent || !heroCarouselContent) return;

  heroContent.innerHTML = "";
  heroContent.appendChild(createElement("h1", {}, [hero.title]));
  heroContent.appendChild(createElement("p", { class: "lead" }, [hero.lead]));
  heroContent.appendChild(createElement("h3", {}, [hero.subtitle]));
  heroContent.appendChild(
    createElement(
      "span",
      { class: "typed", id: "typed-hero", style: "min-height:24px" },
      [],
    ),
  );

  const buttonRow = createElement("div", { class: "mt-4" });
  hero.buttons.forEach((button) => {
    buttonRow.appendChild(
      createElement(
        "a",
        {
          href: button.href,
          class: button.classes,
        },
        [button.label],
      ),
    );
  });
  heroContent.appendChild(buttonRow);

  heroCarouselContent.innerHTML = "";
  const carouselSlides = hero.carousel.map((item, index) =>
    createElement(
      "div",
      {
        class: `carousel-item${index === 0 ? " active" : ""}`,
      },
      [
        createElement("img", {
          src: item.img,
          alt: item.alt,
          class: "d-block w-100",
        }),
        createElement(
          "div",
          { class: "carousel-caption d-flex justify-content-center" },
          [
            createElement("div", { class: "px-3 carousel-caption-text" }, [
              createElement("h6", {}, [item.title]),
              createElement(
                "ul",
                { class: "mb-0" },
                item.items.map((text) => createElement("li", {}, [text])),
              ),
            ]),
          ],
        ),
      ],
    ),
  );

  const carousel = createElement("div", { class: "computer-screen" }, [
    createElement(
      "div",
      {
        class: "carousel slide",
        id: "heroCarousel",
        "data-bs-ride": "carousel",
      },
      [createElement("div", { class: "carousel-inner" }, carouselSlides)],
    ),
  ]);

  heroCarouselContent.appendChild(carousel);

  const sliderEl = document.getElementById("heroCarousel");
  if (
    sliderEl &&
    window.bootstrap &&
    typeof bootstrap.Carousel === "function"
  ) {
    new bootstrap.Carousel(sliderEl, {
      interval: 3500,
      ride: "carousel",
      pause: "hover",
      wrap: true,
    });
  }
}

function renderAbout(about) {
  const container = document.getElementById("aboutContent");
  if (!container) return;
  container.innerHTML = "";

  const row = createElement("div", { class: "row g-4" }, [
    createElement(
      "div",
      { class: "col-lg-6 col-md-12", "data-aos": "fade-up" },
      [
        createElement("h2", { class: "text-center text-lg-start" }, [
          about.heading,
        ]),
        ...about.paragraphs.map((paragraph, index) =>
          createElement(
            "p",
            { class: "text-muted", style: index ? "margin-top: 1rem;" : "" },
            [paragraph],
          ),
        ),
      ],
    ),
    createElement("div", { class: "col-md-6 mb-4 mt-lg-5 text-center office-img position-relative" }, [
      createElement("img", {
        src: about.image.src,
        alt: about.image.alt,
        class: "img-fluid rounded h-100",
        loading: "lazy",
      }),
    ]),
    createElement(
      "div",
      { class: "col-md-6 col-lg-12 text-center mt-4", "data-aos": "fade-up" },
      [
        createElement(
          "ul",
          { class: "list-unstyled row" },
          about.highlights.map((highlight) =>
            createElement("li", { class: "col-lg-6 mb-3" }, [
              createElement("span", {}, [
                createElement("i", { class: "bi bi-check2-square me-2" }),
                highlight,
              ]),
            ]),
          ),
        ),
      ],
    ),
  ]);

  container.appendChild(row);
}

function renderTeam(team) {
  // Team Members
  const teamContainer = document.getElementById("team-members-container");
  document.getElementById("team-title").innerText = team.title;
  document.getElementById("team-subtitle").innerText = team.subtitle;
  team.members.forEach((member) => {
    teamContainer.innerHTML += `
    <div class="col-lg-4 col-md-6">
      <div class="team-card">
        <div class="team-img mx-auto">
          <img src="${member.image}" alt="${member.name}" class="h-100 w-100">
        </div>
        <h4>${member.name}</h4>

        <div class="team-role">
          ${member.role}
        </div>
        
      </div>
    </div>
  `;
  });

  // <div class="team-social">
  //         <a href="${member.linkedin}" target="_blank">
  //           <i class="bi bi-linkedin"></i>
  //         </a>
  //       </div>

  // Mentors
  const mentorContainer = document.getElementById("mentor-container");

  team.mentors.forEach((mentor, index) => {
    const icon =
      index === 0
        ? '<i class="bi bi-code-slash"></i>'
        : '<i class="bi bi-server"></i>';

    mentorContainer.innerHTML += `
        <div class="col-lg-6">
          <div class="mentor-card">
            <div class="mentor-icon">
              ${icon}
            </div>

            <h4>${mentor.title}</h4>
            <p>${mentor.description}</p>
          </div>
        </div>
      `;
  });
}

function renderServices(services) {
  const container = document.getElementById("servicesContent");
  if (!container) return;
  container.innerHTML = "";

  container.appendChild(
    createElement("h2", { class: "text-center", "data-aos": "fade-up" }, [
      services.heading,
    ]),
  );
  container.appendChild(
    createElement("p", { class: "mb-5 text-center services-subtitle" }, [
      services.subtitle,
    ]),
  );

  const row = createElement(
    "div",
    { class: "row g-4" },
    services.items.map((item, index) =>
      createElement(
        "div",
        {
          class: "col-lg-4 col-md-6",
          "data-aos": "fade-up",
          "data-aos-delay": `${120 + index * 60}`,
        },
        [
          createElement("div", { class: "card service-card h-100 p-4" }, [
            createElement("div", { class: "d-flex align-items-start gap-3" }, [
              createElement("div", { class: "service-icon" }, [
                createElement("i", { class: item.icon }),
              ]),
              createElement("div", {}, [
                createElement("h6", {}, [item.title]),
                createElement("p", { class: "text-muted mb-0" }, [item.text]),
              ]),
            ]),
          ]),
        ],
      ),
    ),
  );

  container.appendChild(row);
}

function renderWhyUs(whyUs) {
  const container = document.getElementById("whyUsContent");
  if (!container) return;
  container.innerHTML = "";

  container.appendChild(
    createElement("div", { class: "text-center mb-5" }, [
      createElement("h2", { class: "fw-bold text-white display-5 mb-3" }, [
        whyUs.heading,
      ]),
      createElement(
        "p",
        { class: "text-light opacity-75 mx-auto", style: "max-width: 600px;" },
        [whyUs.subtitle],
      ),
    ]),
  );

  const statsRow = createElement(
    "div",
    { class: "row text-center mb-5" },
    whyUs.stats.map((stat) =>
      createElement("div", { class: "col-md-4" }, [
        createElement("div", { class: "counter", "data-target": stat.target }, [
          "0",
        ]),
        createElement("p", { class: "text-light small" }, [stat.label]),
      ]),
    ),
  );
  container.appendChild(statsRow);

  const cardsRow = createElement(
    "div",
    { class: "row g-4" },
    whyUs.cards.map((card) =>
      createElement("div", { class: "col-xl-3 col-md-6" }, [
        createElement("div", { class: "why-card h-100 text-center p-4" }, [
          createElement("div", { class: "icon-box mb-4" }, [
            createElement("i", { class: card.icon }),
          ]),
          createElement("h5", { class: "text-white fw-semibold mb-3" }, [
            card.title,
          ]),
          createElement("p", { class: "text-light opacity-75 small mb-0" }, [
            card.text,
          ]),
        ]),
      ]),
    ),
  );
  container.appendChild(cardsRow);
}

function renderPortfolio(portfolio) {
  const container = document.getElementById("portfolioContent");
  if (!container) return;
  container.innerHTML = "";

  container.appendChild(
    createElement("div", { class: "text-center mb-5", "data-aos": "fade-up" }, [
      createElement("h2", {}, [portfolio.heading]),
      createElement("p", { class: "text-muted" }, [portfolio.subtitle]),
    ]),
  );

  const section = container.closest("section");
  if (section && portfolio.premium) section.classList.add("premium");

  const row = createElement(
    "div",
    { class: "row justify-content-center g-4" },
    portfolio.items.map((item) =>
      createElement(
        "a",
        {
          target: "_blank",
          rel: "noopener",
          href: item.href,
          class: "col-lg-4 col-md-6",
          "data-aos": "zoom-in",
          "data-aos-delay": item.delay,
        },
        [
          createElement("div", { class: "work-video-card" }, [
            item.badge
              ? createElement("span", { class: "premium-badge" }, [item.badge])
              : null,
            createElement("img", {
              class: "h-100 w-auto",
              src: item.img,
              alt: item.alt,
            }),
            createElement("div", { class: "overlay" }, [
              createElement("h6", {}, [item.title]),
              createElement("p", {}, [item.description]),
            ]),
          ]),
        ],
      ),
    ),
  );
  container.appendChild(row);
}

function renderTestimonials(testimonials) {
  const container = document.getElementById("testimonialsContent");
  if (!container) return;
  container.innerHTML = "";

  container.appendChild(
    createElement("div", { class: "text-center mb-5", "data-aos": "fade-up" }, [
      createElement("h2", {}, [testimonials.heading]),
      createElement("p", { class: "text-muted" }, [testimonials.subtitle]),
    ]),
  );

  const row = createElement(
    "div",
    { class: "row g-4" },
    testimonials.items.map((item) =>
      createElement(
        "div",
        {
          class: "col-md-4",
          "data-aos": "fade-up",
          "data-aos-delay": item.delay,
        },
        [
          createElement("div", { class: "card p-4 h-100 shadow-sm border-0" }, [
            renderRating(item.rating),
            createElement("p", { class: "text-muted" }, [`"${item.text}"`]),
            createElement("h6", { class: "mb-0 fw-semibold" }, [item.name]),
            createElement("small", { class: "text-muted" }, [item.company]),
            createElement("small", {}, [item.location]),
          ]),
        ],
      ),
    ),
  );
  container.appendChild(row);
}

function renderRating(rating) {
  const wrapper = createElement("div", { class: "text-warning mb-3" });
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  for (let i = 0; i < fullStars; i += 1) {
    wrapper.appendChild(createElement("i", { class: "bi bi-star-fill" }));
  }
  if (hasHalf) {
    wrapper.appendChild(createElement("i", { class: "bi bi-star-half" }));
  }
  return wrapper;
}

function renderContact(contact) {
  const container = document.getElementById("contactContent");
  if (!container) return;
  container.innerHTML = "";

  const header = createElement(
    "div",
    { class: "contact-header text-center text-white" },
    [
      createElement("div", { class: "container" }, [
        createElement("h2", { class: "text-white" }, [contact.header.title]),
        createElement("p", {}, [contact.header.subtitle]),
      ]),
    ],
  );

  const cardRow = createElement(
    "div",
    { class: "row justify-content-center g-4" },
    [
      ...contact.cards.map((card) =>
        createElement("div", { class: "col-md-5", "data-aos": "fade-up" }, [
          createElement("div", { class: "contact-box text-center" }, [
            createElement("i", { class: `${card.icon} contact-icon` }),
            createElement("h5", {}, [card.title]),
            createElement("p", {}, [card.text]),
            createElement(
              "a",
              {
                href: card.link,
                class: card.buttonClass,
                target: card.link.startsWith("http") ? "_blank" : null,
                rel: card.link.startsWith("http") ? "noopener" : null,
              },
              [card.buttonText],
            ),
          ]),
        ]),
      ),
      createElement(
        "div",
        { class: "col-md-10", "data-aos": "fade-up", "data-aos-delay": 100 },
        [
          createElement("div", { class: "contact-box text-center" }, [
            createElement("i", { class: "bi bi-geo-alt contact-icon" }),
            createElement("h5", {}, [contact.locationCard.title]),
            createElement("address", {}, [
              ...contact.locationCard.addressLines.flatMap((line, index) => [
                index === 0
                  ? createElement("strong", { class: "d-block" }, [line])
                  : createElement("p", { class: "mb-0" }, [line]),
              ]),
            ]),
            createElement("iframe", {
              src: contact.locationCard.iframeSrc,
              alt: contact.locationCard.mapAlt,
              width: "100%",
              height: "350",
              style: "border:0;",
              allowfullscreen: "",
              loading: "lazy",
              referrerpolicy: "no-referrer-when-downgrade",
            }),
          ]),
        ],
      ),
    ],
  );

  const wrapper = createElement("div", { class: "container contact-cards" }, [
    cardRow,
  ]);

  container.appendChild(header);
  container.appendChild(wrapper);
}

function renderFAQs(faqs) {
  const container = document.getElementById("faqsContent");
  if (!container) return;
  container.innerHTML = "";

  const header = createElement(
    "div",
    { class: "text-center mb-5 faq-header", "data-aos": "fade-up" },
    [
      faqs.badge
        ? createElement("span", { class: "faq-badge mb-3 d-inline-block" }, [
            faqs.badge,
          ])
        : null,
      createElement("h2", {}, [faqs.heading]),
      createElement(
        "p",
        { class: "text-muted mx-auto", style: "max-width:680px;" },
        [faqs.subtitle],
      ),
    ],
  );

  const faqBody = createElement(
    "div",
    { class: "accordion faq-accordion", id: "faqsAccordion" },
    faqs.items.map((faq, index) => {
      const isOpen = index === 0;
      return createElement("div", { class: "accordion-item faq-item" }, [
        createElement("h3", { class: "accordion-header", id: `faq-${index}` }, [
          createElement(
            "button",
            {
              class: `accordion-button ${isOpen ? "" : "collapsed"}`,
              type: "button",
              "data-bs-toggle": "collapse",
              "data-bs-target": `#faq-collapse-${index}`,
              "aria-expanded": isOpen ? "true" : "false",
              "aria-controls": `faq-collapse-${index}`,
            },
            [faq.question],
          ),
        ]),
        createElement(
          "div",
          {
            class: `accordion-collapse collapse ${isOpen ? "show" : ""}`,
            id: `faq-collapse-${index}`,
            "data-bs-parent": "#faqsAccordion",
          },
          [createElement("div", { class: "accordion-body" }, [faq.answer])],
        ),
      ]);
    }),
  );

  container.appendChild(
    createElement(
      "div",
      { class: "faq-panel p-4 p-lg-5 rounded-4 shadow-sm" },
      [header, faqBody],
    ),
  );
}

async function renderContent() {
  const data = await loadContentData();
  renderHero(data.hero);
  renderAbout(data.about);
  renderTeam(data.team);
  renderServices(data.services);
  renderWhyUs(data.whyUs);
  renderPortfolio(data.portfolio);
  renderTestimonials(data.testimonials);
  renderContact(data.contact);
  renderFAQs(data.faqs);
  return data;
}

function initTyped(typedStrings) {
  new Typed("#typed-hero", {
    strings: typedStrings,
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 1400,
    loop: true,
  });
}

const navbar = document.getElementById("siteNavbar");
const scrollThreshold = 60;

function handleNavbar() {
  if (window.scrollY > scrollThreshold) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
}

function initNavbar() {
  window.addEventListener("scroll", handleNavbar);
  handleNavbar();
}

function initSectionObserver() {
  const sections = document.querySelectorAll("main section[id], header[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (!id) return;
      const link = document.querySelector(
        '.navbar-nav .nav-link[href="#' + id + '"]',
      );
      if (entry.isIntersecting) {
        navLinks.forEach((n) => n.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute("data-target") || 0;
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          const tick = () => {
            start += step;
            if (start >= target)
              el.textContent = target + (target >= 100 ? "+" : "");
            else {
              el.textContent = start;
              requestAnimationFrame(tick);
            }
          };
          tick();
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((c) => counterObserver.observe(c));
}

function initAnimationObserver() {
  const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, animationObserverOptions);

  document
    .querySelectorAll(
      ".service-card, .why-card, .work-video-card, .contact-box",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      animationObserver.observe(el);
    });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initRipples() {
  document
    .querySelectorAll(".btn, .contact-btn, .offer-btn")
    .forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple-effect";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.3)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s linear";
        ripple.style.pointerEvents = "none";
        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        setTimeout(() => ripple.remove(), 600);
      });
    });
}

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }
    alert(
      `Thank you, ${name}! Your message has been received. We will contact you soon.`,
    );
    form.reset();
  });
}

// function initBackToTop() {
//   const backToTopBtn = document.createElement("button");
//   backToTopBtn.className = "back-to-top";
//   backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
//   backToTopBtn.setAttribute("aria-label", "Back to top");
//   document.body.appendChild(backToTopBtn);

//   backToTopBtn.addEventListener("click", () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   });

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 300) backToTopBtn.classList.add("show");
//     else backToTopBtn.classList.remove("show");
//   });
// }

function initNewsletter() {
  const newsletterBtn = document.querySelector(".newsletter-btn");
  const newsletterInput = document.querySelector(".newsletter-input");
  if (!newsletterBtn || !newsletterInput) return;

  newsletterBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert(
      "Thank you for subscribing! We'll keep you updated with our latest news and offers.",
    );
    newsletterInput.value = "";
  });
}

async function initPage() {
  const data = await renderContent();
  AOS.init({ once: true, duration: 800 });
  initTyped(data.hero.typedStrings);
  initNavbar();
  initSectionObserver();
  initCounters();
  initAnimationObserver();
  initSmoothAnchors();
  initRipples();
  initContactForm();
  // initBackToTop();
  initNewsletter();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
