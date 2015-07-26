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

// https://developer.shodan.io/api

var lodash = require('lodash'),

    utils  = require('./utils'),

    POPULAR_URL = 'http://www.shodanhq.com/browse/popular/feed',
    POPULAR_URL_BASE = 'http://www.shodanhq.com/browse/';


// Constructor

function ShodanClient(options) {
    this.key = options.key || null;
    this.timeout = options.timeout || 10000;
}


// Public methods

// SHODAN methods

ShodanClient.prototype.host = function (config, callback) {
    var partialQuery = '/shodan/host/',
        options;

    if (config.ip) {
        partialQuery += config.ip + '?';
        if (config.history) {
            partialQuery += 'history=' + config.history + '&';
        }
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback('ip parameter is mandatory');
    }
};

ShodanClient.prototype.search = function (config, callback) {
    var partialQuery = '/shodan/host/search?',
        optional = ['facets', 'page', 'offset', 'limit', 'minify'],
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
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback('query parameter is mandatory');
    }
};

ShodanClient.prototype.count = function (config, callback) {
    var partialQuery = '/shodan/host/count?',
        options;

    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        if (config.facets) {
            partialQuery += 'facets=' + config.facets + '&';
        }
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback('query parameter is mandatory');
    }
};

ShodanClient.prototype.profile = function (callback) {
    var partialQuery = '/account/profile?',
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };

    utils.apiRequest ('api', options, callback);
};

ShodanClient.prototype.apiinfo = function (callback) {
    var partialQuery = '/api-info?',
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };

    utils.apiRequest('api', options, callback);
};



// DNS methods

ShodanClient.prototype.resolve = function (hostnames, callback) {
    var partialQuery = '/dns/resolve?',
        options;

    if (hostnames) {
        partialQuery += 'hostnames=' + hostnames + '&';
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback('hostnames parameter is mandatory');
    }
};

ShodanClient.prototype.reverse = function (ips, callback) {
    var partialQuery = '/dns/reverse?',
        options;

    if (ips) {
        partialQuery += 'ips=' + ips + '&';
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('api', options, callback);
    } else {
        callback('ips parameter is mandatory');
    }
};


// Utility methods

ShodanClient.prototype.myip = function (callback) {
    var partialQuery = '/tools/myip?',
        options;

    options = {
        partialQuery: partialQuery,
        key: this.key,
        timeout: this.timeout
    };

    utils.apiRequest('api', options, callback);
};


// Streaming API
// https://developer.shodan.io/api/stream

ShodanClient.prototype.streamBanners = function (callback) {
    var partialQuery = '/shodan/banners?',
        options;

    options = {
        partialQuery: partialQuery,
        key: this.key,
        timeout: this.timeout
    };

    utils.apiRequest('stream', options, callback);
};

ShodanClient.prototype.streamGeo = function (callback) {
    var partialQuery = '/shodan/geo?',
        options;

    options = {
        partialQuery: partialQuery,
        key: this.key,
        timeout: this.timeout
    };

    utils.apiRequest('stream', options, callback);
};

ShodanClient.prototype.streamPorts = function (ports, callback) {
    var partialQuery = '/shodan/ports/',
        options;

    if (ports) {
        partialQuery += ports + '?';
        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('stream', options, callback);
    } else {
        callback('ports parameter is mandatory');
    }
};


// Exploit API
// https://developer.shodan.io/api/exploit-specification

ShodanClient.prototype.exploitSearch = function (config, callback) {
    var partialQuery = '/api/search?',
        optional = ['facets', 'page'],
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
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('exploits', options, callback);
    } else {
        callback('query parameter is mandatory');
    }
};

ShodanClient.prototype.exploitCount = function (config, callback) {
    var partialQuery = '/api/count?',
        options;

    if (config.query) {
        partialQuery += 'query=' + config.query + '&';
        if (config.facets) {
            partialQuery += 'facets=' + config.facets + '&';
        }

        options = {
            partialQuery: partialQuery,
            key: this.key,
            timeout: this.timeout
        };
        utils.apiRequest('exploits', options, callback);
    } else {
        callback('query parameter is mandatory');
    }
};


// Popular RSS
// Key not needed here
// http://www.shodanhq.com/browse

ShodanClient.prototype.popular = function (callback) {
    utils.rssRequest(POPULAR_URL, this.timeout, callback);
};

ShodanClient.prototype.popularTag = function (tag, callback) {
    if (tag) {
        utils.rssRequest(
            POPULAR_URL_BASE  + 'tag/' + tag + '?feed=1',
            this.timeout,
            callback
        );
    } else {
        callback('tag parameter is mandatory');
    }
};

module.exports = ShodanClient;
