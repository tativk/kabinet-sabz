import { useEffect, useState } from "react";
export const products = [
  ["cabinet", "کابینت چوبی", "گردویی روشن", 3500000],
  ["chair", "صندلی چوبی مدرن", "عسلی", 2800000],
  ["dining", "میز ناهارخوری چوبی", "گردویی", 6500000],
  ["console", "کنسول چوبی مدرن", "بلوطی", 3200000],
  ["coffee", "میز جلو مبلی چوبی", "عسلی", 2500000],
  ["shelf", "شلف دیواری چوبی", "طبیعی", 1200000],
];
const key = "choobsabz.cart.preview.v1",
  initial = { cabinet: 1, chair: 1 };
let memory;
function read() {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return memory || initial;
    const src = JSON.parse(raw);
    return Object.fromEntries(
      products
        .map(([id]) => [id, src?.[id]])
        .filter(([, q]) => Number.isInteger(q) && q > 0 && q <= 99),
    );
  } catch {
    return memory || initial;
  }
}
export function useCart() {
  const [items, set] = useState(read);
  useEffect(() => {
    const refresh = () => set(read());
    window.addEventListener(key, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(key, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  function update(id, delta) {
    const next = id ? { ...read() } : {};
    if (id) {
      const q = Math.min(99, (next[id] || 0) + delta);
      if (q > 0) next[id] = q;
      else delete next[id];
    }
    memory = next;
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
    set(next);
    window.dispatchEvent(new Event(key));
  }
  return [items, update];
}
