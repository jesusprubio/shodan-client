/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');

test('should fail if "query" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.count() },
    { message: /Required parameter: query/ }
  );
});

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.count('asterisk') },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.count('asterisk', 'a') },
    { message: /got.get : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.count('a', 'a', { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});

test('should return a lot for a common service', async t => {
  await helpers.sleep();

  const res = await client.count('asterisk', process.env.API_KEY);

  t.deepEqual(res.matches, []);
  t.true(res.total > 10);
});

test('should return 0 for a non existent service', async t => {
  await helpers.sleep();

  const res = await client.count('nonexistentservice', process.env.API_KEY);

  t.deepEqual(res.matches, []);
  t.is(res.total, 0);
});
