/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as CountrySelectDropdownScenario } from './country-select-dropdown.scenario';
import { Scenario as CountrySelectSmallDropdownScenario } from './country-select-small-dropdown.scenario';
import { Scenario as PhoneInputCustomFlags } from './phone-input-custom-flags.scenario';
import { Scenario as PhoneInputDropdown } from './phone-input-dropdown.scenario';
import { Scenario as PhoneInputOverrides } from './phone-input-overrides.scenario';
import { Scenario as PhoneInputLite } from './phone-input-lite.scenario';
import { Scenario as PhoneInputDefault } from './phone-input.scenario';

export const CountrySelectDropdown = () => <CountrySelectDropdownScenario />;
export const CountrySelectSmallDropdown = () => <CountrySelectSmallDropdownScenario />;
export const CustomFlags = () => <PhoneInputCustomFlags />;
export const Dropdown = () => <PhoneInputDropdown />;
export const Overrides = () => <PhoneInputOverrides />;
export const PhoneInput = () => <PhoneInputDefault />;
export const Lite = () => <PhoneInputLite />;
