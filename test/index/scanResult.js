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

describe('scanResult', () => {
  it('should fail if "id" parameter no present', async () =>
    utilsTest.throwsAsync(() => client.scanResult(), /Required parameter: id/));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.scanResult('a'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scanResult('a', 'a'),
      /got.post : Response code 401/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scanResult('a', 'a', { timeout: 1 }),
      /got.post : Timeout awaiting/,
    );
  });

  it('should work for a valid identifier', async function t() {
    if (!apiKey) {
      this.skip();
    }

    utilsTest.insist(this);

    const res = await client.scanResult('a', apiKey);

    // Do not create new scans for testing to avoid
    // scan credits consumption.
    assert.equal(res.error, 'Scan not found');
  });
});
