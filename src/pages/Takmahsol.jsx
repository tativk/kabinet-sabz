import { useState } from "react";

import {
  FiArrowLeft,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiImage,
  FiInfo,
  FiFeather,
  FiMessageCircle,
  FiMinus,
  FiPlus,
  FiShare2,
  FiShield,
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiZoomIn,
  FiHeadphones,
} from "react-icons/fi";

import "./Takmahsol.css";

const productImages = [
  "",
  "",
  "",
  "",
  "",
];

const colors = [
  { name: "کرم", value: "#D9B995" },
  { name: "قهوه‌ای روشن", value: "#A66C3F" },
  { name: "گردویی", value: "#704323" },
  { name: "زیتونی", value: "#626B48" },
  { name: "ذغالی", value: "#55534D" },
];

const relatedProducts = [
  {
    id: 1,
    name: "میز جلو مبلی چوبی",
    image: "",
  },
  {
    id: 2,
    name: "کتابخانه چوبی مدرن",
    image: "",
  },
  {
    id: 3,
    name: "میز کنسول چوبی",
    image: "",
  },
  {
    id: 4,
    name: "میز ناهارخوری مدرن",
    image: "",
  },
];

const tabs = [
  { id: "description", label: "توضیحات محصول" },
  { id: "specifications", label: "مشخصات فنی" },
  { id: "reviews", label: "نظرات کاربران" },
  { id: "faq", label: "سؤالات متداول" },
];

function ProductImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`product-image ${className}`}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="product-image-fallback">
          <FiImage />
          <span>تصویر محصول</span>
        </div>
      )}
    </div>
  );
}

function Takmahsol() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[3]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const changeImage = (direction) => {
    setActiveImage((previous) => {
      if (direction === "next") {
        return (previous + 1) % productImages.length;
      }

      return (
        (previous - 1 + productImages.length) %
        productImages.length
      );
    });
  };

  const handleAddToCart = () => {
    setNotice(
      `${quantity} عدد با رنگ ${selectedColor.name} انتخاب شد.`
    );

    window.clearTimeout(window.productNoticeTimer);

    window.productNoticeTimer = window.setTimeout(() => {
      setNotice("");
    }, 3500);
  };

  const handleShare = async () => {
    const shareData = {
      title: "محصول چوب سبز",
      text: "مشاهده جزئیات محصول",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        setNotice("لینک صفحه کپی شد.");
      }
    } catch {
      // اشتراک‌گذاری توسط کاربر لغو شده است.
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "specifications":
        return (
          <div className="product-spec-grid">
            <div>
              <span>جنس بدنه</span>
              <strong>اطلاعات محصول</strong>
            </div>

            <div>
              <span>سبک طراحی</span>
              <strong>اطلاعات محصول</strong>
            </div>

            <div>
              <span>نوع پوشش</span>
              <strong>اطلاعات محصول</strong>
            </div>

            <div>
              <span>رنگ انتخابی</span>
              <strong>{selectedColor.name}</strong>
            </div>

            <div>
              <span>کاربری</span>
              <strong>اطلاعات محصول</strong>
            </div>

            <div>
              <span>وضعیت موجودی</span>
              <strong>نیازمند استعلام</strong>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="product-review-empty">
            <FiMessageCircle />

            <h3>
              هنوز نظری برای این محصول ثبت نشده است
            </h3>

            <p>
              پس از ثبت خرید، می‌توانید تجربه خود را با دیگران
              به اشتراک بگذارید.
            </p>
          </div>
        );

      case "faq": {
        const questions = [
          {
            q: "چطور از محصول نگهداری کنم؟",
            a: "روش نگهداری به جنس و پوشش نهایی محصول بستگی دارد. برای دریافت راهنمایی دقیق با پشتیبانی تماس بگیرید.",
          },
          {
            q: "آیا امکان انتخاب رنگ وجود دارد؟",
            a: "رنگ‌های قابل سفارش بر اساس گزینه‌های فعال و موجودی محصول مشخص می‌شوند.",
          },
          {
            q: "شرایط ارسال محصول چگونه است؟",
            a: "زمان و هزینه ارسال بر اساس شهر مقصد و ابعاد محصول مشخص خواهد شد.",
          },
        ];

        return (
          <div className="product-faq-list">
            {questions.map((item, index) => (
              <div className="product-faq-item" key={item.q}>
                <button
                  type="button"
                  aria-expanded={openFaq === index}
                  onClick={() =>
                    setOpenFaq(openFaq === index ? -1 : index)
                  }
                >
                  <span>{item.q}</span>
                  <FiPlus />
                </button>

                {openFaq === index && <p>{item.a}</p>}
              </div>
            ))}
          </div>
        );
      }

      default:
        return (
          <div className="product-description-content">
            <div>
              <h3>معرفی محصول</h3>

              <p>
                در این قسمت توضیحات کامل محصول قرار می‌گیرد.
                اطلاعات مربوط به طراحی، جنس، کاربرد و ویژگی‌های
                محصول باید مطابق مشخصات واقعی آن تکمیل شود.
              </p>

              <ul>
                <li>
                  <FiCheck />
                  طراحی متناسب با فضای داخلی
                </li>

                <li>
                  <FiCheck />
                  توجه به کیفیت ساخت
                </li>

                <li>
                  <FiCheck />
                  امکان بررسی گزینه‌های سفارش
                </li>
              </ul>
            </div>

            <ProductImage
              src=""
              alt="جزئیات محصول"
              className="product-description-image"
            />
          </div>
        );
    }
  };

  return (
    <main className="product-page" dir="rtl">
      <div className="product-page-inner">

        {/* مسیر راهنما */}
        <nav className="product-breadcrumb">
          <a href="/">خانه</a>
          <FiChevronLeft />

          <a href="/shop">فروشگاه</a>
          <FiChevronLeft />

          <a href="/shop/category/furniture">
            مبلمان چوبی
          </a>

          <FiChevronLeft />

          <span>صندلی پذیرایی مدرن</span>
        </nav>

        {/* بخش اصلی محصول */}
        <section className="product-main-section">

          {/* گالری تصاویر */}
          <div className="product-gallery">
            <div className="product-main-image-wrap">

              <ProductImage
                src={productImages[activeImage]}
                alt="تصویر محصول"
                className="product-main-image"
              />

              <span className="product-status-badge">
                محصول منتخب
              </span>

              <button
                type="button"
                className="product-zoom-button"
                aria-label="بزرگ‌نمایی تصویر"
                onClick={() => setIsLightboxOpen(true)}
              >
                <FiZoomIn />
              </button>

              <button
                type="button"
                className="product-gallery-arrow product-gallery-prev"
                aria-label="تصویر قبلی"
                onClick={() => changeImage("prev")}
              >
                <FiChevronRight />
              </button>

              <button
                type="button"
                className="product-gallery-arrow product-gallery-next"
                aria-label="تصویر بعدی"
                onClick={() => changeImage("next")}
              >
                <FiChevronLeft />
              </button>
            </div>

            <div className="product-thumbnails">
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={
                    activeImage === index ? "active" : ""
                  }
                  onClick={() => setActiveImage(index)}
                  aria-label={`تصویر شماره ${index + 1}`}
                  aria-pressed={activeImage === index}
                >
                  <ProductImage
                    src={image}
                    alt={`نمای ${index + 1} محصول`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="product-info">

            <div className="product-category-label">
              مبلمان چوبی / صندلی
            </div>

            <h1>صندلی پذیرایی مدرن</h1>

            <div className="product-rating-row">
              <span className="product-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} />
                ))}
              </span>

              <a
                href="#product-tabs"
                onClick={() => setActiveTab("reviews")}
              >
                مشاهده نظرات
              </a>
            </div>

            <p className="product-short-description">
              طراحی مدرن و کاربردی، مناسب برای فضاهای نشیمن
              و دکوراسیون‌های امروزی.
            </p>

            <div className="product-code-row">
              <span>
                کد محصول: <b>ZG-CH-001</b>
              </span>

              <span className="product-stock">
                <i />
                جهت استعلام موجودی
              </span>
            </div>

            {/* قیمت */}
            <div className="product-price-row">
              <strong className="product-current-price">
                استعلام قیمت
              </strong>

              <span className="product-discount">
                قیمت نهایی پس از تأیید
              </span>
            </div>

            {/* انتخاب رنگ */}
            <div className="product-option-block">
              <div className="product-option-heading">
                <span>انتخاب رنگ:</span>
                <strong>{selectedColor.name}</strong>
              </div>

              <div className="product-color-options">
                {colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    title={color.name}
                    aria-label={`انتخاب رنگ ${color.name}`}
                    aria-pressed={
                      selectedColor.name === color.name
                    }
                    className={
                      selectedColor.name === color.name
                        ? "selected"
                        : ""
                    }
                    onClick={() => setSelectedColor(color)}
                  >
                    <span
                      style={{
                        backgroundColor: color.value,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* تعداد و سبد خرید */}
            <div className="product-purchase-row">
              <div className="product-quantity">
                <button
                  type="button"
                  aria-label="افزایش تعداد"
                  disabled={quantity >= 10}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.min(value + 1, 10)
                    )
                  }
                >
                  <FiPlus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="کاهش تعداد"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.max(value - 1, 1)
                    )
                  }
                >
                  <FiMinus />
                </button>
              </div>

              <button
                type="button"
                className="product-add-cart"
                onClick={handleAddToCart}
              >
                افزودن به سبد خرید
                <FiShoppingCart />
              </button>
            </div>

            {/* علاقه‌مندی و اشتراک‌گذاری */}
            <div className="product-secondary-actions">
              <button
                type="button"
                className={isFavorite ? "is-favorite" : ""}
                onClick={() =>
                  setIsFavorite((value) => !value)
                }
                aria-pressed={isFavorite}
              >
                <FiHeart />

                {isFavorite
                  ? "افزوده شد به علاقه‌مندی‌ها"
                  : "افزودن به علاقه‌مندی‌ها"}
              </button>

              <button
                type="button"
                onClick={handleShare}
              >
                <FiShare2 />
                اشتراک‌گذاری
              </button>
            </div>

            {notice && (
              <div className="product-notice" role="status">
                {notice}
              </div>
            )}

            <div className="product-purchase-note">
              <FiInfo />

              <span>
                قیمت و موجودی نهایی پیش از ثبت سفارش تأیید می‌شود.
              </span>
            </div>

          </div>
        </section>

        {/* مزیت‌های خرید */}
        <section className="product-benefits">

          <div>
            <FiShield />

            <span>
              <strong>ضمانت کیفیت محصول</strong>
              <small>با اطمینان خرید کنید</small>
            </span>
          </div>

          <div>
            <FiTruck />

            <span>
              <strong>ارسال هماهنگ‌شده</strong>
              <small>بر اساس شهر و ابعاد کالا</small>
            </span>
          </div>

          <div>
            <FiHeadphones />

            <span>
              <strong>پشتیبانی تخصصی</strong>
              <small>پاسخ‌گویی در تمام مراحل</small>
            </span>
          </div>

          <div>
            <FiFeather />

            <span>
              <strong>توجه به جزئیات</strong>
              <small>ساخت با دقت و ظرافت</small>
            </span>
          </div>

        </section>

        {/* توضیحات و مشخصات محصول */}
        <section
          className="product-tabs-section"
          id="product-tabs"
        >
          <div className="product-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={
                  activeTab === tab.id ? "active" : ""
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-tab-panel" role="tabpanel">
            {renderTabContent()}
          </div>
        </section>

        {/* محصولات مشابه */}
        <section className="product-related-section">
          <div className="product-section-heading">
            <span />
            <h2>محصولات مشابه</h2>
            <span />
          </div>

          <div className="product-related-grid">
            {relatedProducts.map((item) => (
              <article
                className="product-related-card"
                key={item.id}
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                />

                <div className="product-related-content">
                  <h3>{item.name}</h3>

                  <a
                    href="/shop"
                    className="product-related-link"
                  >
                    مشاهده جزئیات
                    <FiArrowLeft />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* بنر مشاوره */}
        <section className="product-consult-banner">
          <div className="product-consult-copy">
            <span>برای انتخاب مطمئن‌تر</span>

            <h2>نیاز به مشاوره دارید؟</h2>

            <p>
              برای دریافت راهنمایی درباره انتخاب و سفارش
              محصولات چوبی با ما در ارتباط باشید.
            </p>

            <a
              href="/contact"
              className="product-consult-button"
            >
              درخواست مشاوره
              <FiArrowLeft />
            </a>
          </div>

          <div className="product-consult-decoration">
            <FiHeadphones />
          </div>
        </section>

      </div>

      {/* نمایش بزرگ تصویر */}
      {isLightboxOpen && (
        <div
          className="product-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="نمایش بزرگ تصویر محصول"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            className="product-lightbox-close"
            aria-label="بستن تصویر"
            onClick={() => setIsLightboxOpen(false)}
          >
            ×
          </button>

          <button
            type="button"
            className="product-lightbox-arrow prev"
            aria-label="تصویر قبلی"
            onClick={(event) => {
              event.stopPropagation();
              changeImage("prev");
            }}
          >
            <FiChevronRight />
          </button>

          <ProductImage
            src={productImages[activeImage]}
            alt="تصویر بزرگ محصول"
            className="product-lightbox-image"
          />

          <button
            type="button"
            className="product-lightbox-arrow next"
            aria-label="تصویر بعدی"
            onClick={(event) => {
              event.stopPropagation();
              changeImage("next");
            }}
          >
            <FiChevronLeft />
          </button>
        </div>
      )}
    </main>
  );
}

export default Takmahsol;