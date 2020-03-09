# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

> **Types of changes**:
>
> - 🎉 **Added**: for new features.
> - ✏️ **Changed**: for changes in existing functionality.
> - ⚠️ **Deprecated**: for soon-to-be removed features.
> - ❌ **Removed**: for now removed features.
> - 🐛 **Fixed**: for any bug fixes.
> - 👾 **Security**: in case of vulnerabilities.

## [Unreleased]

## [3.2.0] - 2020-03-09

### ✏️ Changed

- Dependency package `request` to `got`.
- Major refactor to keep things simpler.
- Tests changed from `mocha` to `ava`.
- Dependencies update.

### 🐛 Fixed

- Methods `scan` and `scanInternet`.

### 🎉 Added

- Method `scanResult`.

## [3.1.5] - 2019-10-25

### ✏️ Changed

- Dependencies update.

## [3.1.4] - 2019-03-29

### ❌ Removed

- Debugging stuff.

### 👾 Security

- Vulnerable dev dependencies updated.

## [3.1.3] - 2019-03-12

### 🐛 Fixed

- Problem with `minify` option.

## [3.1.2] - 2019-03-12

### ✏️ Changed

- Improving tooling.
- Node.js and dependencies update.

## [3.1.1] - 2018-10-16

### 🐛 Fixed

- Trick in tests to avoid a block and API random errors.
- Method 'scan' and other minor improvements.

## [3.1.0] - 2018-06-14

### 🎉 Added

- Prettier support.
- Async/await support.
- Initial test suite.

### ✏️ Changed

- Travis setup updated to use the last node.js stable version.
- More love to the README.
- Good practices in the codebase.

### 👾 Security

- Dependencies updated.

### 🐛 Fixed

- Minor problems found after implement the tests.

## [3.0.2] - 2017-01-04

### 🐛 Fixed

- Travis badge link in the README.
- Format for the Node/npm expected version.

### ❌ Removed

- Yarn support, we'll stick to npm from now.

## [3.0.1] - 2016-09-14

### 🐛 Fixed

- Important typo, in an public method name!

## [3.0.0] - 2016-09-05

### 🎉 Added

- CI: Travis support.

### ✏️ Changed

- Major refactor to use (and expose) promises.

### 🐛 Fixed

- Minor typos.
- Minor URL updates in the package.json.

## [2.0.0] - 2015-12-22

### ✏️ Changed

- New v2, breaking changes to support all new methods consistenly.

### 🐛 Fixed

- Minor typos.

## [1.1.0] - 2015-12-13

### 🎉 Added

- First stable version.
- Node v12 support.
- New methods:
  - query
  - apiInfo
- Allow testing without network connection.

### ✏️ Changed

- Refactor to respect the new API.
- Some love to the README.
- Increased timeout past 10s because shodan often responds after 10s.
- Folder structure improved.

### 🐛 Fixed

- Some problems with error handling.

### 👾 Security

- Avoiding to print the key.

[unreleased]: https://github.com/jesusprubio/shodan-client/compare/3.2.0...HEAD
[3.2.0]: https://github.com/jesusprubio/shodan-client/compare/3.1.5...3.2.0
[3.1.5]: https://github.com/jesusprubio/shodan-client/compare/3.1.4...3.1.5
[3.1.4]: https://github.com/jesusprubio/shodan-client/compare/3.1.3...3.1.4
[3.1.3]: https://github.com/jesusprubio/shodan-client/compare/3.1.2...3.1.3
[3.1.2]: https://github.com/jesusprubio/shodan-client/compare/3.1.1...3.1.2
[3.1.1]: https://github.com/jesusprubio/shodan-client/compare/3.1.0...3.1.1
[3.1.0]: https://github.com/jesusprubio/shodan-client/compare/3.0.3...3.1.0
[3.0.3]: https://github.com/jesusprubio/shodan-client/compare/3.0.2...3.0.3
[3.0.2]: https://github.com/jesusprubio/shodan-client/compare/3.0.1...3.0.2
[3.0.1]: https://github.com/jesusprubio/shodan-client/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/jesusprubio/shodan-client/compare/2.0.0...3.0.0
[2.0.0]: https://github.com/jesusprubio/shodan-client/compare/1.1.0...2.0.0
[1.1.0]: https://github.com/jesusprubio/shodan-client/compare/0c75dafa5646bd47346981ae307686784adfa002...1.1.0
