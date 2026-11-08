import { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const LineIcon = ({ name, size = 22, className = "" }) => {
  const common = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
  };
  const shapes = {
    leaf: <><path d="M20.5 3.5C11 3 4 7.2 4 14a6 6 0 0 0 6 6c6.8 0 11-7 10.5-16.5Z" /><path d="M3 21c4-6 8-9 14-12" /></>,
    phone: <path d="M7 3h3l2 5-2 1.5a15 15 0 0 0 4.5 4.5L16 12l5 2v3a3 3 0 0 1-3 3A16 16 0 0 1 4 6a3 3 0 0 1 3-3Z" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    down: <path d="m7 10 5 5 5-5" />,
  };
  return <svg {...common}>{shapes[name]}</svg>;
};

const quickLinks = [
  ["خدمات", "/Services"],
  ["پروژه‌ها", "/Portfolio"],
  ["درباره ما", "/About"],
  ["تماس با ما", "/#home-contact"],
];

function SocialLinks({ mobile = false }) {
  return (
    <div className={`cs-footer__socials ${mobile ? "cs-footer__socials--mobile" : "cs-footer__socials--desktop"}`} aria-label="شبکه‌های اجتماعی">
      <span title="نشانی اینستاگرام هنوز تنظیم نشده" aria-label="اینستاگرام">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" /></svg>
      </span>
      <span title="نشانی لینکدین هنوز تنظیم نشده" aria-label="لینکدین" className="cs-footer__linkedin">in</span>
      <span title="نشانی تلگرام هنوز تنظیم نشده" aria-label="تلگرام">
        <svg viewBox="0 0 24 24"><path d="m21 4-4 17-6-6-4 3 1-6 13-8L3 11l5 1 2 3" /></svg>
      </span>
      <span title="نشانی آپارات هنوز تنظیم نشده" aria-label="آپارات">
        <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></svg>
      </span>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({ contact: false, links: false, about: false });
  const toggleGroup = (group) => setExpandedGroups((current) => ({ ...current, [group]: !current[group] }));
  const publicBase = process.env.PUBLIC_URL || "";
  const logo = `${publicBase}/images/logo.png`;
  const footerBanner = `${publicBase}/images/Header%20%26%20Footer/footer-bg.webp`;

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("درخواست شما به‌صورت آزمایشی ثبت شد.");
    setEmail("");
  };

  return (
    <footer className="cs-footer" dir="rtl">
      <div className="cs-footer__content">
        <div className="cs-footer__visual" aria-hidden="true"><img src={footerBanner} alt="" /></div>

        <section className="cs-footer__column cs-footer__newsletter" aria-labelledby="cs-footer-newsletter-title">
          <h2 id="cs-footer-newsletter-title"><span>عضویت در خبرنامه</span><LineIcon name="leaf" size={27} /></h2>
          <p>با عضویت در خبرنامه، از جدیدترین محصولات و تخفیف‌های ویژه مطلع شوید.</p>
          <form className="cs-footer__subscribe" onSubmit={subscribe}>
            <label className="cs-footer__sr-only" htmlFor="cs-footer-email">ایمیل شما</label>
            <div className="cs-footer__input-wrap">
              <input
                id="cs-footer-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setStatus(""); }}
                placeholder="ایمیل خود را وارد کنید"
                required
              />
              <LineIcon name="mail" size={20} />
            </div>
            <button type="submit">عضویت</button>
            {status && <span className="cs-footer__status" role="status">{status}</span>}
          </form>
        </section>

        <section className="cs-footer__column cs-footer__accordion cs-footer__contact" data-expanded={expandedGroups.contact}>
          <button type="button" className="cs-footer__accordion-trigger" aria-expanded={expandedGroups.contact} onClick={() => toggleGroup("contact")}>
            <span className="cs-footer__heading"><LineIcon name="phone" size={25} /><strong>راه‌های ارتباطی</strong></span>
            <LineIcon name="down" size={18} className="cs-footer__accordion-chevron" />
          </button>
          <div className="cs-footer__accordion-body">
            <a href="tel:+982112345678"><LineIcon name="phone" size={19} /><span>۰۲۱-۱۲۳۴۵۶۷۸</span></a>
            <p><LineIcon name="pin" size={20} /><span>تهران، خیابان ولیعصر، پلاک ۱۳۳</span></p>
            <a href="mailto:info@choobesabz.ir"><LineIcon name="mail" size={19} /><span>info@choobesabz.ir</span></a>
          </div>
        </section>

        <section className="cs-footer__column cs-footer__accordion cs-footer__links" data-expanded={expandedGroups.links}>
          <button type="button" className="cs-footer__accordion-trigger" aria-expanded={expandedGroups.links} onClick={() => toggleGroup("links")}>
            <span className="cs-footer__heading"><LineIcon name="grid" size={25} /><strong>دسترسی سریع</strong></span>
            <LineIcon name="down" size={18} className="cs-footer__accordion-chevron" />
          </button>
          <div className="cs-footer__accordion-body">
            {quickLinks.map(([label, to]) => (
              <Link to={to} key={label}><span>{label}</span><LineIcon name="chevron" size={16} /></Link>
            ))}
          </div>
        </section>

        <section className="cs-footer__column cs-footer__accordion cs-footer__about" data-expanded={expandedGroups.about}>
          <button type="button" className="cs-footer__accordion-trigger" aria-expanded={expandedGroups.about} onClick={() => toggleGroup("about")}>
            <span className="cs-footer__heading cs-footer__about-heading"><img src={logo} alt="" /><strong>چوب سبز</strong></span>
            <LineIcon name="down" size={18} className="cs-footer__accordion-chevron" />
          </button>
          <div className="cs-footer__accordion-body">
            <Link className="cs-footer__brand" to="/" aria-label="چوب سبز، صفحه اصلی">
              <span><strong>چوب سبز</strong><small>ساخت آینده با طبیعت</small></span>
              <img src={logo} alt="لوگوی چوب سبز" />
            </Link>
            <p>ما در چوب سبز با تکیه بر دانش روز و احترام به طبیعت، محصولاتی باکیفیت و ماندگار برای زندگی بهتر می‌سازیم.</p>
            <SocialLinks />
          </div>
        </section>

        <SocialLinks mobile />
      </div>

      <div className="cs-footer__bottom">
        <div className="cs-footer__copyright">
          <img src={logo} alt="" />
          <span>© تمامی حقوق محفوظ است - چوب سبز</span>
        </div>
        <nav aria-label="پیوندهای سایت">
          <Link to="/About">درباره ما</Link>
          <i />
          <Link to="/Services">خدمات</Link>
          <i />
          <Link to="/Portfolio">نمونه‌کارها</Link>
        </nav>
      </div>
    </footer>
  );
}
