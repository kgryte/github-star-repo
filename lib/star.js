'use strict';

// MODULES //

var factory = require( './factory.js' );


// STAR REPO //

/**
* FUNCTION: star( slug, opts, clbk )
*	Stars a repository.
*
* @param {String} slug - repository slug
* @param {Object} opts - function options
* @param {String} opts.token - Github access token
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function star( slug, opts, clbk ) {
	factory( opts, clbk )( slug );
} // end FUNCTION star()


// EXPORTS //

module.exports = star;
