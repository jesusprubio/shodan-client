# node-shodan-client

![Travis-ci status](https://api.travis-ci.org/jesusprubio/node-shodan-client.svg)

A [Node.js](https://nodejs.org) library for accessing the new [Shodan API](https://developer.shodan.io/api).

![Demo](https://raw.githubusercontent.com/jesusprubio/node-shodan-client/master/artifacts/demo.gif)


## Use

All methods of the API need a valid key, you can get one [here](http://www.shodanhq.com/api_doc).

```javascript
const ShodanClient = require('shodan-client');

const options = { key: 'YOURKEYHERE' };
const client = new ShodanClient(options);

const searchOpts = {
  query: 'asterisk',
  limit: 5,
  facets: 'port:100',
  minify: false
};

client.search(searchOpts, (err, data) => {
  if (err) {
      console.log('Error:');
      console.log(err);
  } else {
      console.log(data);
  }
});
```

- [**More examples**](https://github.com/jesusprubio/node-shodan-client/tree/master/example)
- [**Full API documentation**](./doc/api.md).


## Developer guide

- Use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).
- Conventions:
 - We use [ESLint](http://eslint.org/) and [Airbnb](https://github.com/airbnb/javascript) style guide.
 - Please run `gulp lint` to be sure your code fits with it.


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
