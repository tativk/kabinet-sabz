import { useState } from "react";
import "./Footer.css";

const LineIcon = ({ name, size = 22 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const shapes = {
    leaf: <><path d="M20.5 3.5C11 3 4 7.2 4 14a6 6 0 0 0 6 6c6.8 0 11-7 10.5-16.5Z"/><path d="M3 21c4-6 8-9 14-12"/></>,
    phone: <path d="M7 3h3l2 5-2 1.5a15 15 0 0 0 4.5 4.5L16 12l5 2v3a3 3 0 0 1-3 3A16 16 0 0 1 4 6a3 3 0 0 1 3-3Z"/>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>,
  };
  return <svg {...common}>{shapes[name]}</svg>;
};

const quickLinks = [
  ["محصولات", "/products"],
  ["پروژه‌ها", "/portfolio"],
  ["درباره ما", "/about"],
  ["وبلاگ", "/blog"],
  ["تماس با ما", "/contact"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("ایمیل شما ثبت آزمایشی شد.");
    setEmail("");
  };

  return (
    <footer className="cs-footer" dir="rtl">
      <div className="cs-footer__content">
        <div className="cs-footer__photo" role="img" aria-label="فضای داخلی گرم با مبلمان چوبی" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/footer-bg.webp)` }} />

        <section className="cs-footer__column cs-footer__newsletter">
          <h2>عضویت در خبرنامه <LineIcon name="leaf" size={28} /></h2>
          <p>با عضویت در خبرنامه، از جدیدترین محصولات و تخفیف‌های ویژه مطلع شوید.</p>
          <form className="cs-footer__subscribe" onSubmit={subscribe}>
            <label className="cs-footer__sr-only" htmlFor="cs-footer-email">ایمیل شما</label>
            <div className="cs-footer__input-wrap">
              <input id="cs-footer-email" type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus(""); }}
                placeholder="ایمیل خود را وارد کنید" required />
              <LineIcon name="mail" size={21} />
            </div>
            <button type="submit">عضویت</button>
            {status && <span className="cs-footer__status" role="status">{status}</span>}
          </form>
        </section>

        <section className="cs-footer__column cs-footer__contact">
          <h2>راه‌های ارتباطی <LineIcon name="phone" size={27} /></h2>
          <a href="tel:+982112345678"><span>۰۲۱-۱۲۳۴۵۶۷۸</span><LineIcon name="phone" size={21} /></a>
          <p><span>تهران، خیابان ولیعصر، پلاک ۱۳۳</span><LineIcon name="pin" size={22} /></p>
          <a href="mailto:info@choobesabz.ir"><span>info@choobesabz.ir</span><LineIcon name="mail" size={21} /></a>
        </section>

        <nav className="cs-footer__column cs-footer__links" aria-label="دسترسی سریع">
          <h2>دسترسی سریع <LineIcon name="grid" size={26} /></h2>
          {quickLinks.map(([label, href]) => (
            <a href={href} key={label}><span>{label}</span><LineIcon name="arrow" size={17} /></a>
          ))}
        </nav>

        <section className="cs-footer__column cs-footer__about">
          <a className="cs-footer__brand" href="/" aria-label="چوب سبز، صفحه اصلی">
            <img src="/images/logo.png" alt="لوگوی چوب سبز" />
            <span><strong>چوب سبز</strong><small>ساخت آینده با طبیعت</small></span>
          </a>
          <p>ما در چوب سبز با تکیه بر دانش روز و احترام به طبیعت، محصولاتی باکیفیت و ماندگار برای زندگی بهتر می‌سازیم.</p>
          <div className="cs-footer__socials" aria-label="شبکه‌های اجتماعی">
            <a href="#" aria-label="اینستاگرام"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/></svg></a>
            <a href="#" aria-label="لینکدین" className="cs-footer__linkedin">in</a>
            <a href="#" aria-label="تلگرام"><svg viewBox="0 0 24 24"><path d="m21 4-4 17-6-6-4 3 1-6 13-8L3 11l5 1 2 3"/></svg></a>
            <a href="#" aria-label="آپارات"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></svg></a>
          </div>
        </section>
      </div>

      <div className="cs-footer__bottom">
        <div className="cs-footer__copyright">
          <img src="/images/logo.png" alt="" />
          <span>© تمامی حقوق محفوظ است - چوب سبز</span>
        </div>
        <nav aria-label="لینک‌های حقوقی">
          <a href="/privacy">حریم خصوصی</a>
          <i />
          <a href="/terms">شرایط و ضوابط</a>
          <i />
          <a href="/faq">سوالات متداول</a>
        </nav>
      </div>
    </footer>
  );
}
