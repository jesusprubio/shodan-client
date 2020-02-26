/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const assert = require('assert');

const client = require('../..');
const utilsTest = require('../utils');

let apiKey;
if (process.env.KEY_TEST) {
  apiKey = process.env.KEY_TEST;
}

describe('queryTags', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.queryTags(),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.queryTags('a'), /got.get : Response code 401/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.queryTags('a', { timeout: 1 }),
      /got.get : Timeout awaiting/,
    );
  });

  it('should return a list for a valid tag', async function t() {
    if (!apiKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.queryTags(apiKey);

    assert.deepEqual(Object.keys(res), ['matches', 'total']);
    assert.deepEqual(Object.keys(res.matches[0]), ['count', 'value']);
    assert.ok(typeof res.matches[0].value, 'webcam');
  });
});
