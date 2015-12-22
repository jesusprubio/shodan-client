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
const request = require('request');


module.exports.createErr = (msg, err) => {
  const finalErr = {};

  if (msg) { finalErr.message = msg; }
  if (err) { finalErr.error = msg; }

  return finalErr;
};


module.exports.createErrMandatory = (param) => {
  return this.createErr('The "' + param + '" parameter is mandatory.');
};


// Add a parameter to a url.
module.exports.addParam = (url, param, value) => { return url + param + '=' + value + '&'; };


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
module.exports.apiRequest = (api, options, callback) => {
  const baseUrl = 'https://' + api + '.shodan.io';
  const config = {
    uri: baseUrl + options.partialUrl + 'key=' + options.key,
    json: true,
    timeout: options.timeout,
  };
  let method = 'get';


  // Just in case we forget it in the main "index.js".
  if (!options.key) {
    callback({ message: 'You must provide a valid API key' });

    return;
  }

  // In case of a POST request.
  if (options.form) {
    method = 'post';
    config.form = options.form;
  }

  // Making the HTTP request.
  request[method](config, (error, response, body) => {
  // request.get(config, (error, response, body) => {
    // Just in case we make double check ;).
    if (!error && response.statusCode === 200) {
      // Just in case also, sometimes happens :(.
      if (/maintenance/.exec(body)) {
        callback({ message: 'SHODAN API is undergoing maintenance' });
      } else {
        // Returning a valid result.
        callback(null, body);
      }
    } else {
      const err = {
        message: 'request.' + method,
        // We can have an error from the "request" library or
        // from Shodan (in body). ie: { 'error': 'Invalid IP' }
        error: error || body,
      };

      if (response && response.statusCode) { err.code = response.statusCode; }

      callback(err);
    }
  });
};


// cfg object to use in our request library abstraction.
module.exports.createOpts = (partialUrl, key, timeout) => { return { partialUrl, key, timeout }; };
