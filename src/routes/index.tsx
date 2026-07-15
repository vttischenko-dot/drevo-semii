import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { submitLead } from "@/lib/telegram.functions";
import { CookieBanner } from "@/components/CookieBanner";

import logo from "@/assets/logo.png";
import prodNabor from "@/assets/product-nabor-dosok.jpg";
import prodSteak from "@/assets/product-doska-steak.jpg";
import prodMaslin from "@/assets/product-menazhnitsa-maslin.jpg";
import prodSous from "@/assets/product-sousnitsa.jpg";
import prodMenazh from "@/assets/product-menazhnitsa.jpg";
import prodFurshet from "@/assets/product-furshetnaya-doska.jpg";
import foodSteak from "@/assets/food-steak.jpg";
import foodFries from "@/assets/food-fries.jpg";
import aboutCharcuterie from "@/assets/about-charcuterie.jpg";
import extraSalatnik from "@/assets/product-salatnik.jpg";
import extraFurshetDub from "@/assets/product-doska-furshetnaya-dub.jpg";
import extraBlyudoFurshet from "@/assets/product-blyudo-furshetnoe.jpg";
import extraBlyudoBolshoe from "@/assets/product-blyudo-bolshoe.jpg";
import extraMenazhUzkaya from "@/assets/product-menazhnitsa-uzkaya.jpg";
import extraFurshetSteak from "@/assets/product-doska-furshet-steak.jpg";
import extraPizza from "@/assets/product-doska-pizza.jpg";
import production1 from "@/assets/production-1.jpg";
import production2 from "@/assets/production-2.jpg";
import production3 from "@/assets/production-3.jpg";
import production4 from "@/assets/production-4.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      {
        title:
          "Древо Семьи — деревянная посуда премиум-класса для ресторанов | Дуб, ясень, орех",
      },
      {
        name: "description",
        content:
          "Производство деревянной посуды ручной работы для ресторанов и кафе: доски для подачи стейков, салатники, менажницы, соусницы. Массив дуба, ясеня, ореха. Брендирование лазерной гравировкой.",
      },
      {
        name: "keywords",
        content:
          "деревянная посуда для ресторанов, доски для подачи, доска для стейка, менажница, соусница, посуда из дуба, посуда ручной работы, брендирование посуды",
      },
      { name: "author", content: "ИП Жемчужнова Л. А. — Древо Семьи" },
      { property: "og:title", content: "Древо Семьи — деревянная посуда для ресторанов" },
      {
        property: "og:description",
        content:
          "Деревянная посуда ручной работы из дуба, ясеня и ореха для ресторанного бизнеса. Брендирование лазерной гравировкой.",
      },
      { property: "og:image", content: foodSteak },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Древо Семьи — деревянная посуда для ресторанов" },
      { name: "twitter:image", content: foodSteak },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Древо Семьи",
          image: foodSteak,
          description:
            "Профессиональная деревянная посуда ручной работы из дуба, ясеня и ореха для ресторанного бизнеса.",
          url: "https://древо-семьи.рф",
          email: "zemcuznovaliana@gmail.com",
          telephone: "+7 960 867 07 64",
          founder: "Жемчужнова Лиана Альбертовна",
          taxID: "340904640713",
          vatID: "321344300048667",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+7 960 867 07 64",
              contactType: "sales",
              availableLanguage: ["Russian"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+7 961 669 83 67",
              contactType: "customer support",
              availableLanguage: ["Russian"],
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Древо Семьи",
          url: "https://древо-семьи.рф",
          inLanguage: "ru-RU",
        }),
      },
    ],
  }),
});

/* ---------------------------------- data ---------------------------------- */

const products = [
  { title: "Набор из двух досок", desc: "Доска для подачи горячих и холодных закусок", massiv: "дуб", img: prodNabor },
  { title: "Доска для стейка", desc: "Размер: Д35, Ш17, Т3", massiv: "дуб", img: prodSteak },
  { title: "Менажница для подачи маслин", desc: "Размер: Д20, Ш12, В3,5", massiv: "ясень", img: prodMaslin },
  { title: "Соусница", desc: "Размер: Д35, Ш12, В3,5", massiv: "дуб", img: prodSous },
  { title: "Менажница", desc: "Размер: Д27, В4", massiv: "дуб", img: prodMenazh },
  { title: "Фуршетная доска", desc: "Размер: Д60, Ш24, В5", massiv: "карагач", img: prodFurshet },
] as const;

const productExtras = [
  { title: "Салатник", desc: "Размер: Д30, Ш26, В5", massiv: "ясень", img: extraSalatnik },
  { title: "Доска фуршетная", desc: "Размер: Д40, Ш20, В3", massiv: "дуб", img: extraFurshetDub },
  { title: "Блюдо фуршетное", desc: "Размер: Д40, Ш23, В5", massiv: "карагач", img: extraBlyudoFurshet },
  { title: "Блюдо большое", desc: "Размер: Д50, Ш25, В5", massiv: "ясень", img: extraBlyudoBolshoe },
  { title: "Менажница узкая", desc: "Размер: Д40, Ш16, В3", massiv: "дуб", img: extraMenazhUzkaya },
  { title: "Доска фуршетная для подачи стейка", desc: "Размер: Д35, Ш20, В3,5", massiv: "ясень", img: extraFurshetSteak },
  { title: "Доска для пиццы", desc: "Размер: Д30, В3", massiv: "дуб", img: extraPizza },
] as const;

const services = [
  { icon: "🪵", title: "Доски для подачи", text: "Стейков, бургеров, сырных и мясных нарезок" },
  { icon: "🥣", title: "Салатники и пиалы", text: "С уникальной текстурой натурального дерева" },
  { icon: "🧂", title: "Подставки и органайзеры", text: "Для приборов, салфеток и специй" },
  { icon: "📖", title: "Счета-боксы и меню-холдеры", text: "В едином стиле вашего заведения" },
  { icon: "✦", title: "Брендирование", text: "Бесплатное нанесение вашего логотипа лазерной гравировкой при первом заказе.", note: "Услуга доступна только для оптовых заказов." },
  { icon: "⚙", title: "Индивидуальный заказ", text: "Производим посуду любой формы и размеров под ваши задачи" },
];

const advantages = [
  {
    title: "Эстетика = Наценка",
    text: "Блюдо, поданное на стильной дубовой доске, визуально выглядит на 20–30% дороже, что позволяет обоснованно поднять ценник на топовые позиции меню.",
  },
  {
    title: "Бесплатный маркетинг",
    text: "Гости фотографируют инстаграмную подачу → выкладывают в сторис с вашей геолокацией → вы получаете бесплатный приток клиентов.",
  },
  {
    title: "Долговечность",
    text: "Наш дуб не бьётся, в отличие от фарфора и керамики. Вы забудете про постоянную статью расходов «на бой посуды».",
  },
];

const stages = [
  { n: "01", title: "Заявка", text: "Оставляете заявку — обсуждаем задачу, тип заведения и стилистику подачи." },
  { n: "02", title: "Подбор и эскиз", text: "Подбираем позиции из каталога или создаём эскизы под индивидуальный заказ." },
  { n: "03", title: "Производство", text: "Изготавливаем посуду из массива дуба, ясеня или ореха ручной работой." },
  { n: "04", title: "Доставка", text: "Передаём готовые изделия и остаёмся на связи для сервисного обслуживания." },
];

const materials = [
  { name: "Дуб", text: "Плотная твёрдая порода. Устойчив к влаге и механическим нагрузкам ресторанной кухни." },
  { name: "Ясень", text: "Выразительная текстура и приятный светлый тон — эффектная подача холодных закусок." },
  { name: "Орех", text: "Глубокий тёмный оттенок и премиальный вид — акцент для авторской подачи." },
  { name: "Карагач", text: "Уникальный рисунок волокон. Каждое изделие — единственное в своём роде." },
  { name: "Бук", text: "Однородная светлая структура, износостойкость и элегантная лаконичность." },
];

const productionPhotos = [
  { src: production1, alt: "Готовая дубовая доска для подачи в мастерской" },
  { src: production2, alt: "Ручная шлифовка деревянной доски наждачной бумагой" },
  { src: production3, alt: "Обработка углубления доски шлифовальной машиной" },
  { src: production4, alt: "Финальная полировка изделия на токарном станке" },
];

/* -------------------------------- utilities ------------------------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* --------------------------------- page ---------------------------------- */

function LandingPage() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Products />
        <Materials />
        <Stages />
        <FoodShowcase />
        <Production />
        <Contacts />
      </main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}

/* -------------------------------- header --------------------------------- */

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const nav = [
    ["О компании", "about"],
    ["Услуги", "services"],
    ["Каталог", "products"],
    ["Материалы", "materials"],
    ["Этапы", "stages"],
    ["Производство", "production"],
    ["Контакты", "contacts"],
  ] as const;

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled || menuOpen ? "backdrop-blur bg-background/90 border-b border-border shadow-[var(--shadow-soft)]" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex items-center justify-between py-3">
        <a href="#top" onClick={(e) => handleAnchor(e, "top")} className="flex items-center gap-3 min-w-0">
          <img src={logo} alt="Логотип Древо Семьи" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-contain shrink-0" />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="font-script text-2xl sm:text-3xl text-primary truncate">Древо Семьи</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Посуда из массива
            </span>
          </span>
        </a>
        <nav aria-label="Основная навигация" className="hidden lg:flex items-center gap-6 text-sm">
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleAnchor(e, id)}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#contacts"
            onClick={(e) => handleAnchor(e, "contacts")}
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Оставить заявку
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav aria-label="Мобильная навигация" className="container-tight flex flex-col py-4">
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleAnchor(e, id)}
                className="py-3 text-base text-foreground/85 hover:text-primary border-b border-border/60 last:border-b-0"
              >
                {label}
              </a>
            ))}
            <a
              href="#contacts"
              onClick={(e) => handleAnchor(e, "contacts")}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- hero --------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--wood-light) 22%, transparent), transparent 55%), radial-gradient(circle at 90% 80%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), var(--cream)",
        }}
      />
      <div className="container-tight grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-up">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground mb-6">
            Ручная работа · Дуб · Ясень · Орех · Карагач · Бук
          </p>
          <h1 className="font-script text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.05]">
            Посуда из массива дерева <br />
            <span className="italic">премиум-класса для&nbsp;Вас!</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/80 max-w-xl leading-relaxed">
            В ресторанном бизнесе гости платят не только за еду, но и за эмоции и визуал.
            Красивая подача — это первое, что попадает в соцсети Ваших гостей. Деревянная
            посуда ручной работы создаёт ощущение тепла, премиальности и уюта, которое
            невозможно передать с помощью обычного фарфора.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacts"
              className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-primary-foreground font-medium hover:bg-primary/90 transition"
            >
              Обсудить проект
            </a>
            <a
              href="#products"
              className="inline-flex items-center rounded-full border border-primary/40 px-7 py-3.5 text-primary font-medium hover:bg-primary/5 transition"
            >
              Смотреть каталог
            </a>
          </div>
        </div>

        <div className="relative reveal">
          <div
            className="absolute -inset-8 -z-10 rounded-[40%] blur-3xl opacity-60"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--wood-light) 40%, transparent), transparent)" }}
          />
          <img
            src={foodSteak}
            alt="Стейк на дубовой фуршетной доске"
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-card)]"
            loading="eager"
          />
          <div
            aria-hidden
            className="absolute -top-8 -right-8 hidden md:flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-[var(--shadow-card)] ring-1 ring-black/5"
          >
            <img src={logo} alt="" className="h-full w-full object-contain p-3 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- about --------------------------------- */

function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-tight grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="reveal">
          <img
            src={aboutCharcuterie}
            alt="Сырно-мясная тарелка на деревянной доске ручной работы"
            className="w-full aspect-[6/5] rounded-3xl object-cover shadow-[var(--shadow-card)]"
            loading="lazy"
          />
        </div>
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">О компании</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary mb-6">
            Древо Семьи
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Мы производим профессиональную деревянную посуду и аксессуары из твёрдых пород
            дерева — <strong>дуб, ясень, орех</strong> — адаптированные под жёсткие условия
            ресторанного бизнеса. Каждое изделие — ручная работа, созданная с вниманием к
            текстуре, форме и характеру породы.
          </p>
          <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
            Изготавливаем посуду по индивидуальному заказу любой формы и размеров,
            восстанавливаем внешний вид уже эксплуатируемой деревянной посуды и наносим
            брендирование методом лазерной гравировки.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- services -------------------------------- */

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-cream-deep/60">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Наша продукция и услуги</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">Что мы делаем</h2>
          <p className="mt-4 text-foreground/70">
            Полный цикл — от идеи и эскиза до готовой брендированной посуды в единой стилистике заведения.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group rounded-2xl bg-card p-8 shadow-[var(--shadow-soft)] border border-border/60 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-2xl text-primary mb-2">{s.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{s.text}</p>
              {"note" in s && s.note && (
                <p className="mt-4 inline-block rounded-full bg-accent/10 text-accent text-xs uppercase tracking-widest px-3 py-1.5">
                  {s.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- advantages ------------------------------- */

function Advantages() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Экономическая выгода</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">
            Для вашего заведения
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {advantages.map((a, i) => (
            <article
              key={a.title}
              className="reveal relative rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-[var(--shadow-card)]">
                {i + 1}
              </div>
              <h3 className="font-display text-2xl text-primary mt-2 mb-3">{a.title}</h3>
              <p className="text-foreground/75 leading-relaxed">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- products -------------------------------- */

function Products() {
  return (
    <section id="products" className="py-20 md:py-28 bg-cream-deep/60">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Каталог</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">Наша продукция</h2>
          <p className="mt-4 text-foreground/70">
            Каждое изделие изготавливается вручную. Форму, размер и породу дерева подбираем под
            стилистику вашего заведения.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.title}
              className="reveal group rounded-3xl bg-card border border-border/60 overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="aspect-[4/3] bg-[oklch(0.94_0.02_82)] flex items-center justify-center overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/70">{p.desc}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-accent">
                  Массив: {p.massiv}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 reveal">
          <h3 className="font-display text-2xl text-primary mb-6 text-center">Также в ассортименте</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productExtras.map((p) => (
              <article
                key={p.title}
                className="group rounded-2xl border border-border bg-card/60 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-[oklch(0.94_0.02_82)] flex items-center justify-center overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col">
                  <h4 className="font-display text-lg text-primary">{p.title}</h4>
                  <p className="text-sm text-foreground/70 mt-1">{p.desc}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-accent">
                    Массив: {p.massiv}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- materials ------------------------------- */

function Materials() {
  return (
    <section id="materials" className="py-20 md:py-28">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Материалы</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">
            Твёрдые породы дерева
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {materials.map((m, i) => (
            <div
              key={m.name}
              className="reveal rounded-2xl border border-border bg-card p-7 text-center"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="font-script text-3xl text-primary">{m.name}</div>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- stages -------------------------------- */

function Stages() {
  return (
    <section id="stages" className="py-20 md:py-28 bg-cream-deep/60">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Как мы работаем</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">Этапы работы</h2>
        </div>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li
              key={s.n}
              className="reveal relative rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-soft)]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="font-script text-4xl text-accent leading-none">{s.n}</div>
              <h3 className="font-display text-xl text-primary mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ food showcase ---------------------------- */

function FoodShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-tight grid gap-8 md:grid-cols-2">
        <figure className="reveal relative overflow-hidden rounded-3xl">
          <img src={foodSteak} alt="Стейк на фуршетной доске" className="w-full h-full object-cover" loading="lazy" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white font-display text-xl">
            Фуршетная доска для подачи стейка
          </figcaption>
        </figure>
        <figure className="reveal relative overflow-hidden rounded-3xl">
          <img src={foodFries} alt="Соусница для картофеля фри" className="w-full h-full object-cover" loading="lazy" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white font-display text-xl">
            Соусница для гарниров и соусов
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------- production ------------------------------ */

function Production() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % productionPhotos.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : (i - 1 + productionPhotos.length) % productionPhotos.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIdx]);

  return (
    <section id="production" className="py-20 md:py-28">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">За кулисами</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">Наше производство</h2>
          <p className="mt-4 text-foreground/70">
            От выбора массива до финальной шлифовки — каждый этап выполняется вручную в нашей мастерской.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productionPhotos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpenIdx(i)}
              className="reveal group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition"
              style={{ transitionDelay: `${i * 60}ms` }}
              aria-label={`Открыть фото: ${p.alt}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={productionPhotos[openIdx].alt}
          onClick={() => setOpenIdx(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            aria-label="Закрыть"
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X size={22} />
          </button>
          <img
            src={productionPhotos[openIdx].src}
            alt={productionPhotos[openIdx].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

/* -------------------------------- contacts ------------------------------- */

function Contacts() {
  return (
    <section id="contacts" className="py-20 md:py-28 bg-cream-deep/60">
      <div className="container-tight grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Контакты</p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">Свяжитесь с нами</h2>
          <p className="mt-4 text-foreground/70 max-w-md">
            Расскажите о вашем заведении — подберём посуду под стилистику меню и подачу.
          </p>

          <dl className="mt-10 space-y-6 text-foreground/85">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Телефоны</dt>
              <dd className="mt-2 flex flex-col gap-3 text-lg">
                <PhoneRow tel="+79608670764" display="8 960 867 07 64" />
                <PhoneRow tel="+79616698367" display="8 961 669 83 67" />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</dt>
              <dd className="mt-1 text-lg">
                <a href="mailto:zemcuznovaliana@gmail.com" className="hover:text-primary">
                  zemcuznovaliana@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Сайт</dt>
              <dd className="mt-1 text-lg">древо-семьи.рф</dd>
            </div>
            <div className="pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed">
              ИП Жемчужнова Лиана Альбертовна<br />
              ОГРНИП: 321344300048667<br />
              ИНН: 340904640713
            </div>
          </dl>
        </div>

        <div className="reveal">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- form --------------------------------- */

function LeadForm() {
  const router = useRouter();
  const mountedAt = useMemo(() => Date.now(), []);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<
    { status: "idle" } | { status: "loading" } | { status: "ok" } | { status: "err"; msg: string }
  >({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      website: String(fd.get("website") ?? ""),
      elapsedMs: Date.now() - mountedAt,
    };

    // basic client validation
    const nextErrors: Record<string, string> = {};
    if (payload.name.trim().length < 2) nextErrors.name = "Укажите имя";
    if (payload.phone.trim().length < 5) nextErrors.phone = "Укажите телефон";
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      nextErrors.email = "Некорректный email";
    if (!consent) nextErrors.consent = "Необходимо согласие на обработку персональных данных";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setState({ status: "loading" });
    try {
      const res = await submitLead({ data: payload });
      if (res.ok) {
        setState({ status: "ok" });
        formRef.current?.reset();
        setConsent(false);
        router.invalidate();
      } else {
        setState({ status: "err", msg: res.error ?? "Не удалось отправить заявку." });
      }
    } catch (err) {
      console.error(err);
      setState({ status: "err", msg: "Не удалось отправить заявку. Попробуйте позже." });
    }
  }

  if (state.status === "ok") {
    return (
      <div className="rounded-3xl bg-card border border-border p-10 shadow-[var(--shadow-card)] text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl">
          ✓
        </div>
        <h3 className="font-script text-3xl text-primary mt-6">Заявка отправлена</h3>
        <p className="mt-3 text-foreground/70">
          Спасибо! Мы свяжемся с вами в ближайшее время по указанному телефону.
        </p>
        <button
          onClick={() => setState({ status: "idle" })}
          className="mt-8 inline-flex items-center rounded-full border border-primary/40 px-6 py-2.5 text-primary hover:bg-primary/5 transition"
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-5"
      noValidate
      aria-label="Форма заявки"
    >
      <h3 className="font-display text-2xl text-primary">Оставить заявку</h3>

      <Field label="Имя" name="name" required error={errors.name} placeholder="Как к вам обращаться" autoComplete="name" />
      <Field label="Телефон" name="phone" required type="tel" error={errors.phone} placeholder="+7 (___) ___-__-__" autoComplete="tel" />
      <Field label="Email (необязательно)" name="email" type="email" error={errors.email} placeholder="you@example.com" autoComplete="email" />
      <Field label="Комментарий" name="comment" as="textarea" placeholder="Расскажите о вашем заведении и задаче" />

      {/* honeypot */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-foreground/80 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--primary)] flex-shrink-0"
            aria-describedby="consent-error"
            required
          />
          <span>
            Я ознакомился(ась) и согласен(на) с{" "}
            <Link to="/privacy" className="text-primary underline">
              Политикой конфиденциальности
            </Link>{" "}
            и даю согласие на обработку персональных данных.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1 text-xs text-destructive">{errors.consent}</p>
        )}
      </div>

      {state.status === "err" && (
        <p className="text-sm text-destructive" role="alert">{state.msg}</p>
      )}

      <button
        type="submit"
        disabled={state.status === "loading" || !consent}
        className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {state.status === "loading" ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Информация на сайте не является публичной офертой. Оформление заказа осуществляется
        после согласования с представителем компании.
      </p>
    </form>
  );
}

function PhoneRow({ tel, display }: { tel: string; display: string }) {
  const digits = tel.replace(/\D/g, "");
  const wa = `https://wa.me/${digits}`;
  const max = `https://max.ru/${digits}`;
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <a href={`tel:${tel}`} className="font-medium hover:text-primary">{display}</a>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${display}`}
        title="Написать в WhatsApp"
        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition"
      >
        <svg viewBox="0 0 32 32" width="14" height="14" fill="currentColor" aria-hidden>
          <path d="M19.11 17.42c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.15-1.21-.45-2.3-1.42-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.13-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.02 2.77 1.17 2.96c.15.19 2.02 3.09 4.9 4.33.68.29 1.22.46 1.63.59.69.22 1.32.19 1.81.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM16.02 3C9.4 3 4.03 8.37 4.03 15c0 2.11.55 4.16 1.6 5.97L4 29l8.24-2.16A11.94 11.94 0 0 0 16.02 27C22.63 27 28 21.63 28 15S22.63 3 16.02 3zm0 21.9c-1.9 0-3.76-.51-5.38-1.47l-.39-.23-4.89 1.28 1.31-4.76-.25-.4A9.87 9.87 0 0 1 6.13 15c0-5.45 4.44-9.9 9.89-9.9s9.89 4.45 9.89 9.9-4.44 9.9-9.89 9.9z"/>
        </svg>
      </a>
      <a
        href={max}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`MAX ${display}`}
        title="Написать в MAX"
        className="inline-flex h-6 items-center justify-center rounded-full border border-border px-2 text-[10px] font-semibold tracking-wide text-muted-foreground hover:text-primary hover:border-primary/40 transition"
      >
        MAX
      </a>
    </div>
  );
}


function Field({
  label,
  name,
  required,
  type = "text",
  as,
  placeholder,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  as?: "textarea";
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}) {
  const base =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring transition";
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground/80">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <div className="mt-1.5">
        {as === "textarea" ? (
          <textarea name={name} rows={4} placeholder={placeholder} className={base} />
        ) : (
          <input
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={base}
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}

/* --------------------------------- footer -------------------------------- */

function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 rounded-full bg-background/10 p-0.5" />
            <span className="font-script text-2xl">Древо Семьи</span>
          </div>
          <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
            Профессиональная деревянная посуда ручной работы для ресторанов и кафе.
          </p>
        </div>

        <nav aria-label="Разделы сайта" className="text-sm text-primary-foreground/80 space-y-1.5">
          <p className="uppercase tracking-widest text-xs text-primary-foreground/60 mb-3">Разделы</p>
          <a href="#about" className="block hover:text-white">О компании</a>
          <a href="#services" className="block hover:text-white">Услуги</a>
          <a href="#products" className="block hover:text-white">Каталог</a>
          <a href="#stages" className="block hover:text-white">Этапы работы</a>
          <a href="#contacts" className="block hover:text-white">Контакты</a>
        </nav>

        <div className="text-sm text-primary-foreground/80 space-y-1.5">
          <p className="uppercase tracking-widest text-xs text-primary-foreground/60 mb-3">Контакты</p>
          <p><a href="tel:+79608670764" className="hover:text-white">8 960 867 07 64</a></p>
          <p><a href="tel:+79616698367" className="hover:text-white">8 961 669 83 67</a></p>
          <p><a href="mailto:zemcuznovaliana@gmail.com" className="hover:text-white">zemcuznovaliana@gmail.com</a></p>
          <p>Режим работы: пн–сб, 09:00–19:00 (МСК)</p>
        </div>

        <div className="text-xs text-primary-foreground/70 leading-relaxed space-y-1">
          <p className="uppercase tracking-widest text-primary-foreground/60 mb-3">Реквизиты</p>
          <p>ИП Жемчужнова Лиана Альбертовна</p>
          <p>ОГРНИП: 321344300048667</p>
          <p>ИНН: 340904640713</p>
          
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-tight py-8 space-y-4 text-xs text-primary-foreground/70 leading-relaxed">
          <p>
            Вся информация, размещённая на сайте, носит исключительно информационный характер и
            ни при каких условиях не является публичной офертой, определяемой положениями статьи 437
            Гражданского кодекса Российской Федерации. Оформление заказа, заключение договора и
            оказание услуг осуществляются только после согласования всех условий с представителем
            компании.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="/privacy" className="hover:text-white underline underline-offset-4">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="hover:text-white underline underline-offset-4">
                Пользовательское соглашение
              </Link>
              <Link to="/cookies" className="hover:text-white underline underline-offset-4">
                Cookie
              </Link>
            </div>
            <p>© {new Date().getFullYear()} Древо Семьи. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
