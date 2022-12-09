/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  cancelButton: '[data-e2e="cancel-button"]',
  closeButton: 'button[aria-label="Close"]',
  openModal: '.open-modal-button',
  dialog: '[role="dialog"]',
  selectInput: 'input[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  selectedList: '[data-id="selected"]',
  dropDownOption: '[role="option"]',
  backdrop: '[data-e2e="backdrop"]',
};

const optionAtPosition = (position) =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

test.describe('modal', () => {
  test('handles focus changes properly', async ({ browserName, page }) => {
    test.fixme(browserName === 'webkit', 'this feature fails in webkit');

    await mount(page, 'modal--modal');
    await page.waitForSelector(selectors.closeButton);
    // close modal to start fresh
    await page.click(selectors.closeButton);
    await page.waitForSelector(selectors.closeButton, {
      state: 'hidden',
    });
    await page.click(selectors.openModal);
    await page.waitForSelector(selectors.dialog);

    const cancelButtonIsFocused = await page.$eval(
      selectors.cancelButton,
      (cancelButton) => cancelButton === document.activeElement
    );

    // first focusable element (cancel button) should be focused
    expect(cancelButtonIsFocused).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');

    const closeButtonIsFocused = await page.$eval(
      selectors.closeButton,
      (closeButton) => closeButton === document.activeElement
    );

    // focus should be trapped in modal and go to close button
    expect(closeButtonIsFocused).toBe(true);

    // dialog should be accessible
    const accessibilityReport = await analyzeAccessibility(page, [
      // disable tabindex rule because react-focus-lock uses tabindex to trap focus
      { id: 'tabindex', enabled: false },
    ]);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();

    // close again
    await page.click(selectors.closeButton);
    await page.waitForSelector(selectors.closeButton, {
      state: 'hidden',
    });

    const openIsFocused = await page.$eval(
      selectors.openModal,
      (button) => button === document.activeElement
    );
    expect(openIsFocused).toBe(true);
  });

  // This is a regression test to verify that elements in a portal will still work.
  test('allows interaction with select', async ({ page }) => {
    await mount(page, 'modal--select');
    await page.waitForSelector(selectors.dialog);

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });

    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('AliceBlue');
  });

  test('closes one layer at a time on click outside', async ({ page }) => {
    await mount(page, 'modal--select');
    await page.waitForSelector(selectors.dialog);

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);

    // clicking outside of the modal content
    // and outside the select dropdown
    await page.click(selectors.openModal, { force: true });
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });
    await page.waitForSelector(selectors.dialog);

    await page.click(selectors.openModal, { force: true });
    await page.waitForSelector(selectors.dialog, {
      state: 'hidden',
    });
  });

  test('closes one popover at a time on esc key press', async ({ page }) => {
    await mount(page, 'modal--select');
    await page.waitForSelector(selectors.dialog);

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectDropDown, { state: 'hidden' });
    await page.waitForSelector(selectors.selectInput);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectInput, { state: 'hidden' });
  });
});
