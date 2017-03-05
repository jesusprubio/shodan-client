/*
  Copyright Jesús Pérez <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

'use strict';

const lodash = require('lodash');
const request = require('request-promise-native');


module.exports.createErrMandatory = param => new Error(`Required parameter: ${param}`);

// Add a parameter to a url.
module.exports.addParam = (url, param, value) => `${url}${param}=${value}&`;

// Abstracting the parameters addition to the url.
module.exports.addOptionals = (url, optionals, cfg) => {
  let finalUrl = url;

  lodash.each(cfg, (value, objKey) => {
    // Drop not valid params.
    if (optionals.indexOf(objKey) !== -1) { finalUrl = this.addParam(finalUrl, objKey, value); }
  });

  return finalUrl;
};


// It makes GET or POST request to the API.
module.exports.apiRequest = (apiSection, partialUrl, key, timeout, form) =>
  new Promise((resolve, reject) => {
    const config = {
      uri: `https://${apiSection}.shodan.io${partialUrl}key=${key}`,
      json: true,
      timeout: timeout || 5000,
    };
    let method = 'get';

    if (!key) {
      reject(new Error('You must provide a valid API key'));

      return;
    }

    // In case of a POST request.
    if (form) {
      method = 'post';
      config.form = form;
    }

    // Making the HTTP request.
    request[method](config)
    .then(res => {
      // Just in case also, sometimes happens :(.
      if (/maintenance/.exec(res)) {
        reject(new Error('SHODAN API is undergoing maintenance'));

        return;
      }

      resolve(res);
    })
    .catch(err => reject(`request.${method} : ${err.message}`));
  });
