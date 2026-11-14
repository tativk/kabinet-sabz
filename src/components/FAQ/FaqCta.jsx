// src/components/FAQ/FaqCta.jsx
import { FiArrowLeft } from "react-icons/fi";
import "./FaqCta.css";

const FaqCta = ({
  title = "هنوز سوالی دارید؟",
  text = "همیشه آماده پاسخگویی به شما هستیم",
  buttonText = "تماس با پشتیبانی",
  link = "/contact",
  image = "/images/FAQ/faq-cta.jpg",
}) => {
  return (
    <section className="faq-cta" dir="rtl">
      <div className="faq-cta__box">
        <img className="faq-cta__image" src={image} alt="" />
        <div className="faq-cta__shade" />

        <div className="faq-cta__content">
          <h2 className="faq-cta__title">{title}</h2>
          <p className="faq-cta__text">{text}</p>
          <a href={link} className="faq-cta__btn">
            <FiArrowLeft />
            <span>{buttonText}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqCta;