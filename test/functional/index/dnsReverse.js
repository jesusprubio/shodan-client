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
    async () => { await client.dnsReverse() },
    { message: /Required parameter: ips/ }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.dnsReverse('8.8.8.8,9.9.9.9') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.dnsReverse('8.8.8.8,9.9.9.9', 'a') },
    { message: /got.get : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.dnsReverse('8.8.8.8,9.9.9.9', 'a', { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});

test('should return correct result for valid ips', async t => {
  await helpers.sleep();

  const res = await client.dnsReverse('8.8.8.8,9.9.9.9', process.env.API_KEY);

  t.deepEqual(Object.keys(res), ['8.8.8.8', '9.9.9.9']);
  t.is(typeof res['8.8.8.8'][0], 'string');
});
