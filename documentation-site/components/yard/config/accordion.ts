/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Accordion, Panel } from 'baseui/accordion';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const AccordionConfig: TConfig = {
  componentName: 'Accordion',
  imports: {
    'baseui/accordion': { named: ['Accordion'] },
  },
  scope: {
    Accordion,
    Panel,
  },
  theme: [],
  props: {
    children: {
      value: `<Panel title="Panel 1">
  Content 1
</Panel>
<Panel title="Panel 2">
  Content 2
</Panel>
<Panel title="Panel 3">
  Content 3
</Panel>`,
      type: PropTypes.ReactNode,
      description: `An array of Panel components.`,
      imports: {
        'baseui/accordion': { named: ['Panel'] },
      },
    },
    onChange: {
      value: '({expanded}) => console.log(expanded)',
      type: PropTypes.Function,
      description: 'Called when a panel is expanded.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    accordion: {
      value: true,
      type: PropTypes.Boolean,
      description:
        'When false, allows multiple panels to be open at once. When true, a panel will be closed when a new panel is opened.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Content',
          'ContentAnimationContainer',
          'Header',
          'PanelContainer',
          'Root',
          'ToggleIcon',
        ],
        sharedProps: {
          $disabled: 'disabled',
        },
      },
    },
  },
};

export default AccordionConfig;
