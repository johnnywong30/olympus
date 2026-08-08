import { expect, takeSnapshot, test } from '@chromatic-com/playwright';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the homepage', async ({ page }, testInfo) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Boilerplate Code for Your Next.js Project with Tailwind CSS',
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });

    test('should take screenshot of the about page', async ({ page }, testInfo) => {
      await page.goto('/about');

      await expect(page.getByText('Welcome to our About page!')).toBeVisible();

      await takeSnapshot(page, testInfo);
    });

    test('should take screenshot of the French homepage', async ({ page }, testInfo) => {
      await page.goto('/fr');

      await expect(
        page.getByRole('heading', {
          name: 'Code de démarrage pour Next.js avec Tailwind CSS',
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });
  });
});
