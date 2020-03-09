/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');

test('should fail if "ips" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scan() },
    { message: /Required parameter: ips/ }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scan('a') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.scan('8.8.8.8', 'a') },
    { message: /got.post : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.scan('8.8.8.8', 'a', { timeout: 1 }) },
    { message: /got.post : Timeout awaiting/ }
  );
});

test('should work for a valid IP', async t => {
  await helpers.sleep();

  await t.throwsAsync(
    async () => { await client.scan('8.8.8.8', process.env.API_KEY) },
    // We don't randomize this to avoid scan credits consuption.
    { message: /got.post : One of your networks has recently been requested and wont get scanned again/ }
  );
});
