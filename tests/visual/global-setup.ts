// Guard against screenshotting the wrong application.
//
// `reuseExistingServer` adopts whatever already answers on the port instead of
// starting our own dev server. If an unrelated project is serving it, every
// snapshot silently captures that app. Fail loudly here instead.
export default async function assertServingThisApp() {
  const port = process.env.VISUAL_PORT ?? "3000";
  const url = `http://localhost:${port}`;
  const html = await (await fetch(url)).text();

  if (!html.includes("Threadbase")) {
    throw new Error(
      `${url} is serving something that isn't the Threadbase landing page — ` +
        `visual tests would screenshot the wrong app. Stop whatever holds that ` +
        `port, or run with VISUAL_PORT=<free port>.`,
    );
  }
}
