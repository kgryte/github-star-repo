'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-star-repo:query' );
var getOpts = require( './options.js' );
var request = require( './request.js' );
var ratelimit = require( './ratelimit.js' );


// QUERY //

/**
* FUNCTION: query( slug, options, clbk )
*	Queries a remote endpoint in order to star a repository.
*
* @param {String} slug - repository slug
* @param {Object} options - query options
* @param {Function} clbk - callback to invoke after completing a query
* @returns {Void}
*/
function query( slug, options, clbk ) {
	var opts;

	// Extract request options:
	opts = getOpts( options );

	// Set the query endpoint:
	opts.path = options.pathname + slug;

	// Make the request:
	request( opts, done );

	/**
	* FUNCTION: done( error, response )
	*	Callback invoked after completing request.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} response - HTTP response object
	* @returns {Void}
	*/
	function done( error, response ) {
		var info;
		if ( arguments.length === 1 ) {
			debug( 'No available rate limit information.' );
			return clbk( error );
		}
		debug( 'Request completed.' );

		// Get rate limit information:
		info = ratelimit( response.headers );
		debug( 'Rate limit: %d', info.limit );
		debug( 'Rate limit remaining: %d', info.remaining );
		debug( 'Rate limit reset: %s', (new Date( info.reset*1000 )).toISOString() );

		if ( error ) {
			return clbk( error, info );
		}
		clbk( null, info );
	} // end FUNCTION done()
} // end FUNCTION query()


// EXPORTS //

module.exports = query;
