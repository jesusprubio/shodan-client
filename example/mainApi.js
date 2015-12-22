/*

Copyright 2013, Jesus Perez <jesusprubio gmail com>

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

const util = require('./util');

const ShodanClient = require('../');


const client = new ShodanClient({
  key: 'YOURKEYHERE',
  timeout: 10000,
});


// NOTE: Just uncoment a call and its options to check any method.


// host

const hostOpts = {
  ip: '1.1.1.1',
  minify: true,
};

client.host(hostOpts, (err, data) => { util.printRes(err, data, 'host'); });


// search

// const searchOpts = {
//   // query: 'asterisk',
//   query: 'asterisk port:5061',
//   // query: 'openssh+port%3A22',
//   // query: 'penssh%20port%3A22',
//   facets: 'port:100,country:100',
//   // minify: false,
// };

// client.search(searchOpts, (err, data) => { util.printRes(err, data, 'search'); });


// count

// const countOpts = {
//   query: 'freepbx port:5060',
//   facets: 'port:100,country:100',
// };

// client.count(countOpts, (err, data) => { util.printRes(err, data, 'count'); });


// searchTokens

// const searchTokenOpts = { query: 'asterisk port:5061' };

// client.searchTokens(searchTokenOpts, (err, data) => {
//   util.printRes(err, data, 'searchTokens');
// });


// ports

// client.ports((err, data) => { util.printRes(err, data, 'ports'); });


// protocols

// client.protocols((err, data) => { util.printRes(err, data, 'protocols'); });


// scan

// const scanOpts = { ips: '8.8.8.8,9.9.9.9' };

// client.scan(scanOpts, (err, data) => { util.printRes(err, data, 'scan'); });


// scanInternet

// const scanInetOpts = {
//   port: 5065,
//   protocol: 'sip',
// };

// client.scanInternet(scanInetOpts, (err, data) => { util.printRes(err, data, 'scanInternet'); });


// services

// client.services((err, data) => { util.printRes(err, data, 'services'); });


// query

// const queryOpts = {
//   page: 3,
//   sort: 'votes',
// };

// client.query(queryOpts, (err, data) => { util.printRes(err, data, 'query'); });


// querySearch

// const querySearchOpts = {
//   query: 'webcam',
//   page: 2,
// };

// client.querySearch(querySearchOpts, (err, data) => { util.printRes(err, data, 'querySearch'); });


// queryTags

// const queryTagsOpts = { size: 15 };

// client.queryTags(queryTagsOpts, (err, data) => { util.printRes(err, data, 'queryTags'); });


// accountProfile

// client.accountProfile((err, data) => { util.printRes(err, data, 'accountProfile'); });


// dnsResolve

// const dnsResolveOpts = { hostnames: 'google.com,bing.com' };

// client.dnsResolve(dnsResolveOpts, (err, data) => { util.printRes(err, data, 'dnsResolve'); });


// dnsReverse

// const dnsReverseOpts = { ips: '74.125.227.230,204.79.197.200' };

// client.dnsReverse(dnsReverseOpts, (err, data) => { util.printRes(err, data, 'dnsReverse'); });


// toolsMyip

// client.toolsMyip((err, data) => { util.printRes(err, data, 'toolsMyip'); });


// apiInfo

// client.apiInfo((err, data) => { util.printRes(err, data, 'apiInfo'); });
