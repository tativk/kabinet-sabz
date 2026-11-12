import React, { useState } from "react";

import {
  FiClock,
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiMail,
  FiSend,
  FiChevronDown,
  FiArrowLeft,
  FiNavigation,
  FiCheckCircle,
} from "react-icons/fi";

import "./Contact.css";

// اطلاعات تماس مجموعه
const contactInfo = [
  {
    icon: <FiMessageCircle />,
    title: "واتساپ",
    value: "ارتباط از طریق واتساپ",
    description: "پاسخ سریع",
  },
  {
    icon: <FiPhone />,
    title: "شماره تماس",
    value: "شماره تماس مجموعه",
    description: "پاسخگویی در ساعات کاری",
  },
  {
    icon: <FiMapPin />,
    title: "آدرس مجموعه",
    value: "استان همدان، شهرستان ملایر",
    description: "برای مراجعه حضوری",
  },
  {
    icon: <FiClock />,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه: ۹ تا ۲۰",
    description: "جمعه: ۹ تا ۱۵",
  },
];

// سوالات متداول
const faqs = [
  {
    question: "چگونه می‌توانم از مشاوره رایگان استفاده کنم؟",
    answer:
      "می‌توانید از طریق فرم تماس، شماره تلفن یا واتساپ با مجموعه چوب سبز ارتباط بگیرید و درخواست مشاوره خود را ثبت کنید.",
  },
  {
    question: "مدت زمان پاسخگویی چقدر است؟",
    answer:
      "در ساعات کاری، کارشناسان ما در کوتاه‌ترین زمان ممکن درخواست شما را بررسی و پاسخ خواهند داد.",
  },
  {
    question: "آیا امکان بازدید و اندازه‌گیری در محل وجود دارد؟",
    answer:
      "بله، پس از هماهنگی با کارشناسان مجموعه، امکان بازدید و اندازه‌گیری محل پروژه فراهم است.",
  },
  {
    question: "آیا خدمات شما شامل شهرستان‌ها نیز می‌شود؟",
    answer:
      "بله، مجموعه چوب سبز امکان ارائه خدمات در ملایر و مناطق اطراف را دارد. برای هماهنگی با ما تماس بگیرید.",
  },
];

// کامپوننت اصلی صفحه تماس با ما
const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // مدیریت تغییر مقادیر فرم
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  // مدیریت ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    // پاک کردن اطلاعات فرم بعد از ارسال
    setFormData({
      name: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page" dir="rtl">

      {/* بنر بالایی صفحه تماس با ما */}
      <section className="contact-hero">

        <div className="contact-hero-image">
          <img
            src="/baner22.png"
            alt="طراحی کابینت مدرن چوب سبز"
          />
        </div>

        <div className="contact-hero-content">

          

          <span className="contact-hero-subtitle">
            همیشه در کنار شما هستیم
          </span>

          <h1>
            تماس <span>با ما</span>
          </h1>

          <p>
            برای دریافت مشاوره، ثبت سفارش و پاسخ به سوالات خود،
            می‌توانید از طریق راه‌های ارتباطی زیر با ما در تماس باشید.
          </p>

          <a href="#contact-form" className="contact-hero-btn">
            <FiMail />
            درخواست مشاوره
          </a>

        </div>

      </section>


      {/* کارت‌های اطلاعات تماس */}
      <section className="contact-info-section">

        <div className="contact-info-grid">

          {contactInfo.map((item, index) => (
            <div
              className="contact-info-card reveal-item"
              key={index}
              style={{ "--delay": `${index * 0.12}s` }}
            >

              <div className="contact-info-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.value}</p>

              <span>{item.description}</span>

            </div>
          ))}

        </div>

      </section>


      {/* بخش نقشه و فرم تماس */}
      <section className="contact-main-section">

        <div className="contact-map-wrapper reveal-item">

          <iframe
            title="موقعیت مجموعه چوب سبز در ملایر"
            src="https://www.openstreetmap.org/export/embed.html?bbox=48.78%2C34.27%2C48.90%2C34.35&layer=mapnik&marker=34.31%2C48.84"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <a
            href="https://www.openstreetmap.org/?mlat=34.31&mlon=48.84#map=14/34.31/48.84"
            target="_blank"
            rel="noreferrer"
            className="map-location-card"
          >

            <div>
              <FiMapPin />
            </div>

            <section>
              <h3>چوب سبز</h3>
              <p>همدان، شهرستان ملایر</p>
            </section>

          </a>

          <a
            href="https://www.openstreetmap.org/?mlat=34.31&mlon=48.84#map=14/34.31/48.84"
            target="_blank"
            rel="noreferrer"
            className="map-fullscreen"
          >
            <FiNavigation />
          </a>

        </div>


        {/* فرم تماس */}
        <div
          className="contact-form-wrapper reveal-item"
          id="contact-form"
        >

          <div className="contact-form-heading">

            <h2>فرم تماس با ما</h2>

            <p>
              پیام خود را برای ما ارسال کنید.
              در سریع‌ترین زمان پاسخ می‌دهیم.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="contact-form-row">

              <div className="contact-input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="نام و نام خانوادگی *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="شماره تماس *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9۰-۹+\-\s]{10,15}"
                  title="شماره تماس معتبر وارد کنید"
                />
              </div>

            </div>


            {/* انتخاب موضوع پیام */}
            <div className="contact-input-group contact-select-group">

              <label>موضوع پیام *</label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">انتخاب کنید</option>
                <option value="مشاوره طراحی کابینت">
                  مشاوره طراحی کابینت
                </option>
                <option value="ثبت سفارش">
                  ثبت سفارش
                </option>
                <option value="استعلام قیمت">
                  استعلام قیمت
                </option>
                <option value="سایر موارد">
                  سایر موارد
                </option>
              </select>

              <FiChevronDown className="select-arrow" />

            </div>


            {/* متن پیام */}
            <div className="contact-input-group">

              <label>متن پیام *</label>

              <textarea
                name="message"
                placeholder="پیام خود را بنویسید..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>


            <button type="submit" className="contact-submit-btn">

              <FiSend />

              ارسال پیام

            </button>

            {submitted && (
              <div className="contact-success-message">
                <FiCheckCircle />
                درخواست شما ثبت شد. برای ارسال واقعی پیام باید فرم
                به سیستم بک‌اند متصل شود.
              </div>
            )}

          </form>

        </div>

      </section>


      {/* ساعات کاری و محدوده فعالیت */}
      <section className="contact-details-section">


        {/* ساعات کاری - تصویر سمت چپ */}
        <div className="contact-working-card reveal-item">

          <div className="working-image">
            <img
              src="/baner55.png"
              alt="فضای گرم و زیبای چوب سبز"
            />
          </div>

          <div className="working-content">

            <div className="details-heading">

  <h2>ساعات کاری ما</h2>

  {/* ساعت متحرک با عقربه‌های چرخان */}
  <div className="animated-clock">

    <div className="clock-hour-hand"></div>

    <div className="clock-minute-hand"></div>

    <div className="clock-second-hand"></div>

    <div className="clock-center"></div>

  </div>

</div>

            <p>
              در تمام روزهای هفته، آماده پاسخگویی به شما هستیم.
            </p>

            <div className="working-time-row">

              <span>شنبه تا پنجشنبه</span>

              <strong>۸:۰۰ تا ۲۰:۰۰</strong>

            </div>

            <div className="working-time-row">

              <span>جمعه</span>

              <strong>۹:۰۰ تا ۱۵:۰۰</strong>

            </div>

          </div>

        </div>


        {/* محدوده فعالیت */}
        <div className="contact-area-card reveal-item">

          <div className="details-heading">

            <h2>محدوده فعالیت</h2>

            <FiMapPin className="animated-map-pin" />

          </div>

          <p>
            ارائه خدمات در شهرستان ملایر و مناطق اطراف،
            با امکان هماهنگی برای سایر شهرها.
          </p>

          <div className="contact-cities">

            <span>ملایر</span>
            <span>همدان</span>
            <span>اراک</span>
            <span>بروجرد</span>
            <span>نهاوند</span>
            <span>و سایر شهرها...</span>

          </div>

        </div>

      </section>


      


      {/* بنر پایانی صفحه */}
      <section className="contact-bottom-banner reveal-item">

        <div className="contact-bottom-image">

          <img
            src="/baner44.png"
            alt="دکوراسیون و کابینت چوب سبز"
          />

        </div>

        <div className="contact-bottom-content">

          <h2>
            آماده شروع پروژه کابینت خود هستید؟
          </h2>

          <p>
            با ما تماس بگیرید یا با درخواست مشاوره،
            پروژه خود را ثبت کنید.
          </p>

          <a href="#contact-form">

            <FiSend />

            درخواست مشاوره و ثبت سفارش

          </a>

        </div>

      </section>

    </main>
  );
};

export default Contact;