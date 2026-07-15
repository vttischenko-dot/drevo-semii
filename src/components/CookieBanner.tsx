import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "cookie-consent-v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании файлов Cookie"
      className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <p className="text-sm text-foreground/85 leading-relaxed">
          Мы используем файлы Cookie для корректной работы сайта и улучшения его удобства.
          Продолжая использовать сайт, вы соглашаетесь с{" "}
          <Link to="/cookies" className="text-primary underline">Политикой Cookie</Link>.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={accept}
            className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            Принять
          </button>
          <Link
            to="/cookies"
            className="inline-flex items-center rounded-full border border-primary/30 px-5 py-2.5 text-sm text-primary hover:bg-primary/5 transition"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}
