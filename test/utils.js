/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');

const utils = require('../lib/utils');

test('should fail if "section" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await utils.request() },
    { message: 'Required parameter: section, partial' }
  );
});

test('should fail if "partial" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await utils.request('a') },
    { message: 'Required parameter: section, partial' }
  );
});

test('should fail if "params" option no present', async t => {
  await t.throwsAsync(
    async () => { await utils.request('a', 'a') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await utils.request('a', 'a', { params: {}}) },
    { message: 'You must provide a valid API key' }
  );
});
