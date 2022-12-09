/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */

const config = {
  'app-nav-bar--app-nav-bar': {
    interactions: [
      {
        name: 'openedMenu',
        behavior: async (page) => {
          const drawerMenuSelector = `[data-baseweb="button"] [data-baseweb="icon"]`;
          const userMenuSelector = `[data-baseweb="button"] [data-baseweb="avatar"]`;
          const menuSelector = `[data-baseweb="menu"]`;
          let menuToClickOn = userMenuSelector;
          await page.waitForSelector('body');
          // the large breakpoint from the theme is 1136
          if (page.viewportSize().width < 1136) {
            menuToClickOn = drawerMenuSelector;
          }
          await page.waitForSelector(menuToClickOn, { state: 'visible' });
          await page.click(menuToClickOn);
          await page.waitForSelector(menuSelector, {
            state: 'visible',
          });
        },
      },
      {
        name: 'largeViewport',
        behavior: async (page) => {
          await page.setViewportSize({ width: 1600, height: 800 });
        },
      },
    ],
  },
  // repeated plain openedMenu with overridden icon scenario
  'app-nav-bar--icon-overrides': {
    interactions: [
      {
        name: 'openedMenu',
        behavior: async (page) => {
          const drawerMenuSelector = `[data-baseweb="button"] [data-baseweb="icon"]`;
          const userMenuSelector = `[data-baseweb="button"] [data-baseweb="avatar"]`;
          const menuSelector = `[data-baseweb="menu"]`;
          let menuToClickOn = userMenuSelector;
          await page.waitForSelector('body');
          // the large breakpoint from the theme is 1136
          if (page.viewportSize().width < 1136) {
            menuToClickOn = drawerMenuSelector;
          }
          await page.waitForSelector(menuToClickOn, { visible: true });
          await page.click(menuToClickOn);
          await page.waitForSelector(menuSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'phone-input--country-select-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          const flagOptionSelector = `li[role="option"] [data-iso="US"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
          await page.waitForSelector(flagOptionSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'phone-input--country-select-small-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          const flagOptionSelector = `li[role="option"] [data-iso="US"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
          await page.waitForSelector(flagOptionSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'combobox--combobox': {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async (page) => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'combobox--overrides': {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async (page) => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'data-table--add-remove-columns': {
    interactions: [
      {
        name: 'addColumn',
        behavior: async (page) => {
          const button = '[data-testid="add"]';
          await page.waitForSelector(button);
          await page.click(button);
        },
      },
      {
        name: 'removeColumn',
        behavior: async (page) => {
          const button = '[data-testid="remove"]';
          await page.waitForSelector(button);
          await page.click(button);
        },
      },
    ],
  },
  'data-table--column-width-resize': {
    interactions: [
      {
        name: 'resize columns',
        behavior: async (page) => {
          const button = page.locator('text="make strings long"');
          await button.click(button);
          await page
            .locator(`text="${'a'.repeat(40)}"`)
            .first()
            .waitFor();
        },
      },
    ],
  },
  'data-table--extracted-highlight': {
    interactions: [
      {
        name: 'controlledRowHighlightIndex',
        behavior: async (page) => {
          let index = 0;
          while (index < 4) {
            await page.keyboard.press('j');
            await new Promise((res) => setTimeout(res, 100));
            index += 1;
          }
        },
      },
      {
        name: 'rowHighlightScrollsTableDown',
        behavior: async (page) => {
          let index = 0;
          while (index < 20) {
            await page.keyboard.press('j');
            await new Promise((res) => setTimeout(res, 100));
            index += 1;
          }
        },
      },
      {
        name: 'rowHighlightScrollsTableUp',
        behavior: async (page) => {
          let index = 0;
          while (index < 20) {
            await page.keyboard.press('j');
            await new Promise((res) => setTimeout(res, 100));
            index += 1;
          }

          index = 0;
          while (index < 15) {
            await page.keyboard.press('k');
            await new Promise((res) => setTimeout(res, 100));
            index += 1;
          }
        },
      },
    ],
  },
  'data-table--numerical-column': {
    interactions: [
      {
        name: 'single',
        behavior: async (page) => {
          const button = '[aria-label="Single Value"]';
          await page.waitForSelector(button, {
            state: 'visible',
          });
          await page.click(button);
        },
      },
    ],
  },
  'datepicker--datepicker': {
    interactions: [
      {
        name: 'setDateHighlighted',
        behavior: async (page) => {
          const button = '[data-baseweb="button"]';
          const input = 'input';
          const calendar = '[data-baseweb="calendar"]';
          await page.waitForSelector(button);
          await page.click(button);
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'datepicker--range': {
    interactions: [
      {
        name: 'selectedRangeHighlighted',
        behavior: async (page) => {
          const input = 'input';
          const calendar = '[data-baseweb="calendar"]';
          const startDay = '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]';
          const endDay = '[aria-label="Choose Wednesday, March 20th 2019. It\'s available."]';
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            state: 'visible',
          });
          await page.click(startDay);
          await page.click(endDay);
          await page.waitForSelector(calendar, {
            state: 'hidden',
          });
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'datepicker--range-highlight': {
    interactions: [
      {
        name: 'noHighlight',
        behavior: async (page) => {
          await page.locator('input').click();
          const calendar = page.locator('[data-baseweb="calendar"]');
          await calendar.waitFor({ state: 'visible' });
          await calendar.locator('[aria-label="Next month."]').click();
          await calendar.locator('text="April"').waitFor();
        },
      },
    ],
  },
  'input--password': {
    interactions: [
      {
        name: 'togglesMask',
        behavior: async (page) => {
          const toggleSelector = `[data-e2e="mask-toggle"]`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'input--password-icon-overrides': {
    interactions: [
      {
        name: 'togglesMask',
        behavior: async (page) => {
          const toggleSelector = `[data-e2e="mask-toggle"]`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'input--number': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async (page) => {
          const toggleSelector = `input`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'layer--z-index': {
    interactions: [
      {
        name: 'withAndWithoutZIndex',
        behavior: async (page) => {
          const btnZIndex = `[data-test="zindex-btn"]`;
          const btnNoZIndex = `[data-test="no-zindex-btn"]`;
          const layerZIndex = `[data-test="zindex-layer"]`;
          const layerNoZIndex = `[data-test="no-zindex-layer"]`;
          await page.waitForSelector(btnZIndex);
          await page.click(btnZIndex);
          await page.waitForSelector(layerZIndex);
          await page.click(btnNoZIndex);
          await page.waitForSelector(layerNoZIndex);
        },
      },
    ],
  },
  'side-navigation--nav-long': {
    skip: true,
  },
  'snackbar--element': {
    skip: true,
  },
  //Ref: https://github.com/uber/baseweb/issues/4557
  'popover--focus-loop': {
    interactions: [
      {
        name: 'keyboardNav',
        behavior: async (page) => {
          await page.keyboard.press('Tab');
        },
      },
    ],
  },
  // Ref: https://github.com/uber/baseweb/issues/4693
  'popover--hover': {
    interactions: [
      {
        name: 'positions-content-correctly-on-first-render',
        behavior: async (page) => {
          await page.hover('button');
          await page.waitForSelector('#content');
        },
      },
    ],
  },
  'popover--progress-bar': {
    interactions: [
      {
        name: 'popover-shows-when-progress-bar-is-hovered',
        behavior: async (page) => {
          await page.hover('[data-baseweb="progress-bar"]');
          await page.waitForSelector('[data-baseweb="typo-paragraphsmall"]');
        },
      },
    ],
  },
  'popover--reposition': {
    skip: true,
  },
  'popover--prevent-scroll-on-focus': {
    interactions: [
      // this is flakey in playwright
      // {
      //   name: 'scrollDownAndCheckIfPreventScrollPreventsReScrollOnPopover',
      //   behavior: async (page) => {
      //     await page.waitForSelector('button');
      //     // Open Popover
      //     await page.click('button');
      //     await page.waitForSelector('div[data-e2e="content"]');
      //     // Close Popover
      //     await page.click('button');
      //     await page.waitForSelector('div[data-e2e="content"]', { state: 'hidden' });
      //     // Scroll to the last div
      //     await page.evaluate(() =>
      //
      //       document.querySelector('div[data-e2e-spacer="1"]').scrollIntoView()
      //     );
      //     // Listening to Scroll Event to determine if the page is still scrolling
      //     // Could wait for few seconds but that would be unreliable
      //     await page.evaluate(() => {
      //       function scrollHandler() {
      //         // Disabling eslint checks on window / document as they would be executed in playwright
      //         window.isPageScrolling = true;
      //         clearTimeout(window.scrollTimer);
      //         window.scrollTimer = setTimeout(() => {
      //           window.isPageScrolling = false;
      //           window.removeEventListener('scroll', scrollHandler);
      //         }, 100);
      //       }
      //       window.addEventListener('scroll', scrollHandler);
      //       /* eslint-enable cup/no-undef */
      //     });
      //     // Waiting for scroll to end
      //     await page.waitForFunction('window.isPageScrolling === false');
      //     // Clicking on button to show Popover
      //     await page.click('button');
      //     await page.waitForSelector('div[data-e2e="content"]');
      //   },
      // },
    ],
  },
  'popover--reposition-with-anchor-update': {
    interactions: [
      {
        name: 'addOptions',
        behavior: async (page) => {
          const options = await page.$$('[role="option"]');
          await options[0].click();
          await options[1].click();
        },
      },
    ],
  },
  'phone-input--custom-flags': {
    interactions: [
      {
        name: 'expandedAndFiltered',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"]`;
          const selectInputSelector = `input[role="combobox"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
          await page.type(selectInputSelector, 'zzz');
        },
      },
    ],
  },
  'pin-code--mask': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async (page) => {
          const inputSelector = 'input';
          await page.focus(inputSelector);
          await page.keyboard.press('1');
          await page.keyboard.press('2');
          await page.keyboard.press('3');
          await page.keyboard.press('4');
        },
      },
    ],
  },
  'progress-bar--progressbar-rounded-animated': {
    //Animation is in JS, so it can't be disabled
    skip: true,
  },
  'progress-steps--progress-steps': {
    interactions: [
      {
        name: 'triggerNextStep',
        behavior: async (page) => {
          const selector = `button:enabled`;
          await page.$(selector);
          await page.click(selector);
        },
      },
    ],
  },
  'rating--star': {
    interactions: [
      {
        name: 'selectFiveStars',
        behavior: async (page) => {
          const selector = `li:nth-child(5)`;
          await page.$(selector);
          await page.click(selector);
          await page.waitForTimeout(200);
        },
      },
    ],
  },
  'drawer--select': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"] input`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'select--select': {
    interactions: [
      {
        name: 'typeToFilter',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"] input`;
          await page.type(selectSelector, 'aq');
        },
      },
    ],
  },
  'select--in-modal': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async (page) => {
          const buttonSelector = `[data-baseweb="button"]`;
          const selectSelector = `[data-baseweb="select"] input`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(buttonSelector);
          // open modal
          await page.click(buttonSelector);
          await page.waitForSelector(selectSelector);
          // open select dropdown
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'select--option-group': {
    interactions: [
      {
        name: 'selectGroupDropdownVisible',
        behavior: async (page) => {
          const inputSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'select--click-triggers-blur': {
    interactions: [
      {
        name: 'click',
        behavior: async (page) => {
          const buttonSelector = `[data-test-id="button"]`;
          const selectSelector = `[data-baseweb="select"]`;
          await page.waitForSelector(buttonSelector);
          await page.click(buttonSelector);
          await page.waitForSelector(selectSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'select--search-single': {
    interactions: [
      {
        name: 'open',
        behavior: async (page) => {
          const inputSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'select--search-single-fontsize': {
    interactions: [
      {
        name: 'showsAllText',
        behavior: async (page) => {
          const inputSelector = `[data-baseweb="select"]`;
          const selectInputSelector = `input[role="combobox"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
          await page.type(selectInputSelector, 'zzz');
        },
      },
    ],
  },
  'tabs-motion--conditional': {
    skip: true,
  },
  'tabs-motion--focus': {
    skip: true,
  },
  'tabs-motion--manual': {
    skip: true,
  },
  'tabs-motion--stateful': {
    skip: true,
  },
  'tabs-motion--render-all': {
    skip: true,
  },
  'tabs-motion--vertical-page-scroll': {
    interactions: [
      {
        name: 'ArrowDown',
        behavior: async (page) => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
          await page.keyboard.press('ArrowDown');
        },
      },
    ],
  },
  'tabs-motion--tabs-motion': {
    interactions: [
      {
        name: 'focus',
        behavior: async (page) => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
        },
      },
    ],
  },
  'textarea--textarea': {
    interactions: [
      {
        name: 'focus',
        behavior: async (page) => {
          const element = await page.$('textarea');
          await element.focus();
        },
      },
    ],
  },
  'toast--toaster-focus': {
    skip: true,
  },
  'tooltip--complex': {
    interactions: [
      {
        name: 'contrast',
        behavior: async (page) => {
          const tooltipSelector = 'span';
          const tooltipPopoverSelector = '[data-baseweb="tooltip"]';
          await page.hover(tooltipSelector);
          await page.waitForSelector(tooltipPopoverSelector, {
            state: 'visible',
          });
        },
      },
    ],
  },
  'tree-view--icon-overrides': {
    interactions: [
      {
        name: 'collapse',
        behavior: async (page) => {
          const node = '[data-nodeid="2"]';
          await page.waitForSelector(node);
          await page.click(node);
        },
      },
    ],
  },
  'modal--select': {
    interactions: [
      {
        name: 'selectOption',
        behavior: async (page) => {
          const selectSelector = '[data-baseweb="select"] input';
          const dropdownSelector = '[role="listbox"]';
          const dropdownOptionSelector = '[role="option"]';
          const firstOption = `${dropdownSelector} ${dropdownOptionSelector}:nth-child(1)`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            state: 'visible',
          });
          await page.click(firstOption);
          await page.waitForSelector(dropdownSelector, {
            state: 'hidden',
          });
        },
      },
    ],
  },
  'message-card--image-positions': {
    skip: true,
  },
};

function getSnapshotConfig(scenarioName) {
  const defaultConfig = {
    skip: false,
    interactions: [],
  };
  const snapshotConfig = config[scenarioName];
  if (!snapshotConfig) {
    return defaultConfig;
  } else {
    return {
      ...defaultConfig,
      ...snapshotConfig,
    };
  }
}

module.exports = {
  config,
  getSnapshotConfig,
};
