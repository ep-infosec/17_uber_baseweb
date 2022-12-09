/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility, isSameNode } from '../../test/integration';

const selectors = {
  calendar: '[data-baseweb="calendar"]',
  day0: '[aria-label="Choose Friday, February 22nd 2019. It\'s available."]',
  day: '[aria-label="Choose Saturday, February 23rd 2019. It\'s available."]',
  day1: '[aria-label="Choose Thursday, February 21st 2019. It\'s available."]',
  day2: '[aria-label="Choose Friday, February 15th 2019. It\'s available."]',
  day3: '[aria-label="Choose Friday, March 1st 2019. It\'s available."]',
  day4: '[aria-label="Choose Sunday, February 17th 2019. It\'s available."]',
  day5: '[aria-label="Choose Friday, March 22nd 2019. It\'s available."]',
  day6: '[aria-label="Choose Tuesday, January 22nd 2019. It\'s available."]',
};
const isActiveEl = async (page, selector) => {
  const el = await page.evaluateHandle(() => window.document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await isSameNode(page, el, selectedEl);
  return equal;
};

const checkAccessibility = async (page) => {
  return await analyzeAccessibility(page, [
    {
      //indicates to verify that roledescription is read properly
      id: 'aria-roledescription',
      enabled: false,
    },
  ]);
};

test.describe('Calendar', () => {
  test('calendar passes basic a11y tests', async ({ page }) => {
    await mount(page, 'datepicker--calendar');
    await page.waitForSelector(selectors.calendar);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
  const waitTillDay = async (page) => {
    await mount(page, 'datepicker--calendar');
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day0);
    await page.focus(selectors.day0);
  };

  test('navigates to next day on ArrowRight key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowRight');
    const isDayActive = await isActiveEl(page, selectors.day);
    expect(isDayActive).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
  test('navigates to prev day on ArrowLeft key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowLeft');
    const isDay1Active = await isActiveEl(page, selectors.day1);
    expect(isDay1Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });

  test('navigates to prev week on ArrowUp key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowUp');
    const isDay2Active = await isActiveEl(page, selectors.day2);
    expect(isDay2Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });

  test('navigates to prev week on ArrowDown key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowDown');
    const isDay3Active = await isActiveEl(page, selectors.day3);
    expect(isDay3Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });

  test('navigates to start of week on Home key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('Home');
    const isDay4Active = await isActiveEl(page, selectors.day4);
    expect(isDay4Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
  test('navigates to end of week on End key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('End');
    const isDayActive = await isActiveEl(page, selectors.day);
    expect(isDayActive).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
  test('navigates to prev month on PageUp key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('PageUp');
    const isDay6Active = await isActiveEl(page, selectors.day6);
    expect(isDay6Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
  test('navigates to next month on PageDown key press', async ({ page }) => {
    await waitTillDay(page);
    await page.keyboard.press('PageDown');
    const isDay5Active = await isActiveEl(page, selectors.day5);
    expect(isDay5Active).toBe(true);

    expect(await checkAccessibility(page)).toHaveNoAccessibilityIssues();
  });
});
