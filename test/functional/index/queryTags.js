/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const test = require('ava');
const client = require('../../..');
const helpers = require('../../helpers');

test('should fail if "key" parameter no present', async t => {
  await t.throwsAsync(
    async () => { await client.queryTags() },
    { message: 'You must provide a valid API key' }
  );
});

test('should fail if the API key is not valid', async t => {
  await t.throwsAsync(
    async () => { await client.queryTags('a') },
    { message: /got.get : Response code 401/ }
  );
});

test('should have into account the "timeout" option', async t => {
  await t.throwsAsync(
    async () => { await client.queryTags('a', { timeout: 1 }) },
    { message: /got.get : Timeout awaiting/ }
  );
});

test('should return a list for a valid tag', async t => {
  await helpers.sleep();

  const res = await client.queryTags(process.env.API_KEY);

  t.deepEqual(Object.keys(res.matches[0]), ['count', 'value']);
  t.is(res.matches[0].value, 'webcam');
});
