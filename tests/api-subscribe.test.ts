import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/subscribe/route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/subscribe", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/subscribe", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("forwards a valid email and name to MailerLite and returns 200", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true } as Response);
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "test@example.com", name: "Ada" }));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://connect.mailerlite.com/api/subscribers",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", fields: { name: "Ada" } }),
      }),
    );
  });

  it("returns 400 for an invalid email", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(makeRequest({ email: "not-an-email" }));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 200 without calling MailerLite when the honeypot is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      makeRequest({ email: "test@example.com", company: "bot filled this" }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
