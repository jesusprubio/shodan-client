/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const client = require('../..');
const utilsTest = require('../utils');

let shodanKey;
if (process.env.KEY_TEST) {
  shodanKey = process.env.KEY_TEST;
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
      /request.post : 40/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scan('8.8.8.8', 'a', { timeout: 1 }),
      /request.post : Error: ETIMEDOUT/,
    );
  });

  it('should work for a valid IP', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    utilsTest.throwsAsync(
      () => client.scan('8.8.8.8', 'a', { timeout: 1 }),
      /request.get : 400 - {"error":"One of your networks has recently/,
    );
  });
});
