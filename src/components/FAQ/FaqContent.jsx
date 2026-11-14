// src/components/FAQ/FaqContent.jsx
import { useState, useMemo, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import FaqSidebar from "./FaqSidebar";
import FaqItem from "./FaqItem";
import { categories, faqs } from "./data/faqData";
import "./FaqContent.css";

/* یکسان‌سازی «ي» و «ك» عربی با «ی» و «ک» فارسی برای جستجو */
const normalize = (s) =>
  s.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase().trim();

const fa = (n) => n.toLocaleString("fa-IR");

const matches = (item, q) =>
  !q || normalize(`${item.question} ${item.answer}`).includes(q);

/* آدرس صفحه را با شناسه سوال باز عوض می‌کند (بدون رفرش) */
const setHash = (id) => {
  const url = id
    ? `#faq-${id}`
    : window.location.pathname + window.location.search;
  window.history.replaceState(window.history.state, "", url);
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

const FaqContent = () => {
  const [activeCat, setActiveCat] = useState("all");
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");

  const q = normalize(query);

  /* لینک مستقیم: /faq#faq-3 همان سوال را باز می‌کند */
  useEffect(() => {
    const m = window.location.hash.match(/^#faq-(\d+)$/);
    if (!m) return;
    const id = Number(m[1]);
    if (!faqs.some((f) => f.id === id)) return;
    setOpenId(id);
    requestAnimationFrame(() => {
      document
        .getElementById(`faq-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, []);

  const counts = useMemo(() => {
    const base = faqs.filter((f) => matches(f, q));
    const result = { all: base.length };
    categories.forEach((c) => {
      if (c.id !== "all") {
        result[c.id] = base.filter((f) => f.category === c.id).length;
      }
    });
    return result;
  }, [q]);

  const filtered = useMemo(
    () =>
      faqs.filter(
        (f) =>
          (activeCat === "all" || f.category === activeCat) && matches(f, q)
      ),
    [activeCat, q]
  );

  const handleCategory = (id) => {
    setActiveCat(id);
    setOpenId(null);
    setHash(null);
  };

  const handleToggle = (id) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    setHash(next);
  };

  const resetAll = () => {
    setQuery("");
    setActiveCat("all");
    setOpenId(null);
    setHash(null);
  };

  return (
    <section className="faq-content" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
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
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenId(null);
                setHash(null);
              }}
              onKeyDown={(e) => e.key === "Escape" && setQuery("")}
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
            {q
              ? `${fa(filtered.length)} نتیجه برای «${query.trim()}»`
              : `${fa(filtered.length)} سوال`}
          </p>

          <div className="faq-content__list">
            {filtered.length ? (
              filtered.map((item, i) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={i}
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
          categories={categories}
          active={activeCat}
          onChange={handleCategory}
          counts={counts}
        />
      </div>
    </section>
  );
};

export default FaqContent;