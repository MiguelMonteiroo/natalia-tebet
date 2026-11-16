const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const contexts = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const ctx of contexts) {
    const page = await browser.newPage({ viewport: ctx });
    await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    await page.evaluate(async () => {
      const delay = (ms) => new Promise((r) => setTimeout(r, ms));
      const height = document.body.scrollHeight;
      const steps = 10;
      for (let i = 1; i <= steps; i++) {
        window.scrollTo({ top: (height * i) / steps, behavior: "instant" });
        await delay(300);
      }
      window.scrollTo({ top: 0, behavior: "instant" });
      await delay(300);
    });

    await page.screenshot({ path: `.impeccable/screenshot-${ctx.name}.png`, fullPage: true });
    console.log(`Screenshot ${ctx.name} saved`);
    await page.close();
  }

  await browser.close();
})();
