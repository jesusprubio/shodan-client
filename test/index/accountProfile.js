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

describe('accountProfile', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.accountProfile(),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.accountProfile('a'), /request.get : 40/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.accountProfile('a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return correct data for a valid key', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.accountProfile(shodanKey);

    assert.deepEqual(Object.keys(res), [
      'member',
      'credits',
      'display_name',
      'created',
    ]);
    assert.equal(res.member, true);
    assert.ok(typeof res.credits, 'number');
  });
});
