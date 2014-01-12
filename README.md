Node-shodan-client
==================
A **[Node.js](http://nodejs.org/) (JavaScript) library for accessing [SHODAN JSON API](https://developers.shodan.io/shodan-rest.html)**. It includes all officially supported methods. Moreover two more were added, which allow to obtain the most popular search queries. It was designed to be included in [Bluebox-ng](https://github.com/jesusprubio/bluebox-ng) 2.0 version.

- **GitHub repo**: [https://github.com/jesusprubio/node-shodan-client](https://github.com/jesusprubio/node-shodan-client)
- **IRC(Freenode)**: #breakingVoIP

Use
---
*NOTE: All methods of the API need a valid key, you can get one [here](http://www.shodanhq.com/api_doc). But popular ones can be reached through RSS so no key is needed.*

This module has next dependencies (included in "package.json" file):

- **[request](https://github.com/mikeal/request)**
- **[xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)**

**JavaScript**
```javascript
var ShodanClient = require('../../lib/shodan.js'),
    options      = {
        key : 'YOURKEYHERE!!!!!!!!!!!!!!!!!!!!!!!!!',
    },
    shodanClient = new ShodanClient(options),
    searchOptions = {
        query: 'asterisk',
        pageNumber: 1,
        filters: {
            port: 5060
        }
    };
    
shodanClient.search(searchOptions,  function (data, err) {
    if (err) {
        console.log('ERROR: shodanClient.search: ' + err);
    } else {
        console.log(data);
    }
});
```

**CoffeeScript**
```coffeescript
ShodanClient = require("../../lib/shodan.js")

options =
  key : "YOURKEYHERE!!!!!!!!!!!!!!!!!!!!!!!!!",

shodanClient = new ShodanClient(options)

shodanClient.count "apache", (data, err) ->
  if err
    console.log "ERROR: shodanClient.count: " + err
  else
    console.log data

shodanClient.host "1.1.1.1", (data, err) ->
  if err
    console.log "ERROR: shodanClient.host: " + err
  else
    console.log data
```

[**Full examples**](https://github.com/jesusprubio/node-shodan-client/tree/master/examples)

Developer guide
---------------
- Use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).
- Respect the ".jshintrc" included file or coffeeLint default options (examples).

TODO
----
- [https://github.com/jesusprubio/node-shodan-client/issues](https://github.com/jesusprubio/node-shodan-client/issues)

License
-------
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