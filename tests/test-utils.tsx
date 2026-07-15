import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";

export function renderWithIntl(
  ui: React.ReactElement,
  options?: RenderOptions,
): ReturnType<typeof render> {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {ui}
    </NextIntlClientProvider>,
    options,
  );
}
