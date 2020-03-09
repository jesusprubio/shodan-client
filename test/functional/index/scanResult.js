/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');

test('should fail if "id" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scanResult() },
    { message: /Required parameter: id/ }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scanResult('a') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.scanResult('a', 'a') },
    { message: /got.get : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.scanResult('a', 'a' , { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});

test('should work for a valid identifier', async t => {
  await helpers.sleep();

  await t.throwsAsync(
    async () => { await client.scanResult('a', process.env.API_KEY) },
    { message: /got.get : Scan not found/ }
  );
});
