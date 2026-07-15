import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submitSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(5, "Укажите телефон").max(40),
  email: z.string().trim().email("Некорректный email").max(120).optional().or(z.literal("")),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
  // ms since form mount — must be > 1200ms
  elapsedMs: z.number().int().nonnegative(),
});

// simple in-memory rate limiting per IP (per instance)
const bucket = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (bucket.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  bucket.set(ip, arr);
  return arr.length <= MAX_PER_WINDOW;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { getRequest, getRequestIP } = await import("@tanstack/react-start/server");

    // honeypot + timing check
    if (data.website && data.website.length > 0) {
      return { ok: true as const };
    }
    if (data.elapsedMs < 1200) {
      return { ok: false as const, error: "Пожалуйста, попробуйте ещё раз." };
    }

    const request = getRequest();
    const ip =
      getRequestIP({ xForwardedFor: true }) ??
      request.headers.get("cf-connecting-ip") ??
      "unknown";
    if (!rateLimit(ip)) {
      return { ok: false as const, error: "Слишком много запросов. Попробуйте позже." };
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    if (!BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram env vars are not configured");
      return { ok: false as const, error: "Сервис временно недоступен." };
    }

    const text =
      `Новая заявка\n\n` +
      `👤 Имя: ${data.name}\n` +
      `📞 Телефон: ${data.phone}\n` +
      `📧 Email: ${data.email || "—"}\n` +
      `💬 Комментарий: ${data.comment || "—"}`;

    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text();
      console.error(`Telegram sendMessage failed [${resp.status}]: ${body}`);
      return { ok: false as const, error: "Не удалось отправить заявку. Попробуйте позже." };
    }

    return { ok: true as const };
  });
