/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const net = require('net');
const assert = require('assert');

const client = require('../..');
const utilsTest = require('../utils');

let shodanKey;
if (process.env.KEY_TEST) {
  shodanKey = process.env.KEY_TEST;
}

describe('toolsMyip', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.toolsMyip(),
      /You must provide a valid API key/,
    ));

  // skip: This method is public.
  it.skip('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.toolsMyip('a'), /request.get : 40/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.toolsMyip('a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return a valid IP address', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    assert.ok(net.isIP(await client.toolsMyip('shodanKey')));
  });
});
