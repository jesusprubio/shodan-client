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

// https://developer.shodan.io/api/stream

var util = require('util'),

    ShodanClient = require('../'),

    options = {
        key: 'YOURKEYHERE',
        timeout: 15000
    },
    shodanClient = new ShodanClient(options);


shodanClient.streamBanners(function (err, data) {
    console.log('\n------------------- streamBanners -------------------');
    if (err) {
        console.log('ERROR: shodanClient.streamBanners: ' + err);
    } else {
        console.log(util.inspect(data, { depth : 6 }));
    }
});

shodanClient.streamGeo(function (err, data) {
    console.log('\n------------------- streamGeo -------------------');
    if (err) {
        console.log('ERROR: shodanClient.streamGeo: ' + err);
    } else {
        console.log(util.inspect(data, { depth : 6 }));
    }
});

shodanClient.streamPorts('1434,27017,6379', function (err, data) {
    console.log('\n------------------- streamPorts -------------------');
    if (err) {
        console.log('ERROR: shodanClient.streamPorts: ' + err);
    } else {
        console.log(util.inspect(data, { depth : 6 }));
    }
});
