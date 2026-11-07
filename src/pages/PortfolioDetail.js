import React, { useEffect, useState } from "react";
import "./PortfolioDetail.css";

const projectImages = [
  "/images/Portfolio/portfolio-gallery-01.jpg",
  "/images/Portfolio/portfolio-gallery-02.jpg",
  "/images/Portfolio/portfolio-gallery-03.jpg",
  "/images/Portfolio/portfolio-gallery-04.jpg",
  "/images/Portfolio/portfolio-gallery-05.jpg",
  "/images/Portfolio/portfolio-gallery-06.jpg",
];

const projectDetails = [
  { icon: "detail-time.png", label: "مدت زمان اجرا", value: "۲۰ روز کاری" },
  { icon: "detail-material.png", label: "نوع متریال", value: "MDF با روکش ضد خش" },
  { icon: "detail-design.png", label: "نوع طراحی", value: "مدرن و مینیمال" },
  { icon: "detail-color.png", label: "رنگ‌بندی", value: "سبز زیتونی و چوب گردویی" },
];

const reviews = [
  {
    name: "مینا احمدی",
    role: "کارفرمای پروژه کابینت مدرن",
    quote:
      "از گِرفیت کار و دقت تیم کابینت سبز بسیار راضی هستم. طراحی زیبا، اجرا حرفه‌ای و برخورد محترمانه باعث شد تجربه فوق‌العاده‌ای داشته باشیم.",
    date: "۱۴۰۴/۰۲/۱۵",
    photo: "/images/Portfolio/reviews/review-portrait-01.jpg",
  },
  {
    name: "سارا محمدی",
    role: "کارفرمای پروژه آشپزخانه",
    quote:
      "از ابتدا تا زمان تحویل، همه مراحل با نظم و دقت پیش رفت. نتیجه دقیقاً همان چیزی شد که در طراحی اولیه انتظارش را داشتیم.",
    date: "۱۴۰۴/۰۱/۲۸",
    photo: "/images/Portfolio/reviews/review-portrait-02.jpg",
  },
  {
    name: "الهام رضایی",
    role: "کارفرمای پروژه مسکونی",
    quote:
      "کیفیت متریال و ظرافت اجرای جزئیات برای ما خیلی مهم بود و تیم چوب سبز به‌خوبی از پس آن برآمد.",
    date: "۱۴۰۳/۱۲/۲۰",
    photo: "/images/Portfolio/reviews/review-portrait-03.jpg",
  },
  {
    name: "نیلوفر کریمی",
    role: "کارفرمای پروژه کابینت",
    quote:
      "طراحی کاربردی در کنار ترکیب رنگی دلنشین، فضای آشپزخانه ما را کاملاً متحول کرد. از انتخابمان خوشحالیم.",
    date: "۱۴۰۳/۱۱/۰۸",
    photo: "/images/Portfolio/reviews/review-portrait-02.jpg",
  },
];

export default function Portfolio() {
  const [activeReview, setActiveReview] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const currentReview = reviews[activeReview];

  const changeReview = (direction) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % projectImages.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + projectImages.length) % projectImages.length);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <main className="portfolio-page" dir="rtl">
      {/* Project introduction */}
      <section className="portfolio-hero" aria-labelledby="portfolio-project-title">
        <div className="portfolio-hero-photo">
          <img
            src="/images/Portfolio/portfolio-hero-from-wireframe.jpg"
            alt="نمای کلی آشپزخانه مدرن با کابینت سبز زیتونی و جزئیات چوبی"
          />
          <button
            type="button"
            className="portfolio-fullscreen"
            onClick={() => setLightboxIndex(0)}
            aria-label="نمایش تصاویر پروژه"
          >
            <span aria-hidden="true">⛶</span>
            نمایش تمام صفحه
          </button>
        </div>

        <div
          className="portfolio-hero-info"
          style={{ backgroundImage: "url('/images/Portfolio/portfolio-hero-info-background.png')" }}
        >
          <nav className="portfolio-breadcrumb" aria-label="مسیر صفحه">
            <a href="/" className="portfolio-home-link">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 10 8.5-7 8.5 7"/><path d="M5.5 9v11h13V9M9.5 20v-6h5v6"/></svg>
              <span>خانه</span>
            </a>
            <i>‹</i>
            <a href="/portfolio">نمونه‌کارها</a>
            <i>‹</i>
            <span aria-current="page">جزئیات پروژه</span>
          </nav>

          <div className="portfolio-project-copy">
            <span className="portfolio-eyebrow">نمونه‌کار منتخب چوب سبز</span>
            <h1 id="portfolio-project-title">کابینت مدرن سبز</h1>
            <p>
              اجرای یک پروژه کابینت مدرن با ترکیب رنگ سبز زیتونی و چوب طبیعی،
              همراه با طراحی مینیمال و نورپردازی حرفه‌ای.
            </p>
          </div>

          <div className="portfolio-hero-specs">
            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon"><img src="/icon/Portfolio/hero-design.png" alt="" /></span>
              <strong>سبک طراحی:</strong>
              <span>مدرن</span>
            </div>
            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon"><img src="/icon/Portfolio/hero-material.png" alt="" /></span>
              <strong>متریال:</strong>
              <span>MDF ضد خش</span>
            </div>
            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon"><img src="/icon/Portfolio/hero-time.png" alt="" /></span>
              <strong>زمان اجرا:</strong>
              <span>۲۰ روز کاری</span>
            </div>
            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon"><img src="/icon/Portfolio/hero-location.png" alt="" /></span>
              <strong>موقعیت پروژه:</strong>
              <span>تهران، نیاوران</span>
            </div>
          </div>

          <a className="portfolio-hero-button" href="#portfolio-contact">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h2M14 13h2M8 17h2"/></svg>
            ثبت درخواست مشابه این پروژه
          </a>
          <span className="portfolio-leaf-decoration" aria-hidden="true">❧</span>
        </div>
      </section>

      {/* Project gallery */}
      <section className="portfolio-gallery-section" aria-labelledby="portfolio-gallery-title">
        <div className="portfolio-section-heading">
          <span />
          <h2 id="portfolio-gallery-title">گالری تصاویر پروژه</h2>
          <span />
        </div>
        <div className="portfolio-gallery-grid">
          {projectImages.map((image, index) => (
            <button
              type="button"
              className="portfolio-gallery-item"
              key={image}
              onClick={() => setLightboxIndex(index)}
              aria-label={`نمایش تصویر ${index + 1} پروژه`}
            >
              <img src={image} alt={`جزئیات شماره ${index + 1} از پروژه کابینت مدرن`} loading="lazy" />
              <span className="portfolio-gallery-zoom" aria-hidden="true">⌕</span>
            </button>
          ))}
        </div>
      </section>

      {/* Project details */}
      <section className="portfolio-details" aria-labelledby="portfolio-details-title">
        <h2 id="portfolio-details-title">مشخصات بیشتر پروژه</h2>
        <div className="portfolio-details-grid">
          {projectDetails.map((detail) => (
            <div className="portfolio-detail-item" key={detail.label}>
              <span className="portfolio-detail-icon" aria-hidden="true"><img src={`/icon/Portfolio/${detail.icon}`} alt="" /></span>
              <h3>{detail.label}</h3>
              <p>{detail.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer review slider */}
      <section className="portfolio-reviews" aria-labelledby="portfolio-reviews-title">
        <div className="portfolio-section-heading">
          <span />
          <h2 id="portfolio-reviews-title">نظرات مشتریان</h2>
          <span />
        </div>
        <div className="portfolio-review-card">
          <div className="portfolio-review-person">
            <img src={currentReview.photo} alt={`تصویر نمونه ${currentReview.name}`} loading="lazy" />
          </div>
          <div className="portfolio-review-identity">
            <h3>{currentReview.name}</h3>
            <div className="portfolio-stars" aria-label="۵ از ۵ ستاره">★ ★ ★ ★ ★</div>
          </div>
          <p className="portfolio-review-quote">{currentReview.quote}</p>
          <div className="portfolio-review-date">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h2M14 13h2M8 17h2"/></svg>
            {currentReview.date}
          </div>
          <div className="portfolio-review-arrows">
            <button type="button" onClick={() => changeReview(-1)} aria-label="نظر قبلی">‹</button>
            <button type="button" onClick={() => changeReview(1)} aria-label="نظر بعدی">›</button>
          </div>
        </div>
        <div className="portfolio-review-dots" aria-label="انتخاب نظر">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              type="button"
              className={activeReview === index ? "active" : ""}
              onClick={() => setActiveReview(index)}
              aria-label={`نمایش نظر ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Contact banner — exact artwork cropped from the supplied wireframe. */}
      <section className="portfolio-cta" id="portfolio-contact" aria-label="آیا به دنبال اجرای مشابه این پروژه هستید؟ برای دریافت مشاوره و ثبت سفارش، همین حالا اقدام کنید.">
        <img
          className="portfolio-cta-art"
          src="/images/Portfolio/portfolio-cta-wireframe.jpg"
          alt="برای دریافت مشاوره و اطلاعات بیشتر با ما در ارتباط باشید"
          loading="lazy"
        />
        <a
          href="/contact"
          className="portfolio-cta-hotspot"
          aria-label="درخواست مشاوره"
          title="درخواست مشاوره"
        />
      </section>

      {lightboxIndex !== null && (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="نمایش تصویر پروژه"
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="بستن"
          >×</button>
          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-prev"
            onClick={() => setLightboxIndex((current) => (current - 1 + projectImages.length) % projectImages.length)}
            aria-label="تصویر قبلی"
          >‹</button>
          <img src={projectImages[lightboxIndex]} alt={`تصویر بزرگ پروژه ${lightboxIndex + 1}`} />
          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-next"
            onClick={() => setLightboxIndex((current) => (current + 1) % projectImages.length)}
            aria-label="تصویر بعدی"
          >›</button>
          <span className="portfolio-lightbox-count">{lightboxIndex + 1} / {projectImages.length}</span>
        </div>
      )}
    </main>
  );
}
