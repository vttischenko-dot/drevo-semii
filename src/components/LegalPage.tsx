import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import logo from "@/assets/logo.png";

export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90 backdrop-blur sticky top-0 z-40">
        <div className="container-tight flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Логотип Древо Семьи" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-script text-2xl text-primary">Древо Семьи</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-primary hover:underline"
          >
            ← На главную
          </Link>
        </div>
      </header>
      <main className="container-tight py-14 md:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.32em] text-accent mb-4">Правовая информация</p>
          <h1 className="font-script text-4xl md:text-5xl text-primary">{title}</h1>
          {updated && <p className="mt-3 text-sm text-muted-foreground">Дата публикации: {updated}</p>}
          <div className="prose-legal mt-10 space-y-5 text-foreground/85 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-primary [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-primary [&_a]:underline">
            {children}
          </div>
        </article>
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <div className="container-tight space-y-2">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-primary">Пользовательское соглашение</Link>
            <Link to="/cookies" className="hover:text-primary">Cookie</Link>
          </div>
          <p>© {new Date().getFullYear()} ИП Жемчужнова Л. А. · ИНН 340904640713</p>
        </div>
      </footer>
    </div>
  );
}
