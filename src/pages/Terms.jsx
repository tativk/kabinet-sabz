
import React, { useState } from "react";
import "./Terms.css";

const termsData = [
  {
    id: 1,
    title: "شرایط استفاده از خدمات",
    icon: "document",
    paragraphs: [
      "استفاده از وب‌سایت چوب سبز به معنای پذیرفتن و قبول کلیه شرایط و قوانین مندرج در این صفحه است.",
      "کاربران موظف هستند پیش از استفاده از خدمات، شرایط و ضوابط مربوط به هر بخش را مطالعه کنند.",
      "مجموعه چوب سبز حق به‌روزرسانی قوانین و مقررات را محفوظ می‌دارد."
    ]
  },
  {
    id: 2,
    title: "حقوق و تعهدات کاربران",
    icon: "users",
    paragraphs: [
      "کاربران موظف به ارائه اطلاعات صحیح و معتبر هنگام ثبت درخواست یا سفارش هستند.",
      "حفظ اطلاعات حساب کاربری و مسئولیت استفاده از آن بر عهده کاربر است.",
      "هرگونه استفاده غیرمجاز از خدمات و محتوای وب‌سایت ممنوع است."
    ]
  },
  {
    id: 3,
    title: "حقوق و تعهدات مجموعه",
    icon: "shield",
    paragraphs: [
      "مجموعه چوب سبز متعهد به ارائه خدمات در چارچوب شرایط اعلام‌شده است.",
      "مجموعه تلاش می‌کند اطلاعات محصولات و خدمات را دقیق و به‌روز نگه دارد."
    ]
  },
  {
    id: 4,
    title: "مسئولیت‌ها و ضمانت‌ها",
    icon: "handshake",
    paragraphs: [
      "شرایط ضمانت محصولات بر اساس مشخصات و تعهدات اعلام‌شده برای هر محصول تعیین می‌شود.",
      "درخواست‌های مربوط به خدمات پس از فروش از طریق راه‌های ارتباطی مجموعه بررسی می‌شوند."
    ]
  },
  {
    id: 5,
    title: "قوانین مربوط به خرید و پرداخت",
    icon: "card",
    paragraphs: [
      "ثبت سفارش به منزله تأیید مشخصات و اطلاعات محصول انتخاب‌شده است.",
      "پرداخت هزینه سفارش باید از روش‌های معتبر اعلام‌شده انجام شود."
    ]
  },
  {
    id: 6,
    title: "موارد منع استفاده",
    icon: "ban",
    paragraphs: [
      "هرگونه استفاده غیرقانونی از وب‌سایت و خدمات آن ممنوع است.",
      "کپی‌برداری یا انتشار محتوای وب‌سایت بدون مجوز مجموعه مجاز نیست."
    ]
  }
];

const icons = {
  document: (
    <>
      <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v6h5M9 13h6M9 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 12 0v1Z" />
      <path d="M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  handshake: (
    <>
      <path d="m3 10 4-4 5 2 5-2 4 4-4 8-5 3-5-3Z" />
      <path d="m7 6 5 5 4-3M8 14l3 3M12 11l5 5" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 9h20M6 15h5" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m5.6 5.6 12.8 12.8" />
    </>
  )
};

function TermsIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export default function Terms() {
  const [activeItems, setActiveItems] = useState([]);

  const publicPath = process.env.PUBLIC_URL || "";

  const heroImage = `${publicPath}/images/Terms/terms-hero.jpg`;
  const leafImage = `${publicPath}/images/Terms/terms-leaf.png`;

  const toggleAccordion = (id) => {
    setActiveItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="terms-page" dir="rtl">

      {/* HERO */}
      <section className="terms-hero">

        <div
          className="terms-hero-background"
          style={{
            backgroundImage: `url("${heroImage}")`
          }}
          role="img"
          aria-label="آشپزخانه چوب سبز"
        />

        <div className="terms-hero-content">

          <h1>قوانین و مقررات</h1>

          <div className="terms-hero-decoration">
            <span />
            <span className="terms-decoration-leaf">❧</span>
            <span />
          </div>

          <p>
            لطفاً جهت آشنایی با قوانین و مقررات فروشگاه چوب سبز
            مطالب این صفحه را مطالعه فرمایید.
          </p>

        </div>

        {/* قوس پایین هیرو */}
        <svg
          className="terms-hero-curve"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 12 C360 105 1080 105 1440 12 L1440 100 L0 100 Z"
            fill="#fff0dc"
          />
        </svg>

      </section>

      {/* CONTENT */}
      <div className="terms-container">

        {/* INTRODUCTION */}
        <section className="terms-intro">

          <div className="terms-intro-content">

            <div className="terms-heading">
              <h2>مقدمه</h2>
              <span className="terms-heading-line" />
            </div>

            <p>
              به وب‌سایت چوب سبز خوش آمدید. استفاده از این وب‌سایت
              به معنای پذیرفتن و قبول کلیه شرایط و قوانین مندرج
              در این صفحه است.
              <br />
              لطفاً پیش از استفاده از خدمات مختلف سایت، این قوانین
              را به دقت مطالعه فرمایید.
            </p>

          </div>

          {/* برگ تزئینی */}
          <div className="terms-leaf">
            <img src={leafImage} alt="" />
          </div>

        </section>

        {/* RULES */}
        <section className="terms-rules">

          <div className="terms-heading terms-rules-heading">
            <h2>بخش‌های قوانین و مقررات</h2>
            <span className="terms-heading-line" />
          </div>

          <div className="terms-accordion">

            {termsData.map((item) => {
              const isOpen = activeItems.includes(item.id);

              return (
                <article
                  className={`terms-accordion-item ${
                    isOpen ? "terms-open" : ""
                  }`}
                  key={item.id}
                >

                  <button
                    type="button"
                    className="terms-accordion-button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`terms-content-${item.id}`}
                  >

                    <span className="terms-accordion-icon">
                      <TermsIcon name={item.icon} />
                    </span>

                    <span className="terms-accordion-title">
                      {item.title}
                    </span>

                    <span className="terms-accordion-arrow">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="m6 9 6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                  </button>

                  <div
                    id={`terms-content-${item.id}`}
                    className="terms-accordion-panel"
                    hidden={!isOpen}
                  >
                    <div className="terms-accordion-body">

                      {item.paragraphs.map((paragraph, index) => (
                        <p key={index}>
                          <span className="terms-content-bullet">✦</span>
                          {paragraph}
                        </p>
                      ))}

                    </div>
                  </div>

                </article>
              );
            })}

          </div>

        </section>

      </div>

    </main>
  );
}
