/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

// https://developer.shodan.io/api

'use strict';

const utils = require('./utils');
const { version } = require('../package');

const apiSection = 'api';
// Optional parameters for each function.
const optsExpected = {
  host: ['minify', 'history'],
  search: ['facets', 'page', 'minify'],
  count: ['facets'],
  query: ['page', 'sort', 'order'],
  querySearch: ['page'],
  queryTags: ['size'],
};

module.exports.version = version;

module.exports.host = async (ip, key, opts = {}) => {
  const endpoint = 'host';
  let partialUrl = `/shodan/${endpoint}/`;

  if (!ip) {
    throw new Error(utils.createErrMandatory('ip'));
  }

  // Adding to get the final url, in this case the mandatory
  // param is part of the URL in the API.
  partialUrl += `${ip}`;

  let qs = { key };
  qs = utils.buildQs(qs, partialUrl, optsExpected[endpoint], opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.search = async (query, key, opts = {}) => {
  const endpoint = 'search';
  const partialUrl = `/shodan/host/${endpoint}`;

  if (!query) {
    throw new Error(utils.createErrMandatory('query'));
  }

  let qs = { query, key };
  qs = utils.buildQs(qs, partialUrl, optsExpected[endpoint], opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.count = async (query, key, opts = {}) => {
  const endpoint = 'count';
  const partialUrl = `/shodan/host/${endpoint}`;

  if (!query) {
    throw new Error(utils.createErrMandatory('query'));
  }

  let qs = { query, key };
  qs = utils.buildQs(qs, partialUrl, optsExpected[endpoint], opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.searchTokens = async (query, key, opts = {}) => {
  const partialUrl = '/shodan/host/search/tokens';

  if (!query) {
    throw new Error(utils.createErrMandatory('query'));
  }

  return utils.apiRequest(apiSection, partialUrl, { query, key }, opts.timeout);
};

// Don't need extra options.
module.exports.ports = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/ports', { key }, opts.timeout);

module.exports.protocols = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/protocols', { key }, opts.timeout);

module.exports.scan = async (ips, key, opts = {}) => {
  const partialUrl = '/shodan/scan';

  if (!ips) {
    throw new Error(utils.createErrMandatory('ips'));
  }

  // This API request needs a POST. Our function takes care of it,
  // but of course we need to pass the param as expected ("ips").
  return utils.apiRequest(apiSection, partialUrl, { key }, opts.timeout, {
    ips,
  });
};

module.exports.scanInternet = async (port, protocol, key, opts = {}) => {
  const partialUrl = '/shodan/scan/internet';

  if (!port) {
    throw new Error(utils.createErrMandatory('port'));
  }
  if (!protocol) {
    throw new Error(utils.createErrMandatory('protocol'));
  }

  // Another POST.
  return utils.apiRequest(apiSection, partialUrl, { key }, opts.timeout, {
    port,
    protocol,
  });
};

// TODO: Add GET "scan/{id}"

module.exports.services = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/services', { key }, opts.timeout);

module.exports.query = (key, opts = {}) => {
  const endpoint = 'query';
  const partialUrl = `/shodan/${endpoint}`;

  let qs = { key };
  qs = utils.buildQs(qs, partialUrl, optsExpected[endpoint], opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.querySearch = async (query, key, opts = {}) => {
  const partialUrl = '/shodan/query/search';

  if (!query) {
    throw new Error(utils.createErrMandatory('query'));
  }

  let qs = { query, key };
  qs = utils.buildQs(qs, partialUrl, optsExpected.querySearch, opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.queryTags = async (key, opts = {}) => {
  const partialUrl = '/shodan/query/tags';

  let qs = { key };
  qs = utils.buildQs(qs, partialUrl, optsExpected.queryTags, opts);

  return utils.apiRequest(apiSection, partialUrl, qs, opts.timeout);
};

module.exports.accountProfile = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/account/profile', { key }, opts.timeout);

module.exports.dnsResolve = (hostnames, key, opts = {}) => {
  const partialUrl = '/dns/resolve';

  if (!hostnames) {
    throw new Error(utils.createErrMandatory('hostnames'));
  }

  return utils.apiRequest(
    apiSection,
    partialUrl,
    { hostnames, key },
    opts.timeout,
  );
};

module.exports.dnsReverse = async (ips, key, opts = {}) => {
  const partialUrl = '/dns/reverse';

  if (!ips) {
    throw new Error(utils.createErrMandatory('ips'));
  }

  return utils.apiRequest(apiSection, partialUrl, { ips, key }, opts.timeout);
};

module.exports.toolsMyip = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/tools/myip', { key }, opts.timeout);

module.exports.apiInfo = async (key, opts = {}) =>
  utils.apiRequest(apiSection, '/api-info', { key }, opts.timeout);
