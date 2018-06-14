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

describe('host', () => {
  it('should fail if "ip" parameter no present', async () =>
    utilsTest.throwsAsync(() => client.host(), /Required parameter: ip/));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.host('8.8.8.8'),
      /You must provide a valid API key/,
    ));

  it('should fail if the HTTP request fails', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.host('8.8.8.8', 'a'),
      /request.get : 40/,
    );
  });

  it('should return data for an active host', async function t() {
    if (!shodanKey) {
      this.skip();
    }
    // The HTTP API fails a lot randomly.
    utilsTest.insist(this);

    const res = await client.host('8.8.8.8', shodanKey);

    // const res = await client.host('8.8.8.8', shodanKey, { minify: true, history: true });
    assert.deepEqual(Object.keys(res), [
      'city',
      'region_code',
      'os',
      'tags',
      'ip',
      'isp',
      'area_code',
      'dma_code',
      'last_update',
      'country_code3',
      'country_name',
      'hostnames',
      'postal_code',
      'longitude',
      'country_code',
      'ip_str',
      'latitude',
      'org',
      'data',
      'asn',
      'ports',
    ]);
    assert.deepEqual(Object.keys(res.data[0]), [
      '_shodan',
      'hash',
      'os',
      'opts',
      'ip',
      'isp',
      'port',
      'hostnames',
      'location',
      'timestamp',
      'domains',
      'org',
      'data',
      'asn',
      'transport',
      'ip_str',
    ]);
    assert.equal(res.data[0].isp, 'Google');
  });

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.host('8.8.8.8', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });
});
