import React, { useState } from "react";
import {
  FiUser,
  FiBox,
  FiPaperclip,
  FiPhone,
  FiSearch,
  FiCheck,
  FiShield,
  FiHeadphones,
  FiAward,
  FiHexagon,
  FiSend,
  FiEdit2,
  FiFileText,
  FiUploadCloud,
  FiGrid,
  FiColumns,
  FiTool,
  FiSquare,
  FiChevronLeft,
  FiChevronDown,
  FiMapPin,
  FiCalendar,
  FiClipboard,
  FiStar,
  FiHome,
  FiMail,
  FiDollarSign,
  FiFolder,
  FiHelpCircle,
  FiSliders,
  FiFeather,
} from "react-icons/fi";
import "./ProjectRequest.css";
const root = (process.env.PUBLIC_URL || "") + "/images/order project/";
const assets = [
  "Realistic Olive Branch Cutout",
  "Olive Branch Botanical Clipart",
  "Realistic Olive Leaf Branch on Transparent Background",
];
function Leaf({ n, pos }) {
  return (
    <img
      className={"pr-leaf " + pos}
      alt=""
      aria-hidden="true"
      src={root + "chit/" + assets[n] + ".png"}
    />
  );
}
const services = ["کابینت", "دیوارپوش", "دکور چوبی", "سازه سفارشی"];
const serviceIcons = [FiGrid, FiColumns, FiSquare, FiTool];
const phases = [
  [FiUser, "ثبت اطلاعات", "اطلاعات تماس و جزئیات پروژه را وارد کنید."],
  [FiSearch, "بررسی اولیه", "تیم ما درخواست شما را بررسی می‌کند."],
  [
    FiPhone,
    "تماس و مشاوره",
    "برای هماهنگی و ارائه پیشنهاد با شما تماس می‌گیریم.",
  ],
  [FiCheck, "اجرای پروژه", "پروژه شما با بالاترین کیفیت اجرا می‌شود."],
];
const benefits = [
  [FiHeadphones, "مشاوره تخصصی", "با کارشناسان مجرب ما"],
  [FiHexagon, "طراحی سفارشی", "متناسب با نیاز شما"],
  [FiShield, "کیفیت تضمینی", "با بهترین متریال"],
  [FiHeadphones, "پشتیبانی دائمی", "در تمام مراحل پروژه"],
];
function Heading({ area, Icon, title, text }) {
  return (
    <div className="pr-heading" style={{ gridArea: area }}>
      <h2>
        <Icon /> {title}
      </h2>
      <p>{text}</p>
    </div>
  );
}
function Field({ area, title, Icon, required, children, extra = "" }) {
  return (
    <label className={"pr-field " + extra} style={{ gridArea: area }}>
      <span>
        <Icon /> {title} {required && <em>*</em>}
      </span>
      {children}
    </label>
  );
}
function Options({ name, items, hint = "انتخاب کنید", ...props }) {
  return (
    <select name={name} defaultValue="" {...props}>
      <option value="" disabled>
        {hint}
      </option>
      {items.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  );
}
function Steps({ current }) {
  return (
    <div className="pr-steps">
      {[
        [FiEdit2, "اطلاعات تماس"],
        [FiBox, "جزئیات پروژه"],
        [FiFileText, "توضیحات تکمیلی"],
        [FiSend, "بررسی و ارسال"],
      ].map(([Icon, t], i) => (
        <div
          key={t}
          className={(current === i ? "on " : "") + (i === 3 ? "pr-wide" : "")}
        >
          <i>
            <Icon />
            <span>{"۱۲۳۴"[i]}</span>
          </i>
          <b>
            {i === 2 ? (
              <>
                <span className="pr-wide">{t}</span>
                <span className="pr-small">فایل و بازبینی</span>
              </>
            ) : (
              t
            )}
          </b>
        </div>
      ))}
    </div>
  );
}
function After() {
  return (
    <div className="pr-small">
      <section className="pr-after pr-panel">
        <h2>بعد از ثبت درخواست چه اتفاقی می‌افتد؟</h2>
        <ol>
          {[
            [FiFileText, "دریافت درخواست"],
            [FiPhone, "تماس اولیه"],
            [FiSearch, "بررسی نیاز"],
            [FiCalendar, "بازدید و اندازه‌گیری"],
            [FiEdit2, "طراحی و برآورد"],
            [FiCheck, "تأیید و اجرا"],
          ].map(([Icon, t], i) => (
            <li key={t}>
              <i>{"۱۲۳۴۵۶"[i]}</i>
              <Icon />
              {t}
            </li>
          ))}
        </ol>
        <Leaf n={0} pos="after-leaf" />
      </section>
      <p className="pr-note">
        <FiShield />
        پس از ثبت موفق درخواست، یک کد پیگیری منحصربه‌فرد دریافت می‌کنید و
        می‌توانید وضعیت درخواست خود را در حساب کاربری پیگیری کنید.
        <FiClipboard />
      </p>
      <section className="pr-faq">
        <h2>
          <FiHelpCircle /> سؤالات متداول
        </h2>
        {[
          [
            "چه اطلاعاتی لازم است؟",
            "نام، شماره موبایل، نوع خدمت، شهر و محدوده و شرح پروژه را وارد کنید.",
          ],
          [
            "چگونه می‌توانم عکس ارسال کنم؟",
            "فایل‌ها را در قسمت تصاویر پروژه انتخاب کنید یا روی آن بکشید و رها کنید.",
          ],
          [
            "آیا بازدید حضوری الزامی است؟",
            "خیر، می‌توانید در صورت نیاز گزینه درخواست بازدید را فعال کنید.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <FiChevronDown />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
export default function ProjectRequest() {
  const [service, setService] = useState(services[0]),
    [files, setFiles] = useState([]),
    [message, msg] = useState(""),
    [busy, setBusy] = useState(false),
    [step, setStep] = useState(0);
  function upload(list) {
    const next = Array.from(list);
    if (
      next.some(
        (f) => !/\.(jpe?g|png|pdf)$/i.test(f.name) || f.size > 10 * 1024 * 1024,
      )
    ) {
      msg("هر فایل باید JPG، PNG یا PDF و حداکثر ۱۰ مگابایت باشد.");
      return;
    }
    setFiles(next);
    msg("");
  }
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget,
      data = new FormData(form);
    const phone = data
      .get("mobile")
      .trim()
      .replace(/[۰-۹]/g, (c) => c.charCodeAt(0) - 1776)
      .replace(/[٠-٩]/g, (c) => c.charCodeAt(0) - 1632);
    if (!/^09\d{9}$/.test(phone)) {
      msg("شماره موبایل باید ۱۱ رقمی باشد و با ۰۹ شروع شود.");
      form.elements.mobile.focus();
      return;
    }
    data.set("mobile", phone);
    data.set("service", service);
    files.forEach((f) => data.append("files", f));
    if (!process.env.REACT_APP_PROJECT_REQUEST_API) {
      msg("ارسال درخواست هنوز فعال نشده است.");
      return;
    }
    setBusy(true);
    msg("در حال ارسال…");
    try {
      const res = await fetch(process.env.REACT_APP_PROJECT_REQUEST_API, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw Error();
      const result = await res.json();
      if (!result.tracking_code) throw Error();
      msg("درخواست ثبت شد. کد پیگیری: " + result.tracking_code);
      form.reset();
      setFiles([]);
      setService(services[0]);
      setStep(0);
    } catch {
      msg("ثبت درخواست تأیید نشد. لطفاً دوباره بررسی کنید.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      className="pr"
      dir="rtl"
      lang="fa"
      style={{
        "--pr-photo": `url("${root}Elegant Green Wood Kitchen Hero.png")`,
      }}
    >
      <section className="pr-hero">
        <div>
          <small>
            <FiHome /> <a href="/">خانه</a>　/　 ثبت درخواست پروژه
          </small>
          <h1>ثبت درخواست پروژه سفارشی</h1>
          <p className="pr-wide">
            برای طراحی، ساخت یا اجرای پروژه چوبی خود، جزئیات را به ما بگویید تا
            بهترین پیشنهاد را دریافت کنید.
          </p>
          <p className="pr-small">
            جزئیات فضای خود را ثبت کنید تا برای بررسی و مشاوره با شما تماس
            بگیریم
          </p>
          <span className="pr-flourish">
            <FiFeather />
          </span>
          <a className="pr-start pr-small" href="#pr-form">
            شروع ثبت درخواست <FiChevronLeft />
          </a>
        </div>
      </section>
      <Leaf n={0} pos="hero-leaf" />
      <div className="pr-wrap">
        <div className="pr-layout">
          <aside className="pr-side pr-wide">
            <h2>مراحل ثبت درخواست</h2>
            {phases.map(([Icon, t, d]) => (
              <div key={t}>
                <i>
                  <Icon />
                </i>
                <section>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </section>
              </div>
            ))}
            <small>
              <FiShield />
              اطلاعات شما کاملاً محرمانه بوده و فقط برای پیگیری درخواست استفاده
              می‌شود.
            </small>
          </aside>
          <div className="pr-main">
            <Steps current={step} />
            <form
              id="pr-form"
              className="pr-panel"
              onSubmit={submit}
              onFocus={(e) => {
                const n = e.target.name;
                setStep(
                  ["full_name", "mobile", "email"].includes(n)
                    ? 0
                    : [
                          "service",
                          "city",
                          "style",
                          "size",
                          "budget",
                          "timing",
                          "contact",
                        ].includes(n)
                      ? 1
                      : e.target.type === "submit" &&
                          !window.matchMedia("(max-width: 800px)").matches
                        ? 3
                        : 2,
                );
              }}
            >
              <fieldset disabled={busy}>
                <Heading
                  area="hc"
                  Icon={FiUser}
                  title="اطلاعات تماس"
                  text="لطفاً اطلاعات تماس خود را وارد کنید."
                />
                <Heading
                  area="hp"
                  Icon={FiBox}
                  title="جزئیات پروژه"
                  text="مشخصات پروژه خود را انتخاب کنید."
                />
                <Heading
                  area="hf"
                  Icon={FiPaperclip}
                  title="توضیحات و فایل‌ها"
                  text="جزئیات بیشتر پروژه را با ما در میان بگذارید."
                />
                <Field
                  area="name"
                  Icon={FiUser}
                  title="نام و نام خانوادگی"
                  required
                >
                  <input
                    name="full_name"
                    required
                    autoComplete="name"
                    placeholder="نام خود را وارد کنید"
                  />
                </Field>
                <Field
                  area="phone"
                  Icon={FiPhone}
                  title="شماره موبایل"
                  required
                >
                  <input
                    type="tel"
                    name="mobile"
                    required
                    autoComplete="tel"
                    placeholder="شماره موبایل خود را وارد کنید"
                  />
                </Field>
                <Field
                  area="email"
                  Icon={FiMail}
                  title="ایمیل (اختیاری)"
                  extra="pr-wide"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                  />
                </Field>
                <div className="pr-field" style={{ gridArea: "service" }}>
                  <span id="pr-service">
                    <FiSliders /> نوع خدمت <em>*</em>
                  </span>
                  <select
                    aria-labelledby="pr-service"
                    className="pr-wide"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <div
                    className="pr-tiles pr-small"
                    role="group"
                    aria-labelledby="pr-service"
                  >
                    {services.map((s, i) => {
                      const Icon = serviceIcons[i];
                      return (
                        <button
                          key={s}
                          type="button"
                          name="service"
                          aria-pressed={service === s}
                          onClick={() => setService(s)}
                        >
                          <Icon />
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Field
                  area="style"
                  Icon={FiBox}
                  title="سبک و مدل مورد نظر"
                  extra="pr-wide"
                >
                  <Options
                    name="style"
                    items={["مدرن", "کلاسیک", "نئوکلاسیک", "مینیمال"]}
                  />
                </Field>
                <Field
                  area="city"
                  Icon={FiMapPin}
                  title="شهر و محدوده"
                  required
                >
                  <input
                    name="city"
                    list="pr-cities"
                    required
                    placeholder="انتخاب شهر و محدوده"
                  />
                  <datalist id="pr-cities">
                    {["تهران", "کرج", "شهریار", "پردیس"].map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field
                  area="desc"
                  Icon={FiClipboard}
                  title={
                    <>
                      <span className="pr-wide">توضیحات پروژه</span>
                      <span className="pr-small">شرح پروژه</span>
                    </>
                  }
                  required
                >
                  <textarea
                    name="description"
                    required
                    placeholder="توضیحات پروژه خود را بنویسید…"
                  />
                </Field>
                {[
                  ["size", FiEdit2, "ابعاد تقریبی", "مثلاً ۶۰ متر مربع"],
                  [
                    "budget",
                    FiDollarSign,
                    "بودجه تقریبی",
                    "حدود بودجه را وارد کنید",
                  ],
                  [
                    "timing",
                    FiCalendar,
                    "زمان مدنظر",
                    "زمان مورد نظر را مشخص کنید",
                  ],
                  ["contact", FiPhone, "روش تماس ترجیحی", "انتخاب روش تماس"],
                  [
                    "ref",
                    FiFolder,
                    "پروژه مرجع (اختیاری)",
                    "لینک یا نام پروژه مشابه",
                  ],
                ].map(([n, Icon, t, h]) => (
                  <Field
                    key={n}
                    area={n}
                    Icon={Icon}
                    title={t}
                    extra="pr-small"
                  >
                    {n === "contact" ? (
                      <Options
                        name={n}
                        hint={h}
                        items={["تماس تلفنی", "پیامک", "واتساپ"]}
                      />
                    ) : (
                      <input name={n} placeholder={h} />
                    )}
                  </Field>
                ))}
                <label className="pr-toggle">
                  <FiStar />
                  <span className="pr-wide">درخواست بازدید حضوری دارم</span>
                  <span className="pr-small">درخواست بازدید و اندازه‌گیری</span>
                  <input type="checkbox" name="visit" />
                </label>
                <label
                  className="pr-upload"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (!busy) upload(e.dataTransfer.files);
                  }}
                >
                  <input
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={(e) => upload(e.target.files)}
                  />
                  <FiUploadCloud />
                  <b>
                    {files.length ? (
                      files.map((f) => f.name).join("، ")
                    ) : (
                      <>
                        <span className="pr-wide">آپلود فایل (اختیاری)</span>
                        <span className="pr-small">
                          تصاویر یا فایل‌های پروژه
                        </span>
                      </>
                    )}
                  </b>
                  <small className="pr-wide">
                    فرمت‌های مجاز: JPG, PNG, PDF | حداکثر حجم: ۱۰ مگابایت
                  </small>
                  <small className="pr-small">
                    با کلیک یا کشیدن فایل، تصاویر خود را انتخاب کنید
                  </small>
                </label>
                <small className="pr-private pr-small">
                  <FiShield /> اطلاعات شما محرمانه بوده و فقط برای بررسی درخواست
                  استفاده می‌شود.
                </small>
                <button className="pr-submit" type="submit">
                  {busy ? "در حال ارسال…" : "ثبت درخواست و دریافت کد پیگیری"}{" "}
                  <FiSend />
                </button>
              </fieldset>
              <p role="status">{message}</p>
            </form>
          </div>
        </div>
        <div className="pr-benefits pr-wide">
          {benefits.map(([Icon, t, d]) => (
            <section key={t}>
              <i>
                <Icon />
              </i>
              <div>
                <b>{t}</b>
                <p>{d}</p>
              </div>
            </section>
          ))}
        </div>
        <After />
      </div>
      <Leaf n={1} pos="side-leaf" />
      <Leaf n={0} pos="lower-leaf" />
      <Leaf n={2} pos="corner-leaf" />
    </div>
  );
}
