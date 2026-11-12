import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./HomeOriginal.css";

/* ------------------------------------------------------------------ */
/*  داده‌ها — آدرس عکس‌ها و لینک‌ها را بعداً خودتان جایگزین کنید        */
/* ------------------------------------------------------------------ */

const SLIDE_INTERVAL = 3000; // ۳ ثانیه

// فعلاً هر پنج اسلاید یک عکس دارند؛ بعداً عوض کنید
const slides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: "./baner22.png", // TODO: عکس اسلاید
  badge: "چوب سبز، انتخاب ماندگار",
  titleMain: "محصولات چوبی آماده",
  titleSub: "زیبایی و دوام در کنار هم",
  text: "انواع محصولات چوبی با طراحی مدرن و کیفیت بالا برای تکمیل دکوراسیون فضای شما",
  buttonText: "مشاهده محصولات",
  link: "", // TODO: لینک دکمه اسلاید
}));

const categories = [
  { id: 1, title: "میز جلو مبلی", image: "", link: "" },
  { id: 2, title: "قفسه دیواری", image: "", link: "" },
  { id: 3, title: "میز تلویزیون", image: "", link: "" },
  { id: 4, title: "قفسه و استند", image: "", link: "" },
  { id: 5, title: "کمد و درب چوبی", image: "", link: "" },
  { id: 6, title: "میز و صندلی", image: "", link: "" },
  { id: 7, title: "دکور چوبی", image: "", link: "" },
  { id: 8, title: "اکسسوری چوبی", image: "", link: "" },
]; // TODO: image و link هر دسته‌بندی

const bestSellers = [
  { id: 1, title: "میز تلویزیون مدرن", rating: 4.8, price: "۸,۹۹۰,۰۰۰", oldPrice: "۹,۹۹۰,۰۰۰", image: "", link: "" },
  { id: 2, title: "کتابخانه چوبی کلاسیک", rating: 4.7, price: "۷,۹۹۰,۰۰۰", oldPrice: "۹,۹۹۰,۰۰۰", image: "", link: "" },
  { id: 3, title: "میز جلو مبلی گرد", rating: 4.6, price: "۹,۹۹۰,۰۰۰", oldPrice: "۷,۱۹۹,۰۰۰", image: "", link: "" },
  { id: 4, title: "کمد چوبی مدرن", rating: 4.5, price: "۱,۹۹۰,۰۰۰", oldPrice: "۹۹۰,۰۰۰", image: "", link: "" },
  { id: 5, title: "قفسه دیواری مینیمال", rating: 4.7, price: "۱,۹۹۰,۰۰۰", oldPrice: "۲,۹۹۰,۰۰۰", image: "", link: "" },
  { id: 6, title: "میز نهارخوری چوبی", rating: 4.8, price: "۱,۹۹۰,۰۰۰", oldPrice: "۲,۹۹۰,۰۰۰", image: "", link: "" },
]; // TODO: image و link هر محصول؛ قیمت‌ها نمونه هستند

const promoBanners = [
  {
    id: 1,
    className: "promo--consult",
    title: "مشاوره تخصصی طراحی و خرید",
    text: "برای انتخاب بهتر، با کارشناسان ما در ارتباط باشید.",
    buttonText: "درخواست مشاوره",
    image: "", // TODO: عکس بنر مشاوره
    link: "",
  },
  {
    id: 2,
    className: "promo--colors",
    title: "رنگ مناسب، زیبایی بیشتر",
    text: "با کاتالوگ رنگ چوب سبز، رنگ دلخواه خود را انتخاب کنید.",
    buttonText: "مشاهده کاتالوگ رنگ",
    image: "", // TODO: عکس بنر کاتالوگ رنگ
    link: "",
  },
];

/* ------------------------------------------------------------------ */
/*  کامپوننت‌های کمکی                                                  */
/* ------------------------------------------------------------------ */

// لینک خالی را به "#" تبدیل می‌کند تا تا زمان جایگذاری خطا ندهد
const to = (link) => link || "#";

function LeafIcon() {
  return (
    <svg className="leaf-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 4C10 4 4 9 4 16c0 1.5.4 2.8 1 4 1.2-4 4-7 8-9-3 3-5 6-5.800 9.500C16 20 20 14 20 4z"
        fill="currentColor"
      />
    </svg>
  );
}

function Arrow({ dir = "left" }) {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`امتیاز ${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, rating - (n - 1)));
        return (
          <span key={n} className="star">
            <span className="star__fill" style={{ width: `${fill * 100}%` }}>★</span>
            ★
          </span>
        );
      })}
    </span>
  );
}

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="product-card">
      <button
        type="button"
        className={`product-card__like ${liked ? "is-liked" : ""}`}
        onClick={() => setLiked((v) => !v)}
        aria-label="افزودن به علاقه‌مندی‌ها"
        aria-pressed={liked}
      >
        {liked ? "♥" : "♡"}
      </button>
      <Link to={to(product.link)} className="product-card__link">
        <div className="product-card__img">
          {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
        </div>
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__rating">
          <Stars rating={product.rating} />
          <span className="product-card__score">({product.rating})</span>
        </div>
        <div className="product-card__prices">
          <span className="product-card__price">{product.price} تومان</span>
          <del className="product-card__old">{product.oldPrice}</del>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  صفحه اصلی                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + slides.length) % slides.length),
    []
  );

  // تغییر خودکار اسلاید هر ۳ ثانیه
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next, current]);

  return (
    <>

      <main className="home" dir="rtl">
        {/* ---------------- هیرو / اسلایدر ---------------- */}
        <section
          className="hero"
          aria-roledescription="carousel"
          aria-label="اسلایدر اصلی"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero__track" style={{ transform: `translateX(${current * 100}%)` }}>
            {slides.map((s) => (
              <div className="hero__slide" key={s.id} aria-hidden={s.id - 1 !== current}>
                <img className="hero__bg" src={s.image} alt="" />
                <div className="hero__content">
                  <span className="hero__badge">
                    <LeafIcon />
                    {s.badge}
                  </span>
                  <h1 className="hero__title">
                    <span className="hero__title-main">{s.titleMain}</span>
                    <span className="hero__title-sub">{s.titleSub}</span>
                  </h1>
                  <p className="hero__text">{s.text}</p>
                  <Link to={to(s.link)} className="btn">
                    {s.buttonText}
                    <Arrow dir="left" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="hero__nav hero__nav--next" onClick={next} aria-label="اسلاید بعدی">
            <Arrow dir="left" />
          </button>
          <button type="button" className="hero__nav hero__nav--prev" onClick={prev} aria-label="اسلاید قبلی">
            <Arrow dir="right" />
          </button>

          <div className="hero__dots" role="tablist">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`اسلاید ${i + 1}`}
                className={`hero__dot ${i === current ? "is-active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </section>

        {/* ---------------- دسته‌بندی محصولات ---------------- */}
        <section className="section container">
          <h2 className="section-heading section-heading--center">
            <span>دسته‌بندی محصولات</span>
          </h2>
          <div className="categories">
            {categories.map((c) => (
              <Link to={to(c.link)} className="category-card" key={c.id}>
                <div className="category-card__img">
                  {c.image && <img src={c.image} alt={c.title} loading="lazy" />}
                </div>
                <span className="category-card__title">{c.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- محصولات پرفروش ---------------- */}
        <section className="section container">
          <div className="best__head">
            <h2 className="section-heading">
              <LeafIcon />
              <span>محصولات پرفروش</span>
            </h2>
            <Link to="/products" className="btn btn--sm">
              مشاهده همه محصولات
              <Arrow dir="left" />
            </Link>
          </div>
          <div className="products">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* ---------------- بنرهای پایین ---------------- */}
        <section className="section container promos">
          {promoBanners.map((b) => (
            <div className={`promo ${b.className}`} key={b.id}>
              <div className="promo__body">
                <h2 className="promo__title">{b.title}</h2>
                <p className="promo__text">{b.text}</p>
                <Link to={to(b.link)} className="btn">
                  {b.buttonText}
                  <Arrow dir="left" />
                </Link>
              </div>
              <div className="promo__img">
                {b.image && <img src={b.image} alt="" loading="lazy" />}
              </div>
            </div>
          ))}
        </section>
      </main>

    </>
  );
}
