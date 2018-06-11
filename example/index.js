/*
  Copyright Jesús Pérez <jesusprubio@member.fsf.org>

  This code may only be used under the MIT license found at
  https://opensource.org/licenses/MIT.
*/

/* eslint-disable no-console */

'use strict';

const util = require('util');

const client = require('../');

const shodanKey = 'YOURKEYHERE';

client
  .host('1.1.1.1', shodanKey)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });

// const searchOpts = {
//   facets: 'port:100,country:100',
//   // minify: false,
// };
// client.search('asterisk port:5061', shodanKey, searchOpts)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// const countOpts = {
//   facets: 'port:100,country:100',
// };
// client.count('freepbx port:5060', shodanKey, countOpts)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.searchTokens('asterisk port:5061', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.ports(shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.protocols(shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.scan('8.8.8.8,9.9.9.9', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.scanInternet(5065, 'sip', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.services(shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// const queryOpts = {
//   page: 3,
//   sort: 'votes',
// };
// client.query(shodanKey, queryOpts)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.querySearch('webcam', shodanKey, { page: 2 })
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.queryTags(shodanKey, { size: 15 })
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.accountProfile(shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.dnsResolve('google.com,bing.com', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });

// client.dnsReverse('216.58.194.110,204.79.197.200', shodanKey)
// .then(res => {
//   console.log('Result:');
//   console.log(util.inspect(res, { depth: 6 }));
// })
// .catch(err => {
//   console.log('Error:');
//   console.log(err);
// });
