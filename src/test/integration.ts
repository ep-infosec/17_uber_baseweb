/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ElementHandle, Page } from '@playwright/test';
import { expect } from '@playwright/test';

// eslint auto-fixes these two imports into a single line, but then tsc complains
// eslint-disable-next-line import/no-duplicates
import type axeCore from 'axe-core';
// eslint-disable-next-line import/no-duplicates
import type { AxeResults, Rule } from 'axe-core';

import queryString from 'query-string';
import { printReceived } from 'jest-matcher-utils';
import { resolve } from 'path';
import { realpathSync } from 'fs';

const pathToAxe = require.resolve('axe-core/axe.min.js');
const appDirectory = realpathSync(process.cwd());

const resolvePath = (relativePath) => resolve(appDirectory, relativePath);

export const addTestStyles = async (page: Page) => {
  await page.addStyleTag({
    content: `*,
    *::before,
    *::after {
      -moz-transition: none !important;
      transition: none !important;
      transition-duration: 0s !important;
      -moz-transition-duration: 0s !important;
      transition-property: none !important;
      -moz-transition-property: none !important;
      -moz-animation: none !important;
      animation: none !important;
      animation-delay: -0.0001s !important;
      animation-duration: 0s !important;
      animation-play-state: paused !important;
      caret-color: transparent !important;
    }`,
  });
};

export async function mount(page: Page, name: string, theme?: string, rtl?: boolean) {
  const base = process.env.PUPPETEER_TARGET_URL || 'http://localhost:8080';
  const url = `${base}?${queryString.stringify({
    story: name,
    theme,
    mode: 'preview',
    rtl: rtl === true ? 'true' : undefined,
  })}`;

  await page.goto(url);
  await page.waitForSelector('[data-storyloaded]');
  await addTestStyles(page);
}

declare global {
  interface Window {
    axe: typeof axeCore;
  }
}

export async function analyzeAccessibility(page: Page, rules: Rule[] = []) {
  // Inject the axe script in our page
  await page.addScriptTag({ path: resolvePath(pathToAxe) });
  // we make sure that axe is executed in the next tick after
  // the page emits the load event, giving priority for the
  // original JS to be evaluated
  const accessibilityReport = await page.evaluate((axeRules) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => {
      window.axe.configure({
        rules: [
          {
            id: 'region',
            enabled: false,
          },
          {
            id: 'landmark-one-main',
            enabled: false,
          },
          {
            id: 'bypass',
            enabled: false,
          },
          {
            id: 'page-has-heading-one',
            enabled: false,
          },
          {
            id: 'color-contrast',
            enabled: false,
          },
          ...axeRules,
        ],
      });
      return window.axe.run();
    });
  }, rules);

  return accessibilityReport;
}

export function isSameNode(page: Page, a: ElementHandle, b: ElementHandle) {
  return page.evaluate(({ a, b }) => a === b, { a, b });
}

const printInvalidNode = (node) =>
  `- ${printReceived(node.html)}\n\t${node.any.map((check) => check.message).join('\n\t')}`;

const printInvalidRule = (rule) =>
  `Violated rule: ${printReceived(rule.id)}\nReasoning: ${printReceived(rule.help)}\n${
    rule.nodes.length
  } nodes involved:\n\n${rule.nodes.map(printInvalidNode).join('\n')}`;

// Add a new method to expect assertions with a very detailed error report
expect.extend({
  toHaveNoAccessibilityIssues(accessibilityReport: AxeResults) {
    const messages = [];

    for (const violation of accessibilityReport.violations) {
      messages.push(printInvalidRule(violation));
    }
    for (const incomplete of accessibilityReport.incomplete) {
      messages.push(printInvalidRule(incomplete));
    }

    return {
      pass: messages.length === 0,
      message: () => messages.join('\n'),
    };
  },
});
