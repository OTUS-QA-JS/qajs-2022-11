import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://otus.ru',{ waitUntil: "domcontentloaded" } );
  await test.step('Проверка заголовков', async () => {
  await expect(page).toHaveTitle(/Онлайн‑курсы для профессионалов, дистанционное обучение современным профессиям/);
  const title = page.locator('h2').nth(0);
  await expect(title).toHaveText('Авторские онлайн‑курсы для профессионалов')
  });
  
  await test.step('Выбор курса', async () => {
    const element = page.locator('.sc-1pljn7g-1.hvCeDA');
    await expect(element).toHaveText('Криптографическая защита информации');
    const link = page.locator('.sc-1pljn7g-6.kbUYTE a');
    link.click();
    await expect(page).toHaveTitle(/Курс по криптографической информации/);
  });

});

