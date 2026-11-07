
import React, { useEffect, useMemo, useState } from "react";
import "./PortfolioListing.css";

const API_BASE_URL = "http://127.0.0.1:8000";
const PORTFOLIO_API_URL = `${API_BASE_URL}/api/v1/portfolio/`;

const styles = [
  "همه سبک‌ها",
  "مدرن",
  "کلاسیک",
  "نئوکلاسیک",
  "مینیمال",
  "اسکاندیناوی",
  "روستیک",
];

const spaces = [
  "همه فضاها",
  "آشپزخانه",
  "کمد و کلوزت",
  "تی‌وی‌وال",
  "اتاق خواب",
  "ورودی و جاکفشی",
  "روشویی و حمام",
  "کتابخانه و فضای کار",
  "کافی‌بار",
];

const styleLabels = {
  modern: "مدرن",
  classic: "کلاسیک",
  neoclassical: "نئوکلاسیک",
  neo_classic: "نئوکلاسیک",
  minimal: "مینیمال",
  scandinavian: "اسکاندیناوی",
  rustic: "روستیک",
};

const asset = (file) => `/images/Portfolio/${file}`;

const getStyleLabel = (value) => {
  if (!value) return "نامشخص";

  const normalized = String(value).toLowerCase();

  return styleLabels[normalized] || value;
};

const getMediaUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10.2c0 5.1-8 11.1-8 11.1S4 15.3 4 10.2a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <path d="M9 43C12 17 27 5 48 5 47 26 35 43 9 43Z" />
      <path d="M8 49C19 34 30 24 46 13M23 34c-1-8-4-13-9-17M33 25c6 1 10 0 14-3" />
    </svg>
  );
}

export default function Portfolio() {
  const [activeStyle, setActiveStyle] = useState("همه سبک‌ها");
  const [activeSpace, setActiveSpace] = useState("همه فضاها");
  const [page, setPage] = useState(1);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // دریافت نمونه‌کارها از بک‌اند
  useEffect(() => {
    fetch(PORTFOLIO_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("دریافت اطلاعات با مشکل مواجه شد.");
        }

        return response.json();
      })
      .then((data) => {
        const results = Array.isArray(data.results)
          ? data.results
          : [];

        const formattedProjects = results.map((item) => ({
          id: item.id,
          title: item.title || "بدون عنوان",
          description: item.description || "",
          style: getStyleLabel(item.cabinet_type),
          city: item.city || "",
          image: getMediaUrl(item.main_image),
          slug: item.slug || item.id,
          space: item.space || "",
        }));

        setProjects(formattedProjects);
      })
      .catch((err) => {
        setError(err.message || "خطا در دریافت نمونه‌کارها");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // فیلتر نمونه‌کارها
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          (activeStyle === "همه سبک‌ها" ||
            project.style === activeStyle) &&
          (activeSpace === "همه فضاها" ||
            project.space === activeSpace)
      ),
    [projects, activeStyle, activeSpace]
  );

  // صفحه‌بندی
  const pageSize = 6;

  const pageCount = Math.max(
    1,
    Math.ceil(filteredProjects.length / pageSize)
  );

  const visibleProjects = filteredProjects.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const changeFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setActiveStyle("همه سبک‌ها");
    setActiveSpace("همه فضاها");
    setPage(1);
  };

  const hasActiveFilters =
    activeStyle !== "همه سبک‌ها" ||
    activeSpace !== "همه فضاها";

  // تعداد نمونه‌کارهای هر سبک
  const styleCounts = useMemo(
    () =>
      styles.reduce((counts, style) => {
        counts[style] =
          style === "همه سبک‌ها"
            ? projects.length
            : projects.filter(
                (project) => project.style === style
              ).length;

        return counts;
      }, {}),
    [projects]
  );

  // تعداد نمونه‌کارهای هر فضا
  const spaceCounts = useMemo(
    () =>
      spaces.reduce((counts, space) => {
        counts[space] =
          space === "همه فضاها"
            ? projects.length
            : projects.filter(
                (project) => project.space === space
              ).length;

        return counts;
      }, {}),
    [projects]
  );

  return (
    <main className="portfolio-page" dir="rtl">
      <section className="portfolio-intro" aria-labelledby="portfolio-title">
        <img
          src={asset("portfolio-hero-banner.jpg")}
          alt="دکور چوبی با گلدان و دیوارکوب چوبی"
        />

        <div className="portfolio-intro-copy">
          <h1 id="portfolio-title">نمونه‌کارهای چوب سبز</h1>

          <p>
            نگاهی به بخشی از پروژه‌های موفق ما در طراحی و اجرای دکوراسیون داخلی
          </p>
        </div>
      </section>

      <section className="portfolio-filters" aria-label="فیلتر نمونه‌کارها">
        <div className="portfolio-filter-heading">
          <div className="portfolio-filter-heading-mark">
            <LeafMark />
          </div>

          <div>
            <span className="portfolio-eyebrow">
              جست‌وجوی الهام‌بخش
            </span>

            <h2>چه فضایی در ذهن شماست؟</h2>

            <p>
              با انتخاب سبک و نوع فضا، پروژه‌های نزدیک به سلیقه‌تان را پیدا
              کنید.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              className="portfolio-filter-reset"
              type="button"
              onClick={clearFilters}
            >
              پاک‌کردن فیلترها <span>×</span>
            </button>
          )}
        </div>

        <div className="portfolio-filter-group">
          <div className="portfolio-filter-label">
            <span className="portfolio-filter-index">۰۱</span>

            <div>
              <strong>سبک طراحی</strong>
              <small>حال‌وهوای مورد علاقه‌تان</small>
            </div>
          </div>

          <div
            className="portfolio-filter-options"
            role="group"
            aria-label="فیلتر بر اساس سبک طراحی"
          >
            {styles.map((style) => (
              <button
                key={style}
                type="button"
                className={activeStyle === style ? "is-active" : ""}
                aria-pressed={activeStyle === style}
                onClick={() => changeFilter(setActiveStyle)(style)}
              >
                <span>{style}</span>
                <small>{styleCounts[style]}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-filter-divider" />

        <div className="portfolio-filter-group">
          <div className="portfolio-filter-label">
            <span className="portfolio-filter-index">۰۲</span>

            <div>
              <strong>نوع فضا</strong>
              <small>بخشی از خانه که می‌خواهید بسازیم</small>
            </div>
          </div>

          <div
            className="portfolio-filter-options portfolio-space-options"
            role="group"
            aria-label="فیلتر بر اساس نوع فضا"
          >
            {spaces.map((space) => (
              <button
                key={space}
                type="button"
                className={activeSpace === space ? "is-active" : ""}
                aria-pressed={activeSpace === space}
                onClick={() => changeFilter(setActiveSpace)(space)}
              >
                <span>{space}</span>
                <small>{spaceCounts[space]}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="portfolio-projects"
        aria-label="فهرست پروژه‌ها"
        aria-live="polite"
      >
        <div className="portfolio-results-heading">
          <div>
            <span className="portfolio-eyebrow">
              گالری اجراهای چوب سبز
            </span>

            <h2>پروژه‌های منتخب</h2>
          </div>

          <span className="portfolio-results-count">
            {filteredProjects.length.toLocaleString("fa-IR")} پروژه <i />
          </span>
        </div>

        {loading ? (
          <p className="portfolio-empty">
            در حال دریافت نمونه‌کارها...
          </p>
        ) : error ? (
          <p className="portfolio-empty">
            {error}
          </p>
        ) : visibleProjects.length ? (
          <div className="portfolio-project-grid">
            {visibleProjects.map((project) => (
              <article
                className="portfolio-project-card"
                key={project.id}
              >
                <a
                  className="portfolio-project-image"
                  href={`/portfolio/${project.slug}`}
                  aria-label={`مشاهده ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title}، نمونه پروژه دکوراسیون چوبی`}
                    loading="lazy"
                  />

                  {project.space && (
                    <span className="portfolio-project-tag">
                      {project.space}
                    </span>
                  )}
                </a>

                <div className="portfolio-project-info">
                  <div className="portfolio-project-heading">
                    <h3>
                      <a href={`/portfolio/${project.slug}`}>
                        {project.title}
                      </a>
                    </h3>

                    <a
                      className="portfolio-project-open"
                      href={`/portfolio/${project.slug}`}
                      aria-label={`مشاهده پروژه ${project.title}`}
                    >
                      <span aria-hidden="true">‹</span>
                    </a>
                  </div>

                  <div className="portfolio-project-meta">
                    <span>{project.style}</span>

                    <i aria-hidden="true">|</i>

                    <span className="portfolio-project-location">
                      <PinIcon />
                      {project.city}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="portfolio-empty">
            در این دسته‌بندی هنوز نمونه‌کاری ثبت نشده است.
          </p>
        )}
      </section>

      {!loading && !error && pageCount > 1 && (
        <nav
          className="portfolio-pagination"
          aria-label="صفحه‌بندی نمونه‌کارها"
        >
          <button
            type="button"
            aria-label="صفحه قبلی"
            disabled={page === 1}
            onClick={() =>
              setPage((value) => Math.max(1, value - 1))
            }
          >
            ‹
          </button>

          {Array.from(
            { length: pageCount },
            (_, index) => index + 1
          ).map((number) => (
            <button
              key={number}
              type="button"
              className={page === number ? "is-active" : ""}
              aria-current={page === number ? "page" : undefined}
              onClick={() => setPage(number)}
            >
              {number.toLocaleString("fa-IR")}
            </button>
          ))}

          <button
            type="button"
            aria-label="صفحه بعدی"
            disabled={page === pageCount}
            onClick={() =>
              setPage((value) => Math.min(pageCount, value + 1))
            }
          >
            ›
          </button>
        </nav>
      )}

      <section
        className="portfolio-contact-banner"
        aria-label="درخواست مشاوره برای پروژه بعدی"
      >
        <img
          src={asset("portfolio-contact-banner.jpg")}
          alt="کنسول چوبی و دکور گیاهی در فضای داخلی"
          loading="lazy"
        />

        <div className="portfolio-contact-copy">
          <h2>پروژه بعدی می‌تواند خانه شما باشد</h2>

          <p>
            برای مشاوره و دریافت ایده‌های بیشتر با ما در ارتباط باشید.
          </p>

          <a href="/contact">
            درخواست مشاوره <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
