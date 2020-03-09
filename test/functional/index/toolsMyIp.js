/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const net = require('net');
const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.toolsMyip() },
    { message: 'You must provide a valid API key' }
  );
});

test.skip('should fail if the API key is not valid (skip, public endpoint!)', async t => {
  await t.throwsAsync(
    async () => { await client.toolsMyip('a') },
    { message: /got.get : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.toolsMyip('a', { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});

test('should return a valid IP address', async t => {
  await helpers.sleep();

  t.true(net.isIP(await client.toolsMyip(process.env.API_KEY)) === 4);
});
