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

var ShodanClient = require('../lib/shodan.js'),
    options      = {
        key     : 'YOURKEYHEREEEEEEEEEEEEEEE',
        timeout : 15000
    },
    shodanClient = new ShodanClient(options),
    hostOptions,
    searchOptions,
    countOptions;


// ---------------------- REST API ----------------------
// https://developer.shodan.io/api

// ------------------- HOST (SHODAN methods) -------------------
// minimal required parameters
hostOptions = {
    ip : '1.1.1.1'
};

// full supported params
//hostOptions = {
//    ip      : '1.1.1.1',
//    history : true,    // default is false
//};

shodanClient.host(hostOptions, function (data, err) {
    console.log('\n------------------- host -------------------');
    if (err) {
        console.log('ERROR: shodanClient.host: ' + err);
    } else {
        console.log(data);
    }
});

// ------------------- SEARCH (SHODAN methods) -------------------
// minimal required parameters
//searchOptions = {
//    query: 'asterisk'
//};

// full supported params
//NOTE: API still fails with some of them
searchOptions = {
    query: 'asterisk',
    limit: 5,
    facets: 'port:100',
    minify: false
};

// A premium account is needed in some cases, in the doc:
// " Uses 1 query credit if:
// - Page number > 1
// - Search query contains any of the following filters: city,
// country, net, geo, before, after, org, isp, title, html "
shodanClient.search(searchOptions,  function (data, err) {
    console.log('\n------------------- search -------------------');
    if (err) {
        console.log('ERROR: shodanClient.search: ' + err);
    } else {
        console.log(data);
    }
});

// ------------------- COUNT (SHODAN methods) -------------------
// minimal required parameters
//countOptions = {
//    query: 'freepbx'
//};

// full supported params
countOptions = {
    query: 'freepbx',
    facets: 'port:100'
};

shodanClient.count(countOptions,  function (data, err) {
    console.log('\n------------------- count -------------------');
    if (err) {
        console.log('ERROR: shodanClient.count: ' + err);
    } else {
        console.log(data);
    }
});

// ------------------- RESOLVE (DNS methods) -------------------
shodanClient.resolve('google.com,bing.com', function (data, err) {
    console.log('\n------------------- resolve -------------------');
    if (err) {
        console.log('ERROR: shodanClient.resolve: ' + err);
    } else {
        console.log(data);
    }
});

// ------------------- REVERSE (DNS methods) -------------------
shodanClient.reverse('74.125.227.230,204.79.197.200', function (data, err) {
    console.log('\n------------------- reverse -------------------');
    if (err) {
        console.log('ERROR: shodanClient.reverse: ' + err);
    } else {
        console.log(data);
    }
});

// ------------------- MYIP (UTILITY methods) -------------------
shodanClient.myip(function (data, err) {
    console.log('\n------------------- myip -------------------');
    if (err) {
        console.log('ERROR: shodanClient.myip: ' + err);
    } else {
        console.log(data);
    }
});