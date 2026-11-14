// src/components/FAQ/Hero.jsx
import "./Hero.css";

const Hero = ({
  title = "سوالات متداول",
  subtitle = "پاسخ به پرسش‌های رایج شما",
  image = "/images/FAQ/faq-hero.jpg",
}) => {
  return (
    <section className="faq-hero" dir="rtl" aria-labelledby="faq-hero-title">
      <img
        className="faq-hero__image"
        src={image}
        alt=""
        fetchPriority="high"
        decoding="async"
      />

      <div className="faq-hero__overlay" />
      <div className="faq-hero__vignette" />

      <svg
        className="faq-hero__curve"
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="faqCurveGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#d9843a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#c8742f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c8742f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 600 150 C 470 150, 420 60, 250 40 C 130 26, 40 70, 0 120"
          fill="none"
          stroke="url(#faqCurveGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="faq-hero__content">
        <h1 id="faq-hero-title" className="faq-hero__title">
          {title}
        </h1>

        <div className="faq-hero__subtitle-wrap">
          <p className="faq-hero__subtitle">{subtitle}</p>
          <span className="faq-hero__line" />
        </div>

        <span className="faq-hero__accent" />
      </div>

      <div className="faq-hero__fade" />
    </section>
  );
};

export default Hero;