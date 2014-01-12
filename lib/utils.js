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

var request     = require('request'),
    util        = require('util'),
    parseString = require('xml2js').parseString;


exports.apiRequest = function (options, callback) {
    var baseUrl    = 'http://www.shodanhq.com/api/',
        config = {
            uri     : baseUrl + options.partialQuery + '&key=' + options.key,
            method  : 'GET',
            json    : true,
            timeout : options.timeout
        },
        err;
    
    request.get(config, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            if (/maintenance/.exec(body)) {
                console.log('ERROR: SHODAN API is undergoing maintenance');
            } else {
                callback(body, null);
            }
        }
        else {
            err = 'request.get: ' + error;
            if (response && response.statusCode) {
                err = err + ' (code: ' + response.statusCode + ')';
            }
            callback(null, err);
        }
    });
};


exports.rssRequest = function (url, timeout, callback) {
    var config = {
            uri     : url,
            method  : 'GET',
            json    : false,
            timeout : timeout
        },
        err;
    
    request.get(config, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            parseString(body, function (err, result) {
                // Node uses util.inspect to convert the object into strings 
                // but it stops after depth=2 which (low for most XML)
                callback(util.inspect(result, false, 6), null);
            });
        }
        else {
            err = 'request.get: ' + error;
            if (response && response.statusCode) {
                err = err + ' (code: ' + response.statusCode + ')';
            }
            callback(null, err);
        }
    });
};