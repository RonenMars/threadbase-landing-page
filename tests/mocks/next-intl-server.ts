import arMessages from "@/messages/ar.json";
import enMessages from "@/messages/en.json";
import heMessages from "@/messages/he.json";
import ruMessages from "@/messages/ru.json";
import type { Locale } from "./i18n-routing";

const messages = {
  en: enMessages,
  ru: ruMessages,
  he: heMessages,
  ar: arMessages,
} as const;

type TranslationValues = Record<string, string | number | boolean | Date>;

type Translator = {
  (key: string, values?: TranslationValues): string;
  raw(key: string): unknown;
};

function getByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, source);
}

function interpolate(message: string, values?: TranslationValues): string {
  if (!values) return message;

  return Object.entries(values).reduce(
    (current, [key, value]) =>
      current.replaceAll(`{${key}}`, String(value)),
    message,
  );
}

export async function getTranslations({
  locale = "en",
  namespace,
}: {
  locale?: Locale;
  namespace?: string;
} = {}): Promise<Translator> {
  const namespaceMessages = namespace
    ? getByPath(messages[locale], namespace)
    : messages[locale];

  const t = ((key: string, values?: TranslationValues) => {
    const message = getByPath(namespaceMessages, key);
    return interpolate(String(message ?? key), values);
  }) as Translator;

  t.raw = (key: string) => getByPath(namespaceMessages, key);

  return t;
}

export function setRequestLocale(): void {}

export function getRequestConfig<T>(callback: T): T {
  return callback;
}
