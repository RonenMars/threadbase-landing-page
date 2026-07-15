import { vi } from "vitest";

export function usePathname(): string {
  return "/";
}

export function useRouter(): {
  back: () => void;
  forward: () => void;
  prefetch: () => void;
  push: () => void;
  refresh: () => void;
  replace: () => void;
} {
  return {
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  };
}

export function useParams(): Record<string, string> {
  return { locale: "en" };
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}

export function redirect(url: string): never {
  throw new Error(`NEXT_REDIRECT:${url}`);
}

export function permanentRedirect(url: string): never {
  throw new Error(`NEXT_PERMANENT_REDIRECT:${url}`);
}
