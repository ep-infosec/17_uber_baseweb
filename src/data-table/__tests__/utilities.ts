/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { Page } from '@playwright/test';

export const TABLE_ROOT = 'div[data-baseweb="data-table"]';

export function getTable(page: Page) {
  return page.$('div[data-baseweb="data-table"]');
}

export function getTableLocator(page: Page) {
  return page.locator('div[data-baseweb="data-table"]');
}

export function getCellsAtColumnIndex(page: Page, columnCount: number, index: number) {
  // At most, sample 20 rows. Seems like a reasonable ceiling for now.
  const MAX_ROW_SAMPLES = 20;
  const indices = [];
  for (let i = 0; i < MAX_ROW_SAMPLES; i++) {
    indices.push(i * columnCount + index);
  }

  function getCellAtIndex(page, index) {
    // plus two to convert to one indexed item and skips header row
    return page.$(`${TABLE_ROOT} > div:nth-child(${index + 2})`);
  }

  return Promise.all(indices.map((i) => getCellAtIndex(page, i)));
}

export async function getCellContentsAtColumnIndex(page: Page, columnCount: number, index: number) {
  const elements = await getCellsAtColumnIndex(page, columnCount, index);
  return Promise.all(elements.filter(Boolean).map((element) => element.textContent()));
}

export async function sortColumnAtIndex(page: Page, index: number) {
  const headerCell = page.locator(
    // plus one to convert to one indexed item
    `${TABLE_ROOT} > div > div:nth-child(${index + 1})`
  );
  const sortButton = headerCell.locator('div[role="button"]');
  return sortButton.click();
}

export async function openFilterAtIndex(page: Page, index: number) {
  await page.click('button');
  const options = await page.$$('li[role="option"]');
  await options[index].click();
  return page.$('div[data-baseweb="popover"]');
}

export function matchArrayElements(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
