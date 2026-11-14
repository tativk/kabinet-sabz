import { useEffect, useMemo, useState } from "react";
import {
  FiAward,
  FiArrowLeft,
  FiChevronDown,
  FiCreditCard,
  FiDollarSign,
  FiFeather,
  FiGrid,
  FiHeadphones,
  FiMoreHorizontal,
  FiPackage,
  FiRotateCcw,
  FiSearch,
  FiShield,
  FiShoppingCart,
  FiTruck,
  FiX,
} from "react-icons/fi";
import "./FAQ.css";

const categories = [
  { id: "all", label: "همه سوالات", icon: "grid" },
  { id: "order", label: "خرید و سفارش", icon: "cart" },
  { id: "quality", label: "محصولات و کیفیت", icon: "award" },
  { id: "shipping", label: "ارسال و تحویل", icon: "truck" },
  { id: "warranty", label: "گارانتی و خدمات پس از فروش", icon: "shield" },
  { id: "other", label: "سایر موارد", icon: "more" },
];

const faqs = [
  {
    id: 1,
    category: "order",
    icon: "cart",
    question: "چگونه می‌توانم از سایت خرید کنم؟",
    answer:
      "محصول مورد نظر را به سبد خرید اضافه کنید، اطلاعات ارسال را وارد کنید و پس از انتخاب روش پرداخت، سفارش خود را نهایی کنید.",
  },
  {
    id: 2,
    category: "order",
    icon: "return",
    question: "آیا امکان بازگشت کالا وجود دارد؟",
    answer:
      "بله، تا ۷ روز پس از دریافت کالا و در صورت سالم بودن بسته‌بندی و عدم استفاده، امکان بازگشت کالا وجود دارد.",
  },
  {
    id: 3,
    category: "shipping",
    icon: "truck",
    question: "مدت زمان ارسال سفارش چقدر است؟",
    answer:
      "سفارش‌ها معمولاً ظرف ۲ تا ۵ روز کاری به دست شما می‌رسند. زمان دقیق بسته به شهر مقصد متفاوت است.",
  },
  {
    id: 4,
    category: "warranty",
    icon: "shield",
    question: "آیا محصولات شما دارای گارانتی هستند؟",
    answer:
      "بله، تمامی محصولات دارای گارانتی اصالت و سلامت فیزیکی هستند و مدت گارانتی در صفحه هر محصول ذکر شده است.",
  },
  {
    id: 5,
    category: "order",
    icon: "box",
    question: "چگونه می‌توانم وضعیت سفارش خود را پیگیری کنم؟",
    answer:
      "از بخش «پیگیری سفارش» در حساب کاربری یا با استفاده از کد رهگیری ارسال‌شده از طریق پیامک، وضعیت سفارش را ببینید.",
  },
  {
    id: 6,
    category: "order",
    icon: "card",
    question: "آیا امکان خرید اقساطی وجود دارد؟",
    answer:
      "بله، برای برخی محصولات امکان خرید اقساطی فراهم است. گزینه اقساط در مرحله پرداخت نمایش داده می‌شود.",
  },
  {
    id: 7,
    category: "shipping",
    icon: "wallet",
    question: "هزینه ارسال چقدر است؟",
    answer:
      "هزینه ارسال بر اساس وزن و مقصد محاسبه می‌شود و قبل از پرداخت نهایی به شما نمایش داده خواهد شد.",
  },
  {
    id: 8,
    category: "other",
    icon: "card",
    question: "روش‌های پرداخت در سایت کدامند؟",
    answer:
      "پرداخت آنلاین با کارت‌های بانکی عضو شتاب و پرداخت در محل (در برخی شهرها) امکان‌پذیر است.",
  },
];

const categoryIcons = {
  grid: FiGrid,
  cart: FiShoppingCart,
  award: FiAward,
  truck: FiTruck,
  shield: FiShield,
  more: FiMoreHorizontal,
};

const questionIcons = {
  cart: FiShoppingCart,
  return: FiRotateCcw,
  truck: FiTruck,
  shield: FiShield,
  box: FiPackage,
  card: FiCreditCard,
  wallet: FiDollarSign,
};

const normalize = (value) =>
  value.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase().trim();

const toPersianNumber = (number) => number.toLocaleString("fa-IR");

const matchesQuestion = (item, query) =>
  !query || normalize(`${item.question} ${item.answer}`).includes(query);

function FaqHero() {
  return (
    <section className="faq-hero" dir="rtl" aria-labelledby="faq-hero-title">
      <img
        className="faq-hero__image"
        src="/images/FAQ/faq-hero.jpg"
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
          سوالات متداول
        </h1>
        <div className="faq-hero__subtitle-wrap">
          <p className="faq-hero__subtitle">پاسخ به پرسش‌های رایج شما</p>
          <span className="faq-hero__line" />
        </div>
        <span className="faq-hero__accent" />
      </div>

      <div className="faq-hero__fade" />
    </section>
  );
}

function FaqItem({ item, index, isOpen, onToggle }) {
  const Icon = questionIcons[item.icon] || FiShoppingCart;

  return (
    <div
      id={`faq-${item.id}`}
      className={`faq-item ${isOpen ? "is-open" : ""}`}
      style={{ "--i": index }}
    >
      <h2 className="faq-item__heading">
        <button
          type="button"
          id={`faq-btn-${item.id}`}
          className="faq-item__head"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${item.id}`}
        >
          <span className="faq-item__icon">
            <Icon />
          </span>
          <span className="faq-item__question">{item.question}</span>
          <FiChevronDown className="faq-item__chevron" />
        </button>
      </h2>

      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="faq-item__body"
        inert={!isOpen}
      >
        <div className="faq-item__body-inner">
          <p className="faq-item__answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FaqSidebar({ active, onChange, counts }) {
  return (
    <aside className="faq-sidebar">
      <div className="faq-cats">
        <div className="faq-cats__title">
          <h3>دسته‌بندی‌ها</h3>
          <FiFeather />
        </div>

        <ul className="faq-cats__list">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon];
            const isActive = active === category.id;

            return (
              <li key={category.id}>
                <button
                  type="button"
                  className={`faq-cats__btn ${isActive ? "is-active" : ""}`}
                  onClick={() => onChange(category.id)}
                  aria-pressed={isActive}
                >
                  <Icon className="faq-cats__icon" />
                  <span className="faq-cats__label">{category.label}</span>
                  <span className="faq-cats__count">
                    {toPersianNumber(counts[category.id] ?? 0)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="faq-help">
        <img
          className="faq-help__leaf"
          src="/images/FAQ/faq-leaf.png"
          alt=""
          aria-hidden="true"
        />
        <div className="faq-help__text">
          <FiHeadphones className="faq-help__icon" />
          <h4>نیاز به راهنمایی بیشتر دارید؟</h4>
          <p>با پشتیبانی ما در ارتباط باشید</p>
        </div>
        <a href="/Contact" className="faq-help__btn">
          <FiArrowLeft />
          <span>تماس با ما</span>
        </a>
      </div>
    </aside>
  );
}

function FaqContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query);

  const updateHash = (id) => {
    const url = id
      ? `#faq-${id}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(window.history.state, "", url);
  };

  useEffect(() => {
    const match = window.location.hash.match(/^#faq-(\d+)$/);
    if (!match) return;

    const id = Number(match[1]);
    if (!faqs.some((faq) => faq.id === id)) return;

    setOpenId(id);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`faq-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const counts = useMemo(() => {
    const base = faqs.filter((faq) =>
      matchesQuestion(faq, normalizedQuery)
    );
    const result = { all: base.length };

    categories.forEach((category) => {
      if (category.id !== "all") {
        result[category.id] = base.filter(
          (faq) => faq.category === category.id
        ).length;
      }
    });

    return result;
  }, [normalizedQuery]);

  const filteredFaqs = useMemo(
    () =>
      faqs.filter(
        (faq) =>
          (activeCategory === "all" || faq.category === activeCategory) &&
          matchesQuestion(faq, normalizedQuery)
      ),
    [activeCategory, normalizedQuery]
  );

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenId(null);
    updateHash(null);
  };

  const handleToggle = (id) => {
    const nextId = openId === id ? null : id;
    setOpenId(nextId);
    updateHash(nextId);
  };

  const resetAll = () => {
    setQuery("");
    setActiveCategory("all");
    setOpenId(null);
    updateHash(null);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className="faq-content" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="faq-content__inner">
        <div className="faq-content__main">
          <div className="faq-search">
            <FiSearch className="faq-search__icon" aria-hidden="true" />
            <input
              type="text"
              className="faq-search__input"
              placeholder="سوال خود را جستجو کنید..."
              aria-label="جستجو در سوالات متداول"
              inputMode="search"
              enterKeyHint="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpenId(null);
                updateHash(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
              }}
            />
            {query && (
              <button
                type="button"
                className="faq-search__clear"
                onClick={() => setQuery("")}
                aria-label="پاک کردن جستجو"
              >
                <FiX />
              </button>
            )}
          </div>

          <p className="faq-content__meta" aria-live="polite">
            {normalizedQuery
              ? `${toPersianNumber(filteredFaqs.length)} نتیجه برای «${query.trim()}»`
              : `${toPersianNumber(filteredFaqs.length)} سوال`}
          </p>

          <div className="faq-content__list">
            {filteredFaqs.length ? (
              filteredFaqs.map((item, index) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={index}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))
            ) : (
              <div className="faq-content__empty">
                <p>سوالی با این مشخصات پیدا نشد.</p>
                <button type="button" onClick={resetAll}>
                  نمایش همه سوالات
                </button>
              </div>
            )}
          </div>
        </div>

        <FaqSidebar
          active={activeCategory}
          onChange={handleCategoryChange}
          counts={counts}
        />
      </div>
    </section>
  );
}

function FaqCta() {
  return (
    <section className="faq-cta" dir="rtl">
      <div className="faq-cta__box">
        <img className="faq-cta__image" src="/images/FAQ/faq-cta.jpg" alt="" />
        <div className="faq-cta__shade" />
        <div className="faq-cta__content">
          <h2 className="faq-cta__title">هنوز سوالی دارید؟</h2>
          <p className="faq-cta__text">همیشه آماده پاسخگویی به شما هستیم</p>
          <a href="/Contact" className="faq-cta__btn">
            <FiArrowLeft />
            <span>تماس با پشتیبانی</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function FAQ() {
  return (
    <main className="faq-page" dir="rtl">
      <FaqHero />
      <FaqContent />
      <FaqCta />
    </main>
  );
}
