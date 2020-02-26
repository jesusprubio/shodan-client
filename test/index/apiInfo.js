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

describe('apiInfo', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.apiInfo(),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.apiInfo('a'), /got.get : Response code 401/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.apiInfo('a', { timeout: 1 }),
      /got.get : Timeout awaiting/,
    );
  });

  it('should return correct data for a valid key', async function t() {
    if (!apiKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.apiInfo(apiKey);

    assert.equal(res.https, true);
    assert.equal(res.unlocked, true);
    assert.equal(res.telnet, true);
    assert.ok(typeof res.scan_credits, 'number');
    assert.ok(typeof res.query_credits, 'number');
  });
});
