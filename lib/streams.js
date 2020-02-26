/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

// https://developer.shodan.io/stream

const utils = require('./utils');

const section = 'stream';

module.exports.banners = async (key, opts = {}) =>
  utils.request(section, '/shodan/banners', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.asn = async (asn, key, opts = {}) => {
  if (!asn) {
    throw new Error(utils.buildErrorRequired('asn'));
  }

  return utils.request(section, '/shodan/asn', {
    params: { asn, key },
    timeout: opts.timeout
  });
};

module.exports.countries = async (countries, key, opts = {}) => {
  if (!countries) {
    throw new Error(utils.buildErrorRequired('countries'));
  }

  return utils.request(section, '/shodan/countries', {
    params: { countries, key },
    timeout: opts.timeout
  });
};

module.exports.ports = async (ports, key, opts = {}) => {
  if (!ports) {
    throw new Error(utils.buildErrorRequired('ports'));
  }

  return utils.request(section, '/shodan/ports', {
    params: { ports, key },
    timeout: opts.timeout
  });
};
