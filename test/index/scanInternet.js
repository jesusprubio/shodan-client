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

describe('scanInternet', () => {
  it('should fail if "port" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.scanInternet(),
      /Required parameter: port/,
    ));

  it('should fail if "protocol" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.scanInternet(5060),
      /Required parameter: protocol/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.scanInternet(5065, 'sip'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scanInternet(5065, 'sip', 'a'),
      /got.post : Response code 401/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.scanInternet(5065, 'sip', 'a', { timeout: 1 }),
      /got.post : Timeout awaiting/,
    );
  });

  it('should work for a valid port/protocol combination', async function t() {
    if (!apiKey) {
      this.skip();
    }
    utilsTest.insist(this);
    
    const res = await client.scanInternet(5065, 'sip', apiKey);

    assert.equal(res.error, 'Please contact support@shodan.io to perform on-demand scans of the Internet');
  });
});
