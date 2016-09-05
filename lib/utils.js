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
