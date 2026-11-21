import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products, useCart } from "../cartState";
import "./cart.css";
const fa = (n) => n.toLocaleString("fa-IR"),
  money = (n) => fa(n) + " تومان",
  assets = (process.env.PUBLIC_URL || "") + "/images/cart/";
export default function Cart() {
  const [items, update] = useCart(),
    [notice, say] = useState("");
  const lines = products.filter(([id]) => items[id]),
    sum = lines.reduce((s, [id, , , price]) => s + items[id] * price, 0),
    shipping = sum ? 100000 : 0,
    discount = Math.min(200000, sum);
  return (
    <>
      <Header />
      <main className="basket" dir="rtl">
        <section
          className="basket-hero"
          style={{
            backgroundImage: `linear-gradient(to left,rgba(39,43,20,.85),transparent 68%),url("${assets}kitchen-fallback.webp")`,
          }}
        >
          <small>
            <Link to="/">خانه</Link> / سبد خرید
          </small>
          <h1>سبد خرید</h1>
          <p>مدیریت محصولات انتخاب شده</p>
        </section>
        <div className="basket-body">
          <div className="basket-grid">
            <section className="basket-box basket-lines">
              <div className="basket-head">
                <h2>
                  سبد خرید شما <small>({fa(lines.length)} محصول)</small>
                </h2>
                {!!sum && (
                  <button onClick={() => update(null)}>حذف همه موارد</button>
                )}
              </div>
              {!sum && (
                <p className="basket-empty">
                  سبد خرید شما خالی است. از پیشنهادهای پایین انتخاب کنید.
                </p>
              )}
              {lines.map(([id, title, color, price]) => (
                <article className="basket-line" key={id}>
                  <img src={assets + id + ".webp"} alt="" />
                  <div>
                    <strong>{title}</strong>
                    <small>رنگ: {color}</small>
                    <em>موجود</em>
                  </div>
                  <div className="basket-step">
                    <button
                      disabled={items[id] >= 99}
                      aria-label={"افزایش تعداد " + title}
                      onClick={() => update(id, 1)}
                    >
                      +
                    </button>
                    <output>{fa(items[id])}</output>
                    <button
                      aria-label={"کاهش تعداد " + title}
                      onClick={() => update(id, -1)}
                    >
                      −
                    </button>
                  </div>
                  <b>{money(price * items[id])}</b>
                  <button
                    className="basket-del"
                    aria-label={"حذف " + title}
                    onClick={() => update(id, -99)}
                  >
                    ×
                  </button>
                </article>
              ))}
            </section>
            <aside className="basket-box basket-summary">
              <div className="basket-head">
                <h2>◇　خلاصه سفارش</h2>
              </div>
              <div className="basket-bill">
                {[
                  ["جمع کل محصولات", sum],
                  ["هزینه ارسال", shipping],
                  ["تخفیف", -discount],
                  ["مبلغ نهایی", sum + shipping - discount],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <b>{money(v)}</b>
                  </div>
                ))}
                <button
                  disabled={!sum}
                  onClick={() =>
                    say("درگاه پرداخت هنوز متصل نیست؛ سفارشی ثبت نشد.")
                  }
                >
                  پرداخت و ثبت سفارش
                </button>
                <Link to="/HomeOriginal">ادامه خرید ←</Link>
              </div>
            </aside>
          </div>
          <p role="status">{notice}</p>
          <h2>☆　محصولات و خدمات پیشنهادی</h2>
          <div className="basket-recs" role="region" aria-label="محصولات پیشنهادی" tabIndex={0}>
            {products.slice(2).map(([id, title, , price]) => (
              <article key={id}>
                <img src={assets + id + ".webp"} alt="" />
                <div>
                  <strong>{title}</strong>
                  <small>{money(price)}</small>
                  <button
                    disabled={items[id] >= 99}
                    onClick={() => {
                      update(id, 1);
                      say(title + " به سبد اضافه شد.");
                    }}
                  >
                    افزودن به سبد
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
