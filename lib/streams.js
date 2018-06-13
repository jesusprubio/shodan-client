/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

// https://developer.shodan.io/stream

const utils = require('./utils');

const apiSection = 'stream';

module.exports.banners = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/banners?', { key }, opts.timeout);

module.exports.asn = async (asn, key, opts = {}) => {
  const partialUrl = '/shodan/asn';

  if (!asn) {
    throw new Error(utils.createErrMandatory('asn'));
  }

  return utils.apiRequest(apiSection, partialUrl, { asn, key }, opts.timeout);
};

module.exports.countries = async (countries, key, opts = {}) => {
  const partialUrl = '/shodan/countries';

  if (!countries) {
    throw new Error(utils.createErrMandatory('countries'));
  }

  return utils.apiRequest(
    apiSection,
    partialUrl,
    { countries, key },
    opts.timeout,
  );
};

module.exports.ports = async (ports, key, opts = {}) => {
  const partialUrl = '/shodan/ports';

  if (!ports) {
    throw new Error(utils.createErrMandatory('ports'));
  }

  return utils.apiRequest(apiSection, partialUrl, { ports, key }, opts.timeout);
};
