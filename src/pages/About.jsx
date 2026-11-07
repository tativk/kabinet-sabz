import React from "react";

import {
  FiHome,
  FiArrowLeft,
  FiHeadphones,
  FiPenTool,
  FiSettings,
  FiStar,
} from "react-icons/fi";

import "./About.css";

const reasons = [
  {
    icon: <FiStar />,
    title: "کیفیت بی‌نظیر متریال",
    description: "استفاده از بهترین متریال و یراق‌آلات معتبر",
  },
  {
    icon: <FiSettings />,
    title: "اجرای دقیق و حرفه‌ای",
    description: "با تیم متخصص و مجرب",
  },
  {
    icon: <FiPenTool />,
    title: "طراحی اختصاصی",
    description: "متناسب با سلیقه و فضای شما",
  },
  {
    icon: <FiHeadphones />,
    title: "خدمات پس از فروش",
    description: "پشتیبانی واقعی، حتی پس از اجرا",
  },
];

export default function About() {
  return (
    <main className="about-page" dir="rtl">

      {/* بخش اول: درباره ما */}

      <section className="about-hero">

        <div className="about-hero__content">

          <div className="about-breadcrumb">

            <a href="/" aria-label="صفحه اصلی">
              <FiHome />
            </a>

            <span>خانه</span>

            <span className="about-breadcrumb__divider">
              ›
            </span>

            <span>درباره ما</span>

          </div>

          <p className="about-eyebrow">
            زیبایی در جزئیات، ماندگاری در کیفیت
          </p>

          <h1>
            درباره کابینت <span>سبز</span>
          </h1>

          <h2>
            داستان تعهد، کیفیت و زیبایی
          </h2>

          <div className="about-title-rule"></div>

          <p className="about-hero__description">
            ما در کابینت سبز با سال‌ها تجربه در طراحی و ساخت
            کابینت‌های مدرن و کلاسیک، تلاش می‌کنیم تا فضایی زیبا،
            کاربردی و ماندگار برای شما خلق کنیم.
          </p>

          <a className="about-button" href="/contact">

            <FiArrowLeft />

            <span>تماس با ما</span>

          </a>

        </div>

        <div className="about-hero__image">

          <img
            src="/baner22.png"
            alt="آشپزخانه مدرن با کابینت‌های چوبی و سبز"
          />

        </div>

      </section>


      {/* بخش دوم: از ایده تا اجرا */}

      <section className="about-story about-container">

        <div className="about-story__copy">

          <span className="about-section-kicker">
            داستان ما <b>›</b>
          </span>

          <h2>
            از ایده تا اجرای رویاها
          </h2>

          <p>
            کابینت سبز با هدف ارائه بهترین خدمات کابینت‌سازی
            و دکوراسیون چوبی، فعالیت خود را آغاز کرده است.
            ما باور داریم که کیفیت، خلاقیت و رضایت مشتری،
            رمز موفقیت ماست.
          </p>

          <p>
            با تکیه بر دانش به‌روز، استفاده از متریال باکیفیت
            و تیمی متخصص، همواره در کنار شما هستیم تا خانه‌ای
            زیبا و دلنشین داشته باشید.
          </p>

          <a
            className="about-button about-button--small"
            href="/about-us"
          >
            <FiArrowLeft />
            <span>بیشتر بخوانید</span>
          </a>

        </div>

        <div className="about-story__image">

          <img
            src="/baner22.png"
            alt="نمایی از آشپزخانه و کابینت‌های اجراشده"
          />

        </div>

      </section>


      {/* بخش سوم: چرا کابینت سبز؟ */}

      <section className="about-reasons about-container">

        <div className="about-section-heading">

          <span></span>

          <h2>
            چرا کابینت سبز؟
          </h2>

          <span></span>

        </div>

        <div className="about-reasons__grid">

          {reasons.map((item) => (

            <article
              className="about-reason-card"
              key={item.title}
            >

              <div className="about-reason-card__icon">
                {item.icon}
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

            </article>

          ))}

        </div>

      </section>


      {/* بخش چهارم: تلاش برای خلق بهترین‌ها */}

      <section className="about-craft">

        <img
          className="about-craft__background"
          src="/baner33.png"
          alt="استادکار در حال ساخت و پرداخت قطعات چوبی"
        />

        <div className="about-craft__overlay"></div>

        <div className="about-craft__content">

          <span className="about-section-kicker">
            تعهد ما به کیفیت
          </span>

          <h2>
            تلاش برای خلق بهترین‌ها
          </h2>

          <p>
            در کابینت سبز، کیفیت تنها یک شعار نیست؛ بلکه یک
            تعهد همیشگی است. ما با بهره‌گیری از تجهیزات مدرن
            و نیروی متخصص، هر پروژه را با دقت و وسواس بالا
            اجرا می‌کنیم تا رضایت شما تضمین شود.
          </p>

          <a
            className="about-button about-button--small"
            href="/projects"
          >
            <FiArrowLeft />
            <span>مشاهده نمونه‌کارها</span>
          </a>

        </div>

      </section>


      {/* بخش پنجم: دریافت مشاوره */}

      <section className="about-cta about-container">

        <img
          src="/baner44.png"
          alt=""
          aria-hidden="true"
        />

        <div className="about-cta__overlay"></div>

        <div className="about-cta__content">

          <h2>
            برای دریافت مشاوره و ثبت سفارش،
            همین حالا اقدام کنید.
          </h2>

          <a
            className="about-button about-button--large"
            href="/contact"
          >
            <FiArrowLeft />
            <span>درخواست مشاوره</span>
          </a>

        </div>

      </section>

    </main>
  );
}