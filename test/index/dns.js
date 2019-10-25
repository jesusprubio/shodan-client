/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const assert = require('assert');
const net = require('net');

const client = require('../..');
const utilsTest = require('../utils');

let shodanKey;
if (process.env.KEY_TEST) {
  shodanKey = process.env.KEY_TEST;
}

describe('dnsResolve', () => {
  it('should fail if "hostname" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.dnsResolve(),
      /Required parameter: hostnames/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.dnsResolve('ibm.com,google.com'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.dnsResolve('ibm.com,google.com', 'a'),
      /request.get : 40/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.dnsResolve('ibm.com,google.com', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return correct result for valid hostnames', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.dnsResolve('ibm.com,google.com', shodanKey);
    assert.deepEqual(Object.keys(res), ['google.com', 'ibm.com']);
    assert.ok(net.isIP(res['ibm.com']));
  });
});

describe('dnsReverse', () => {
  it('should fail if "ips" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.dnsReverse(),
      /Required parameter: ips/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.dnsReverse('8.8.8.8,9.9.9.9'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.dnsReverse('8.8.8.8,9.9.9.9', 'a'),
      /request.get : 40/,
    );
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.dnsReverse('8.8.8.8,9.9.9.9', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });

  it('should return correct result for valid ips', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    utilsTest.insist(this);

    const res = await client.dnsReverse('8.8.8.8,9.9.9.9', shodanKey);

    assert.deepEqual(Object.keys(res), ['8.8.8.8', '9.9.9.9']);
    assert.ok(typeof res['8.8.8.8'][0], 'string');
  });
});
