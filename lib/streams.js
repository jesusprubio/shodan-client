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

// https://developer.shodan.io/stream

const util = require('./util');


const apiSection = 'stream';


class Streams {

  constructor(opts) {
    this.key = opts.key;
    this.timeout = opts.timeout;
  }


  banners(cb) {
    const partialUrl = '/shodan/banners?';

    util.apiRequest(
      apiSection,
      util.createOpts(partialUrl, this.key, this.timeout),
      cb
    );
  }


  ports(cfg, cb) {
    const paramMandatory = 'ports';
    let partialUrl = '/shodan/ports/';

    if (!cfg[paramMandatory]) {
      cb(util.createErrMandatory(paramMandatory));

      return;
    }

    partialUrl = partialUrl + cfg[paramMandatory] + '?';

    util.apiRequest(
      apiSection,
      util.createOpts(partialUrl, this.key, this.timeout),
      cb
    );
  }

}


module.exports = Streams;
