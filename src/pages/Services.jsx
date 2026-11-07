import React, { useState } from "react";

import {
  FiHome,
  FiArrowLeft,
  FiChevronDown,
  FiMessageSquare,
  FiMapPin,
  FiPenTool,
  FiSettings,
  FiCheckCircle,
  FiClipboard,
  FiTool,
  FiShield,
  FiStar,
  FiHeadphones,
  FiClock,
  FiUsers,
} from "react-icons/fi";

import "./Services.css";

const services = [
  {
    id: 1,
    title: "کابینت آشپزخانه",
    description:
      "طراحی و اجرای انواع کابینت مدرن و کلاسیک با متریال درجه یک و طراحی متناسب با فضای آشپزخانه شما.",
    image: "/baner22.png",
    icon: <FiClipboard />,
  },
  {
    id: 2,
    title: "کمد دیواری و کمد لباس",
    description:
      "طراحی و ساخت انواع کمد دیواری، کمد لباس و فضاهای ذخیره‌سازی با بهترین متریال.",
    image: "/baner22.png",
    icon: <FiTool />,
  },
  {
    id: 3,
    title: "دکوراسیون چوبی",
    description:
      "اجرای دکوراسیون داخلی، دیوارپوش، قفسه‌بندی و طراحی فضاهای خاص و کاربردی.",
    image: "/baner22.png",
    icon: <FiPenTool />,
  },
  {
    id: 4,
    title: "جزیره آشپزخانه",
    description:
      "طراحی و ساخت جزیره آشپزخانه با سبک منحصربه‌فرد و هماهنگ با فضای داخلی منزل.",
    image: "/baner22.png",
    icon: <FiSettings />,
  },
];

const steps = [
  {
    number: "۱",
    title: "مشاوره و بررسی نیازها",
    description: "گفتگو با کارشناسان ما",
    icon: <FiMessageSquare />,
  },
  {
    number: "۲",
    title: "بازدید و اندازه‌گیری",
    description: "در محل پروژه",
    icon: <FiMapPin />,
  },
  {
    number: "۳",
    title: "طراحی و ارائه طرح",
    description: "با توجه به سلیقه شما",
    icon: <FiPenTool />,
  },
  {
    number: "۴",
    title: "ساخت و اجرا",
    description: "با بالاترین کیفیت",
    icon: <FiSettings />,
  },
  {
    number: "۵",
    title: "تحویل پروژه",
    description: "و پشتیبانی پس از اجرا",
    icon: <FiCheckCircle />,
  },
];

const advantages = [
  {
    icon: <FiShield />,
    title: "کیفیت تضمینی",
    description: "با ضمانت اجرا",
  },
  {
    icon: <FiStar />,
    title: "طراحی مدرن و به‌روز",
    description: "متناسب با سلیقه شما",
  },
  {
    icon: <FiUsers />,
    title: "تعهد به زمان‌بندی",
    description: "تحویل به‌موقع پروژه",
  },
  {
    icon: <FiHeadphones />,
    title: "پشتیبانی و مشاوره رایگان",
    description: "همیشه در کنار شما",
  },
];

const questions = [
  {
    question: "هزینه طراحی و اجرای کابینت چقدر است؟",
    answer:
      "هزینه نهایی به عواملی مانند متراژ، نوع متریال، سبک طراحی و یراق‌آلات بستگی دارد. برای دریافت قیمت دقیق می‌توانید با کارشناسان ما تماس بگیرید.",
  },
  {
    question: "مدت زمان اجرای پروژه چقدر است؟",
    answer:
      "مدت زمان اجرا با توجه به ابعاد پروژه، نوع سفارش و جزئیات طراحی متفاوت است. زمان‌بندی دقیق پس از بررسی و تأیید طرح به شما اعلام می‌شود.",
  },
  {
    question: "آیا امکان بازدید از محل وجود دارد؟",
    answer:
      "بله. پس از هماهنگی، کارشناسان ما برای بررسی فضا، اندازه‌گیری و ارائه مشاوره در محل پروژه حضور پیدا می‌کنند.",
  },
  {
    question: "چه متریال‌هایی برای کابینت استفاده می‌کنید؟",
    answer:
      "با توجه به بودجه و سلیقه شما از متریال‌های مختلف مانند MDF، هایگلاس، ممبران و سایر متریال‌های مناسب استفاده می‌کنیم.",
  },
];

export default function Services() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <main className="services-page" dir="rtl">

      {/* بخش اول: بنر اصلی */}

      <section className="services-hero">

        <div className="services-hero__content">

          <div className="services-breadcrumb">

            <a href="/" aria-label="صفحه اصلی">
              <FiHome />
            </a>

            <span>خانه</span>
            <span>›</span>
            <span>خدمات</span>

          </div>

          <h1>
            خدمات کابینت <span>سبز</span>
          </h1>

          <h2>
            طراحی، ساخت و اجرای کابینت با کیفیت
          </h2>

          <div className="services-hero__line"></div>

          <p>
            ما در کابینت سبز با ارائه خدمات متنوع و حرفه‌ای،
            آماده‌ایم تا رویای فضای ایده‌آل شما را بسازیم.
          </p>

          <a className="services-button" href="/contact">
            <FiArrowLeft />
            <span>درخواست مشاوره</span>
          </a>

        </div>

        <div className="services-hero__image">

          <img
            src="/baner22.png"
            alt="طراحی آشپزخانه مدرن کابینت سبز"
          />

        </div>

      </section>


      {/* بخش دوم: خدمات ما */}

      <section className="services-list services-container">

        <div className="services-heading">

          <span></span>

          <h2>خدمات ما</h2>

          <span></span>

        </div>

        <div className="services-grid">

          {services.map((service) => (

            <article className="service-card" key={service.id}>

              <div className="service-card__image">

                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />

              </div>

              <div className="service-card__content">

                <div className="service-card__icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a href="/contact" className="service-card__link">
                  <span>مشاهده جزئیات</span>
                  <FiArrowLeft />
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* بخش سوم: مراحل ثبت سفارش */}

      <section className="services-process services-container">

        <div className="services-heading">

          <span></span>

          <h2>مراحل ثبت سفارش</h2>

          <span></span>

        </div>

        <div className="process-grid">

          {steps.map((step, index) => (

            <React.Fragment key={step.number}>

              <article className="process-item">

                <div className="process-item__top">

                  <div className="process-item__icon">
                    {step.icon}
                  </div>

                  <span className="process-item__number">
                    {step.number}
                  </span>

                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </article>

              {index !== steps.length - 1 && (
                <div className="process-item__arrow">
                  <FiArrowLeft />
                </div>
              )}

            </React.Fragment>

          ))}

        </div>

      </section>


      {/* بخش چهارم: چرا کابینت سبز؟ */}

      <section className="services-advantages services-container">

        <div className="advantages-heading">
          چرا کابینت سبز؟
        </div>

        <div className="advantages-grid">

          {advantages.map((item, index) => (

            <article className="advantage-item" key={item.title}>

              <div className="advantage-item__icon">
                {item.icon}
              </div>

              <div className="advantage-item__text">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

              {index !== advantages.length - 1 && (
                <span className="advantage-divider"></span>
              )}

            </article>

          ))}

        </div>

        <img
          className="advantages-decoration"
          src="/baner33.png"
          alt=""
          aria-hidden="true"
        />

      </section>


      {/* بخش پنجم: سوالات متداول */}

      <section className="services-faq services-container">

        <div className="services-heading">

          <span></span>

          <h2>سؤالات متداول</h2>

          <span></span>

        </div>

        <div className="faq-layout">

          <div className="faq-list">

            {questions.map((item, index) => (

              <article
                className={`faq-item ${
                  activeQuestion === index ? "faq-item--active" : ""
                }`}
                key={index}
              >

                <button
                  className="faq-item__question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={activeQuestion === index}
                >

                  <span>{item.question}</span>

                  <FiChevronDown />

                </button>

                <div
                  className="faq-item__answer"
                  aria-hidden={activeQuestion !== index}
                >

                  <p>{item.answer}</p>

                </div>

              </article>

            ))}

          </div>

          <div className="faq-image">

            <img
              src="/baner22.png"
              alt="نمایی از آشپزخانه مدرن"
              loading="lazy"
            />

          </div>

        </div>

      </section>


      {/* بخش ششم: دریافت مشاوره */}

      <section className="services-cta services-container">

        <img
          className="services-cta__image"
          src="/baner44.png"
          alt=""
          aria-hidden="true"
        />

        <div className="services-cta__overlay"></div>

        <div className="services-cta__content">

          <h2>
            برای دریافت مشاوره و ثبت سفارش،
            <br />
            همین حالا با ما در ارتباط باشید.
          </h2>

          <a
            href="/contact"
            className="services-button services-button--large"
          >
            <FiArrowLeft />
            <span>درخواست مشاوره</span>
          </a>

        </div>

      </section>

    </main>
  );
}