import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiHome,
  FiSliders,
  FiChevronUp,
  FiShoppingCart,
  FiGrid,
  FiList,
  FiRefreshCw,
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import "./Products.css";

/* ------------------------------------------------------------------ */
/*  داده‌ها                                                            */
/* ------------------------------------------------------------------ */

const SLIDE_INTERVAL = 3000;

const heroSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: "/baner22.png",
}));

const PRICE_MIN = 1000000;
const PRICE_MAX = 50000000;

const categories = [
  { id: "sofa", title: "مبلمان و صندلی" },
  { id: "tv", title: "میز و میز تلویزیون" },
  { id: "wardrobe", title: "قفسه و کمد دیواری" },
  { id: "stand", title: "قفسه و استند" },
  { id: "decor", title: "تجهیزات دکوراتیو" },
];

const colors = [
  { id: "oak", title: "بلوط", hex: "#a8805c" },
  { id: "walnut", title: "گردویی", hex: "#7a3f1d" },
  { id: "beige", title: "کرم", hex: "#ecd3b0" },
  { id: "green", title: "سبز", hex: "#5f9e4e" },
  { id: "olive", title: "زیتونی", hex: "#4a6035" },
  { id: "gray", title: "طوسی", hex: "#87807a" },
];

const sortOptions = [
  { id: "newest", title: "جدیدترین" },
  { id: "cheap", title: "ارزان‌ترین" },
  { id: "expensive", title: "گران‌ترین" },
  { id: "rating", title: "بالاترین امتیاز" },
];

const badges = {
  new: { text: "جدید", className: "badge--new" },
  best: { text: "پرفروش", className: "badge--best" },
  sale: { text: "تخفیف ویژه", className: "badge--sale" },
};

const products = [
  { id: 6, title: "صندلی راحتی مدرن", rating: 4.8, price: 2990000, badge: "new", category: "sofa", colors: ["olive"], inStock: true, image: "./moble.jpg", link: "" },
  { id: 5, title: "میز جلو مبلی گرد", rating: 4.7, price: 2990000, badge: "best", category: "tv", colors: ["oak"], inStock: true, image: "/product/mizejolomobli.png", link: "" },
  { id: 4, title: "میز تلویزیون مدرن", rating: 4.8, price: 4990000, oldPrice: 5990000, badge: "sale", category: "tv", colors: ["walnut", "oak"], inStock: true, image: "/product/mizteleviz.png", link: "" },
  { id: 3, title: "قفسه دیواری مینیمال", rating: 4.6, price: 2990000, category: "wardrobe", colors: ["oak", "beige"], inStock: true, image: "/product/ghafase.png", link: "" },
  { id: 2, title: "کمد جادار چوبی", rating: 4.7, price: 4990000, category: "wardrobe", colors: ["walnut"], inStock: false, image: "/product/komod.png", link: "" },
  { id: 1, title: "میز ناهارخوری چوبی", rating: 4.8, price: 6990000, category: "tv", colors: ["oak", "gray"], inStock: true, image: "/product/mizenahar.png", link: "" },
];

/* ------------------------------------------------------------------ */
/*  ابزارها و کامپوننت‌های کمکی                                        */
/* ------------------------------------------------------------------ */

const to = (link) => link || "#";
const fa = (n) => n.toLocaleString("fa-IR");

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg className="leaf-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4C10 4 4 9 4 16c0 1.5.4 2.8 1 4 1.2-4 4-7 8-9-3 3-5 6-5.8 9.5C16 20 20 14 20 4z" fill="currentColor" />
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
            <span className="star__fill" style={{ width: `${fill * 100}%` }}>
              <FaStar aria-hidden="true" />
            </span>
            <FaStar aria-hidden="true" />
          </span>
        );
      })}
    </span>
  );
}

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-group">
      <button
        type="button"
        className="filter-group__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <FiChevronUp
          className={`filter-group__chev ${open ? "is-open" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && <div className="filter-group__body">{children}</div>}
    </div>
  );
}

function ProductCard({ product, list }) {
  const [liked, setLiked] = useState(false);
  const badge = product.badge && badges[product.badge];
  const sale = product.oldPrice;

  return (
    <article className={`p-card ${list ? "p-card--list" : ""}`}>
      <div className="p-card__media">
        <Link to={to(product.link)} className="p-card__img" aria-label={product.title}>
          {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
        </Link>
        <button
          type="button"
          className={`p-card__like ${liked ? "is-liked" : ""}`}
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          {liked ? <FaHeart aria-hidden="true" /> : <FiHeart aria-hidden="true" />}
        </button>
        {badge && <span className={`badge ${badge.className}`}>{badge.text}</span>}
      </div>

      <div className="p-card__info">
        <h3 className="p-card__title">{product.title}</h3>
        <div className="p-card__rating">
          <Stars rating={product.rating} />
          <span>({fa(product.rating)})</span>
        </div>
        <div className="p-card__prices">
          <span className={`p-card__price ${sale ? "is-sale" : ""}`}>{fa(product.price)} تومان</span>
          {sale && <del className="p-card__old">{fa(product.oldPrice)}</del>}
        </div>
        <div className="p-card__actions">
          <button
            type="button"
            className="p-card__cart"
            aria-label="افزودن به سبد خرید"
            disabled={!product.inStock}
          >
            <FiShoppingCart aria-hidden="true" />
          </button>
          <Link to={to(product.link)} className="btn btn--block">
            <span className="btn-text btn-text--long">مشاهده جزئیات</span>
            <span className="btn-text btn-text--short">جزئیات</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  صفحه محصولات                                                       */
/* ------------------------------------------------------------------ */

const emptyFilters = {
  categories: [],
  colors: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
  onlyInStock: false,
};

const toggle = (arr, id) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

export default function Products() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % heroSlides.length), SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  const [draft, setDraft] = useState(emptyFilters);
  const [applied, setApplied] = useState(emptyFilters);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState("grid");

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!applied.categories.length || applied.categories.includes(p.category)) &&
        (!applied.colors.length || p.colors.some((c) => applied.colors.includes(c))) &&
        p.price >= applied.min &&
        p.price <= applied.max &&
        (!applied.onlyInStock || p.inStock)
    );
    const sorters = {
      newest: (a, b) => b.id - a.id,
      cheap: (a, b) => a.price - b.price,
      expensive: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(sorters[sort]);
  }, [applied, sort]);

  const setMin = (v) => setDraft((d) => ({ ...d, min: Math.min(Number(v), d.max - 1000000) }));
  const setMax = (v) => setDraft((d) => ({ ...d, max: Math.max(Number(v), d.min + 1000000) }));
  const pct = (v) => ((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  return (
    <>
      <main className="shop" dir="rtl">
        {/* ---------------- هیرو ---------------- */}
        <section className="shop-hero" aria-label="محصولات چوب سبز">
          <div className="shop-hero__slides" aria-hidden="true">
            {heroSlides.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt=""
                className={`shop-hero__img ${i === slide ? "is-active" : ""}`}
              />
            ))}
          </div>

          <svg
            className="shop-hero__curve"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M49 0 L100 0 L100 100 L68 100 C60 82 50 66 55 48 C59 33 47 16 49 0 Z" />
          </svg>

          <div className="shop-hero__text">
            <nav className="breadcrumb" aria-label="مسیر صفحه">
              <Link to="/" className="breadcrumb__home">
                <FiHome aria-hidden="true" /> خانه
              </Link>
              <span aria-hidden="true">‹</span>
              <span>فروشگاه</span>
            </nav>
            <h1 className="shop-hero__title">محصولات چوب سبز</h1>
            <p className="shop-hero__sub">کیفیت، زیبایی و دوام در یک انتخاب</p>
            <hr className="shop-hero__rule" />
            <p className="shop-hero__desc">
              مجموعه‌ای از بهترین محصولات چوبی
              <br />
              با طراحی مدرن و متریال باکیفیت
            </p>
          </div>
        </section>

        {/* ---------------- فیلتر + لیست محصولات ---------------- */}
        <section className="container shop-layout">
          <aside className="filters" aria-label="فیلتر محصولات">
            <h2 className="filters__title">
              <FiSliders aria-hidden="true" /> فیلتر محصولات
            </h2>

            <FilterGroup title="دسته‌بندی محصولات">
              <ul className="check-list">
                {categories.map((c) => (
                  <li key={c.id}>
                    <label className="check">
                      <span>{c.title}</span>
                      <input
                        type="checkbox"
                        checked={draft.categories.includes(c.id)}
                        onChange={() => setDraft((d) => ({ ...d, categories: toggle(d.categories, c.id) }))}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </FilterGroup>

            <FilterGroup title="رنگ‌بندی">
              <div className="swatches">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`swatch ${draft.colors.includes(c.id) ? "is-selected" : ""}`}
                    style={{ background: c.hex }}
                    title={c.title}
                    aria-label={c.title}
                    aria-pressed={draft.colors.includes(c.id)}
                    onClick={() => setDraft((d) => ({ ...d, colors: toggle(d.colors, c.id) }))}
                  />
                ))}
              </div>
              <label className="check">
                <span>همه رنگ‌ها</span>
                <input
                  type="checkbox"
                  checked={draft.colors.length === 0}
                  onChange={() => setDraft((d) => ({ ...d, colors: [] }))}
                />
              </label>
            </FilterGroup>

            <FilterGroup title="قیمت">
              <div className="range">
                <div className="range__track" />
                <div
                  className="range__fill"
                  style={{ right: `${pct(draft.min)}%`, left: `${100 - pct(draft.max)}%` }}
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={500000}
                  value={draft.min}
                  onChange={(e) => setMin(e.target.value)}
                  aria-label="حداقل قیمت"
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={500000}
                  value={draft.max}
                  onChange={(e) => setMax(e.target.value)}
                  aria-label="حداکثر قیمت"
                />
              </div>
              <div className="range__labels">
                <span>{fa(draft.min)} تومان</span>
                <span>{fa(draft.max)} تومان</span>
              </div>
            </FilterGroup>

            <FilterGroup title="موجودی کالا">
              <label className="check">
                <span>فقط محصولات موجود</span>
                <input
                  type="checkbox"
                  checked={draft.onlyInStock}
                  onChange={(e) => setDraft((d) => ({ ...d, onlyInStock: e.target.checked }))}
                />
              </label>
            </FilterGroup>

            <button
              type="button"
              className="btn btn--block filters__apply"
              onClick={() => setApplied(draft)}
            >
              اعمال فیلترها
              <FiRefreshCw aria-hidden="true" />
            </button>
            <button
              type="button"
              className="filters__reset"
              onClick={() => {
                setDraft(emptyFilters);
                setApplied(emptyFilters);
              }}
            >
              پاک کردن فیلترها
            </button>
          </aside>

          <div className="listing">
            <div className="toolbar">
              <label className="toolbar__sort">
                <span>مرتب‌سازی بر اساس:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sortOptions.map((o) => (
                    <option key={o.id} value={o.id}>{o.title}</option>
                  ))}
                </select>
              </label>

              <div className="toolbar__view" role="group" aria-label="نحوه نمایش">
                <button
                  type="button"
                  className={view === "grid" ? "is-active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="نمایش شبکه‌ای"
                  aria-pressed={view === "grid"}
                >
                  <FiGrid aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={view === "list" ? "is-active" : ""}
                  onClick={() => setView("list")}
                  aria-label="نمایش لیستی"
                  aria-pressed={view === "list"}
                >
                  <FiList aria-hidden="true" />
                </button>
              </div>
            </div>

            {visible.length ? (
              <div className={`grid ${view === "list" ? "grid--list" : ""}`}>
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} list={view === "list"} />
                ))}
              </div>
            ) : (
              <p className="empty">محصولی با این فیلترها پیدا نشد. فیلترها را تغییر دهید یا پاک کنید.</p>
            )}
          </div>
        </section>

        {/* ---------------- بنر پایین ---------------- */}
        <section className="container">
          <div className="cta">
            <div className="cta__body">
              <h2 className="cta__title">
                <LeafIcon />
                انتخابی هوشمندانه برای فضای بهتر
              </h2>
              <p className="cta__text">
                با محصولات چوب سبز، آرامش و زیبایی را به خانه و محل کار خود هدیه دهید.
              </p>
              <Link to="/products" className="btn">
                مشاهده همه محصولات
                <Arrow />
              </Link>
            </div>
            <div className="cta__img">
              <img src="/baner44.png" alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}