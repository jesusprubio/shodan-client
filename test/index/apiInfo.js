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

describe('apiInfo', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.apiInfo(),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async () =>
    utilsTest.throwsAsync(() => client.apiInfo('a'), /request.get : 40/));

  it('should have into account the "timeout" option', async () => {
    utilsTest.throwsAsync(
      () => client.apiInfo('a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return correct data for a valid key', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    this.retries(5);

    const res = await client.apiInfo(shodanKey);

    assert.deepEqual(Object.keys(res), [
      'https',
      'unlocked',
      'unlocked_left',
      'telnet',
      'scan_credits',
      'plan',
      'query_credits',
    ]);
    assert.equal(res.https, true);
    assert.equal(res.unlocked, true);
    assert.equal(res.telnet, true);
    assert.ok(typeof res.scan_credits, 'number');
    assert.ok(typeof res.query_credits, 'number');
  });
});
