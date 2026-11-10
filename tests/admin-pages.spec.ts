import { test, expect } from './auth-utils';

test.slow();
test('test access to admin page', async ({ getUserPage }) => {
  // Call the getUserPage fixture with admin signin info to get authenticated session for admin
  const adminPage = await getUserPage('admin@foo.com', 'changeme');

  // Navigate to the home page and wait for post-login indicator
  await adminPage.goto('http://localhost:3000/');
  await expect(
    adminPage.getByRole('button', { name: 'admin@foo.com' })
  ).toBeVisible({ timeout: 10000 });

  // Check for navigation elements
  await expect(
    adminPage.getByRole('link', { name: 'Next.js Application Template' })
  ).toBeVisible({ timeout: 5000 });
  await expect(
    adminPage.getByRole('link', { name: 'Add Contact' })
  ).toBeVisible({ timeout: 5000 });
  await expect(
    adminPage.getByRole('link', { name: 'List Contacts' })
  ).toBeVisible({ timeout: 5000 });
  await expect(
    adminPage.getByRole('link', { name: 'Admin' })
  ).toBeVisible({ timeout: 5000 });

  // Test Add Contact adminPage
  await adminPage.getByRole('link', { name: 'Add Contact' }).click();
  await expect(
    adminPage.getByRole('heading', { name: 'Add Contact' })
  ).toBeVisible({ timeout: 5000 });

  // Test List Contacts adminPage
  await adminPage.getByRole('link', { name: 'List Contacts' }).click();
  await expect(
    adminPage.getByRole('heading', { name: 'List Contacts' })
  ).toBeVisible({ timeout: 5000 });

  // Test Admin adminPage
  await adminPage.getByRole('link', { name: 'Admin' }).click();
  await expect(
    adminPage.getByRole('heading', { name: 'List Contacts (Admin)' })
  ).toBeVisible({ timeout: 5000 });

});