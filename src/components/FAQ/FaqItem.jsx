// src/components/FAQ/FaqItem.jsx
import {
  FiShoppingCart,
  FiRotateCcw,
  FiTruck,
  FiShield,
  FiPackage,
  FiCreditCard,
  FiDollarSign,
  FiChevronDown,
} from "react-icons/fi";
import "./FaqItem.css";

const icons = {
  cart: FiShoppingCart,
  return: FiRotateCcw,
  truck: FiTruck,
  shield: FiShield,
  box: FiPackage,
  card: FiCreditCard,
  wallet: FiDollarSign,
};

const FaqItem = ({ item, index = 0, isOpen, onToggle }) => {
  const Icon = icons[item.icon] || FiShoppingCart;

  return (
    <div
      id={`faq-${item.id}`}
      className={`faq-item ${isOpen ? "is-open" : ""}`}
      style={{ "--i": index }}
    >
      <h2 className="faq-item__heading">
        <button
          type="button"
          id={`faq-btn-${item.id}`}
          className="faq-item__head"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${item.id}`}
        >
          <span className="faq-item__icon">
            <Icon />
          </span>
          <span className="faq-item__question">{item.question}</span>
          <FiChevronDown className="faq-item__chevron" />
        </button>
      </h2>

      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-btn-${item.id}`}
        className="faq-item__body"
        inert={!isOpen}
      >
        <div className="faq-item__body-inner">
          <p className="faq-item__answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;