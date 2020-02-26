/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const net = require('net');
const assert = require('assert');

const client = require('../..');
const utilsTest = require('../utils');

let apiKey;
if (process.env.KEY_TEST) {
  apiKey = process.env.KEY_TEST;
}

describe('toolsMyip', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.toolsMyip(),
      /You must provide a valid API key/,
    ));

  // TODO
  it.skip('should fail if the HTTP request fails (skip, public endpoint!)', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(() => client.toolsMyip('a'), /got.get : Response code 401/);
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.toolsMyip('a', { timeout: 1 }),
      /got.get : Timeout awaiting/,
    );
  });

  it('should return a valid IP address', async function t() {
    if (!apiKey) {
      this.skip();
    }
    utilsTest.insist(this);

    assert.ok(net.isIP(await client.toolsMyip(apiKey)) === 4);
  });
});
