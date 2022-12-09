/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export const GA_ID = 'UA-133544678-2';
export const trackPageView = (url: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('config', GA_ID, {
      page_location: url,
    });
  } catch (error) {
    // ignore the error
  }
};

export const trackEvent = (eventName: string, label: string, value?: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag('event', eventName, {
      send_to: GA_ID,
      event_category: 'general',
      event_label: label,
      event_value: value,
    });
  } catch (error) {
    // ignore the error
  }
};
