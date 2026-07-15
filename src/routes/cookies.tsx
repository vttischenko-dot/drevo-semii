import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Политика использования Cookie — Древо Семьи" },
      {
        name: "description",
        content: "Информация об использовании файлов Cookie на сайте древо-семьи.рф.",
      },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: "Политика использования Cookie — Древо Семьи" },
      { property: "og:description", content: "Использование файлов Cookie на сайте." },
      { property: "og:url", content: "/cookies" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
});

function CookiesPage() {
  return (
    <LegalPage title="Политика использования файлов Cookie" updated="2026 г.">
      <p>
        Сайт <strong>древо-семьи.рф</strong> использует файлы Cookie для обеспечения работы Сайта,
        улучшения удобства использования и анализа посещаемости.
      </p>

      <h2>1. Что такое Cookie</h2>
      <p>
        Cookie — небольшие текстовые файлы, которые сохраняются в браузере пользователя при
        посещении Сайта и позволяют распознавать повторные посещения.
      </p>

      <h2>2. Какие Cookie мы используем</h2>
      <ul>
        <li><strong>Технические</strong> — необходимы для корректной работы Сайта;</li>
        <li><strong>Аналитические</strong> — помогают понять, как посетители используют Сайт;</li>
        <li><strong>Функциональные</strong> — сохраняют выбранные настройки (например, принятие уведомления).</li>
      </ul>

      <h2>3. Управление Cookie</h2>
      <p>
        Пользователь может самостоятельно управлять файлами Cookie в настройках своего браузера —
        разрешать, блокировать или удалять их. Отключение отдельных Cookie может повлиять на
        работоспособность Сайта.
      </p>

      <h2>4. Согласие</h2>
      <p>
        Продолжая использовать Сайт после уведомления, пользователь выражает согласие на
        использование файлов Cookie на условиях настоящей Политики.
      </p>
    </LegalPage>
  );
}
