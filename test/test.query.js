'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var query = require( './../lib/query.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var info = require( './fixtures/info.json' );
var response = {
	'headers': {
		'x-ratelimit-limit': info.limit.toString(),
		'x-ratelimit-remaining': info.remaining.toString(),
		'x-ratelimit-reset': info.reset.toString()
	}
};


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof query, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when creating a repository (no rate limit info)', function test( t ) {
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	opts = getOpts();
	query( 'math-io/powm1', opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when creating a repository (rate limit info)', function test( t ) {
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	opts = getOpts();
	query( 'math-io/powm1', opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), response );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = info;

	opts = getOpts();
	query( 'math-io/log1p', opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, response );
		}
	}

	function done( error, info ) {
		t.deepEqual( info, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback (error)', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = info;

	opts = getOpts();
	query( 'math-io/powm1', opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), response );
		}
	}

	function done( error, info ) {
		t.ok( error, 'returns an error' );

		t.deepEqual( info, expected );
		t.ok( true, 'deep equal' );

		t.end();
	}
});
