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

let shodanKey;
if (process.env.KEY_TEST) {
  shodanKey = process.env.KEY_TEST;
}

describe('protocols', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.protocols(),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.protocols('a'), /request.get : 40/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.protocols('a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return supported protocols with a valid key', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.protocols(shodanKey);

    assert.ok(typeof res.sip, 'string');
    assert.ok(true);
  });
});
