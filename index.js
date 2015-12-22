/*
  Copyright Jesus Perez <jesusprubio gmail com>

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


// Main object, to wrap everything.

const mainApi = require('./lib/mainApi.js');
const Streams = require('./lib/streams.js');
const Exploits = require('./lib/exploits.js');


class ShodanClient {

  constructor(opts) {
    this.key = opts.key || null;
    this.timeout = opts.timeout || 20000;

    // To use through all this file.
    this.massagedOpts = {
      key: this.key,
      timeout: this.timeout,
    };

    // Exporting the whole object to group the calls similar
    // to the API structure.
    this.Streams = new Streams(this.massagedOpts);
    this.Exploits = new Exploits(this.massagedOpts);
  }


  // They simply call the proper implementation adding the global options before
  // to the config object which is being passed.
  host(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.host(commOpts, cb);
  }

  search(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.search(commOpts, cb);
  }

  count(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.count(commOpts, cb);
  }

  searchTokens(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.searchTokens(commOpts, cb);
  }

  ports(cb) {
    // Don't need options.
    const commOpts = { global: this.massagedOpts };
    mainApi.ports(commOpts, cb);
  }

  protocols(cb) {
    const commOpts = { global: this.massagedOpts };
    mainApi.protocols(commOpts, cb);
  }

  scan(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.scan(commOpts, cb);
  }

  scanInternet(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.scanInternet(commOpts, cb);
  }

  services(cb) {
    const commOpts = { global: this.massagedOpts };
    mainApi.services(commOpts, cb);
  }

  query(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.query(commOpts, cb);
  }

  querySearch(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.querySearch(commOpts, cb);
  }

  queryTags(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.queryTags(commOpts, cb);
  }

  accountProfile(cb) {
    const commOpts = { global: this.massagedOpts };
    mainApi.accountProfile(commOpts, cb);
  }

  dnsResolve(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.dnsResolve(commOpts, cb);
  }

  dnsReverse(commOpts, cb) {
    commOpts.global = this.massagedOpts;
    mainApi.dnsReverse(commOpts, cb);
  }

  toolsMyip(cb) {
    const commOpts = { global: this.massagedOpts };
    mainApi.toolsMyip(commOpts, cb);
  }

  apiInfo(cb) {
    const commOpts = { global: this.massagedOpts };
    mainApi.apiInfo(commOpts, cb);
  }

}


module.exports = ShodanClient;
