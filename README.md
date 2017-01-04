# shodan-client.js

[![Build Status](https://travis-ci.org/jesusprubio/shodan-client.js.svg?branch=master)](https://travis-ci.org/jesusprubio/shodan-client.js)

A [Node.js](https://nodejs.org) library for accessing the new [Shodan API](https://developer.shodan.io/api).

![Demo](https://raw.githubusercontent.com/jesusprubio/shodan-client.js/master/artifacts/demo.gif)


## Use

All methods of the API need a valid key, you can get one [here](http://www.shodanhq.com/api_doc).

```javascript
const client = require('shodan-client');

const searchOpts = {
  facets: 'port:100,country:100',
  // minify: false,
};
client.search('asterisk port:5061', 'YOURKEYHERE', searchOpts)
.then(res => {
  console.log('Result:');
  console.log(util.inspect(res, { depth: 6 }));
})
.catch(err => {
  console.log('Error:');
  console.log(err);
});
```

- [**More examples**](https://github.com/jesusprubio/shodan-client.js/tree/master/example)


## API

The content of the result is the same provided by the API. You can check them in the [API documentation](https://developer.shodan.io).

Different errors are thrown. Promises are also rejected with errors.


### Methods

They support the requests documented here: https://developer.shodan.io/api.
NOTE: All methods drop silently all not supported ones.

#### `host(ip, key, opts) -> Promise`
Returns all services that have been found on the given host IP. Supported options:
- `ip` (string) -  Host IP address.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `history` (boolean, optional) - True if all historical banners should be returned (default: false)
 - `minify` (boolean, optional) - True to only return the list of ports and the general host information, no banners. (default: false)
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `search(query, key, opts) -> Promise`
Search Shodan using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search).
- `query` (string) - The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the API documentation.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)
 - `page` (number, optional) - The page number to page through results 100 at a time (default: 1)
 - `minify` (boolean, optional) - Whether or not to truncate some of the larger fields (default: true)
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `count(query, key, opts) -> Promise`
This method behaves identical to "search" with the only difference that this method does not return any host results, it only returns the total number of results that matched the query and any facet information that was requested. As a result this method does not consume query credits.
- `query` (string) - Shodan search query. The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the [API documentation](https://developer.shodan.io/api#shodan-host-count).
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `searchTokens(query, key, opts) -> Promise`
Search Shodan using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search-tokens).
- `query` (string) - Same than for `search` method.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `ports(key, opts)`
This method returns a list of port numbers that the crawlers are looking for.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `protocols(key, opts)`
This method returns an object containing all the protocols that can be used when launching an Internet scan.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `scan(ips, key, opts) -> Promise`
Use this method to request Shodan to crawl a network. This method uses API scan credits, please check the [API documentation](https://developer.shodan.io/api#shodan-scan).
- `ips` (string) - A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `scanInternet(port, protocol, key, opts) -> Promise`
Use this method to request Shodan to crawl the Internet for a specific port. This method is restricted to security researchers and companies with a Shodan Data license, please check the [API documentation for more details.
- `port` (number) - The port that Shodan should crawl the Internet for.
- `protocol` (string) -  The name of the protocol that should be used to interrogate the port. See /shodan/protocols for a list of supported protocols.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `services(key, opts) -> Promise`
This method returns an object containing all the services that the Shodan crawlers look at. It can also be used as a quick and practical way to resolve a port number to the name of a service.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `query(key, opts) -> Promise`
To obtain a list of search queries that users have saved.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)
 - `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)
 - `sort` (string, optional) - Sort the list based on a property. Possible values are: "votes", "timestamp". (default: false)
 - `order` (string, optional) - Whether to sort the list in ascending or descending order. Possible values are: "asc", "desc". (default: "desc")

#### `querySearch(query, key, opts) -> Promise`
To search the directory of search queries that users have saved.
- `query` (string) - What to search for in the directory of saved search queries.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)
 - `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)

#### `queryTags(key, opts) -> Promise`
To obtain a list of popular tags for the saved search queries.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)
 - `size` (number, optional) - The number of tags to return. (default: 10)

#### `accountProfile(key, opts) -> Promise`
Returns information about the account linked to this API key.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `dnsResolve(hostnames, key, opts) -> Promise`
Look up the IP address for the provided list of hostnames.
- `hostnames` (string) - Comma-separated list of hostnames, example "google.com,bing.com".
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `dnsReverse(ips, key, opts) -> Promise`
Look up the hostnames that have been defined for the given list of IP addresses.
- `ips` (string) - Comma-separated list of IP addresses, example "74.125.227.230,204.79.197.200"
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `toolsMyip(key, opts) -> Promise`
Get your external IP address.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `apiInfo(key, opts) -> Promise`
Information of the actual APi version.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)


### streams

From here requests documented here: https://developer.shodan.io/api/stream.

#### `streams.banners(key, opts) -> Promise`
This stream provides ALL collected data. Use this stream if you need access to everything and/ or want to store your own Shodan database locally. If you only care about specific ports, please use the Ports stream.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `streams.asn(asn, key, opts) -> Promise`
This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain ASNs.
- `asn` (string) - Comma-separated list of ASNs; example "3303,32475"
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `streams.countries(countries, key, opts) -> Promise`
This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain countries.
- `countries` (string) - Comma-separated list of countries indicated by their 2 letter code; example "DE,US"
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `streams.ports(ports, key, opts) -> Promise`
Only returns banner data for the list of specified hosts. This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in a specific list of ports.
- `ports` (string) - Comma-separated list of ports; example "1434,27017,6379"
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)


### exploits

From here requests documented here: https://developer.shodan.io/api/exploits/rest.

#### `exploits.search(query, key, opts) -> Promise`
Search across a variety of data sources for exploits and use facets to get summary information.
- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)
 - `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)
 - `page` (number, optional): The page number to page through results 100 at a time (default: 1)


#### `exploits.count(query, key, opts) -> Promise`
This method behaves identical to the "/search" method with the difference that it doesn't return any results.
- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.
- `key` (string) -  SHODAN API key.
- `opts`, an object with:
 - `timeout` (number) - Connection timeout in ms. (default: 5000)
 - `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)


## Developer guide

- Start coding with one of the actual modules similar to the new one as a boilerplate.
- Use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).

### Conventions:
- We use [ESLint](http://eslint.org/) and [Airbnb](https://github.com/airbnb/javascript) style guide.
- Please run to be sure your code fits with it and the tests keep passing:
```sh
npm run-script cont-int
```

### Commit messages rules:
- It should be formed by a one-line subject, followed by one line of white space. Followed by one or more descriptive paragraphs, each separated by one￼￼￼￼ line of white space. All of them finished by a dot.
- If it fixes an issue, it should include a reference to the issue ID in the first line of the commit.
- It should provide enough information for a reviewer to understand the changes and their relation to the rest of the code.


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
