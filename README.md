# Shodan client

[![Build Status](https://travis-ci.org/jesusprubio/shodan-client.svg?branch=master)](https://travis-ci.org/jesusprubio/shodan-client)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Downloads](https://img.shields.io/npm/dm/shodan-client.svg)](https://npmjs.com/shodan-client)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/emersion/stability-badges#stable)

:eyes: Library for accessing the [Shodan API](https://developer.shodan.io/api).

<div align="center">
	<p>
    <img src="https://raw.githubusercontent.com/jesusprubio/shodan-client/master/artifacts/demo.gif" alt="demo">
	</p>
	<p>
		<sub>:gift: Ping me on <a href="https://twitter.com/jesusprubio"><code>Twitter</code></a> if you like this project</sub>
	</p>
</div>

## Install

:coffee: Install latest [Node.js](https://nodejs.org/download) stable version (or LTS) and then:

```sh
npm i -g shodan-client
```

## Use

:pencil: All methods of the API need a valid key, you can get one [here](http://www.shodanhq.com/api_doc).

```javascript
const util  = require('util');
const client = require('shodan-client');

const searchOpts = {
  facets: 'port:100,country:100',
  // minify: false,
};
client
  .search('asterisk port:5060', 'YOURKEYHERE', searchOpts)
  .then(res => {
    console.log('Result:');
    console.log(util.inspect(res, { depth: 6 }));
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  });
```

You can find more examples in the [tests](test).

## Contributing

:sunglasses: If you'd like to help please take a look to [this file](.github/CONTRIBUTING.md).

### Test

To run the tests you need set your API key.

```sh
API_KEY=YOUR_KEY_HERE npm test
```

## API

:eyes: The content of the result is the same provided by the HTTP API. You can check them in the [API documentation](https://developer.shodan.io).

### `version`

Library version.

### `async host(ip, key, opts)`

Returns all services that have been found on the given host IP. Supported options:

- `ip` (string) - Host IP address.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `history` (boolean, optional) - True if all historical banners should be returned (default: false)
  - `minify` (boolean, optional) - True to only return the list of ports and the general host information, no banners. (default: false)
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async search(query, key, opts)`

Search using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search).

- `query` (string) - The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the API documentation.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)
  - `page` (number, optional) - The page number to page through results 100 at a time (default: 1)
  - `minify` (boolean, optional) - Whether or not to truncate some of the larger fields (default: true)
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async count(query, key, opts)`

This method behaves identical to "search" with the only difference that this method does not return any host results, it only returns the total number of results that matched the query and any facet information that was requested. As a result this method does not consume query credits.

- `query` (string) - Shodan search query. The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the [API documentation](https://developer.shodan.io/api#shodan-host-count).
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async searchTokens(query, key, opts)`

Search using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search-tokens).

- `query` (string) - Same than for `search` method.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async ports(key, opts)`

List of port numbers that the crawlers are looking for.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async protocols(key, opts)`

All the protocols that can be used when launching an Internet scan.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async scan(ips, key, opts)`

Ask Shodan to crawl a network. This method uses API scan credits, please check the [API documentation](https://developer.shodan.io/api#shodan-scan).

- `ips` (string) - A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async scanInternet(port, protocol, key, opts)`

Ask Shodan to crawl the Internet for a specific port and protocol. This method is restricted to security researchers and companies with a Shodan Data license, please check the [API documentation for more details.

- `port` (number) - The port that Shodan should crawl the Internet for.
- `protocol` (string) - The name of the protocol that should be used to interrogate the port. See /shodan/protocols for a list of supported protocols.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async scanResult(ips, key, opts)`

Get the result of a scan you asked for before.

- `id` (string) - Job identifier returned for the `scan` method.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async services(key, opts)`

All the services that the Shodan crawlers look at. It can also be used as a quick and practical way to resolve a port number to the name of a service.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async query(key, opts)`

To obtain a list of search queries that users have saved.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)
  - `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)
  - `sort` (string, optional) - Sort the list based on a property. Possible values are: "votes", "timestamp". (default: false)
  - `order` (string, optional) - Whether to sort the list in ascending or descending order. Possible values are: "asc", "desc". (default: "desc")

### `async querySearch(query, key, opts)`

To search the directory of search queries that users have saved.

- `query` (string) - What to search for in the directory of saved search queries.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)
  - `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)

### `async queryTags(key, opts)`

To obtain a list of popular tags for the saved search queries.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)
  - `size` (number, optional) - The number of tags to return. (default: 10)

### `async accountProfile(key, opts)`

Returns information about the account linked to this API key.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async dnsResolve(hostnames, key, opts)`

Look up the IP address for the provided list of hostnames.

- `hostnames` (string) - Comma-separated list of hostnames, example "google.com,bing.com".
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async dnsReverse(ips, key, opts)`

Look up the hostnames that have been defined for the given list of IP addresses.

- `ips` (string) - Comma-separated list of IP addresses, example "74.125.227.230,204.79.197.200"
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async toolsMyip(key, opts)`

Get your external IP address.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### `async apiInfo(key, opts)`

Information of the actual APi version.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### Streams

From here the endpoints documented [at this section](https://developer.shodan.io/api/stream).

#### `async streams.banners(key, opts)`

Provides all collected data. Use this stream if you need access to everything and/ or want to store your own Shodan database locally. If you only care about specific ports, please use the Ports stream.

- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `async streams.asn(asn, key, opts)`

Provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain ASNs.

- `asn` (string) - Comma-separated list of ASNs; example "3303,32475"
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `async streams.countries(countries, key, opts)`

Provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in devices located in certain countries.

- `countries` (string) - Comma-separated list of countries indicated by their 2 letter code; example "DE,US"
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

#### `async streams.ports(ports, key, opts)`

Only returns banner data for the list of specified hosts. Provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in a specific list of ports.

- `ports` (string) - Comma-separated list of ports; example "1434,27017,6379"
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)

### Exploits

From here the endpoints documented [at this section](https://developer.shodan.io/api/exploits/rest).

#### `async exploits.search(query, key, opts)`

Search across a variety of data sources for exploits and use facets to get summary information.

- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)
  - `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)
  - `page` (number, optional): The page number to page through results 100 at a time (default: 1)

### `async exploits.count(query, key, opts)`

This is similar to the last one but it doesn't return any exploit data, only the total count.

- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.
- `key` (string) - SHODAN API key.
- `opts`, an object with:
  - `timeout` (number) - Connection timeout in ms. (default: 5000)
  - `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)

## Error handling

The response can include a message containing the reason for the failure. In example:

```json
{
 "error": "Invalid IP"
}
```
