/*
  Copyright Jesus Perez <jesusprubio gmail com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';


// https://developer.shodan.io/api

const util = require('./util');


// Optional parameters for each function.
const optionalParams = {
  host: ['minify'],
  search: ['facets'],
  count: ['facets', 'page', 'minify'],
  query: ['page', 'sort', 'order'],
  querySearch: ['page'],
  queryTags: ['size'],
  dnsResolve: ['hostnames'],
  dnsReverse: ['ips'],
};

// Part of all urls.
const apiSection = 'api';


// To run commands which don't reveice any parameter.
const runNoOpts = (cfg, subPath, cb) => {
  const partialUrl = subPath + '?';

  // Don't need options.

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.host = (cfg, cb) => {
  const paramMandatory = 'ip';
  let partialUrl = '/shodan/host/';

  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  // Adding to get the final url, in this case the mandatory
  // param is part of the URL in the API.
  partialUrl = partialUrl + cfg[paramMandatory] + '?';
  // Adding optional parameters. They are added as regular parameters.
  partialUrl = util.addOptionals(partialUrl, optionalParams.host, cfg);

  // Doing the request.
  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.search = (cfg, cb) => {
  const paramMandatory = 'query';
  let partialUrl = '/shodan/host/search?';


  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  // Adding mandatory and optional parameters. As expected,
  // they are added as regular parameters.
  partialUrl = util.addParam(partialUrl, paramMandatory, cfg.query);
  partialUrl = util.addOptionals(partialUrl, optionalParams.search, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.count = (cfg, cb) => {
  const paramMandatory = 'query';
  let partialUrl = '/shodan/host/count?';

  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  partialUrl = util.addParam(partialUrl, paramMandatory, cfg.query);
  partialUrl = util.addOptionals(partialUrl, optionalParams.count, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.searchTokens = (cfg, cb) => {
  const paramMandatory = 'query';
  let partialUrl = '/shodan/host/search/tokens?';


  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  // No optional parameters.
  partialUrl = util.addParam(partialUrl, paramMandatory, cfg.query);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


// Don't need extra options.
module.exports.ports = (cfg, cb) => { runNoOpts(cfg, '/shodan/ports', cb); };


module.exports.protocols = (cfg, cb) => { runNoOpts(cfg, '/shodan/protocols', cb); };


module.exports.scan = (cfg, cb) => {
  const paramMandatory = 'ips';
  const partialUrl = '/shodan/scan?';


  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  // This API request needs a POST. Our function takes care of it,
  // but of course we need to pass the param as expected.
  const opts = util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout);
  opts.form = { ips: cfg[paramMandatory] };

  util.apiRequest(apiSection, opts, cb);
};


module.exports.scanInternet = (cfg, cb) => {
  const partialUrl = '/shodan/scan/internet?';


  if (!cfg.port || !cfg.protocol) {
    cb(util.createErrMandatory('port/protocol'));

    return;
  }

  const opts = util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout);
  opts.form = {
    port: cfg.port,
    protocol: cfg.protocol,
  };

  util.apiRequest(apiSection, opts, cb);
};


module.exports.services = (cfg, cb) => { runNoOpts(cfg, '/shodan/services', cb); };


module.exports.query = (cfg, cb) => {
  let partialUrl = '/shodan/query?';

  // This method doesn't have mandatory parameters.
  partialUrl = util.addOptionals(partialUrl, optionalParams.query, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.querySearch = (cfg, cb) => {
  const paramMandatory = 'query';
  let partialUrl = '/shodan/query/search?';

  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  partialUrl = util.addParam(partialUrl, paramMandatory, cfg.query);
  partialUrl = util.addOptionals(partialUrl, optionalParams.querySearch, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.queryTags = (cfg, cb) => {
  let partialUrl = '/shodan/query/tags?';

  partialUrl = util.addOptionals(partialUrl, optionalParams.queryTags, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.accountProfile = (cfg, cb) => { runNoOpts(cfg, '/account/profile', cb); };


module.exports.dnsResolve = (cfg, cb) => {
  const paramMandatory = 'hostnames';
  let partialUrl = '/dns/resolve?';

  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  partialUrl = util.addOptionals(partialUrl, optionalParams.dnsResolve, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.dnsReverse = (cfg, cb) => {
  const paramMandatory = 'ips';
  let partialUrl = '/dns/reverse?';

  if (!cfg[paramMandatory]) {
    cb(util.createErrMandatory(paramMandatory));

    return;
  }

  partialUrl = util.addOptionals(partialUrl, optionalParams.dnsReverse, cfg);

  util.apiRequest(
    apiSection,
    util.createOpts(partialUrl, cfg.global.key, cfg.global.timeout),
    cb
  );
};


module.exports.toolsMyip = (cfg, cb) => { runNoOpts(cfg, '/tools/myip', cb); };


module.exports.apiInfo = (cfg, cb) => { runNoOpts(cfg, '/api-info', cb); };
