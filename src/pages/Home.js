import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // حرکت خودکار اسلایدر؛ با هر تغییر دستی، زمان‌سنج از ابتدا شروع می‌شود.
  useEffect(() => {
    const autoplayTimer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % 4);
    }, 6500);

    return () => window.clearTimeout(autoplayTimer);
  }, [activeSlide]);

  // Cinematic scroll reveal — sequential section queue.
  // Sections reveal from top to bottom; a later section waits until the
  // previous section has finished its gentle entrance. Existing marquee,
  // hover and hero autoplay logic remain untouched.
  useEffect(() => {
    const groups = [
      { root: ".home-services", selectors: [".home-section-heading", ".home-service-card"] },
      { root: ".home-projects", selectors: [".home-section-title-row", ".home-project-card"] },
      { root: ".home-about", selectors: [".home-about-image-wrap", ".home-about-content"] },
      { root: ".home-benefits", selectors: [".home-benefit-item"] },
      { root: ".home-process", selectors: [".home-section-heading", ".home-process-step"] },
      { root: ".home-testimonials", selectors: [".home-section-heading", ".home-testimonial-card"] },
      { root: ".home-cta", selectors: [".home-cta-photo", ".home-cta-content", ".home-cta-leaves"] },
    ].map((group) => {
      const root = document.querySelector(group.root);
      const elements = root
        ? group.selectors.flatMap((selector) => Array.from(root.querySelectorAll(selector)))
            // Marquee duplicates are decorative copies; leave their continuous
            // track animation entirely alone.
            .filter((element) => !element.closest('[aria-hidden="true"]'))
        : [];
      return { ...group, root, elements, inView: false, started: false };
    }).filter((group) => group.root && group.elements.length);

    if (!groups.length) return undefined;

    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      groups.forEach(({ elements }) => elements.forEach((element) => element.classList.add("cinematic-visible")));
      return undefined;
    }

    let activeIndex = 0;
    let disposed = false;
    let finishTimer = null;

    const revealNext = () => {
      if (disposed || activeIndex >= groups.length) return;
      const group = groups[activeIndex];
      if (!group.inView || group.started) return;

      group.started = true;
      group.elements.forEach((element, index) => {
        element.classList.add("cinematic-reveal");
        element.style.setProperty("--cinematic-delay", `${Math.min(index, 5) * 105}ms`);
        element.classList.add("cinematic-visible");
      });

      // Let this section finish before allowing the next one to start.
      const duration = 900 + Math.min(Math.max(group.elements.length - 1, 0), 5) * 105;
      finishTimer = window.setTimeout(() => {
        activeIndex += 1;
        revealNext();
      }, duration + 130);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const group = groups.find((item) => item.root === entry.target);
        if (group) group.inView = entry.isIntersecting;
      });
      revealNext();
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: "0px 0px -10% 0px",
    });

    groups.forEach(({ root }) => observer.observe(root));

    return () => {
      disposed = true;
      observer.disconnect();
      if (finishTimer !== null) window.clearTimeout(finishTimer);
    };
  }, []);

  const slides = [
    {
      image: "/images/Home/01-hero-kitchen-background.png",
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
      position: "center 53%",
    },
    {
      image: "/images/Home/02-hero-custom-design.png",
      title: "طراحی اختصاصی",
      subtitle: "متناسب با سلیقه و فضای شما",
      description: "هر آشپزخانه، طراحی منحصربه‌فرد خودش را دارد",
      button: "درخواست مشاوره",
      position: "center 50%",
    },
    {
      image: "/images/Home/03-hero-quality-material.png",
      title: "کیفیت ماندگار",
      subtitle: "جزئیات دقیق، نتیجه‌ای چشم‌نواز",
      description: "متریال باکیفیت و اجرای حرفه‌ای در تمام مراحل",
      button: "درخواست مشاوره",
      position: "center 48%",
    },
    {
      image: "/images/Home/04-hero-dream-kitchen.png",
      title: "آشپزخانه رویایی",
      subtitle: "زیبایی و آرامش در کنار هم",
      description: "از ایده تا اجرا، همراه شما برای ساخت فضایی دلنشین",
      button: "درخواست مشاوره",
      position: "center 50%",
    },
  ];

  const services = [
    {
      icon: "/icon/Home/service-custom-design.png",
      title: "طراحی اختصاصی",
      description: "متناسب با سلیقه و فضای شما",
    },
    {
      icon: "/icon/Home/service-cabinet-install.png",
      title: "ساخت و نصب کابینت",
      description: "با بالاترین کیفیت",
    },
    {
      icon: "/icon/Home/service-wood-decor.png",
      title: "خدمات دکوراسیون چوبی",
      description: "خلق فضایی خاص و دلنشین",
    },
  ];

  const projects = [
    { image: "/images/Home/portfolio-style-01.png", title: "سبک مدرن" },
    { image: "/images/Home/portfolio-style-02.png", title: "سبک کلاسیک" },
    { image: "/images/Home/portfolio-style-03.png", title: "سبک مینیمال" },
    { image: "/images/Home/portfolio-style-04.png", title: "سبک نئوکلاسیک" },
  ];

  const steps = [
    { number: "۱", icon: "/icon/Home/step-consultation.png", title: "ثبت درخواست مشاوره" },
    { number: "۲", icon: "/icon/Home/step-needs-review.png", title: "مشاوره و بررسی نیازها" },
    { number: "۳", icon: "/icon/Home/step-design.png", title: "طراحی و ارائه طرح" },
    { number: "۴", icon: "/icon/Home/step-contract.png", title: "تأیید نهایی و عقد قرارداد" },
    { number: "۵", icon: "/icon/Home/step-build-install.png", title: "ساخت و نصب" },
    { number: "۶", icon: "/icon/Home/step-delivery.png", title: "تحویل پروژه" },
  ];

  const testimonials = [
    {
      image: "/images/Home/portfolio-style-02.png",
      name: "سارا محمدی",
      project: "پروژه: آشپزخانه مدرن",
      quote: "کیفیت کار و برخورد حرفه‌ای تیم کابینت سبز واقعاً عالی بود.",
    },
    {
      image: "/images/Home/portfolio-style-03.png",
      name: "علی رضایی",
      project: "پروژه: آشپزخانه کلاسیک",
      quote: "طراحی زیبا و اجرای دقیق، کاملاً مطابق سلیقه ما بود.",
    },
    {
      image: "/images/Home/portfolio-style-04.png",
      name: "مینا حسینی",
      project: "پروژه: آشپزخانه مینیمال",
      quote: "از انتخاب کابینت سبز بسیار راضی هستیم. پیشنهاد می‌کنم حتماً کارشون رو ببینید.",
    },
  ];

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
      <main className="home-page" dir="rtl">
        {/* Hero */}
        <section className="home-hero">
          <div
            key={`hero-image-${activeSlide}`}
            className="home-hero-image"
            style={{
              backgroundImage: `url(${slides[activeSlide].image})`,
              backgroundPosition: slides[activeSlide].position,
            }}
            role="img"
            aria-label={slides[activeSlide].title}
          />
          <div className="home-hero-shade" />
          <button
            className="home-hero-arrow home-hero-arrow-right"
            type="button"
            aria-label="اسلاید بعدی"
            onClick={() => changeSlide(1)}
          >
            ‹
          </button>
          <button
            className="home-hero-arrow home-hero-arrow-left"
            type="button"
            aria-label="اسلاید قبلی"
            onClick={() => changeSlide(-1)}
          >
            ›
          </button>
          <div
            className="home-hero-content"
            key={`hero-content-${activeSlide}`}
          >
            <h1>
              {slides[activeSlide].title.split(" ").slice(0, -1).join(" ")}{" "}
              <span>{slides[activeSlide].title.split(" ").slice(-1)}</span>
            </h1>
            <h2>{slides[activeSlide].subtitle}</h2>
            <p>{slides[activeSlide].description}</p>
            <a className="home-gold-button home-hero-button" href="#home-contact">
              <span>←</span>
              {slides[activeSlide].button}
            </a>
          </div>
          <div className="home-hero-dots" aria-label="انتخاب اسلاید">
            {slides.map((slide, index) => (
              <button
                key={`hero-slide-${slide.image}`}
                type="button"
                aria-label={`رفتن به اسلاید ${index + 1}`}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </section>
        <div
          className="home-hero-progress"
          key={`hero-progress-${activeSlide}`}
          role="progressbar"
          aria-label="زمان باقی‌مانده تا اسلاید بعدی"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
        >
          <span />
        </div>

        {/* Services */}
        <section className="home-services home-section">
          <div className="home-section-heading">
            <span />
            <h2>خدمات کابینت سبز</h2>
            <span />
          </div>
          <div className="home-service-grid home-marquee home-marquee-services">
            <div className="home-marquee-track home-marquee-track-right">
              <div className="home-marquee-group">
                {services.map((service, index) => (
                  <article className="home-service-card" key={`service-primary-${index}`}>
                    <div className="home-service-icon"><img src={service.icon} alt="" /></div>
                    <div className="home-service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="home-marquee-group" aria-hidden="true">
                {services.map((service, index) => (
                  <article className="home-service-card" key={`service-copy-${index}`}>
                    <div className="home-service-icon"><img src={service.icon} alt="" /></div>
                    <div className="home-service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="home-projects home-section">
          <div className="home-section-title-row">
            <div className="home-section-heading">
              <span />
              <h2>نمونه‌کارهای منتخب</h2>
              <span />
            </div>
            <a href="#home-contact" className="home-small-link">
              مشاهده همه پروژه‌ها <b>←</b>
            </a>
          </div>
          <div className="home-project-grid home-marquee home-marquee-projects">
            <div className="home-marquee-track home-marquee-track-left">
              <div className="home-marquee-group">
                {projects.map((project, index) => (
                  <a className="home-project-card" href="#home-contact" key={`project-primary-${index}`}>
                    <img src={project.image} alt={project.title} />
                    <span>{project.title}</span>
                  </a>
                ))}
              </div>
              <div className="home-marquee-group" aria-hidden="true">
                {projects.map((project, index) => (
                  <a className="home-project-card" href="#home-contact" tabIndex={-1} key={`project-copy-${index}`}>
                    <img src={project.image} alt="" />
                    <span>{project.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="home-about" style={{ backgroundImage: "url(/images/Home/about-section-background.png)" }}>
          <div className="home-about-image-wrap">
            <img src="/images/Home/about-kitchen-photo.png" alt="فضای آشپزخانه طراحی‌شده توسط کابینت سبز" />
          </div>
          <div className="home-about-content">
            <h2><span>›</span> درباره کابینت سبز</h2>
            <p>
              ما در کابینت سبز با سال‌ها تجربه در طراحی و ساخت کابینت‌های مدرن
              و کلاسیک، تلاش می‌کنیم تا فضایی زیبا، کاربردی و ماندگار برای شما
              خلق کنیم. کیفیت بالا، توجه به زمان و رضایت شما، افتخار ماست.
            </p>
            <a className="home-gold-button" href="#home-contact">
              <span>←</span>
              بیشتر بدانید
            </a>
          </div>
          <div className="home-about-leaves" aria-hidden="true">❧</div>
        </section>

        {/* Benefits strip */}
        <section className="home-benefits" style={{ backgroundImage: "url(/images/Home/home-benefits-background.png)" }}>
          <div className="home-benefit-item">
            <span className="home-benefit-icon"><img src="/icon/Home/benefit-material-quality.png" alt="" /></span>
            <strong>کیفیت متریال</strong>
          </div>
          <div className="home-benefit-item">
            <span className="home-benefit-icon"><img src="/icon/Home/benefit-precision.png" alt="" /></span>
            <strong>اجرای دقیق</strong>
          </div>
          <div className="home-benefit-item">
            <span className="home-benefit-icon"><img src="/icon/Home/benefit-custom-design.png" alt="" /></span>
            <strong>طراحی اختصاصی</strong>
          </div>
          <div className="home-benefit-item">
            <span className="home-benefit-icon"><img src="/icon/Home/benefit-after-sales.png" alt="" /></span>
            <strong>خدمات پس از فروش</strong>
          </div>
        </section>

        {/* Process */}
        <section className="home-process home-section">
          <div className="home-section-heading">
            <span />
            <h2>مراحل ثبت سفارش</h2>
            <span />
          </div>
          <div className="home-process-grid">
            {steps.map((step, index) => (
              <div className="home-process-step" key={step.number}>
                <div className="home-process-top">
                  <div className="home-process-icon"><img src={step.icon} alt="" /></div>
                  <span className="home-process-number">{step.number}</span>
                  {index !== steps.length - 1 && <i className="home-process-chevron">‹</i>}
                </div>
                <p>{step.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="home-testimonials home-section">
          <div className="home-section-heading">
            <span />
            <h2>تجربه مشتریان از پروژه‌های اجراشده</h2>
            <span />
          </div>
          <div className="home-testimonial-grid">
                {testimonials.map((item) => (
                  <article
                    className="home-testimonial-card"
                    key={`testimonial-${item.name}`}
                  >
                <img src={item.image} alt="نمونه پروژه مشتری" />
                <div className="home-testimonial-body">
                  <div className="home-stars">★★★★★</div>
                  <p>{item.quote}</p>
                  <div className="home-testimonial-person">
                    <div className="home-avatar">{item.name.slice(0, 1)}</div>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.project}</small>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="home-cta" id="home-contact">
          <div className="home-cta-photo">
            <img src="/images/Home/cta-plant-photo.png" alt="" />
          </div>
          <div className="home-cta-content">
            <h2>برای دریافت مشاوره و ثبت سفارش،<br /> همین حالا اقدام کنید.</h2>
            <a className="home-gold-button home-cta-button" href="tel:">
              <span>←</span>
              درخواست مشاوره
            </a>
          </div>
          <div className="home-cta-leaves" aria-hidden="true">❧</div>
        </section>
      </main>
  );
}
