# Node-shodan-client
A **[Node.js](http://nodejs.org/) (JavaScript) library for accessing the new [SHODAN API](https://developer.shodan.io/api)**. It includes all officially supported methods (REST, Streaming and Exploits APIs). Moreover two more were added, which allow to obtain the most popular search queries.

## Use
*NOTE: All methods of the API need a valid key, you can get one [here](http://www.shodanhq.com/api_doc). But popular ones can be reached through RSS so no key is needed.*

This module has next dependencies (included in "package.json" file):

- **[request](https://github.com/mikeal/request)**
- **[xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)**
- **[lodash](https://github.com/lodash/lodash)**

```javascript
var ShodanClient = require('shodan-client'),
    options      = {
        key : 'YOURKEYHERE!!!!!!!!!!!!!!!!!!!!!!!!!',
    },
    shodanClient = new ShodanClient(options),
    searchOptions = {
        query: 'asterisk',
        limit: 5,
        facets: 'port:100',
        minify: false
    };

shodanClient.search(searchOptions,  function (data, err) {
    console.log('\n------------------- search -------------------');
    if (err) {
        console.log('ERROR: shodanClient.search: ' + err);
    } else {
        console.log(data);
    }
});

shodanClient.streamBanners(function (data, err) {
    console.log('\n------------------- streamBanners -------------------');
    if (err) {
        console.log('ERROR: shodanClient.streamBanners: ' + err);
    } else {
        console.log(data);
    }
});

var searchOptionsExploits = {
    query: 'asterisk',
    facets: 'port:100',
    page: 1
};

shodanClient.exploitSearch(searchOptionsExploits,  function (data, err) {
    console.log('\n------------------- exploitSearch -------------------');
    if (err) {
        console.log('ERROR: shodanClient.exploitSearch: ' + err);
    } else {
        console.log(data);
    }
});

```
[**Full examples**](https://github.com/jesusprubio/node-shodan-client/tree/master/examples)

## Developer guide
- Use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).
- Conventions:
 - We use [JSHint](http://jshint.com/) and [Crockford's Styleguide](http://javascript.crockford.com/code.html).
 - Please run `grunt contribute` to be sure your code fits with them.

## TODO
- [https://github.com/jesusprubio/node-shodan-client/issues](https://github.com/jesusprubio/node-shodan-client/issues)

## License
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
