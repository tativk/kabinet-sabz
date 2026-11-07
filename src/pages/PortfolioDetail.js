import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  {
    icon: "detail-material.png",
    label: "نوع متریال",
    value: "MDF با روکش ضد خش",
  },
  { icon: "detail-design.png", label: "نوع طراحی", value: "مدرن و مینیمال" },
  {
    icon: "detail-color.png",
    label: "رنگ‌بندی",
    value: "سبز زیتونی و چوب گردویی",
  },
];

const API_BASE_URL = "http://127.0.0.1:8000";

const getMediaUrl = (url) => {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const formatReviewDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("fa-IR");
};

export default function Portfolio() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeReview, setActiveReview] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    customer_name: "",
    role: "",
    comment: "",
    rating: 5,
  });

  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");

  // دریافت اطلاعات پروژه از بک‌اند
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");
    setProject(null);

    fetch(`${API_BASE_URL}/api/v1/portfolio/${slug}/`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "نمونه‌کار موردنظر پیدا نشد."
              : "دریافت اطلاعات پروژه با مشکل مواجه شد.",
          );
        }

        return response.json();
      })
      .then((data) => {
        setProject(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message || "ارتباط با سرور برقرار نشد.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [slug]);

  // با تغییر پروژه، اسلایدر نظرات از ابتدا شروع شود
  useEffect(() => {
    setActiveReview(0);
    setLightboxIndex(null);
  }, [slug]);

  // دریافت نظرات واقعی همان پروژه
  const reviews = (project?.reviews || []).map((review) => ({
    id: review.id,
    name: review.customer_name,
    role: review.role,
    quote: review.comment,
    date: formatReviewDate(review.created_at),
    photo: getMediaUrl(review.photo),
    rating: review.rating,
  }));

  const activeReviewIndex = reviews[activeReview] ? activeReview : 0;
  const currentReview = reviews[activeReviewIndex];

  // دریافت تصاویر پروژه
  const galleryImages = project?.main_image
    ? [getMediaUrl(project.main_image)]
    : projectImages;

  // تغییر نظر مشتری
  const changeReview = (direction) => {
    if (reviews.length === 0) return;

    setActiveReview(
      (current) => (current + direction + reviews.length) % reviews.length,
    );
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    setReviewMessage("");
    setReviewError("");

    if (!reviewForm.customer_name.trim() || !reviewForm.comment.trim()) {
      setReviewError("لطفاً نام و متن نظر را وارد کنید.");
      return;
    }

    setReviewSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/portfolio/${slug}/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewForm),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.detail ||
          Object.values(data).flat().join(" ") ||
          "ثبت نظر با مشکل مواجه شد.";

        throw new Error(errorMessage);
      }

      setReviewMessage(
        "نظر شما با موفقیت ثبت شد و پس از تأیید مدیر در سایت نمایش داده می‌شود.",
      );

      setReviewForm({
        customer_name: "",
        role: "",
        comment: "",
        rating: 5,
      });
    } catch (err) {
      setReviewError(err.message || "ارتباط با سرور برقرار نشد.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  // کنترل نمایش تمام‌صفحه تصاویر
  useEffect(() => {
    if (lightboxIndex === null || galleryImages.length === 0) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % galleryImages.length);
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (current) =>
            (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, galleryImages.length]);

  // وضعیت دریافت اطلاعات پروژه
  if (loading) {
    return (
      <main className="portfolio-page" dir="rtl">
        <p className="portfolio-empty">در حال دریافت اطلاعات پروژه...</p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="portfolio-page" dir="rtl">
        <p className="portfolio-empty">
          {error || "نمونه‌کار موردنظر پیدا نشد."}
        </p>
        <a href="/portfolio">بازگشت به نمونه‌کارها</a>
      </main>
    );
  }

  const currentRating = currentReview
    ? Math.min(5, Math.max(1, Number(currentReview.rating) || 5))
    : 5;

  return (
    <main className="portfolio-page" dir="rtl">
      {/* Project introduction */}
      <section
        className="portfolio-hero"
        aria-labelledby="portfolio-project-title"
      >
        <div className="portfolio-hero-photo">
          <img
            src={
              getMediaUrl(project.main_image) ||
              "/images/Portfolio/portfolio-hero-from-wireframe.jpg"
            }
            alt="نمای کلی پروژه"
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
          style={{
            backgroundImage:
              "url('/images/Portfolio/portfolio-hero-info-background.png')",
          }}
        >
          <nav className="portfolio-breadcrumb" aria-label="مسیر صفحه">
            <a href="/" className="portfolio-home-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m3.5 10 8.5-7 8.5 7" />
                <path d="M5.5 9v11h13V9M9.5 20v-6h5v6" />
              </svg>
              <span>خانه</span>
            </a>

            <i>‹</i>
            <a href="/portfolio">نمونه‌کارها</a>
            <i>‹</i>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="portfolio-project-copy">
            <span className="portfolio-eyebrow">نمونه‌کار منتخب چوب سبز</span>

            <h1 id="portfolio-project-title">{project.title}</h1>

            <p>
              {project.description || "توضیحی برای این پروژه ثبت نشده است."}
            </p>
          </div>

          <div className="portfolio-hero-specs">
            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon">
                <img src="/icon/Portfolio/hero-design.png" alt="" />
              </span>

              <strong>سبک طراحی:</strong>

              <span>
                {{
                  modern: "مدرن",
                  classic: "کلاسیک",
                  neoclassical: "نئوکلاسیک",
                  neo_classic: "نئوکلاسیک",
                  minimal: "مینیمال",
                  scandinavian: "اسکاندیناوی",
                  rustic: "روستیک",
                }[project.cabinet_type] ||
                  project.cabinet_type ||
                  "ثبت نشده"}
              </span>
            </div>

            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon">
                <img src="/icon/Portfolio/hero-material.png" alt="" />
              </span>

              <strong>متریال:</strong>
              <span>MDF ضد خش</span>
            </div>

            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon">
                <img src="/icon/Portfolio/hero-time.png" alt="" />
              </span>

              <strong>زمان اجرا:</strong>
              <span>۲۰ روز کاری</span>
            </div>

            <div className="portfolio-hero-spec">
              <span className="portfolio-spec-icon">
                <img src="/icon/Portfolio/hero-location.png" alt="" />
              </span>

              <strong>موقعیت پروژه:</strong>
              <span>{project.city || "ثبت نشده"}</span>
            </div>
          </div>

          <a className="portfolio-hero-button" href="#portfolio-contact">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="16" rx="2" />
              <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h2M14 13h2M8 17h2" />
            </svg>
            ثبت درخواست مشابه این پروژه
          </a>

          <span className="portfolio-leaf-decoration" aria-hidden="true">
            ❧
          </span>
        </div>
      </section>

      {/* Project gallery */}
      <section
        className="portfolio-gallery-section"
        aria-labelledby="portfolio-gallery-title"
      >
        <div className="portfolio-section-heading">
          <span />
          <h2 id="portfolio-gallery-title">گالری تصاویر پروژه</h2>
          <span />
        </div>

        <div className="portfolio-gallery-grid">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              className="portfolio-gallery-item"
              key={image}
              onClick={() => setLightboxIndex(index)}
              aria-label={`نمایش تصویر ${index + 1} پروژه`}
            >
              <img
                src={image}
                alt={`جزئیات شماره ${index + 1} از پروژه`}
                loading="lazy"
              />

              <span className="portfolio-gallery-zoom" aria-hidden="true">
                ⌕
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Project details */}
      <section
        className="portfolio-details"
        aria-labelledby="portfolio-details-title"
      >
        <h2 id="portfolio-details-title">مشخصات بیشتر پروژه</h2>

        <div className="portfolio-details-grid">
          {projectDetails.map((detail) => (
            <div className="portfolio-detail-item" key={detail.label}>
              <span className="portfolio-detail-icon" aria-hidden="true">
                <img src={`/icon/Portfolio/${detail.icon}`} alt="" />
              </span>

              <h3>{detail.label}</h3>
              <p>{detail.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer review slider */}
      {reviews.length > 0 && currentReview && (
        <section
          className="portfolio-reviews"
          aria-labelledby="portfolio-reviews-title"
        >
          <div className="portfolio-section-heading">
            <span />
            <h2 id="portfolio-reviews-title">نظرات مشتریان</h2>
            <span />
          </div>

          <div className="portfolio-review-card">
            <div className="portfolio-review-person">
              {currentReview.photo && (
                <img
                  src={currentReview.photo}
                  alt={`تصویر ${currentReview.name}`}
                  loading="lazy"
                />
              )}
            </div>

            <div className="portfolio-review-identity">
              <h3>{currentReview.name}</h3>

              <div
                className="portfolio-stars"
                aria-label={`${currentRating} از ۵ ستاره`}
              >
                {"★ ".repeat(currentRating)}
                {"☆ ".repeat(5 - currentRating)}
              </div>
            </div>

            <p className="portfolio-review-quote">{currentReview.quote}</p>

            <div className="portfolio-review-date">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="5" width="17" height="16" rx="2" />
                <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17M8 13h2M14 13h2M8 17h2" />
              </svg>

              {currentReview.date}
            </div>

            {reviews.length > 1 && (
              <div className="portfolio-review-arrows">
                <button
                  type="button"
                  onClick={() => changeReview(-1)}
                  aria-label="نظر قبلی"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => changeReview(1)}
                  aria-label="نظر بعدی"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {reviews.length > 1 && (
            <div className="portfolio-review-dots" aria-label="انتخاب نظر">
              {reviews.map((review, index) => (
                <button
                  key={review.id}
                  type="button"
                  className={activeReviewIndex === index ? "active" : ""}
                  onClick={() => setActiveReview(index)}
                  aria-label={`نمایش نظر ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Customer review form */}
      <section
        className="portfolio-review-form"
        aria-labelledby="portfolio-review-form-title"
      >
        <div className="portfolio-section-heading">
          <span />
          <h2 id="portfolio-review-form-title">نظر شما درباره این پروژه</h2>
          <span />
        </div>

        <form onSubmit={handleReviewSubmit}>
          <div className="portfolio-review-form-group">
            <label htmlFor="review-customer-name">نام شما</label>
            <input
              id="review-customer-name"
              type="text"
              value={reviewForm.customer_name}
              onChange={(event) =>
                setReviewForm((current) => ({
                  ...current,
                  customer_name: event.target.value,
                }))
              }
              placeholder="نام خود را وارد کنید"
              required
              maxLength={150}
            />
          </div>

          <div className="portfolio-review-form-group">
            <label htmlFor="review-role">عنوان شما (اختیاری)</label>
            <input
              id="review-role"
              type="text"
              value={reviewForm.role}
              onChange={(event) =>
                setReviewForm((current) => ({
                  ...current,
                  role: event.target.value,
                }))
              }
              placeholder="مثلاً کارفرمای پروژه کابینت"
              maxLength={150}
            />
          </div>

          <div className="portfolio-review-form-group portfolio-rating-group">
            <label>امتیاز شما</label>

            <div className="portfolio-rating-picker" dir="rtl">
              <div className="portfolio-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      star <= reviewForm.rating
                        ? "portfolio-rating-star active"
                        : "portfolio-rating-star"
                    }
                    onClick={() =>
                      setReviewForm((current) => ({
                        ...current,
                        rating: star,
                      }))
                    }
                    aria-label={`امتیاز ${star} از ۵`}
                    aria-pressed={reviewForm.rating === star}
                  >
                    ★
                  </button>
                ))}
              </div>

              <span className="portfolio-rating-value">
                {reviewForm.rating} از ۵
              </span>
            </div>
          </div>

          <div className="portfolio-review-form-group">
            <label htmlFor="review-comment">متن نظر شما</label>
            <textarea
              id="review-comment"
              value={reviewForm.comment}
              onChange={(event) =>
                setReviewForm((current) => ({
                  ...current,
                  comment: event.target.value,
                }))
              }
              placeholder="تجربه خود از این پروژه را بنویسید..."
              required
              rows={5}
            />
          </div>

          {reviewError && <p className="portfolio-empty">{reviewError}</p>}

          {reviewMessage && <p className="portfolio-empty">{reviewMessage}</p>}

          <button
            type="submit"
            className="portfolio-review-submit"
            disabled={reviewSubmitting}
          >
            {reviewSubmitting ? "در حال ارسال..." : "ثبت نظر"}
          </button>
        </form>
      </section>

      {/* Contact banner */}
      <section
        className="portfolio-cta"
        id="portfolio-contact"
        aria-label="آیا به دنبال اجرای مشابه این پروژه هستید؟ برای دریافت مشاوره و ثبت سفارش، همین حالا اقدام کنید."
      >
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

      {/* Image lightbox */}
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="نمایش تصویر پروژه"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxIndex(null);
            }
          }}
        >
          <button
            type="button"
            className="portfolio-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="بستن"
          >
            ×
          </button>

          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-prev"
            onClick={() =>
              setLightboxIndex(
                (current) =>
                  (current - 1 + galleryImages.length) % galleryImages.length,
              )
            }
            aria-label="تصویر قبلی"
          >
            ‹
          </button>

          <img
            src={galleryImages[lightboxIndex]}
            alt={`تصویر بزرگ پروژه ${lightboxIndex + 1}`}
          />

          <button
            type="button"
            className="portfolio-lightbox-arrow portfolio-lightbox-next"
            onClick={() =>
              setLightboxIndex(
                (current) => (current + 1) % galleryImages.length,
              )
            }
            aria-label="تصویر بعدی"
          >
            ›
          </button>

          <span className="portfolio-lightbox-count">
            {lightboxIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}
    </main>
  );
}
