/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

// https://developer.shodan.io/api

'use strict';

const utils = require('./utils');
const { version } = require('../package');

const section = 'api';

module.exports.version = version;

module.exports.host = async (ip, key, opts = {}) => {
  if (!ip) {
    throw new Error(utils.buildErrorRequired('ip'));
  }

  const params = utils.buildParams(['minify', 'history'], opts);
  params.key = key;

  // Adding to get the final url, in this case the mandatory
  // param is part of the URL.
  return utils.request(section, `/shodan/host/${ip}`, {
    params,
    timeout: opts.timeout
  });
};

module.exports.search = async (query, key, opts = {}) => {
  if (!query) {
    throw new Error(utils.buildErrorRequired('query'));
  }

  const params = utils.buildParams(['facets', 'page', 'minify'], opts);
  params.query = query;
  params.key = key;

  return utils.request(section, '/shodan/host/search', {
    params,
    timeout: opts.timeout
  });
};

module.exports.count = async (query, key, opts = {}) => {
  if (!query) {
    throw new Error(utils.buildErrorRequired('query'));
  }

  const params = utils.buildParams(['facets'], opts);
  params.query = query;
  params.key = key;

  return utils.request(section, '/shodan/host/count', {
    params,
    timeout: opts.timeout
  });
};

module.exports.searchTokens = async (query, key, opts = {}) => {
  if (!query) {
    throw new Error(utils.buildErrorRequired('query'));
  }

  return utils.request(section, '/shodan/host/search/tokens', {
    params: { query, key },
    timeout: opts.timeout
  });
};

// Don't need extra options.
module.exports.ports = async (key, opts = {}) =>
  utils.request(section, '/shodan/ports', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.protocols = async (key, opts = {}) =>
  utils.request(section, '/shodan/protocols', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.scan = async (ips, key, opts = {}) => {
  if (!ips) {
    throw new Error(utils.buildErrorRequired('ips'));
  }

  return utils.request(section, '/shodan/scan', {
    params: { key },
    json: { ips },
    timeout: opts.timeout
  });
};

module.exports.scanResult = async (id, key, opts = {}) => {
  if (!id) {
    throw new Error(utils.buildErrorRequired('id'));
  }

  return utils.request(section, `/shodan/scan/${id}`, {
    params: { key },
    timeout: opts.timeout
  });
};

module.exports.scanInternet = async (port, protocol, key, opts = {}) => {
  if (!port) {
    throw new Error(utils.buildErrorRequired('port'));
  }
  if (!protocol) {
    throw new Error(utils.buildErrorRequired('protocol'));
  }

  return utils.request(section, '/shodan/scan/internet', {
    params: { key },
    timeout: opts.timeout,
    json: { port, protocol }
  });
};

module.exports.services = async (key, opts = {}) =>
  utils.request(section, '/shodan/services', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.query = (key, opts = {}) => {
  const params = utils.buildParams(['page', 'sort', 'order'], opts);
  params.key = key;

  return utils.request(section, '/shodan/query', {
    params,
    timeout: opts.timeout
  });
};

module.exports.querySearch = async (query, key, opts = {}) => {
  if (!query) {
    throw new Error(utils.buildErrorRequired('query'));
  }

  const params = utils.buildParams(['page'], opts);
  params.query = query;
  params.key = key;

  return utils.request(section, '/shodan/query/search', {
    params,
    timeout: opts.timeout
  });
};

module.exports.queryTags = async (key, opts = {}) => {
  const params = utils.buildParams(['size'], opts);
  params.key = key;

  return utils.request(section, '/shodan/query/tags', {
    params,
    timeout: opts.timeout
  });
};

module.exports.accountProfile = async (key, opts = {}) =>
  utils.request(section, '/account/profile', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.dnsResolve = (hostnames, key, opts = {}) => {
  if (!hostnames) {
    throw new Error(utils.buildErrorRequired('hostnames'));
  }

  return utils.request(section, '/dns/resolve', {
    params: { hostnames, key },
    timeout: opts.timeout
  });
};

module.exports.dnsReverse = async (ips, key, opts = {}) => {
  if (!ips) {
    throw new Error(utils.buildErrorRequired('ips'));
  }

  return utils.request(section, '/dns/reverse', {
    params: { ips, key },
    timeout: opts.timeout
  });
};

module.exports.toolsMyip = async (key, opts = {}) =>
  utils.request(section, '/tools/myip', {
    params: { key },
    timeout: opts.timeout
  });

module.exports.apiInfo = async (key, opts = {}) =>
  utils.request(section, '/api-info', {
    params: { key },
    timeout: opts.timeout
  });
