/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const START_DATE_INPUT = '[id="start-date"] input';
const START_TIME_SELECT = '[id="time-select-start"]';
const END_DATE_INPUT = '[id="end-date"] input';

const DISPLAY_START_DATE = '[id="display-start-date"]';
const DISPLAY_START_TIME = '[id="display-start-time"]';
const DISPLAY_END_DATE = '[id="display-end-date"]';
const DISPLAY_END_TIME = '[id="display-end-time"]';

const SET_UNDEFINED_BTN = '[id="set-undefined"]';

test.describe('datepicker-composed-range', () => {
  test('displaying start date can update value from text input with existing dates', async ({
    page,
  }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(START_DATE_INPUT);

    const before = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(before).toBe('2019/4/1');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(after).toBe('2019/4/2');
  });

  test('displaying end date can update value from text input with existing dates', async ({
    page,
  }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(END_DATE_INPUT);

    const before = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(before).toBe('2019/4/10');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('1');

    const after = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(after).toBe('2019/4/11');
  });

  test('displaying start date can update value from text input with undefined dates', async ({
    page,
  }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(START_DATE_INPUT);

    await page.click(SET_UNDEFINED_BTN);

    const before = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(before).toBe('undefined');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.type('20201010');

    const after = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(after).toBe('2020/10/10');
  });

  test('displaying end date can update value from text input with undefined dates', async ({
    page,
  }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(END_DATE_INPUT);

    await page.click(SET_UNDEFINED_BTN);

    const before = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(before).toBe('undefined');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.type('20201010');

    const start = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    const end = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(start).toBe('2020/10/10');
    expect(end).toBe('2020/10/10');
  });

  test('displaying start date does not update if selection is after end date', async ({ page }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(START_DATE_INPUT);

    const before = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(before).toBe('2019/4/1');

    await page.focus(START_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('1');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    expect(after).toBe('2019/4/1');
  });

  test('displaying end date does not update if selection is before start date', async ({
    page,
  }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(END_DATE_INPUT);

    const before = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(before).toBe('2019/4/10');

    await page.focus(END_DATE_INPUT);
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('3');
    await page.keyboard.press('1');
    await page.keyboard.press('2');

    const after = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    expect(after).toBe('2019/4/10');
  });

  test('handles time selection after end datetime', async ({ page }) => {
    await mount(page, 'datepicker--stateful-composed-range');
    await page.waitForSelector(START_DATE_INPUT);

    await page.click(SET_UNDEFINED_BTN);

    await page.focus(END_DATE_INPUT);
    await page.keyboard.type('20201010');

    await page.focus(START_DATE_INPUT);
    await page.waitForSelector(START_TIME_SELECT);

    await page.focus(`${START_TIME_SELECT} input`);
    await page.keyboard.type('12:00 pm');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const startDate = await page.$eval(DISPLAY_START_DATE, (e) => e.textContent);
    const endDate = await page.$eval(DISPLAY_END_DATE, (e) => e.textContent);
    const startTime = await page.$eval(DISPLAY_START_TIME, (e) => e.textContent);
    const endTime = await page.$eval(DISPLAY_END_TIME, (e) => e.textContent);

    expect(startDate).toBe('2020/10/10');
    expect(startTime).toBe('12:00:00 PM');
    expect(endDate).toBe('2020/10/10');
    expect(endTime).toBe('12:00:00 PM');
  });
});
