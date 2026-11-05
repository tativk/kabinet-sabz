import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
    {
      title: "کابینت سبز",
      subtitle: "زیبایی ماندگار در خانه شما",
      description: "طراحی اختصاصی، ساخت حرفه‌ای و اجرای دقیق",
      button: "درخواست مشاوره",
    },
  ];

  const services = [
    {
      icon: "▱",
      title: "طراحی اختصاصی",
      description: "متناسب با سلیقه و فضای شما",
    },
    {
      icon: "▦",
      title: "ساخت و نصب کابینت",
      description: "با بالاترین کیفیت",
    },
    {
      icon: "♧",
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
    { number: "۱", icon: "▤", title: "ثبت درخواست مشاوره" },
    { number: "۲", icon: "♧", title: "مشاوره و بررسی نیازها" },
    { number: "۳", icon: "▧", title: "طراحی و ارائه طرح" },
    { number: "۴", icon: "▤", title: "تأیید نهایی و عقد قرارداد" },
    { number: "۵", icon: "⚒", title: "ساخت و نصب" },
    { number: "۶", icon: "⌂", title: "تحویل پروژه" },
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
          className="home-hero-image"
          style={{ backgroundImage: "url('/images/Home/01-hero-kitchen-background.png')" }}
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
        <div className="home-hero-content" key={activeSlide}>
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
              key={index}
              type="button"
              aria-label={`رفتن به اسلاید ${index + 1}`}
              className={activeSlide === index ? "active" : ""}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="home-services home-section">
        <div className="home-section-heading">
          <span />
          <h2>خدمات کابینت سبز</h2>
          <span />
        </div>
        <div className="home-service-grid">
          {services.map((service, index) => (
            <article className="home-service-card" key={index}>
              <div className="home-service-icon">{service.icon}</div>
              <div className="home-service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
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
        <div className="home-project-grid">
          {projects.map((project, index) => (
            <a className="home-project-card" href="#home-contact" key={index}>
              <img src={project.image} alt={project.title} />
              <span>{project.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="home-about">
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
      <section className="home-benefits">
        <div className="home-benefit-item">
          <span className="home-benefit-icon">♧</span>
          <strong>کیفیت متریال</strong>
        </div>
        <div className="home-benefit-item">
          <span className="home-benefit-icon">⚙</span>
          <strong>اجرای دقیق</strong>
        </div>
        <div className="home-benefit-item">
          <span className="home-benefit-icon">⚒</span>
          <strong>طراحی اختصاصی</strong>
        </div>
        <div className="home-benefit-item">
          <span className="home-benefit-icon">♧</span>
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
                <div className="home-process-icon">{step.icon}</div>
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
          {testimonials.map((item, index) => (
            <article className="home-testimonial-card" key={index}>
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
