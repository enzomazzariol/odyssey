import { test, expect, type Page } from "@playwright/test";

/** Wait for the 3D scene + loading overlay to settle */
async function settle(page: Page, ms = 6000) {
  await page.waitForTimeout(ms);
}

test.describe("Solar Odyssey smoke", () => {
  test("home renders the hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "SOLAR ODYSSEY" })).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("button", { name: /begin mission|iniciar misión/i })).toBeVisible();
  });

  test("explore shows the system overview with controls", async ({ page }) => {
    await page.goto("/explore");
    await settle(page);
    await expect(page.getByText(/system overview|vista del sistema/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "10×" })).toBeVisible();
    await expect(page.getByRole("button", { name: /today|hoy/i })).toBeVisible();
  });

  test("clicking the sun opens its info card", async ({ page }) => {
    await page.goto("/explore");
    await settle(page, 8000);
    // The sun sits slightly below viewport center; headless GL can be slow — retry
    const { width, height } = page.viewportSize()!;
    const panel = page.getByRole("heading", { name: "The Sun" });
    for (let i = 0; i < 6 && !(await panel.isVisible()); i++) {
      await page.mouse.click(width / 2, height / 2 + (i % 3) * 15);
      await page.waitForTimeout(1500);
    }
    await expect(panel).toBeVisible();
    await expect(page.getByRole("button", { name: /initiate approach|iniciar aproximación/i })).toBeVisible();
  });

  test("planet detail renders dashboard and gallery", async ({ page }) => {
    await page.goto("/explore/earth");
    await settle(page, 9000);
    await expect(page.getByRole("heading", { name: "Earth" })).toBeVisible();
    const galleryButton = page.getByRole("button", { name: /mission archive|archivo de misión/i });
    await expect(galleryButton).toBeVisible();
    await galleryButton.click();
    await expect(page.getByText(/blue marble|canica azul/i)).toBeVisible({ timeout: 5000 });
    await page.keyboard.press("Escape");
  });

  test("keyboard shortcuts navigate between bodies", async ({ page }) => {
    await page.goto("/explore");
    await settle(page);
    await page.keyboard.press("4");
    await expect(page).toHaveURL(/\/explore\/mars/);
    await settle(page, 4000);
    await expect(page.getByRole("heading", { name: "Mars" })).toBeVisible();
  });

  test("pluto easter egg is explorable", async ({ page }) => {
    await page.goto("/explore/pluto");
    await settle(page, 7000);
    await expect(page.getByRole("heading", { name: "Pluto" })).toBeVisible();
    await expect(page.getByText(/dwarf planet|planeta enano/i).first()).toBeVisible();
  });

  test("scale mode navigates bodies", async ({ page }) => {
    await page.goto("/scale");
    await settle(page);
    await expect(page.getByText(/true scale|escala real/i).first()).toBeVisible();
    await page.getByRole("button", { name: "Saturn" }).click();
    await page.waitForTimeout(2500);
    await expect(page.getByRole("heading", { name: "Saturn" })).toBeVisible();
  });

  test("compare mode switches bodies and shows the table", async ({ page }) => {
    await page.goto("/compare");
    await settle(page);
    await expect(page.getByText(/wider than|más ancho que/i)).toBeVisible();
    await page.locator("select").first().selectOption("jupiter");
    await expect(page.locator("select").first()).toHaveValue("jupiter");
    await expect(page.getByText("9.9 hours")).toBeVisible({ timeout: 8000 });
  });

  test("language toggle switches to Spanish", async ({ page }) => {
    await page.goto("/explore");
    await settle(page);
    await page.getByRole("button", { name: "es", exact: true }).click();
    await expect(page.getByText("Vista del Sistema")).toBeVisible();
    await page.getByRole("button", { name: "en", exact: true }).click();
  });
});
