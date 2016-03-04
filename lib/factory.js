'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var isString = require( 'validate.io-string-primitive' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var query = require( './query.js' );


// VARIABLES //

var DEFAULT_HTTP_PORT = 80;
var DEFAULT_HTTPS_PORT = 443;


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for starring a repository.
*
* @param {Object} options - function options
* @param {String} options.token - Github access token
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for starring a repository
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( opts.port === null ) {
		if ( opts.protocol === 'https' ) {
			opts.port = DEFAULT_HTTPS_PORT;
		} else {
			opts.port = DEFAULT_HTTP_PORT;
		}
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: star( slug )
	*	Stars a repository.
	*
	* @param {String} slug - repository slug
	* @returns {Void}
	*/
	return function star( slug ) {
		if ( !isString( slug ) ) {
			throw new TypeError( 'invalid input argument. Repository slug must be a string primitive. Value: `' + slug + '`.' );
		}
		if ( slug.split( '/' ).length !== 2 ) {
			throw new Error( 'invalid input argument. Repository slug must consist of an `owner` and a `repository`; e.g., `math-io/erf`. Value: `' + slug + '`.' );
		}
		query( slug, opts, done );
		/**
		* FUNCTION: done( error, info )
		*	Callback invoked after receiving an API response.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object} info - response info
		* @returns {Void}
		*/
		function done( error, info ) {
			error = error || null;
			info = info || null;
			clbk( error, info );
		} // end FUNCTION done()
	}; // end FUNCTION star()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;
