/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
// Components
import MaybeChildMenu from './maybe-child-menu';
import {
  StyledListItemProfile,
  StyledProfileImgContainer,
  StyledProfileImg,
  StyledProfileLabelsContainer,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileBody,
} from './styled-components';
import { getOverrides } from '../helpers/overrides';
// Types
import type { OptionProfileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OptionProfile(props: OptionProfileProps, ref: React.RefObject<any>) {
  const {
    item,
    getChildMenu,
    getProfileItemLabels,
    getProfileItemImg,
    getProfileItemImgText,
    overrides = {},
    resetMenu = () => {},
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;

  const [ListItemProfile, listItemProfileProps] = getOverrides(
    overrides.ListItemProfile,
    StyledListItemProfile
  );
  const [ProfileImgContainer, profileImgContainerProps] = getOverrides(
    overrides.ProfileImgContainer,
    StyledProfileImgContainer
  );
  const [ProfileImg, profileImgProps] = getOverrides(overrides.ProfileImg, StyledProfileImg);
  const [ProfileLabelsContainer, profileLabelsContainerProps] = getOverrides(
    overrides.ProfileLabelsContainer,
    StyledProfileLabelsContainer
  );
  const [ProfileTitle, profileTitleProps] = getOverrides(
    overrides.ProfileTitle,
    StyledProfileTitle
  );
  const [ProfileSubtitle, profileSubtitleProps] = getOverrides(
    overrides.ProfileSubtitle,
    StyledProfileSubtitle
  );
  const [ProfileBody, profileBodyProps] = getOverrides(overrides.ProfileBody, StyledProfileBody);

  const ItemImg = getProfileItemImg(item);
  const { title, subtitle, body } = getProfileItemLabels(item);

  return (
    <MaybeChildMenu
      ref={ref}
      getChildMenu={getChildMenu}
      isOpen={!!$isHighlighted}
      item={item}
      resetParentMenu={resetMenu}
      renderAll={renderAll}
      overrides={overrides}
    >
      <ListItemProfile {...restProps} {...listItemProfileProps}>
        <ProfileImgContainer {...profileImgContainerProps}>
          {ItemImg &&
            (typeof ItemImg === 'string' ? (
              // Render img src string wrapped with image component

              <ProfileImg src={ItemImg} alt={getProfileItemImgText(item)} {...profileImgProps} />
            ) : (
              // Or just render the entire component user specified

              <ItemImg {...profileImgProps} />
            ))}
        </ProfileImgContainer>

        <ProfileLabelsContainer {...profileLabelsContainerProps}>
          {title && <ProfileTitle {...profileTitleProps}>{title}</ProfileTitle>}

          {subtitle && <ProfileSubtitle {...profileSubtitleProps}>{subtitle}</ProfileSubtitle>}

          {body && <ProfileBody {...profileBodyProps}>{body}</ProfileBody>}
        </ProfileLabelsContainer>
      </ListItemProfile>
    </MaybeChildMenu>
  );
}

// @ts-ignore
const forwarded = React.forwardRef<HTMLElement, OptionProfileProps>(OptionProfile);
forwarded.displayName = 'OptionProfile';

export default forwarded;
