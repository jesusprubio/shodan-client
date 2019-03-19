/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const lodash = require('lodash');
const debug = require('debug');
const request = require('request-promise-native');

const { name } = require('../package');

const dbg = tag => debug(`${name}:${tag}`);
// To use in this file.
const debg = dbg('utils');

module.exports.dbg = dbg;

module.exports.createErrMandatory = param => `Required parameter: ${param}`;


const boolOpts = ['sort', 'minify', 'history'];

// Abstracting the parameters addition to the url.
module.exports.buildQs = (qs, url, optsAllowed, opts) => {
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

      // eslint-disable-next-line no-param-reassign
      qs[objKey] = value;
    }
  });

  return qs;
};

// It makes GET or POST request to the API.
module.exports.apiRequest = async (
  apiSection,
  partialUrl,
  qs,
  timeout,
  form,
) => {
  debg('Passed args', {
    apiSection,
    partialUrl,
    qs,
    timeout,
    form,
  });

  const config = {
    uri: `https://${apiSection}.shodan.io${partialUrl}`,
    json: true,
    qs,
    timeout: timeout || 5000,
  };
  let method = 'get';

  if (!qs.key) {
    throw new Error('You must provide a valid API key');
  }

  // In case of a POST request.
  if (form) {
    method = 'post';
    config.form = form;
  }

  debg('Making the HTTP request', { method, config });
  let res;
  try {
    res = await request[method](config);
  } catch (err) {
    throw new Error(`request.${method} : ${err.message}`);
  }
  // Just in case also, sometimes happens :(.
  if (/maintenance/.exec(res)) {
    throw new Error('SHODAN API is undergoing maintenance');
  }

  return res;
};
