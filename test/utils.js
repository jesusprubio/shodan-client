/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

// Some helpers for the tests.

'use strict';

const assert = require('assert');
const sleep = require('system-sleep');

// A custom version of [assert.throws](https://nodejs.org/api/assert.html#
// assert_assert_throws_block_error_message) with async (through promises) support.
//
// - `block` (function) - Piece of code (returning a promise) to be checked.
// - `errRegex` (object) - Regular expresion to confirm the expected error.
//
// Ref: https://wietse.loves.engineering/testing-promises-with-mocha-90df8b7d2e35
module.exports.throwsAsync = async (block, errorRexp) => {
  try {
    await block();
  } catch (e) {
    // To be consistent with the Node.js "assert.throws" behavior we reuse it.
    if (errorRexp) {
      assert.throws(() => {
        throw e;
      }, errorRexp);
    }
    // We need this return because we're catching the thrown error,
    // if not, the next assert.fail would be reached when the regexp matches.
    return;
  }

  assert.fail('Missing expected exception');
};

// The HTTP API fails a lot randomly.
module.exports.insist = context => {
  context.retries(3);
  sleep(3000);
};
