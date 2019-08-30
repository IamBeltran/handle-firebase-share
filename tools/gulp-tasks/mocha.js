/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unpublished-require */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY-MODULES DEPENDENCY.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const colors = require('ansi-colors');
const log = require('fancy-log');
const mocha = require('gulp-mocha');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS-MODULE DEPENDENCIES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// const fs = require('fs');
// const path = require('path');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY-MODULES DEPENDENCIES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { red } = colors;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MODULE - [NAME-MODULE].                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = {
  simple: gulp => () => {
    return gulp
      .src(['!node_modules/**', 'test/specs/spec.*.js'])
      .pipe(mocha({ reporter: 'spec', exit: true }))
      .on('error', error => {
        log(`Error on test`);
        log(`Message: ${red(`${error.message}`)}`);
      });
  },
  report: gulp => () => {
    return gulp
      .src(['!node_modules/**', 'test/specs/spec.*.js'])
      .pipe(
        mocha({
          reporter: 'mochawesome',
          reporterOptions: {
            reportDir: './reports/mocha/mochawesome/',
            reportFilename: 'report',
            quiet: true,
          },
        }),
      )
      .on('error', error => {
        log(`Error on test`);
        log(`Message: ${red(`${error.message}`)}`);
      });
  },
};
