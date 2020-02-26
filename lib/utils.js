/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const lodash = require('lodash');
const debug = require('debug');
const got = require('got');

const { name } = require('../package');

const dbg = tag => debug(`${name}:${tag}`);
// To use in this file.
const debg = dbg('utils');

module.exports.dbg = dbg;

const buildErrorRequired = param => `Required parameter: ${param}`;

module.exports.buildErrorRequired = buildErrorRequired;


const boolOpts = ['sort', 'minify', 'history'];

// Abstracting the parameters addition to the url.
module.exports.buildParams = (optsAllowed, opts) => {
  const params = {};

  lodash.each(opts, (value, objKey) => {
    // Drop not valid params.
    if (optsAllowed.indexOf(objKey) !== -1) {
      if (lodash.includes(boolOpts, objKey)) {
        if (typeof value !== 'boolean') {
          throw new Error(`Boolean expected: ${objKey}`);
        }

        // don't add the option in those cases.
        if (value === false) { return; }
      }

      params[objKey] = value;
    }
  });

  return params;
};

// It makes GET or POST request to the API.

module.exports.request = async (section, partial, opts) => {
  debg('Passed args', {
    section,
    partial,
    opts
  });

  if (!section || !partial) {
    throw new Error(buildErrorRequired('section, params'));
  }

  const url = `https://${section}.shodan.io${partial}`;
  const { params, timeout = 5000, json, form } = opts;
  let method = 'get';

  if (!params.key) {
    throw new Error('You must provide a valid API key');
  }

  const optsGot = {
    searchParams: params,
    timeout,
    responseType: 'json',
    // In some cases the API sends a 400 but the error includes
    // meaninful info, ie: "One of your networks has recently
    // been requested and wont get scanned again".
    throwHttpErrors: false
  }

  // In case of a POST request.
  if (json) {
    method = 'post';
    optsGot.json = json;
  }

  if (form) {
    method = 'post';
    // Due to any strange reason, the API expects this
    // in some endpoints (vs json).
    optsGot.form = form;
  }

  debg('Making the HTTP request', { method, url, optsGot });
  let res;
  try {
    res = await got[method](url, optsGot);
  } catch (err) {
    throw new Error(`got.${method} : ${err.message}`);
  }
  // Just in case also, sometimes happens.
  if (/maintenance/.exec(res)) {
    throw new Error('SHODAN API is undergoing maintenance');
  }

  return res.body;
};
