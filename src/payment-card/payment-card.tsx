/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import * as valid from 'card-validator';

import { addGaps, getCaretPosition } from './utils';

import { getOverrides } from '../helpers/overrides';
import { Input, SIZE } from '../input';
import { ThemeContext } from '../styles/theme-provider';

import AmexIcon from './icons/amex';
import DinersClubIcon from './icons/dinersclub';
import DiscoverIcon from './icons/discover';
import EloIcon from './icons/elo';
import GenericIcon from './icons/generic';
import JcbIcon from './icons/jcb';
import MaestroIcon from './icons/maestro';
import MastercardIcon from './icons/mastercard';
import UnionPayIcon from './icons/unionpay';
import VisaIcon from './icons/visa';
import UatpIcon from './icons/uatp';

import { IconWrapper as StyledIconWrapper } from './styled-components';

import type { PaymentCardProps } from './types';

import { CUSTOM_CARDS_CONFIGURATION } from './custom-cards.config';

const CardTypeToComponent = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
  'american-express': AmexIcon,
  'diners-club': DinersClubIcon,
  discover: DiscoverIcon,
  jcb: JcbIcon,
  unionpay: UnionPayIcon,
  maestro: MaestroIcon,
  elo: EloIcon,
  generic: GenericIcon,
  uatp: UatpIcon,
};

class PaymentCard extends React.Component<PaymentCardProps> {
  caretPosition = 0;
  inRef: HTMLInputElement | HTMLTextAreaElement | null = null;

  static defaultProps = {
    autoComplete: 'cc-number',
    autoFocus: false,
    disabled: false,
    name: '',
    error: false,
    onBlur: () => {},
    onFocus: () => {},
    overrides: {},
    required: false,
    size: 'default',
    // @ts-ignore
    startEnhancer: null,
    // @ts-ignore
    endEnhancer: null,
  };

  constructor(props: PaymentCardProps) {
    super(props);
    // For adding new custom card type, add card config to custom-cards.config.js
    CUSTOM_CARDS_CONFIGURATION.forEach((cardTypeConfig) =>
      // @ts-expect-error todo(flow-ts) upgrade card-validator dependency
      valid.creditCardType.addCard(cardTypeConfig)
    );
  }

  componentDidUpdate(prevProps: PaymentCardProps) {
    if (this.inRef && prevProps.value !== this.props.value) {
      this.inRef.setSelectionRange(this.caretPosition, this.caretPosition);
    }
  }
  render() {
    const {
      overrides = {},
      size = SIZE.default,
      onChange,
      value,
      'aria-label': ariaLabel = 'Please enter a debit or credit card number.',
      ...restProps
    } = this.props;

    const { IconWrapper: IconWrapperOverride, ...restOverrides } = overrides;
    const [IconWrapper, iconWrapperProps] = getOverrides(IconWrapperOverride, StyledIconWrapper);

    // todo(flow->ts): maybe incorrect typecast, should it be `${value}`?
    const validatedValue = valid.number(value as string);
    let gaps: number[] = [];
    let type: string | undefined | null = undefined;
    if (validatedValue.card) {
      gaps = validatedValue.card.gaps || [];
      type = validatedValue.card.type;
    }

    // @ts-ignore
    const getBeforeComponent = (theme) => {
      const iconSize = {
        [SIZE.mini]: theme.sizing.scale600,
        [SIZE.compact]: theme.sizing.scale800,
        [SIZE.default]: theme.sizing.scale900,
        [SIZE.large]: theme.sizing.scale1000,
      };
      return () => (
        <IconWrapper $size={size} {...iconWrapperProps}>
          {/* @ts-ignore */}
          {React.createElement(CardTypeToComponent[type || 'generic'] || GenericIcon, {
            size: iconSize[size],
          })}
        </IconWrapper>
      );
    };

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          //$FlowExpectedError[cannot-spread-inexact]
          <Input
            size={size}
            aria-label={ariaLabel}
            data-baseweb="payment-card-input"
            inputMode="numeric"
            overrides={Object.freeze({
              ...restOverrides,
              Before: getBeforeComponent(theme),
            })}
            onChange={(e) => {
              const [position, value] = getCaretPosition(
                e.target.value,
                this.props.value ? String(this.props.value) : '',
                // @ts-ignore
                e.target.selectionStart
              );
              // @ts-expect-error todo(flow->ts): looks dangerous
              this.caretPosition = position;
              this.inRef = e.target;
              // @ts-expect-error todo(flow->ts): looks dangerous
              e.target.value = value;
              onChange && onChange(e);
            }}
            value={addGaps(gaps, String(value) || '')}
            {...restProps}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default PaymentCard;
