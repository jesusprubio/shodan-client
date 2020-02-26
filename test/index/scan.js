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

describe('scan', () => {
  it('should fail if "ips" parameter no present', async () =>
    utilsTest.throwsAsync(() => client.scan(), /Required parameter: ips/));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.scan('8.8.8.8'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scan('8.8.8.8', 'a'),
      /got.post : Response code 401/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scan('8.8.8.8', 'a', { timeout: 1 }),
      /got.post : Timeout awaiting/,
    );
  });

  it('should work for a valid IP', async function t() {
    if (!apiKey) {
      this.skip();
    }

    utilsTest.insist(this);

    const res = await client.scan('8.8.8.8/24', apiKey);

    assert.equal(res.error, 'One of your networks has recently been requested and wont get scanned again');
  });
});
