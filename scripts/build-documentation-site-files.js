#!/usr/bin/env node

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */

const generateBlogPosts = require('./post-generator.js');
//$FlowFixMe
const { generateCheatSheet } = require('./cheat-sheet-generator.js');

generateBlogPosts();
generateCheatSheet();
