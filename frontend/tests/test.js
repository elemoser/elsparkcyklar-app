import { expect, test } from '@playwright/test';

test('index page has expected h3', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Välkommen till BiKR - det bästa valet för ditt elsparkcykeläventyr! 🚴‍♂️💨' })).toBeVisible();
});

test('rent page has expected h1', async ({ page }) => {
	await page.goto('/rent');
	await expect(page.getByRole('heading', { name: 'Välj en stad' })).toBeVisible();
});
