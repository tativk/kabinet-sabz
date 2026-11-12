import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./Sample.css";

/* ------------------------------------------------------------------ */
/*  تصاویر بنرها (داخل پوشه public)                                    */
/* ------------------------------------------------------------------ */

const HERO_IMAGE = "/baner22.png";
const CTA_IMAGE = "/baner33.png";

/* ------------------------------------------------------------------ */
/*  داده‌ها                                                            */
/*  برای هر نمونه می‌توانید عکس واقعی بگذارید:  image: "/images/x.jpg"  */
/*  اگر image خالی باشد، بافت (texture) با CSS ساخته می‌شود.            */
/* ------------------------------------------------------------------ */

const sections = [
  {
    id: "cabinet",
    no: "01",
    title: "کابینت و چوب",
    desc: ["رنگ‌بندی‌های متنوع کابینت و", "انواع روکش‌های چوب، با کیفیت بالا"],
    link: "/Products",
    items: [
      { id: "olive", title: "سبز زیتونی", dot: "#4a5a2e", texture: "olive", image: "" },
      { id: "linen", title: "کتانی گرم", dot: "#e3b996", texture: "linen", image: "" },
      { id: "smoked", title: "گردویی دودی", dot: "#6b3a22", texture: "walnut", image: "" },
      { id: "oak", title: "بلوط روشن", dot: "#8a5a1f", texture: "oak", image: "" },
    ],
  },
  {
    id: "marble",
    no: "02",
    title: "مارول شیت و کاغذ دیواری",
    desc: ["طرح‌های لوکس و مدرن برای", "دکوراسیون داخلی شما"],
    link: "/Products",
    items: [
      { id: "classic", title: "کاغذ دیواری کلاسیک", dot: "#7d6b4f", texture: "floral", image: "" },
      { id: "modern", title: "کاغذ دیواری مدرن", dot: "#e3c9ae", texture: "paper", image: "" },
      { id: "black", title: "مارول مشکی طلایی", dot: "#3b2f2a", texture: "marble-black", image: "" },
      { id: "white", title: "مارول سفید طلایی", dot: "#8a5a1f", texture: "marble-white", image: "" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  آیکن‌ها                                                            */
/* ------------------------------------------------------------------ */

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

function GridIcon() {
  return (
    <svg {...svgProps}>
      <rect x="3.5" y="3.5" width="4" height="4" rx="1" />
      <rect x="10" y="3.5" width="4" height="4" rx="1" />
      <rect x="16.5" y="3.5" width="4" height="4" rx="1" />
      <rect x="3.5" y="10" width="4" height="4" rx="1" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <rect x="16.5" y="10" width="4" height="4" rx="1" />
      <rect x="3.5" y="16.5" width="4" height="4" rx="1" />
      <rect x="10" y="16.5" width="4" height="4" rx="1" />
      <rect x="16.5" y="16.5" width="4" height="4" rx="1" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg {...svgProps}>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg {...svgProps}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg className="smp-chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafWatermark({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 260" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 250C118 190 112 130 130 20" />
        <path d="M130 20C100 36 84 70 90 108C112 90 128 60 130 20Z" />
        <path d="M126 70C150 78 168 102 164 138C140 128 124 102 126 70Z" />
        <path d="M118 128C90 134 70 162 76 198C102 188 118 160 118 128Z" />
        <path d="M120 180C146 184 164 206 160 238C138 230 122 210 120 180Z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  کارت نمونه                                                         */
/* ------------------------------------------------------------------ */

function SwatchCard({ item }) {
  return (
    <li className="smp-card">
      <div className={`smp-card__media smp-tex smp-tex--${item.texture}`}>
        {item.image && <img src={item.image} alt={item.title} loading="lazy" />}
      </div>
      <div className="smp-card__label">
        <span className="smp-card__dot" style={{ background: item.dot }} aria-hidden="true" />
        <span className="smp-card__name">{item.title}</span>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  اسلایدر کارت‌ها: اسکرول لمسی + فلش + نقطه‌های صفحه‌بندی               */
/* ------------------------------------------------------------------ */

function CardsSlider({ items }) {
  const trackRef = useRef(null);
  const metrics = useRef({ step: 1, perView: 1 });
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const cs = getComputedStyle(el);
    const gap = parseFloat(cs.columnGap) || 0;
    const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const cardW = el.firstElementChild.getBoundingClientRect().width;
    if (!cardW) return;
    const step = cardW + gap;
    const perView = Math.max(1, Math.floor((el.clientWidth - pad + gap) / step + 0.05));
    const total = Math.max(1, Math.ceil(items.length / perView));
    metrics.current = { step, perView };

    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    let p = Math.round(pos / (step * perView));
    if (max > 0 && pos >= max - 2) p = total - 1;
    setPages(total);
    setPage(Math.min(total - 1, Math.max(0, p)));
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    update();
    el.addEventListener("scroll", update, { passive: true });
    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } else {
      window.addEventListener("resize", update);
    }
    return () => {
      el.removeEventListener("scroll", update);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (target) => {
    const el = trackRef.current;
    if (!el) return;
    const { step, perView } = metrics.current;
    const p = Math.min(pages - 1, Math.max(0, target));
    // در راست‌چین scrollLeft منفی است
    el.scrollTo({ left: -(p * step * perView), behavior: "smooth" });
  };

  return (
    <div className="smp-slider">
      {pages > 1 && (
        <>
          <button
            type="button"
            className="smp-slider__nav smp-slider__nav--prev"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="نمونه‌های قبلی"
          >
            <Chevron />
          </button>
          <button
            type="button"
            className="smp-slider__nav smp-slider__nav--next"
            onClick={() => goTo(page + 1)}
            disabled={page === pages - 1}
            aria-label="نمونه‌های بعدی"
          >
            <Chevron />
          </button>
        </>
      )}

      <ul className="smp-block__cards" ref={trackRef}>
        {items.map((item) => (
          <SwatchCard key={item.id} item={item} />
        ))}
      </ul>

      {pages > 1 && (
        <div className="smp-slider__dots" role="group" aria-label="صفحه‌بندی نمونه‌ها">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`smp-slider__dot ${i === page ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`صفحه ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  صفحه نمونه                                                         */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "all", title: "همه نمونه‌ها", Icon: GridIcon },
  { id: "cabinet", title: "کابینت و چوب", Icon: LayersIcon },
  { id: "marble", title: "مارول شیت و کاغذ دیواری", Icon: CubeIcon },
];

export default function Sample() {
  const [tab, setTab] = useState("all");
  const shown = sections.filter((s) => tab === "all" || s.id === tab);

  return (
    <main className="smp" dir="rtl">
      {/* ---------------- هیرو ---------------- */}
      <section className="smp-hero" aria-labelledby="smp-hero-title">
        <div className="smp-hero__media">
          <img src={HERO_IMAGE} alt="" />
        </div>

        <div className="smp-hero__text">
          <LeafWatermark className="smp-hero__leaf" />
          <p className="smp-eyebrow">
            <span className="smp-eyebrow__line" aria-hidden="true" />
            نمونه رنگ و متریالِ
          </p>
          <h1 id="smp-hero-title" className="smp-hero__title">چوب سبز</h1>
          <p className="smp-hero__desc">
            <span>انتخابی متنوع از رنگ‌ها و متریال‌های باکیفیت</span>{" "}
            <span>برای خلق فضایی خاص و ماندگار</span>
          </p>
        </div>
      </section>

      <div className="smp-container">
      {/* ---------------- تب‌ها ---------------- */}
      <div className="smp-tabs-wrap">
        <span className="smp-tabs-wrap__line" aria-hidden="true" />
        <div className="smp-tabs" role="tablist" aria-label="دسته‌بندی نمونه‌ها">
          {tabs.map(({ id, title, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={`smp-tab ${tab === id ? "is-active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              <span>{title}</span>
            </button>
          ))}
        </div>
        <span className="smp-tabs-wrap__line" aria-hidden="true" />
      </div>

      {/* ---------------- بخش‌های نمونه ---------------- */}
      {shown.map((section) => (
        <section key={section.id} className="smp-block" aria-labelledby={`smp-${section.id}`}>
          <div className="smp-block__head">
            <p className="smp-block__no">
              {section.no}
              <span className="smp-block__no-line" aria-hidden="true" />
            </p>
            <h2 id={`smp-${section.id}`} className="smp-block__title">{section.title}</h2>
            <p className="smp-block__desc">
              {section.desc.map((line) => (
                <span key={line}>{line} </span>
              ))}
            </p>
          </div>

          <CardsSlider items={section.items} />

          <Link to={section.link} className="smp-outline smp-block__btn">
            مشاهده همه
            <Chevron />
          </Link>
        </section>
      ))}
      </div>

      {/* ---------------- بنر تماس ---------------- */}
      <section className="smp-cta" aria-labelledby="smp-cta-title">
        <div className="smp-cta__media">
          <img src={CTA_IMAGE} alt="" loading="lazy" />
        </div>
        <LeafWatermark className="smp-cta__leaf" />

        <div className="smp-cta__text">
          <p className="smp-eyebrow smp-eyebrow--light">
            <span className="smp-eyebrow__line" aria-hidden="true" />
            برای انتخاب بهتر، مشاوره بگیرید
          </p>
          <h2 id="smp-cta-title" className="smp-cta__title">با ما در ارتباط باشید.</h2>
        </div>

        <Link to="/Contact" className="smp-outline smp-outline--light smp-cta__btn">
          درخواست مشاوره
          <Chevron />
        </Link>
      </section>
    </main>
  );
}
