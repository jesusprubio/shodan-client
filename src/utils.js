/*

Copyright (C) 2013, Jesus Perez <jesusprubio gmail com>

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

var request = require('request'),
    parseString = require('xml2js').parseString,

    SIMULATION = false;


// It makes a request to the API
exports.apiRequest = function (api, options, callback) {
    var baseUrl = 'https://' + api + '.shodan.io',
        config = {
            uri: baseUrl + options.partialQuery + 'key=' + options.key,
            method: 'GET',
            json: true,
            timeout: options.timeout
        },
        err;

    if (SIMULATION) {
        console.log ("Simulating an HTTP call: " + JSON.stringify(config));
    } else {
        if (options.key) {
            request.get(config, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    if (/maintenance/.exec(body)) {
                        callback('SHODAN API is undergoing maintenance');
                    } else {
                        callback(null, body);
                    }
                } else {
                    err = 'request.get: ' + error;
                    if (response && response.statusCode) {
                        err += ' (code: ' + response.statusCode + ')';
                    }
                    callback(err);
                }
            });
        } else {
            callback('You must provide a valid API key');
        }
    }
};

// It makes an RSS request to get the popular feeds
exports.rssRequest = function (url, timeout, callback) {
    var config = {
            uri: url,
            method: 'GET',
            json: false,
            timeout: timeout
        },
        err;

    request.get(config, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            parseString(body, function (err, result) {
                // Node uses util.inspect to convert the object into strings
                // but it stops after depth=2 which (low for most XML)
                callback(null, result);
            });
        } else {
            err = 'request.get: ' + error;
            if (response && response.statusCode) {
                err += ' (code: ' + response.statusCode + ')';
            }
            callback(err);
        }
    });
};
