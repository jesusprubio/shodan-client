/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

// https://developer.shodan.io/api

'use strict';

const utils = require('./utils');

// Optional parameters for each function.
const optionalParams = {
  host: ['minify', 'history'],
  search: ['facets', 'page', 'minify'],
  count: ['facets'],
  query: ['page', 'sort', 'order'],
  querySearch: ['page'],
  queryTags: ['size'],
};
// Part of all urls.
const apiSection = 'api';


module.exports.host = (ip, key, opts = {}) => {
  let partialUrl = '/shodan/host/';

  if (!ip) { return Promise.reject(utils.createErrMandatory('ip')); }
  if (!key) { return Promise.reject(utils.createErrMandatory('key')); }

  // Adding to get the final url, in this case the mandatory
  // param is part of the URL in the API.
  partialUrl += `${ip}?`;
  // Adding optional parameters. They are added as regular parameters.
  partialUrl = utils.addOptionals(partialUrl, optionalParams.host, opts);

  // Returning the request promise.
  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.search = (query, key, opts = {}) => {
  let partialUrl = '/shodan/host/search?';

  if (!query) { return Promise.reject(utils.createErrMandatory('query')); }

  partialUrl = utils.addParam(partialUrl, 'query', query);
  // Adding optional parameters. They are added as regular parameters.
  partialUrl = utils.addOptionals(partialUrl, optionalParams.search, opts);

  // Returning the request promise.
  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.count = (query, key, opts = {}) => {
  let partialUrl = '/shodan/host/count?';

  if (!query) { return Promise.reject(utils.createErrMandatory('query')); }

  partialUrl = utils.addParam(partialUrl, 'query', query);
  partialUrl = utils.addOptionals(partialUrl, optionalParams.search, opts);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.searchTokens = (query, key, opts = {}) => {
  let partialUrl = '/shodan/host/search/tokens?';

  if (!query) { return Promise.reject(utils.createErrMandatory('query')); }

  partialUrl = utils.addParam(partialUrl, 'query', query);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


// Don't need extra options.
module.exports.ports =
  (key, opts = {}) => utils.apiRequest(apiSection, '/shodan/ports?', key, opts.timeout);


module.exports.protocols =
  (key, opts = {}) => utils.apiRequest(apiSection, '/shodan/protocols?', key, opts.timeout);


module.exports.scan = (ips, key, opts = {}) => {
  const partialUrl = '/shodan/scan?';

  if (!ips) { return Promise.reject(utils.createErrMandatory('ips')); }

  // This API request needs a POST. Our function takes care of it,
  // but of course we need to pass the param as expected ("ips").
  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout, { ips });
};


module.exports.scanInternet = (port, protocol, key, opts = {}) => {
  const partialUrl = '/shodan/scan/internet?';

  if (!port) { return Promise.reject(utils.createErrMandatory('port')); }
  if (!protocol) { return Promise.reject(utils.createErrMandatory('protocol')); }

  // Another POST.
  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout, { port, protocol });
};


// TODO: Add GET "scan/{id}"


module.exports.services =
  (key, opts = {}) => utils.apiRequest(apiSection, '/shodan/services?', key, opts.timeout);


module.exports.query = (key, opts = {}) => {
  let partialUrl = '/shodan/query?';

  partialUrl = utils.addOptionals(partialUrl, optionalParams.query, opts);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.querySearch = (query, key, opts = {}) => {
  let partialUrl = '/shodan/query/search?';

  if (!query) { return Promise.reject(utils.createErrMandatory('query')); }

  partialUrl = utils.addParam(partialUrl, 'query', query);
  partialUrl = utils.addOptionals(partialUrl, optionalParams.querySearch, opts);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.queryTags = (key, opts = {}) => {
  let partialUrl = '/shodan/query/tags?';

  partialUrl = utils.addOptionals(partialUrl, optionalParams.queryTags, opts);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};

module.exports.accountProfile =
  (key, opts = {}) => utils.apiRequest(apiSection, '/account/profile?', key, opts.timeout);


module.exports.dnsResolve = (hostnames, key, opts = {}) => {
  let partialUrl = '/dns/resolve?';

  if (!hostnames) { return Promise.reject(utils.createErrMandatory('hostnames')); }

  partialUrl = utils.addParam(partialUrl, 'hostnames', hostnames);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.dnsReverse = (ips, key, opts = {}) => {
  let partialUrl = '/dns/reverse?';

  if (!ips) { return Promise.reject(utils.createErrMandatory('ips')); }

  partialUrl = utils.addParam(partialUrl, 'ips', ips);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.toolsMyip =
  (key, opts = {}) => utils.apiRequest(apiSection, '/tools/myip?', key, opts.timeout);


module.exports.apiInfo =
  (key, opts = {}) => utils.apiRequest(apiSection, '/api-info?', key, opts.timeout);
