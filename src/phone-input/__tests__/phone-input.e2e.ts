/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  phoneInput: `[data-baseweb="phone-input"]`,
  phoneInputInput: `[data-e2e="phone-input-input"]`,
  phoneInputFlag: `[data-e2e="country-flag"]`,
  phoneInputDialcode: `[data-e2e="phone-input-dialcode"]`,
  phoneInputSelect: `[data-baseweb="select"]`,
  phoneInputSelectDropdown: `[role="listbox"]`,
  phoneInputSelectListItem: `[data-e2e="country-select-list-item"]`,
};

const countryListItemForIso = (iso) => `${selectors.phoneInputSelectListItem} [data-iso="${iso}"]`;

const unitedStates = { iso: 'US', dialCode: '+1' };
const unitedKingdom = { iso: 'GB', dialCode: '+44' };

test.describe('PhoneInput', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'phone-input--lite');
    await page.waitForSelector(selectors.phoneInput);
  });

  test('passes basic a11y tests', async ({ page }) => {
    const accessibilityReport = await analyzeAccessibility(page, [
      {
        id: 'autocomplete-valid',
        enabled: false,
      },
    ]);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('displays a selected country flag and dial code by default', async ({ page }) => {
    // verify correct default flag shows up
    const flag = page.locator(selectors.phoneInputFlag);
    await expect(flag).toHaveAttribute('data-iso', unitedStates.iso);

    const dialCode = page.locator(selectors.phoneInputDialcode);
    await expect(dialCode).toHaveText(unitedStates.dialCode);
  });

  test('allows a user to open a dropdown containing country dial codes', async ({ page }) => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitForSelector(selectors.phoneInputSelectDropdown);
    // // verify US option is visible
    await page.waitForSelector(countryListItemForIso(unitedStates.iso), {
      state: 'visible',
    });
  });

  test('allows a user select a country using the keyboard', async ({ page }) => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitForSelector(selectors.phoneInputSelectDropdown);

    await page.keyboard.type('United');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const dialCode = page.locator(selectors.phoneInputDialcode);
    await expect(dialCode).toHaveText(unitedKingdom.dialCode);
  });

  test('allows a user to select a country from the dropdown, which populates a dial code', async ({
    page,
  }) => {
    // click select
    await page.click(selectors.phoneInputSelect);
    // verify dropdown is open
    await page.waitForSelector(selectors.phoneInputSelectDropdown);
    // select a new country, United Kingdom
    await page.click(countryListItemForIso(unitedKingdom.iso));
    // verify dropdown has closed
    await page.waitForSelector(selectors.phoneInputSelectDropdown, {
      state: 'hidden',
    });
    // verify correct flag and dial code shows up
    const flag = page.locator(selectors.phoneInputFlag);
    await expect(flag).toHaveAttribute('data-iso', unitedKingdom.iso);

    const dialCode = page.locator(selectors.phoneInputDialcode);
    await expect(dialCode).toHaveText(unitedKingdom.dialCode);
  });
});
