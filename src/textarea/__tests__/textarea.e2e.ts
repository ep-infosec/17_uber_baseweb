/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  textarea: 'textarea',
  clearIcon: '[data-e2e="clear-icon"]',
};

test.describe('textarea', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);
    const accessibilityReport = await analyzeAccessibility(page, [{ id: 'label', enabled: false }]);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('preset value is displayed', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    const textarea = page.locator(selectors.textarea);
    await expect(textarea).toHaveValue('initial value');
  });

  test('entered value is displayed', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    const textarea = page.locator(selectors.textarea);
    await textarea.click();
    await textarea.type('1');
    await expect(textarea).toHaveValue('initial value1');
  });

  test('can be cleared with a click', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    const textarea = page.locator(selectors.textarea);
    await textarea.click();
    await textarea.type('Something or other');
    await page.locator(selectors.clearIcon).click();
    await expect(textarea).toHaveValue('');
  });

  test('can be cleared with escape', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    const textarea = page.locator(selectors.textarea);
    await textarea.click();
    await textarea.type('Something or other');
    await page.keyboard.press('Escape');
    await expect(textarea).toHaveValue('');
  });
});
