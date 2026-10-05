import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated Accessibility Suite (WCAG 2.2 AA)', () => {
  test('homepage has no serious or critical accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(severeViolations).toEqual([]);
  });

  test('editorial standards institutional page passes WCAG 2.2 AA checks', async ({ page }) => {
    await page.goto('/editorial-standards');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(severeViolations).toEqual([]);
  });

  test('404 error page passes WCAG 2.2 AA checks', async ({ page }) => {
    await page.goto('/missing-page-404-test');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(severeViolations).toEqual([]);
  });
});
