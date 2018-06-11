/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

// https://developer.shodan.io/stream

const utils = require('./utils');


const apiSection = 'stream';


module.exports.banners = (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/banners?', key, opts.timeout);


module.exports.ports = (ports, key, opts = {}) => {
  let partialUrl = '/shodan/ports?';

  if (!ports) { return Promise.reject(utils.createErrMandatory('ports')); }

  partialUrl = utils.addParam(partialUrl, 'ports', ports);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.asn = (asn, key, opts = {}) => {
  let partialUrl = '/shodan/asn?';

  if (!asn) { return Promise.reject(utils.createErrMandatory('asn')); }

  partialUrl = utils.addParam(partialUrl, 'asn', asn);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.countries = (countries, key, opts = {}) => {
  let partialUrl = '/shodan/countries?';

  if (!countries) { return Promise.reject(utils.createErrMandatory('countries')); }

  partialUrl = utils.addParam(partialUrl, 'countries', countries);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.ports = (ports, key, opts = {}) => {
  let partialUrl = '/shodan/ports?';

  if (!ports) { return Promise.reject(utils.createErrMandatory('ports')); }

  partialUrl = utils.addParam(partialUrl, 'ports', ports);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};
