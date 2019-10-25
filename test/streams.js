/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const assert = require('assert');

const client = require('../.');
const utilsTest = require('./utils');

// TODO: I don't have a valid API key to test this part. So we only have
// the "example".

describe('streams', () => {
  it('should include documented items', () =>
    assert.deepEqual(Object.keys(client.streams), [
      'banners',
      'asn',
      'countries',
      'ports',
    ]));
});

describe('streams:banner', () => {
  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.banners(),
      /You must provide a valid API key/,
    ));

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.streams.banners('a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });
});

describe('streams:asn', () => {
  it('should fail if "asn" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.asn(),
      /Required parameter: asn/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.asn('a'),
      /You must provide a valid API key/,
    ));

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.streams.asn('a', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });
});

describe('streams:countries', () => {
  it('should fail if "countries" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.countries(),
      /Required parameter: countries/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.countries('a'),
      /You must provide a valid API key/,
    ));

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.streams.countries('a', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });
});

describe('streams:ports', () => {
  it('should fail if "ports" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.ports(),
      /Required parameter: ports/,
    ));

  it('should fail if "key" parameter no present', async () =>
    utilsTest.throwsAsync(
      () => client.streams.ports('a'),
      /You must provide a valid API key/,
    ));

  it('should have into account the "timeout" option', async function t() {
    utilsTest.insist(this);
    utilsTest.throwsAsync(
      () => client.streams.ports('a', 'a', { timeout: 1 }),
      /request.get : Error: ETIMEDOUT/,
    );
  });
});
