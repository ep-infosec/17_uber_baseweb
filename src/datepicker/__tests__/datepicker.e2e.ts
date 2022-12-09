/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day3: '[aria-label="Choose Thursday, February 14th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Saturday, March 10th 2018. It\'s available."]',
  day6: '[aria-label="Choose Monday, July 1st 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month."]',
  rightArrow: '[aria-label="Next month."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

test.describe('Datepicker', () => {
  test('datepicker passes basic a11y tests', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('opens the calendar on click', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const calendarCount = await page.$$eval(selectors.calendar, (calendar) => calendar.length);
    expect(calendarCount).toEqual(1);
  });

  test('opens the calendar on input focus', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.focus(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const calendarCount = await page.$$eval(selectors.calendar, (calendar) => calendar.length);
    expect(calendarCount).toEqual(1);
  });

  test('closes the calendar on esc', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.calendar, {
      state: 'hidden',
    });
  });

  test('selects day when clicked', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();
    const calendar = page.locator(selectors.calendar);
    await expect(calendar).toBeVisible();
    const day = page.locator(selectors.day);
    await day.click();
    await expect(calendar).toBeHidden();
    await expect(input).toHaveValue('2019/03/10');
  });

  test('rerenders input if value is changed', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await page.locator('button').click();
    await expect(input).toHaveValue('2019/07/01');
  });

  test('input causes calendar to switch to appropriate month', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();

    const day = page.locator(selectors.day);
    await expect(day).toBeVisible();

    await input.focus();
    await input.fill('2019/07/0');
    await input.type('2');

    await expect(day).toBeHidden();
    await expect(page.locator(selectors.day6)).toBeVisible();
  });

  test('month year dropdown opens on arrow down', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');

    const input = page.locator(selectors.input).first();
    await input.click();

    const monthYearSelectButton = page.locator(selectors.monthYearSelectButton).first();
    await monthYearSelectButton.focus();
    await monthYearSelectButton.press('ArrowDown');

    const monthYearSelectMenu = page.locator(selectors.monthYearSelectMenu);
    await monthYearSelectMenu.waitFor();
  });

  test('month year dropdown opens on arrow up', async ({ browserName, page }) => {
    test.fixme(browserName === 'webkit', 'this test fails in webkit');

    await mount(page, 'datepicker--datepicker');

    const input = page.locator(selectors.input).first();
    await input.click();

    const monthYearSelectButton = page.locator(selectors.monthYearSelectButton).first();
    await monthYearSelectButton.focus();
    await monthYearSelectButton.press('ArrowUp');

    const monthYearSelectMenu = page.locator(selectors.monthYearSelectMenu);
    await monthYearSelectMenu.waitFor();
  });

  test('month year dropdown escape does not close calendar', async ({ browserName, page }) => {
    test.fixme(browserName === 'webkit', 'this test fails in webkit');

    await mount(page, 'datepicker--datepicker');

    const input = page.locator(selectors.input).first();
    await input.click();

    const monthYearSelectButton = page.locator(selectors.monthYearSelectButton).first();
    await monthYearSelectButton.focus();
    await monthYearSelectButton.press('ArrowDown');

    const monthYearSelectMenu = page.locator(selectors.monthYearSelectMenu);
    await monthYearSelectMenu.waitFor();

    await monthYearSelectButton.press('Escape');
    await monthYearSelectMenu.waitFor({ state: 'hidden' });
  });
});
