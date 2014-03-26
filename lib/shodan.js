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

var utils  = require('./utils'),
    lodash = require('lodash');

function ShodanClient (options) {
    this.key     = options.key || null;
    this.timeout = options.timeout || 10000;
}


// ---------------------- REST API METHODS ----------------------
// https://developer.shodan.io/api

// ------------------- HOST (SHODAN methods) -------------------
ShodanClient.prototype.host = function (config, callback) {
    var partialQuery = '/shodan/host/',
        options;
    
    if (config.ip) {
        partialQuery += config.ip + '?';
        if (config.history) {
            partialQuery += 'history=' + config.history + '&';
        }
        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback(null, '"ip" parameter is mandatory');
    }
};

// ------------------- SEARCH (SHODAN methods) -------------------
ShodanClient.prototype.search = function (config, callback) {
    var partialQuery = '/shodan/host/search?',
        optional = ['facets','page','offset','limit','minify'],
        options;
    
    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        lodash.map(config, function (value, key) {
            // Drop not valid params
            if (optional.indexOf(key) !== -1) {
                partialQuery += key + '=' + value + '&';
            }
        });

        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback(null, '"query" parameter is mandatory');
    }
};

// ------------------- COUNT (SHODAN methods) -------------------
ShodanClient.prototype.count = function (config, callback) {
    var partialQuery = '/shodan/host/count?',
        options;
    
    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        if(config.facets) {
            partialQuery += 'facets=' + config.facets + '&';
        }
        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback(null, '"query" parameter is mandatory');
    }
};

// ------------------- RESOLVE (DNS methods) -------------------
ShodanClient.prototype.resolve = function (hostnames, callback) {
    var partialQuery = '/dns/resolve?',
        options;
    
    if (hostnames) {
        partialQuery += 'hostnames=' + hostnames + '&';
        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback(null, '"hostnames" parameter is mandatory');
    }
};

// ------------------- REVERSE (DNS methods) -------------------
ShodanClient.prototype.reverse = function (ips, callback) {
    var partialQuery = '/dns/reverse?',
        options;
    
    if (ips) {
        partialQuery += 'ips=' + ips + '&';
        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback(null, '"ips" parameter is mandatory');
    }
};

// ------------------- MYIP (UTILITY methods) -------------------
ShodanClient.prototype.myip = function (callback) {
    var partialQuery = '/tools/myip?',
        options;
        
    options = {
        partialQuery : partialQuery,
        key          : this.key,
        timeout      : this.timeout
    };
    
    utils.apiRequest('api', options, callback);
};


// ---------------------- STREAMING API METHODS ----------------------
// https://developer.shodan.io/api/stream

ShodanClient.prototype.streamBanners = function (callback) {
    var partialQuery = '/shodan/banners?',
        options;
        
    options = {
        partialQuery : partialQuery,
        key          : this.key,
        timeout      : this.timeout
    };
    
    utils.apiRequest('stream', options, callback);
};

ShodanClient.prototype.streamGeo = function (callback) {
    var partialQuery = '/shodan/geo?',
        options;
        
    options = {
        partialQuery : partialQuery,
        key          : this.key,
        timeout      : this.timeout
    };
    
    utils.apiRequest('stream', options, callback);
};

ShodanClient.prototype.streamPorts = function (ports, callback) {
    var partialQuery = '/shodan/ports/',
        options;
        
    if (ports) {
        partialQuery += ports + '?';
        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('stream', options, callback);
    } else {
        callback(null, '"ports" parameter is mandatory');
    }
};


// ---------------------- EXPLOIT API METHODS ----------------------
// https://developer.shodan.io/api/stream

// ------------------- EXPLOITSEARCH -------------------
ShodanClient.prototype.exploitSearch = function (config, callback) {
    var partialQuery = '/api/search?',
        optional = ['facets','page'],
        options;
    
    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        lodash.map(config, function (value, key) {
            // Drop not valid params
            if (optional.indexOf(key) !== -1) {
                partialQuery += key + '=' + value + '&';
            }
        });

        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('exploits', options, callback);
    } else {
        callback(null, '"query" parameter is mandatory');
    }
};

// ------------------- EXPLOITCOUNT -------------------
ShodanClient.prototype.exploitCount = function (config, callback) {
    var partialQuery = '/api/count?',
        options;
    
    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        if (config.facets) {
            partialQuery += 'facets=' + config.facets + '&';
        }

        options = {
            partialQuery : partialQuery,
            key          : this.key,
            timeout      : this.timeout
        };
        utils.apiRequest('exploits', options, callback);
    } else {
        callback(null, '"query" parameter is mandatory');
    }
};


// ---------------------- POPULAR RSS METHODS ----------------------
// Key not needed here
// http://www.shodanhq.com/browse

// ---------------------- POPULAR ----------------------
ShodanClient.prototype.popular = function (callback) {
    var popularUrl = 'http://www.shodanhq.com/browse/popular/feed';
 
    utils.rssRequest(popularUrl, this.timeout, callback);
};

// ---------------------- POPULARTAG ----------------------
ShodanClient.prototype.popularTag = function (tag, callback) {
    var popularUrlBase = 'http://www.shodanhq.com/browse/',
        finalUrl;
    
    if (tag) {
        finalUrl = popularUrlBase  + 'tag/' + tag + '?feed=1';
        utils.rssRequest(finalUrl, this.timeout, callback);
    } else {
        callback(null, '"tag" parameter is mandatory');
    }
};

module.exports = ShodanClient;