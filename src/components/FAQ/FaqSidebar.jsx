// src/components/FAQ/FaqSidebar.jsx
import {
  FiGrid,
  FiShoppingCart,
  FiAward,
  FiTruck,
  FiShield,
  FiMoreHorizontal,
  FiFeather,
  FiHeadphones,
  FiArrowLeft,
} from "react-icons/fi";
import "./FaqSidebar.css";

const icons = {
  grid: FiGrid,
  cart: FiShoppingCart,
  award: FiAward,
  truck: FiTruck,
  shield: FiShield,
  more: FiMoreHorizontal,
};

const fa = (n) => n.toLocaleString("fa-IR");

const FaqSidebar = ({ categories, active, onChange, counts = {} }) => {
  return (
    <aside className="faq-sidebar">
      <div className="faq-cats">
        <div className="faq-cats__title">
          <h3>دسته‌بندی‌ها</h3>
          <FiFeather />
        </div>

        <ul className="faq-cats__list">
          {categories.map((cat) => {
            const Icon = icons[cat.icon];
            const isActive = active === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`faq-cats__btn ${isActive ? "is-active" : ""}`}
                  onClick={() => onChange(cat.id)}
                  aria-pressed={isActive}
                >
                  <Icon className="faq-cats__icon" />
                  <span className="faq-cats__label">{cat.label}</span>
                  <span className="faq-cats__count">
                    {fa(counts[cat.id] ?? 0)}
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
        <a href="/contact" className="faq-help__btn">
          <FiArrowLeft />
          <span>تماس با ما</span>
        </a>
      </div>
    </aside>
  );
};

export default FaqSidebar;