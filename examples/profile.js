/*

Copyright (C) 2015, Brad Hein

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

var ShodanClient = require('../'),
    options = {
        timeout: 10000,
        key: 'YOURKEYHERE'
    },
    shodanClient = new ShodanClient(options);


shodanClient.profile(function (err, data) {
    if (err) {
        console.log ("ERROR: shodanClient.profile: " + err);
    } else {
        console.log ("Profile query success. You have " + data.credits + " query credits remaining.");
    }
});
