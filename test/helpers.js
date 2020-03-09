'use strict';

// The service tends to drop 503 if too much.
module.exports.sleep = () =>
  new Promise(resolve => setTimeout(resolve, 5000));
