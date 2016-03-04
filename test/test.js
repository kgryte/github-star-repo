'use strict';

// MODULES //

var tape = require( 'tape' );
var star = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof star, 'function', 'main export is a function' );
	t.end();
});

tape( 'module exports a factory method', function test( t ) {
	t.equal( typeof star.factory, 'function', 'export includes a factory method' );
	t.end();
});
