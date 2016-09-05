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

const utils = require('./utils');


const apiSection = 'stream';


module.exports.banners = (key, opts = {}) =>
  utils.apiRequest(apiSection, '/shodan/banners?', key, opts.timeout);


module.exports.ports = (ports, key, opts = {}) => {
  let partialUrl = '/shodan/ports?';

  if (!ports) { return Promise.reject(utils.createErrMandatory('ports')); }

  partialUrl = utils.addParam(partialUrl, 'ports', ports);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.asn = (asn, key, opts = {}) => {
  let partialUrl = '/shodan/asn?';

  if (!asn) { return Promise.reject(utils.createErrMandatory('asn')); }

  partialUrl = utils.addParam(partialUrl, 'asn', asn);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.countries = (countries, key, opts = {}) => {
  let partialUrl = '/shodan/countries?';

  if (!countries) { return Promise.reject(utils.createErrMandatory('countries')); }

  partialUrl = utils.addParam(partialUrl, 'countries', countries);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};


module.exports.ports = (ports, key, opts = {}) => {
  let partialUrl = '/shodan/ports?';

  if (!ports) { return Promise.reject(utils.createErrMandatory('ports')); }

  partialUrl = utils.addParam(partialUrl, 'ports', ports);

  return utils.apiRequest(apiSection, partialUrl, key, opts.timeout);
};
