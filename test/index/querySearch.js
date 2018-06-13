/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const assert = require('assert');

const client = require('../..');
const utilsTest = require('../utils');

let shodanKey;
if (process.env.KEY_TEST) {
  shodanKey = process.env.KEY_TEST;
}

describe('querySearch', () => {
  it('should fail if "query" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.querySearch(),
      /Required parameter: query/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.querySearch('webcam'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async () =>
    utilsTest.throwsAsync(
      () => client.querySearch('webcam', 'a'),
      /request.get : 40/,
    ));

  it('should have into account the "timeout" option', async () => {
    utilsTest.throwsAsync(
      () => client.querySearch('webcam', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return a list for a valid query', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    this.retries(5);

    const res = await client.querySearch('webcam', shodanKey);

    assert.deepEqual(Object.keys(res), ['matches', 'total']);
    assert.ok(typeof res.matches[0].votes, 'number');
  });
});
