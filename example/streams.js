/*
  Copyright Jesús Rubio <jesusprubio@gmail.com>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const util = require('util');

const client = require('../');

const apiKey = 'YOURKEYHERE';

client.streams
  .banners(apiKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });

// client.streams.asn('3303,32475', apiKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.streams.countries('DE,US', apiKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });
//
// client.streams.ports('1434,27017,6379', apiKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });
