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

/* eslint-disable no-console */

'use strict';

const util = require('util');

const client = require('../');

const shodanKey = 'YOURKEYHERE';


client.streams.banners(shodanKey)
.then(res => {
  console.log('Result:');
  console.log(util.inspect(res, { depth: 6 }));
})
.catch(err => {
  console.log('Error:');
  console.log(err);
});

// client.streams.asn('3303,32475', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.streams.countries('DE,US', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });
//
// client.streams.ports('1434,27017,6379', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });
