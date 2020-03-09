/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');

test('should fail if "ports" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.streams.ports() },
    { message: /Required parameter: ports/ }
  );
});

test('ports: should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.streams.ports('a') },
    { message: 'You must provide a valid API key' }
  );
});

test('ports: should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.streams.ports('a', 'a', { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});
