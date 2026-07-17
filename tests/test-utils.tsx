import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enTranslations from "@/locales/en.json";

export function renderWithIntl(
  ui: React.ReactElement,
  options?: RenderOptions,
): ReturnType<typeof render> {
  return render(
    <NextIntlClientProvider locale="en" messages={enTranslations}>
      {ui}
    </NextIntlClientProvider>,
    options,
  );
}
