# API

The constructor is returned. It accepts an options object with next properties:
- `key` - Your Shodan API key.
- `timeout` - Connection timeout in ms. (default: 5000)

Both are public, so you can change them when you want. The object includes the next methods and some other classes to group all API supported requests: "Exploits" and "Streams". They're automatically instantiated when the main one is.

NOTE: We follow the [Error-first callback](http://thenodeway.io/posts/understanding-error-first-callbacks/) paradigm, so all methods receive a callback as last parameter. The content of the result is the same provided by the API. You can check them in the [API documentation](https://developer.shodan.io).


### Methods

They support the requests documented here: https://developer.shodan.io/api.


#### `host(options, callback)`

Returns all services that have been found on the given host IP. Supported options:

NOTE: All methods drop silently all not supported ones.

- `ip` (string) -  Host IP address.

- `history` (boolean, optional) - True if all historical banners should be returned (default: false)

- `minify` (boolean, optional) - True to only return the list of ports and the general host information, no banners. (default: false)


#### `search(options, callback)`

Search Shodan using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search).

- `query` (string) - The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the API documentation.

- `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)

- `page` (number, optional) - The page number to page through results 100 at a time (default: 1)

- `minify` (boolean, optional) - Whether or not to truncate some of the larger fields (default: true)


#### `searchTokens(options, callback)`

Search Shodan using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API documentation](https://developer.shodan.io/api#shodan-host-search-tokens).

- `query` (string) - Same than for `search` method.


#### `count(options, callback)`

This method behaves identical to "search" with the only difference that this method does not return any host results, it only returns the total number of results that matched the query and any facet information that was requested. As a result this method does not consume query credits.

- `query` (string) - Shodan search query. The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the [API documentation](https://developer.shodan.io/api#shodan-host-count).

- `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the API documentation. (default: null)


#### `ports(callback)`

This method returns a list of port numbers that the crawlers are looking for.


#### `protocols(callback)`

This method returns an object containing all the protocols that can be used when launching an Internet scan.


#### `scan(options, callback)`

Use this method to request Shodan to crawl a network. This method uses API scan credits, please check the [API documentation](https://developer.shodan.io/api#shodan-scan).

- `ips` (string) - A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.


#### `scanInternet(options, callback)`

Use this method to request Shodan to crawl the Internet for a specific port. This method is restricted to security researchers and companies with a Shodan Data license, please check the [API documentation for more details.

- `port` (number) - The port that Shodan should crawl the Internet for.

- `protocol` (string) -  The name of the protocol that should be used to interrogate the port. See /shodan/protocols for a list of supported protocols.


#### `services(callback)`

This method returns an object containing all the services that the Shodan crawlers look at. It can also be used as a quick and practical way to resolve a port number to the name of a service.


#### `query(options, callback)`

To obtain a list of search queries that users have saved.

- `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)

- `sort` (string, optional) - Sort the list based on a property. Possible values are: "votes", "timestamp". (default: false)

- `order` (string, optional) - Whether to sort the list in ascending or descending order. Possible values are: "asc", "desc". (default: "desc")


#### `querySearch(options, callback)`

To search the directory of search queries that users have saved.

- `query` (string) - What to search for in the directory of saved search queries.

- `page` (number, optional) - Page number to iterate over results; each page contains 10 items. (default: 1)


#### `queryTags(options, callback)`

To obtain a list of popular tags for the saved search queries.

- `size` (number, optional) - The number of tags to return. (default: 10)


#### `accountProfile(callback)`

Returns information about the account linked to this API key.


#### `dnsResolve(options, callback)`

Look up the IP address for the provided list of hostnames.

- `hostnames` (string) - Comma-separated list of hostnames, example "google.com,bing.com".


#### `dnsReverse(options, callback)`

Look up the hostnames that have been defined for the given list of IP addresses.

- `ips` (string) - Comma-separated list of IP addresses, example "74.125.227.230,204.79.197.200"



It includes the features supported here: https://developer.shodan.io/api.


### Streams

This object supports the requests documented here: https://developer.shodan.io/stream.


#### `banners(callback)`

This stream provides ALL collected data. Use this stream if you need access to everything and/ or want to store your own Shodan database locally. If you only care about specific ports, please use the Ports stream.


#### `ports(options, callback)`

Only returns banner data for the list of specified hosts. This stream provides a filtered, bandwidth-saving view of the Banners stream in case you are only interested in a specific list of ports.

- `ports` (string) - Comma-separated list of ports; example "1434,27017,6379"


### Exploits

They support the requests documented here: https://developer.shodan.io/exploits/rest.


#### `search(options, callback)`

Search across a variety of data sources for exploits and use facets to get summary information.

- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.

- `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)

- `page` (number, optional): The page number to page through results 100 at a time (default: 1)


#### `count(options, callback)`

This method behaves identical to the "/search" method with the difference that it doesn't return any results.

- `query` (string) - Search query used to search the database of known exploits. To see which filters are supported please check the API documentation.

- `facets` (string, optional) - A comma-separated list of properties to get summary information on. To see which filters are supported please check the API documentation. (default: null)


### Errors

All returned errors are objects which include a message ("message" key) and, optionally, an error object ("error").
