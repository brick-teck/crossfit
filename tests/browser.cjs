// QA only: npm install --prefix <temporary directory> playwright
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");
(async () => {
  const root = path.resolve(__dirname, "..");
  assert.ok(
    fs.existsSync(path.join(root, "index.html")),
    "A landing page deve existir",
  );
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(root, "index.html")).href);
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.equal(await page.locator(".modality-card").count(), 6);
  assert.equal(await page.locator(".coach-card").count(), 4);
  for (const selector of [
    "[data-modality]",
    "[data-coach]",
    "[data-event]",
    "[data-instagram]",
    "#directions-button",
    "[data-contact]",
  ]) {
    for (const button of await page.locator(selector).all()) {
      // The mobile header CTA is deliberately hidden at small widths; this loop uses desktop.
      await button.click();
      assert.equal(
        await page.locator("#info-dialog").evaluate((el) => el.open),
        true,
        `Dialog for ${selector}`,
      );
      await page.keyboard.press("Escape");
    }
  }
  await page.getByRole("button", { name: "Trimestral", exact: true }).click();
  assert.match(await page.locator("#planos-grid").innerText(), /449,70/);
  assert.match(await page.locator("#planos-grid").innerText(), /trimestre/);
  await page.getByRole("button", { name: "Anual", exact: true }).click();
  assert.match(await page.locator("#planos-grid").innerText(), /1\.798,80/);
  await page.getByRole("tab", { name: "Sábado" }).click();
  assert.match(await page.locator("#schedule-panel").innerText(), /09:00/);
  assert.equal(await page.locator("#schedule-panel .schedule-row").count(), 3);
  await page.locator("[data-class-info]").first().click();
  assert.equal(
    await page.locator("#info-dialog").evaluate((el) => el.open),
    true,
  );
  await page.keyboard.press("Escape");
  await page.getByRole("tab", { name: "Sábado" }).press("Home");
  assert.equal(
    await page
      .getByRole("tab", { name: "Segunda" })
      .getAttribute("aria-selected"),
    "true",
  );
  const contact = page.locator("#experimental button[data-contact]");
  await contact.click();
  assert.equal(
    await page.locator("#info-dialog").evaluate((el) => el.open),
    true,
  );
  assert.match(
    await page.locator("#dialog-text").innerText(),
    /versão oficial/,
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await contact.evaluate((el) => el === document.activeElement),
    true,
  );
  await contact.click();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(
        () => !!document.activeElement.closest("#info-dialog"),
      ),
      true,
      "Modal traps keyboard focus",
    );
  }
  await page.getByRole("button", { name: "Entendi", exact: true }).click();
  await page.locator(".gallery-item").first().click();
  const first = await page.locator("#lightbox-image").getAttribute("src");
  await page.keyboard.press("ArrowRight");
  assert.notEqual(
    await page.locator("#lightbox-image").getAttribute("src"),
    first,
  );
  await page.keyboard.press("Escape");
  for (const photo of await page.locator(".gallery-item").all()) {
    await photo.click();
    assert.equal(
      await page.locator("#lightbox").evaluate((el) => el.open),
      true,
    );
    await page.locator("#lightbox-next").click();
    await page.locator("#lightbox-prev").click();
    await page.getByRole("button", { name: "Fechar galeria" }).click();
  }
  await page.locator(".faq-question").first().click();
  assert.equal(
    await page.locator(".faq-question").first().getAttribute("aria-expanded"),
    "true",
  );
  for (const question of await page.locator(".faq-question").all()) {
    await question.press("Enter");
    const controls = await question.getAttribute("aria-controls");
    assert.equal(
      await page.locator(`#${controls}`).isVisible(),
      (await question.getAttribute("aria-expanded")) === "true",
    );
  }
  await page.evaluate(() => {
    CONFIG.whatsapp = "123";
    window.open = () => {
      throw new Error("Invalid phone opened");
    };
  });
  await contact.click();
  assert.equal(
    await page.locator("#info-dialog").evaluate((el) => el.open),
    true,
  );
  await page.keyboard.press("Escape");
  await page.evaluate(() => {
    CONFIG.whatsapp = "5511999999999";
    window.open = (url) => {
      window.testContactUrl = url;
    };
  });
  await page.locator(".plan-card button").first().click();
  assert.match(
    await page.evaluate(() => window.testContactUrl),
    /^https:\/\/wa.me\/5511999999999\?text=/,
  );
  assert.match(
    decodeURIComponent(await page.evaluate(() => window.testContactUrl)),
    /Starter.*anual/i,
  );
  await page.evaluate(() => {
    CONFIG.instagram = "https://www.instagram.com/forgebox/";
  });
  await page.locator("[data-instagram]").first().click();
  assert.equal(
    await page.evaluate(() => window.testContactUrl),
    "https://www.instagram.com/forgebox/",
  );
  await page.evaluate(() => {
    CONFIG.endereco = "Avenida Paulista, São Paulo";
    configureLocation();
  });
  assert.equal(await page.locator("#map-area iframe").count(), 1);
  assert.match(
    await page.locator("#map-area iframe").getAttribute("src"),
    /Avenida%20Paulista/,
  );
  await page.locator("#directions-button").click();
  assert.match(
    await page.evaluate(() => window.testContactUrl),
    /google\.com\/maps\/search/,
  );
  // Restore demonstration content for screenshots.
  await page.reload();
  await page.getByRole("heading", { level: 1 }).waitFor();
  fs.mkdirSync(path.join(root, "qa-output"), { recursive: true });
  for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 960 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, `Sem overflow horizontal em ${width}px`);
    await page.screenshot({
      path: path.join(root, "qa-output", `viewport-${width}.png`),
    });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.locator("#menu-toggle").click();
  assert.equal(
    await page.locator("#menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  assert.equal(
    await page
      .locator("#main-nav a")
      .first()
      .evaluate((el) => el === document.activeElement),
    true,
    "Menu starts focus on first link",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator("#menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  await page.evaluate(() => {
    CONFIG.nome = "TEST BOX";
    syncBrand();
  });
  assert.equal(
    await page.locator(".header .brand").getAttribute("aria-label"),
    "TEST BOX, início",
  );
  assert.match(await page.locator(".hero-side").innerText(), /TEST BOX/);
  assert.match(await page.locator(".board-top").innerText(), /TEST BOX/);
  await page.evaluate(() => {
    CONFIG.nome = "FORGE BOX";
    syncBrand();
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  await page.evaluate(() =>
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible")),
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: path.join(root, "qa-output", "full-page.png"),
    fullPage: true,
  });
  for (const section of [
    "experimental",
    "modalidades",
    "horarios",
    "planos",
    "wod",
    "coaches",
    "galeria",
  ]) {
    await page
      .locator(`#${section}`)
      .screenshot({ path: path.join(root, "qa-output", `${section}.png`) });
  }
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
  assert.deepEqual(broken, []);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(
    "PASS: coleções, preços, horários, teclado, dialogs, galeria, FAQ, WhatsApp, menu, 7 viewports, reduced motion, imagens e JS.",
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
