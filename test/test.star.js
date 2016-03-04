'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var star = require( './../lib/star.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof star, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws if provided a slug argument which is not a string', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			star( value, opts, noop );
		};
	}
});

tape( 'function throws if not provided a valid repository slug (:owner/:repo)', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'beep',
		'beep//boop',
		'beep/boop/bop',
		'/beep/boop',
		'b/e/e/p/',
		'beep/boop/'
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			star( value, opts, noop );
		};
	}
});

tape( 'function throws if provided an invalid options argument', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			star( 'math-io/erf', {
				'token': value
			}, noop );
		};
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			star( 'math-io/float64-to-words', opts, value );
		};
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when starring a repository', function test( t ) {
	var star;
	var opts;

	star = proxyquire( './../lib/star.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	star( 'math-io/powm1', opts, done );

	function factory( opts, clbk ) {
		return function star() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ), info );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var star;
	var opts;

	star = proxyquire( './../lib/star.js', {
		'./factory.js': factory
	});

	expected = info;

	opts = getOpts();
	star( 'math-io/log1p', opts, done );

	function factory( opts, clbk ) {
		return function star() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, info );
			}
		};
	}

	function done( error, info ) {
		t.deepEqual( info, expected, 'deep equal' );
		t.end();
	}
});
