'use strict';

// MODULES //

var tape = require( 'tape' );
var options = require( './../lib/options.js' );


// FUNCTIONS //

function setup() {
	return {
		'method': 'PUT',
		'protocol': 'http',
		'hostname': 'beep.com',
		'pathname': '/api/v3/user/starred/',
		'port': 80,
		'useragent': 'beep-boop',
		'accept': 'application/vnd.github.v3+json',
		'token': 'abcdef123'
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof options, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an object', function test( t ) {
	t.equal( typeof options( setup() ), 'object', 'returns an object' );
	t.end();
});

tape( 'the function sets the HTTP request method to `PUT`', function test( t ) {
	var opts = setup();
	var out = options( opts );
	t.equal( out.method, 'PUT', 'method set to `PUT`' );
	t.end();
});

tape( 'the function sets the HTTP request protocol', function test( t ) {
	var opts = setup();
	var out = options( opts );
	t.equal( out.protocol, opts.protocol+':', 'request protocol set protocol option' );
	t.end();
});

tape( 'the function sets the endpoint hostname', function test( t ) {
	var opts = setup();
	var out = options( opts );
	t.equal( out.hostname, opts.hostname, 'sets the endpoint hostname' );
	t.end();
});

tape( 'the function sets the endpoint port', function test( t ) {
	var opts = setup();
	var out = options( opts );
	t.equal( out.port, opts.port, 'sets the endpoint port' );
	t.end();
});

tape( 'the function sets the request headers', function test( t ) {
	var expected;
	var opts;
	var out;

	opts = setup();
	out = options( opts );

	expected = {
		'User-Agent': opts.useragent,
		'Accept': opts.accept,
		'Authorization': 'token ' + opts.token,
		'Content-Length': 0
	};

	t.deepEqual( out.headers, expected, 'sets the request headers' );

	t.end();
});
