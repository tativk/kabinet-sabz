import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
    cart: <><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="9.5" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.4A7.5 7.5 0 1 1 20 11.5Z"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    chevron: <path d="m8 10 4 4 4-4"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg {...common}>{paths[name]}</svg>;
};

const navItems = [
  { label: "خانه", to: "/", end: true },
  { label: "خدمات", to: "/Services" },
  { label: "پروژه‌ها", to: "/Portfolio", dropdown: true },
  { label: "درباره ما", to: "/About" },
];

const searchablePages = [
  { label: "صفحه اصلی", description: "معرفی چوب سبز و خدمات ما", to: "/" },
  { label: "خدمات", description: "مشاهده خدمات چوب سبز", to: "/Services" },
  { label: "پروژه‌ها و نمونه‌کارها", description: "گالری پروژه‌های اجراشده", to: "/Portfolio" },
  { label: "درباره ما", description: "آشنایی با مجموعه چوب سبز", to: "/About" },
  { label: "تماس با ما", description: "ارتباط و درخواست مشاوره", to: "/#home-contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const publicBase = process.env.PUBLIC_URL || "";

  const results = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase("fa");
    if (!query) return searchablePages;
    return searchablePages.filter((page) =>
      `${page.label} ${page.description}`.toLocaleLowerCase("fa").includes(query)
    );
  }, [searchTerm]);

  useEffect(() => {
    setMenuOpen(false);
    setProjectsOpen(false);
    setSearchOpen(false);

    if (location.pathname === "/" && location.hash === "#home-contact") {
      const timer = window.setTimeout(() => {
        document.getElementById("home-contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const submitSearch = (event) => {
    event.preventDefault();
    if (results[0]) navigate(results[0].to);
    setSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <header className="cs-header" dir="rtl">
      <div
        className="cs-header__decoration"
        aria-hidden="true"
        style={{ backgroundImage: `url("${publicBase}/images/Header%20%26%20Footer/header-bg.webp")` }}
      />

      <Link className="cs-header__brand" to="/" aria-label="چوب سبز، صفحه اصلی">
        <img src={`${publicBase}/images/logo.png`} alt="لوگوی چوب سبز" />
        <span className="cs-header__brand-text">
          <strong>چوب سبز</strong>
          <small>ساخت آینده با طبیعت</small>
        </span>
      </Link>

      <nav className={`cs-header__nav ${menuOpen ? "is-open" : ""}`} aria-label="منوی اصلی">
        {navItems.map((item) => (
          <div className="cs-header__nav-item" key={item.label}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) => `cs-header__nav-link ${isActive ? "is-active" : ""}`}
              onClick={() => {
                setMenuOpen(false);
                setProjectsOpen(false);
              }}
            >
              {item.label}
              {item.dropdown && (
                <Icon
                  name="chevron"
                  size={13}
                  className={`cs-header__chevron ${projectsOpen ? "is-open" : ""}`}
                />
              )}
            </NavLink>

            {item.dropdown && (
              <>
                <button
                  className="cs-header__dropdown-toggle"
                  type="button"
                  aria-label="نمایش زیرمنوی پروژه‌ها"
                  aria-expanded={projectsOpen}
                  onClick={() => setProjectsOpen((open) => !open)}
                >
                  <Icon name="chevron" size={13} />
                </button>
                <div className={`cs-header__dropdown ${projectsOpen ? "is-open" : ""}`}>
                  <NavLink to="/Portfolio" onClick={() => { setMenuOpen(false); setProjectsOpen(false); }}>
                    همه پروژه‌ها
                  </NavLink>
                  <NavLink to="/Services" onClick={() => { setMenuOpen(false); setProjectsOpen(false); }}>
                    خدمات و مراحل اجرا
                  </NavLink>
                </div>
              </>
            )}
          </div>
        ))}

        <Link className="cs-header__nav-link cs-header__contact-link" to="/#home-contact">
          تماس با ما
        </Link>

        <Link className="cs-header__mobile-cta" to="/#home-contact">
          درخواست مشاوره <Icon name="chat" size={18} />
        </Link>
      </nav>

      <div className="cs-header__tools">
        <button
          className={`cs-header__tool ${searchOpen ? "is-active" : ""}`}
          type="button"
          aria-label="جستجو در صفحات سایت"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((open) => !open)}
        >
          <Icon name={searchOpen ? "close" : "search"} size={25} />
        </button>
        <span className="cs-header__tool-divider" />
        <Link className="cs-header__tool cs-header__cart" to="/Services" aria-label="مشاهده خدمات و ثبت سفارش" title="مشاهده خدمات">
          <Icon name="cart" size={27} />
          <span className="cs-header__cart-count">۰</span>
        </Link>
        <Link className="cs-header__cta" to="/#home-contact">
          <span>درخواست مشاوره</span><Icon name="chat" size={19} />
        </Link>
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

      {searchOpen && (
        <form className="cs-header__search-panel" role="search" onSubmit={submitSearch}>
          <label htmlFor="cs-site-search">جستجو در صفحات چوب سبز</label>
          <div className="cs-header__search-field">
            <Icon name="search" size={20} />
            <input
              id="cs-site-search"
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="مثلاً پروژه‌ها یا خدمات..."
            />
            <button type="submit" disabled={!results.length}>جستجو</button>
          </div>
          <div className="cs-header__search-results">
            {results.length ? results.map((page) => (
              <Link key={page.to} to={page.to} onClick={() => setSearchOpen(false)}>
                <span>{page.label}</span>
                <small>{page.description}</small>
                <Icon name="arrow" size={16} />
              </Link>
            )) : <p>نتیجه‌ای برای عبارت جستجو شده پیدا نشد.</p>}
          </div>
        </form>
      )}
    </header>
  );
}
