Star
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Star][github-star-repo] a repository.


## Installation

``` bash
$ npm install github-star-repo
```


## Usage

``` javascript
var star = require( 'github-star-repo' );
```

<a name="star-repo"></a>
#### star( slug, options, clbk )

[Stars][github-star-repo] a repository.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

star( 'math-io/erfcinv', opts, clbk );

function clbk( error, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Success!' );
}
```

The `function` accepts the following `options`:
*	__token__: Github [access token][github-token] (*required*).
*	__useragent__: [user agent][github-user-agent] `string`.

To [authenticate][github-oauth2] with Github, set the [`token`][github-token] option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!'
};

star( 'math-io/gammainc', opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'hello-github!'
};

star( 'kgryte/utils-deep-set', opts, clbk );
```


#### star.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var opts = {
	'token': 'tkjorjk34ek3nj4!',
	'useragent': 'hello-github!'
};

var like = star.factory( opts, clbk );

like( 'kgryte/github-star-repo' );
like( 'kgryte/github-create-repo' );
like( 'kgryte/utils-merge' );
// ...
```

The factory method accepts the same `options` as [`star()`](#star-repo).


---
## Examples

``` javascript
var star = require( 'github-star-repo' );

var opts = {
	'token': '<your_token_goes_here>',
	'useragent': 'beep-boop-bop'
};

star( 'math-io/gamma', opts, clbk );

function clbk( error, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( 'Success!' );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

__Note__: in order to run the example, you will need to obtain an access [token][github-token] with appropriate permissions and modify the `token` option accordingly.


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-star-repo
```


### Usage

``` bash
Usage: ghstar [options] slug

Options:

  -h,  --help                Print this message.
  -V,  --version             Print the package version.
       --token token         Github access token.
  -ua, --useragent ua        User agent.
```


### Notes

*	In addition to the [`token`][github-token] option, the [token][github-token] may also be specified by a [`GITHUB_TOKEN`][github-token] environment variable. The command-line option __always__ takes precedence.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting the access [token][github-token] using the command-line option:

``` bash
$ DEBUG=* ghstar --token <token> math-io/gammaln
# => 'Starred math-io/gammaln.'
```

Setting the access [token][github-token] using an environment variable:

``` bash
$ DEBUG=* GITHUB_TOKEN=<token> ghstar kgryte/utils-copy
# => 'Starred kgryte/utils-copy.'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghstar --token <token> math-io/float64-to-words
# => 'Starred math-io/float64-to-words.'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --token <token> kgryte/utils-deep-get
# => 'Starred kgryte/utils-deep-get'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-star-repo.svg
[npm-url]: https://npmjs.org/package/github-star-repo

[build-image]: http://img.shields.io/travis/kgryte/github-star-repo/master.svg
[build-url]: https://travis-ci.org/kgryte/github-star-repo

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-star-repo/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-star-repo?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-star-repo.svg
[dependencies-url]: https://david-dm.org/kgryte/github-star-repo

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-star-repo.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-star-repo

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-star-repo.svg
[github-issues-url]: https://github.com/kgryte/github-star-repo/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/
[github-star-repo]: https://developer.github.com/v3/activity/starring/#star-a-repository
