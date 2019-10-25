/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const assert = require('assert');

const client = require('../..');
const { version } = require('../../package');

describe('index', () => {
  it('should include documented items', () =>
    assert.deepEqual(Object.keys(client), [
      'version',
      'host',
      'search',
      'count',
      'searchTokens',
      'ports',
      'protocols',
      'scan',
      'scanInternet',
      'services',
      'query',
      'querySearch',
      'queryTags',
      'accountProfile',
      'dnsResolve',
      'dnsReverse',
      'toolsMyip',
      'apiInfo',
      'streams',
      'exploits',
    ]));
});

describe('index:version', () => {
  it('should return the correct version of the library', () =>
    assert.equal(client.version, version));
});
