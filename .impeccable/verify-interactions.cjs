const { chromium } = require("playwright-core");

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });

  // Desktop tests
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let i = 0; i < 5; i++) {
      window.scrollTo({ top: (i + 1) * 200, behavior: "instant" });
      await delay(150);
    }
  });
  await page.waitForTimeout(400);

  const headerHidden = await page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return false;
    const rect = header.getBoundingClientRect();
    return rect.bottom <= 0;
  });
  console.log("Header hidden after scroll:", headerHidden);

  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(100);
  }

  const headerVisibleAfterFocus = await page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return false;
    const rect = header.getBoundingClientRect();
    return rect.top >= -5;
  });
  console.log("Header visible after Tab focus:", headerVisibleAfterFocus);

  const focusedInHeader = await page.evaluate(() => {
    const active = document.activeElement;
    const header = document.querySelector("header");
    return header ? header.contains(active) : false;
  });
  console.log("Focus is inside header:", focusedInHeader);

  await page.close();

  // Mobile tests
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(800);

  await mobilePage.click("button[aria-label='Abrir menu']");
  await mobilePage.waitForTimeout(400);

  const closeButtonVisible = await mobilePage.evaluate(() => {
    const button = document.querySelector("button[aria-label='Fechar menu']");
    if (!button) return false;
    const rect = button.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  });
  console.log("Close button visible after open:", closeButtonVisible);

  const bodyLocked = await mobilePage.evaluate(() => {
    return document.body.style.overflow === "hidden";
  });
  console.log("Body scroll locked:", bodyLocked);

  const mainInert = await mobilePage.evaluate(() => {
    return document.querySelector("main")?.hasAttribute("inert");
  });
  console.log("Main inert while menu open:", mainInert);

  for (let i = 0; i < 12; i++) {
    await mobilePage.keyboard.press("Tab");
    await mobilePage.waitForTimeout(100);
  }

  const focusEscaped = await mobilePage.evaluate(() => {
    const active = document.activeElement;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    return (main && main.contains(active)) || (footer && footer.contains(active));
  });
  console.log("Focus escaped behind overlay:", focusEscaped);

  await mobilePage.keyboard.press("Escape");
  await mobilePage.waitForTimeout(400);

  const menuClosed = await mobilePage.evaluate(() => {
    return document.querySelector("button[aria-expanded='true']") === null;
  });
  console.log("Menu closed after Escape:", menuClosed);

  const focusBackOnButton = await mobilePage.evaluate(() => {
    const active = document.activeElement;
    return active?.getAttribute("aria-label") === "Abrir menu";
  });
  console.log("Focus returned to menu button:", focusBackOnButton);

  await mobilePage.close();
  await browser.close();
})();
