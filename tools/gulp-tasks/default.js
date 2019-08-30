/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-unused-vars */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │  REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                           │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const colors = require('ansi-colors');
const log = require('fancy-log');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { green } = colors;

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = gulp => () => {
  log(green('Default Task...'));
};
