import { useState } from "react";
import "./Header.css";

const Icon = ({ name, size = 22, ...props }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 1.8,
    strokeLinecap: "round", strokeLinejoin: "round",
    "aria-hidden": true, ...props
  };
  const paths = {
    search: <><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.5 4.5"/></>,
    cart: <><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="9.5" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M12 8v5m-2.5-2.5h5"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.4A7.5 7.5 0 1 1 20 11.5Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    chevron: <path d="m8 10 4 4 4-4"/>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

const navItems = [
  { label: "خانه", href: "/", active: true },
  { label: "محصولات", href: "/products" },
  { label: "پروژه‌ها", href: "/portfolio", dropdown: true },
  { label: "درباره ما", href: "/about" },
  { label: "وبلاگ", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="cs-header" dir="rtl">
      <div className="cs-header__decoration" aria-hidden="true" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/header-bg.webp)` }} />
      <a className="cs-header__brand" href="/" aria-label="چوب سبز، صفحه اصلی">
        <img src="/images/logo.png" alt="لوگوی چوب سبز" />
        <span className="cs-header__brand-text">
          <strong>چوب سبز</strong>
          <small>ساخت آینده با طبیعت</small>
        </span>
      </a>

      <nav className={`cs-header__nav ${menuOpen ? "is-open" : ""}`} aria-label="منوی اصلی">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`cs-header__nav-link ${item.active ? "is-active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
            {item.dropdown && <Icon name="chevron" size={13} />}
          </a>
        ))}
        <a className="cs-header__mobile-cta" href="/contact" onClick={() => setMenuOpen(false)}>
          درخواست مشاوره <Icon name="chat" size={18} />
        </a>
      </nav>

      <div className="cs-header__tools">
        <a className="cs-header__tool" href="/search" aria-label="جستجو"><Icon name="search" size={25} /></a>
        <span className="cs-header__tool-divider" />
        <a className="cs-header__tool cs-header__cart" href="/cart" aria-label="سبد خرید">
          <Icon name="cart" size={27} /><span className="cs-header__cart-count">۰</span>
        </a>
        <a className="cs-header__cta" href="/contact">
          <span>درخواست مشاوره</span><Icon name="chat" size={19} />
        </a>
      </div>

      <button
        className={`cs-header__toggle ${menuOpen ? "is-open" : ""}`}
        type="button"
        aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <Icon name={menuOpen ? "close" : "menu"} size={25} />
      </button>
    </header>
  );
}
