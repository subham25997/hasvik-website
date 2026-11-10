(function () {
  var doc = document;
  if (!("IntersectionObserver" in window)) {
    doc.documentElement.classList.remove("js");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
  );

  window.__hasvikReveal = function () {
    doc.querySelectorAll("[data-reveal]:not([data-revealed])").forEach(function (element) {
      observer.observe(element);
    });
  };

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", window.__hasvikReveal);
  } else {
    window.__hasvikReveal();
  }
})();
