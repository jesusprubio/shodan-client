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

var utils = require('./utils');

// Constructor
function ShodanClient (options) {
    this.key     = options.key || null;
    this.timeout = options.timeout || 5000;
}

// Public methods

// Getter and setters
ShodanClient.prototype.getKey = function () {
    return this.key;
};

ShodanClient.prototype.setKey = function (key) {
    this.key = key;
};

ShodanClient.prototype.getTimeout = function () {
    return this.timeout;
};

ShodanClient.prototype.setTimeout = function (timeout) {
    this.timeout = timeout;
};

// API methods
ShodanClient.prototype.count = function (query, callback) {
    var options;
    
    if (this.key) {
        if (query) {
            options = {
                partialQuery : 'count?q=' + query,
                key          : this.key,
                timeout      : this.timeout
            };
            utils.apiRequest(options, callback);
        } else {
            callback(null, '"query" parameter is mandatory');
        }
    } else {
        callback(null, 'You must provide a valid API key');
    }
};

ShodanClient.prototype.host = function (ip, callback) {
    var options;
    
    if (this.key) {
        if (ip) {
            options = {
                partialQuery : 'host?ip=' + ip,
                key          : this.key,
                timeout      : this.timeout
            };
            utils.apiRequest(options, callback);
        } else {
            callback(null, '"ip" parameter is mandatory');
        }
    } else {
        callback(null, 'You must provide a valid API key');
    }
};

ShodanClient.prototype.info = function (callback) {
    var options;
    
    if (this.key) {
        options = {
            partialQuery : 'info?',
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest(options, callback);
    } else {
        callback(null, 'You must provide a valid API key');
    }
};

ShodanClient.prototype.locations = function (query, callback) {
    var options;

    if (this.key) {
        if (query) {
            options = {
                partialQuery : 'locations?q=' + query,
                key          : this.key,
                timeout      : this.timeout
            };
            utils.apiRequest(options, callback);
        } else {
            callback(null, '"query" parameter is mandatory');
        }
    } else {
        callback(null, 'You must provide a valid API key');
    }
};

ShodanClient.prototype.search = function (config, callback) {
    var partialQuery,
        options,
        filterList,
        finalQuery,
        pageNumber = config.pageNumber || 1;
    
    if (this.key) {
        if (config.query) {
            finalQuery = 'search?q=' + config.query;
            if (config.filters) {
                filterList = Object.keys(config.filters);
                filterList.forEach( function (filter) {
                    finalQuery = finalQuery + '+' +
                                 filter + '%3A' + config.filters[filter];
                });
                options = {
                    partialQuery : finalQuery,
                    key          : this.key,
                    timeout      : this.timeout
                };
                utils.apiRequest(options, callback);
            }
            
        } else {
            callback(null, '"query" parameter is mandatory');
        }
    } else {
        callback(null, 'You must provide a valid API key');
    }
};

// Popular feeds methods, key not needed (RSS)
ShodanClient.prototype.popular = function (callback) {
    var popularUrl = 'http://www.shodanhq.com/browse/popular/feed';
 
    utils.rssRequest(popularUrl, this.timeout, callback);
};
    
ShodanClient.prototype.popularTag = function (tag, callback) {
    var popularUrlBase = 'http://www.shodanhq.com/browse/',
        finalUrl = popularUrlBase  + 'tag/' + tag + '?feed=1';
    
    if (tag) {
        utils.rssRequest(finalUrl, this.timeout, callback);
    } else {
        callback(null, '"tag" parameter is mandatory');
    }
};


// Final export
module.exports = ShodanClient;
