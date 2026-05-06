AOS.init({
  once: true,
  duration: 800,
});

new Typed("#typed-hero", {
  strings: ["Static Websites", "Dynamic Websites", "Data Entry"],
  typeSpeed: 55,
  backSpeed: 35,
  backDelay: 1400,
  loop: true,
});

const navbar = document.getElementById("siteNavbar");
const scrollThreshold = 60;

function handleNavbar() {
  if (window.scrollY > scrollThreshold) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
}

window.addEventListener("scroll", handleNavbar);
handleNavbar();

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
    const link = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');
    if (entry.isIntersecting) {
      navLinks.forEach((n) => n.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
}, observerOptions);
sections.forEach((sec) => sectionObserver.observe(sec));

const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute("data-target") || 0;
      let start = 0;
      const duration = 1500;
      const step = Math.ceil(target / (duration / 16));
      const tick = () => {
        start += step;
        if (start >= target) el.textContent = target + (target >= 100 ? "+" : "");
        else {
          el.textContent = start;
          requestAnimationFrame(tick);
        }
      };
      tick();
      obs.unobserve(el);
    }
  });
}, { threshold: 0.6 });
counters.forEach((c) => counterObserver.observe(c));

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

document.querySelectorAll('.service-card, .why-card, .work-video-card, .contact-box').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animationObserver.observe(el);
});

// let lastScrollTop = 0;
// window.addEventListener('scroll', () => {
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   if (scrollTop > lastScrollTop && scrollTop > 100) {
//     navbar.style.transform = 'translateY(-100%)';
//   } else {
//     navbar.style.transform = 'translateY(0)';
//   }
//   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.btn, .contact-btn, .offer-btn').forEach((button) => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
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
    alert(`Thank you, ${name}! Your message has been received. We will contact you soon.`);
    form.reset();
  });
}

const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

const newsletterBtn = document.querySelector('.newsletter-btn');
const newsletterInput = document.querySelector('.newsletter-input');
if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('Thank you for subscribing! We\'ll keep you updated with our latest news and offers.');
    newsletterInput.value = '';
  });
}
