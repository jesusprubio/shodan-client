/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');


test('should fail if "port" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scanInternet() },
    { message: /Required parameter: port/ }
  );
});

test('should fail if "protocol" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scanInternet(5060) },
    { message: /Required parameter: protocol/ }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.scanInternet(5065, 'sip') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.scanInternet(5065, 'sip', 'a') },
    { message: /got.post : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.scanInternet(5060, 'sip', 'a', { timeout: 1 }) },
    { message: /got.post : Timeout awaiting/ }
  );
});

test('should work for a valid port/protocol combination', async t => {
  await helpers.sleep();

  await t.throwsAsync(
    async () => { await client.scanInternet(5065, 'sip', process.env.API_KEY) },
    // We don't randomize this to avoid scan credits consuption.
    { message: /got.post : Please contact support@shodan.io to perform on-demand scans of the Internet/ }
  );
});
