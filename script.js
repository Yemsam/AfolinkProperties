document.addEventListener("DOMContentLoaded", async () => {
  const partialFallbacks = {
    "./header.html": `<div class="site-chrome">
  <div class="top-strip">
    <div class="container top-strip-inner">
      <p>Real estate sales, leasing, rentals, surveying, and property management in Lagos.</p>
      <div class="top-strip-socials" aria-label="Afolink Properties social links">
        <a class="top-strip-social-link" href="https://wa.me/2348107020533?text=Hello%20Afolink%20Properties%2C%20I%20need%20help%20with%20a%20property%20enquiry." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.67 15l-1 4.2 4.35-1.14A10 10 0 1 0 12 2zm5.86 14.4c-.24.67-1.4 1.25-1.95 1.33-.5.07-1.14.1-1.83-.11-.42-.13-.95-.3-1.64-.6-2.88-1.25-4.76-4.15-4.9-4.34-.13-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.12 1-2.41.24-.28.54-.35.72-.35h.52c.17 0 .4-.06.63.49.24.57.8 1.98.87 2.12.07.14.12.31.02.5-.1.2-.15.31-.3.48-.15.17-.32.37-.45.5-.15.16-.3.32-.13.64.17.31.78 1.28 1.68 2.07 1.16 1.02 2.13 1.34 2.44 1.49.31.14.49.12.68-.07.19-.2.82-.96 1.05-1.29.24-.34.47-.28.78-.16.31.12 1.98.93 2.32 1.1.34.17.57.25.66.39.09.14.09.81-.15 1.48z" /></svg></a>
        <a class="top-strip-social-link" href="https://www.instagram.com/afolinkproperties/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5zm5.75-3.1a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05z" /></svg></a>
        <a class="top-strip-social-link" href="https://www.facebook.com/people/Afolink-Real-Estate-and-Surveying-Services/61573855896754/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.6-1.5h1.7V5c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V11H7v3h2.8v8h3.7z" /></svg></a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="Afolink Properties Home"><img class="brand-logo-img" src="img/AFOLINKS-LOGO-4-1.png" alt="Afolink Properties logo" /></a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
      <nav>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="housing-properties.html">Properties</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact-us.html">Contact</a></li>
        </ul>
      </nav>
      <a class="btn btn-call nav-call" href="tel:+2348107020533">Call Now</a>
    </div>
  </header>
</div>`,
  };

  const loadPartial = async (selector, url) => {
    const mount = document.querySelector(selector);

    if (!mount) {
      return;
    }

    try {
      const response = await fetch(url, { cache: "no-cache" });

      if (!response.ok) {
        throw new Error(`Unable to load ${url}`);
      }

      mount.outerHTML = await response.text();
    } catch (error) {
      console.error(`Failed to load ${url}`, error);
      if (partialFallbacks[url]) {
        mount.outerHTML = partialFallbacks[url];
      }
    }
  };

  await Promise.all([
    loadPartial("[data-site-header]", "./header.html"),
    loadPartial("[data-site-footer]", "./footer.html"),
  ]);

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  const normalizePath = (pathname) => {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
  };

  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const resolvedHref = href.startsWith("/") ? href : `/${href}`;

    if (normalizePath(resolvedHref) === currentPath) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".floating-whatsapp").forEach((link) => {
    link.setAttribute("aria-label", "Chat on WhatsApp");
    link.setAttribute("title", "Chat on WhatsApp");
  });

  const carousel = document.querySelector(
    "[data-hero-carousel], [data-hero-slider]",
  );

  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll("[data-hero-slide]"));
    const prevButton = carousel.querySelector("[data-hero-prev]");
    const nextButton = carousel.querySelector("[data-hero-next]");
    const dotsWrap = carousel.querySelector("[data-hero-dots]");
    const heroVideo = carousel.querySelector("[data-hero-video]");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let activeIndex = 0;
    let timerId = null;

    const renderDots = () => {
      if (!dotsWrap) {
        return;
      }

      dotsWrap.innerHTML = slides
        .map(
          (_, index) =>
            `<button type="button" aria-label="Go to slide ${index + 1}" data-hero-dot="${index}"></button>`,
        )
        .join("");
    };

    const setActiveSlide = (index) => {
      if (!slides.length) {
        return;
      }

      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });

      carousel.querySelectorAll("[data-hero-dot]").forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
        dot.setAttribute(
          "aria-current",
          dotIndex === activeIndex ? "true" : "false",
        );
      });

      if (heroVideo) {
        carousel.classList.add("has-hero-video");
      }
    };

    const stopAutoplay = () => {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      timerId = window.setInterval(() => setActiveSlide(activeIndex + 1), 6500);
    };

    renderDots();
    setActiveSlide(0);

    if (!reducedMotion) {
      startAutoplay();
    }

    prevButton?.addEventListener("click", () => {
      setActiveSlide(activeIndex - 1);

      if (!reducedMotion) {
        startAutoplay();
      }
    });

    nextButton?.addEventListener("click", () => {
      setActiveSlide(activeIndex + 1);

      if (!reducedMotion) {
        startAutoplay();
      }
    });

    carousel.querySelectorAll("[data-hero-dot]").forEach((dot) => {
      dot.addEventListener("click", () => {
        const dotIndex = Number(dot.getAttribute("data-hero-dot"));
        setActiveSlide(dotIndex);

        if (!reducedMotion) {
          startAutoplay();
        }
      });
    });

    if (!reducedMotion) {
      carousel.addEventListener("pointerenter", stopAutoplay);
      carousel.addEventListener("pointerleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopAutoplay();
        } else {
          startAutoplay();
        }
      });
    }
  }

  document.querySelectorAll("[data-carousel]").forEach((testimonialCarousel) => {
    const track = testimonialCarousel.querySelector(".testimonial-track");
    const slides = Array.from(testimonialCarousel.querySelectorAll(".testimonial-slide"));
    const previous = testimonialCarousel.querySelector("[data-prev]");
    const next = testimonialCarousel.querySelector("[data-next]");

    if (!track || slides.length < 1) return;

    let testimonialIndex = 0;
    const showTestimonial = (index) => {
      testimonialIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    };

    previous?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
    next?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));

    if (slides.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setInterval(() => showTestimonial(testimonialIndex + 1), 6000);
    }
  });

  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
});
