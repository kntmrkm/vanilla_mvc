/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

// Core variables and mixins
@import "variables.less";
@import "mixins.less";

// Reset and dependencies
@import "normalize.less";
@import "print.less";
@import "glyphicons.less";

// Core CSS
@import "scaffolding.less";
@import "type.less";
@import "code.less";
@import "grid.less";
@import "tables.less";
@import "forms.less";
@import "buttons.less";

// Components
@import "component-animations.less";
@import "dropdowns.less";
@import "button-groups.less";
@import "input-groups.less";
@import "navs.less";
@import "navbar.less";
@import "breadcrumbs.less";
@import "pagination.less";
@import "pager.less";
@import "labels.less";
@import "badges.less";
@import "jumbotron.less";
@import "thumbnails.less";
@import "alerts.less";
@import "progress-bars.less";
@import "media.less";
@import "list-group.less";
@import "panels.less";
@import "responsive-embed.less";
@import "wells.less";
@import "close.less";

// Components w/ JavaScript
@import "modals.less";
@import "tooltip.less";
@import "popovers.less";
@import "carousel.less";

// Utility classes
@import "utilities.less";
@import "responsive-utilities.less";

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*! normalize.css v3.0.2 | MIT License | git.io/normalize */
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  margin: .67em 0;
  font-size: 2em;
}
mark {
  color: #000;
  background: #ff0;
}
small {
  font-size: 80%;
}
sub,
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
sup {
  top: -.5em;
}
sub {
  bottom: -.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  height: 0;
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  margin: 0;
  font: inherit;
  color: inherit;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-box-sizing: content-box;
     -moz-box-sizing: content-box;
          box-sizing: content-box;
  -webkit-appearance: textfield;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  padding: .35em .625em .75em;
  margin: 0 2px;
  border: 1px solid #c0c0c0;
}
legend {
  padding: 0;
  border: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
td,
th {
  padding: 0;
}
/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
@media print {
  *,
  *:before,
  *:after {
    color: #000 !important;
    text-shadow: none !important;
    background: transparent !important;
    -webkit-box-shadow: none !important;
            box-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre,
  blockquote {
    border: 1px solid #999;

    page-break-inside: avoid;
  }
  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  img {
    max-width: 100% !important;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
  select {
    background: #fff !important;
  }
  .navbar {
    display: none;
  }
  .btn > .caret,
  .dropup > .btn > .caret {
    border-top-color: #000 !important;
  }
  .label {
    border: 1px solid #000;
  }
  .table {
    border-collapse: collapse !important;
  }
  .table td,
  .table th {
    background-color: #fff !important;
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd !important;
  }
}
@font-face {
  font-family: 'Glyphicons Halflings';

  src: url('../fonts/glyphicons-halflings-regular.eot');
  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}
.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: normal;
  line-height: 1;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.glyphicon-asterisk:before {
  content: "\2a";
}
.glyphicon-plus:before {
  content: "\2b";
}
.glyphicon-euro:before,
.glyphicon-eur:before {
  content: "\20ac";
}
.glyphicon-minus:before {
  content: "\2212";
}
.glyphicon-cloud:before {
  content: "\2601";
}
.glyphicon-envelope:before {
  content: "\2709";
}
.glyphicon-pencil:before {
  content: "\270f";
}
.glyphicon-glass:before {
  content: "\e001";
}
.glyphicon-music:before {
  content: "\e002";
}
.glyphicon-search:before {
  content: "\e003";
}
.glyphicon-heart:before {
  content: "\e005";
}
.glyphicon-star:before {
  content: "\e006";
}
.glyphicon-star-empty:before {
  content: "\e007";
}
.glyphicon-user:before {
  content: "\e008";
}
.glyphicon-film:before {
  content: "\e009";
}
.glyphicon-th-large:before {
  content: "\e010";
}
.glyphicon-th:before {
  content: "\e011";
}
.glyphicon-th-list:before {
  content: "\e012";
}
.glyphicon-ok:before {
  content: "\e013";
}
.glyphicon-remove:before {
  content: "\e014";
}
.glyphicon-zoom-in:before {
  content: "\e015";
}
.glyphicon-zoom-out:before {
  content: "\e016";
}
.glyphicon-off:before {
  content: "\e017";
}
.glyphicon-signal:before {
  content: "\e018";
}
.glyphicon-cog:before {
  content: "\e019";
}
.glyphicon-trash:before {
  content: "\e020";
}
.glyphicon-home:before {
  content: "\e021";
}
.glyphicon-file:before {
  content: "\e022";
}
.glyphicon-time:before {
  content: "\e023";
}
.glyphicon-road:before {
  content: "\e024";
}
.glyphicon-download-alt:before {
  content: "\e025";
}
.glyphicon-download:before {
  content: "\e026";
}
.glyphicon-upload:before {
  content: "\e027";
}
.glyphicon-inbox:before {
  content: "\e028";
}
.glyphicon-play-circle:before {
  content: "\e029";
}
.glyphicon-repeat:before {
  content: "\e030";
}
.glyphicon-refresh:before {
  content: "\e031";
}
.glyphicon-list-alt:before {
  content: "\e032";
}
.glyphicon-lock:before {
  content: "\e033";
}
.glyphicon-flag:before {
  content: "\e034";
}
.glyphicon-headphones:before {
  content: "\e035";
}
.glyphicon-volume-off:before {
  content: "\e036";
}
.glyphicon-volume-down:before {
  content: "\e037";
}
.glyphicon-volume-up:before {
  content: "\e038";
}
.glyphicon-qrcode:before {
  content: "\e039";
}
.glyphicon-barcode:before {
  content: "\e040";
}
.glyphicon-tag:before {
  content: "\e041";
}
.glyphicon-tags:before {
  content: "\e042";
}
.glyphicon-book:before {
  content: "\e043";
}
.glyphicon-bookmark:before {
  content: "\e044";
}
.glyphicon-print:before {
  content: "\e045";
}
.glyphicon-camera:before {
  content: "\e046";
}
.glyphicon-font:before {
  content: "\e047";
}
.glyphicon-bold:before {
  content: "\e048";
}
.glyphicon-italic:before {
  content: "\e049";
}
.glyphicon-text-height:before {
  content: "\e050";
}
.glyphicon-text-width:before {
  content: "\e051";
}
.glyphicon-align-left:before {
  content: "\e052";
}
.glyphicon-align-center:before {
  content: "\e053";
}
.glyphicon-align-right:before {
  content: "\e054";
}
.glyphicon-align-justify:before {
  content: "\e055";
}
.glyphicon-list:before {
  content: "\e056";
}
.glyphicon-indent-left:before {
  content: "\e057";
}
.glyphicon-indent-right:before {
  content: "\e058";
}
.glyphicon-facetime-video:before {
  content: "\e059";
}
.glyphicon-picture:before {
  content: "\e060";
}
.glyphicon-map-marker:before {
  content: "\e062";
}
.glyphicon-adjust:before {
  content: "\e063";
}
.glyphicon-tint:before {
  content: "\e064";
}
.glyphicon-edit:before {
  content: "\e065";
}
.glyphicon-share:before {
  content: "\e066";
}
.glyphicon-check:before {
  content: "\e067";
}
.glyphicon-move:before {
  content: "\e068";
}
.glyphicon-step-backward:before {
  content: "\e069";
}
.glyphicon-fast-backward:before {
  content: "\e070";
}
.glyphicon-backward:before {
  content: "\e071";
}
.glyphicon-play:before {
  content: "\e072";
}
.glyphicon-pause:before {
  content: "\e073";
}
.glyphicon-stop:before {
  content: "\e074";
}
.glyphicon-forward:before {
  content: "\e075";
}
.glyphicon-fast-forward:before {
  content: "\e076";
}
.glyphicon-step-forward:before {
  content: "\e077";
}
.glyphicon-eject:before {
  content: "\e078";
}
.glyphicon-chevron-left:before {
  content: "\e079";
}
.glyphicon-chevron-right:before {
  content: "\e080";
}
.glyphicon-plus-sign:before {
  content: "\e081";
}
.glyphicon-minus-sign:before {
  content: "\e082";
}
.glyphicon-remove-sign:before {
  content: "\e083";
}
.glyphicon-ok-sign:before {
  content: "\e084";
}
.glyphicon-question-sign:before {
  content: "\e085";
}
.glyphicon-info-sign:before {
  content: "\e086";
}
.glyphicon-screenshot:before {
  content: "\e087";
}
.glyphicon-remove-circle:before {
  content: "\e088";
}
.glyphicon-ok-circle:before {
  content: "\e089";
}
.glyphicon-ban-circle:before {
  content: "\e090";
}
.glyphicon-arrow-left:before {
  content: "\e091";
}
.glyphicon-arrow-right:before {
  content: "\e092";
}
.glyphicon-arrow-up:before {
  content: "\e093";
}
.glyphicon-arrow-down:before {
  content: "\e094";
}
.glyphicon-share-alt:before {
  content: "\e095";
}
.glyphicon-resize-full:before {
  content: "\e096";
}
.glyphicon-resize-small:before {
  content: "\e097";
}
.glyphicon-exclamation-sign:before {
  content: "\e101";
}
.glyphicon-gift:before {
  content: "\e102";
}
.glyphicon-leaf:before {
  content: "\e103";
}
.glyphicon-fire:before {
  content: "\e104";
}
.glyphicon-eye-open:before {
  content: "\e105";
}
.glyphicon-eye-close:before {
  content: "\e106";
}
.glyphicon-warning-sign:before {
  content: "\e107";
}
.glyphicon-plane:before {
  content: "\e108";
}
.glyphicon-calendar:before {
  content: "\e109";
}
.glyphicon-random:before {
  content: "\e110";
}
.glyphicon-comment:before {
  content: "\e111";
}
.glyphicon-magnet:before {
  content: "\e112";
}
.glyphicon-chevron-up:before {
  content: "\e113";
}
.glyphicon-chevron-down:before {
  content: "\e114";
}
.glyphicon-retweet:before {
  content: "\e115";
}
.glyphicon-shopping-cart:before {
  content: "\e116";
}
.glyphicon-folder-close:before {
  content: "\e117";
}
.glyphicon-folder-open:before {
  content: "\e118";
}
.glyphicon-resize-vertical:before {
  content: "\e119";
}
.glyphicon-resize-horizontal:before {
  content: "\e120";
}
.glyphicon-hdd:before {
  content: "\e121";
}
.glyphicon-bullhorn:before {
  content: "\e122";
}
.glyphicon-bell:before {
  content: "\e123";
}
.glyphicon-certificate:before {
  content: "\e124";
}
.glyphicon-thumbs-up:before {
  content: "\e125";
}
.glyphicon-thumbs-down:before {
  content: "\e126";
}
.glyphicon-hand-right:before {
  content: "\e127";
}
.glyphicon-hand-left:before {
  content: "\e128";
}
.glyphicon-hand-up:before {
  content: "\e129";
}
.glyphicon-hand-down:before {
  content: "\e130";
}
.glyphicon-circle-arrow-right:before {
  content: "\e131";
}
.glyphicon-circle-arrow-left:before {
  content: "\e132";
}
.glyphicon-circle-arrow-up:before {
  content: "\e133";
}
.glyphicon-circle-arrow-down:before {
  content: "\e134";
}
.glyphicon-globe:before {
  content: "\e135";
}
.glyphicon-wrench:before {
  content: "\e136";
}
.glyphicon-tasks:before {
  content: "\e137";
}
.glyphicon-filter:before {
  content: "\e138";
}
.glyphicon-briefcase:before {
  content: "\e139";
}
.glyphicon-fullscreen:before {
  content: "\e140";
}
.glyphicon-dashboard:before {
  content: "\e141";
}
.glyphicon-paperclip:before {
  content: "\e142";
}
.glyphicon-heart-empty:before {
  content: "\e143";
}
.glyphicon-link:before {
  content: "\e144";
}
.glyphicon-phone:before {
  content: "\e145";
}
.glyphicon-pushpin:before {
  content: "\e146";
}
.glyphicon-usd:before {
  content: "\e148";
}
.glyphicon-gbp:before {
  content: "\e149";
}
.glyphicon-sort:before {
  content: "\e150";
}
.glyphicon-sort-by-alphabet:before {
  content: "\e151";
}
.glyphicon-sort-by-alphabet-alt:before {
  content: "\e152";
}
.glyphicon-sort-by-order:before {
  content: "\e153";
}
.glyphicon-sort-by-order-alt:before {
  content: "\e154";
}
.glyphicon-sort-by-attributes:before {
  content: "\e155";
}
.glyphicon-sort-by-attributes-alt:before {
  content: "\e156";
}
.glyphicon-unchecked:before {
  content: "\e157";
}
.glyphicon-expand:before {
  content: "\e158";
}
.glyphicon-collapse-down:before {
  content: "\e159";
}
.glyphicon-collapse-up:before {
  content: "\e160";
}
.glyphicon-log-in:before {
  content: "\e161";
}
.glyphicon-flash:before {
  content: "\e162";
}
.glyphicon-log-out:before {
  content: "\e163";
}
.glyphicon-new-window:before {
  content: "\e164";
}
.glyphicon-record:before {
  content: "\e165";
}
.glyphicon-save:before {
  content: "\e166";
}
.glyphicon-open:before {
  content: "\e167";
}
.glyphicon-saved:before {
  content: "\e168";
}
.glyphicon-import:before {
  content: "\e169";
}
.glyphicon-export:before {
  content: "\e170";
}
.glyphicon-send:before {
  content: "\e171";
}
.glyphicon-floppy-disk:before {
  content: "\e172";
}
.glyphicon-floppy-saved:before {
  content: "\e173";
}
.glyphicon-floppy-remove:before {
  content: "\e174";
}
.glyphicon-floppy-save:before {
  content: "\e175";
}
.glyphicon-floppy-open:before {
  content: "\e176";
}
.glyphicon-credit-card:before {
  content: "\e177";
}
.glyphicon-transfer:before {
  content: "\e178";
}
.glyphicon-cutlery:before {
  content: "\e179";
}
.glyphicon-header:before {
  content: "\e180";
}
.glyphicon-compressed:before {
  content: "\e181";
}
.glyphicon-earphone:before {
  content: "\e182";
}
.glyphicon-phone-alt:before {
  content: "\e183";
}
.glyphicon-tower:before {
  content: "\e184";
}
.glyphicon-stats:before {
  content: "\e185";
}
.glyphicon-sd-video:before {
  content: "\e186";
}
.glyphicon-hd-video:before {
  content: "\e187";
}
.glyphicon-subtitles:before {
  content: "\e188";
}
.glyphicon-sound-stereo:before {
  content: "\e189";
}
.glyphicon-sound-dolby:before {
  content: "\e190";
}
.glyphicon-sound-5-1:before {
  content: "\e191";
}
.glyphicon-sound-6-1:before {
  content: "\e192";
}
.glyphicon-sound-7-1:before {
  content: "\e193";
}
.glyphicon-copyright-mark:before {
  content: "\e194";
}
.glyphicon-registration-mark:before {
  content: "\e195";
}
.glyphicon-cloud-download:before {
  content: "\e197";
}
.glyphicon-cloud-upload:before {
  content: "\e198";
}
.glyphicon-tree-conifer:before {
  content: "\e199";
}
.glyphicon-tree-deciduous:before {
  content: "\e200";
}
.glyphicon-cd:before {
  content: "\e201";
}
.glyphicon-save-file:before {
  content: "\e202";
}
.glyphicon-open-file:before {
  content: "\e203";
}
.glyphicon-level-up:before {
  content: "\e204";
}
.glyphicon-copy:before {
  content: "\e205";
}
.glyphicon-paste:before {
  content: "\e206";
}
.glyphicon-alert:before {
  content: "\e209";
}
.glyphicon-equalizer:before {
  content: "\e210";
}
.glyphicon-king:before {
  content: "\e211";
}
.glyphicon-queen:before {
  content: "\e212";
}
.glyphicon-pawn:before {
  content: "\e213";
}
.glyphicon-bishop:before {
  content: "\e214";
}
.glyphicon-knight:before {
  content: "\e215";
}
.glyphicon-baby-formula:before {
  content: "\e216";
}
.glyphicon-tent:before {
  content: "\26fa";
}
.glyphicon-blackboard:before {
  content: "\e218";
}
.glyphicon-bed:before {
  content: "\e219";
}
.glyphicon-apple:before {
  content: "\f8ff";
}
.glyphicon-erase:before {
  content: "\e221";
}
.glyphicon-hourglass:before {
  content: "\231b";
}
.glyphicon-lamp:before {
  content: "\e223";
}
.glyphicon-duplicate:before {
  content: "\e224";
}
.glyphicon-piggy-bank:before {
  content: "\e225";
}
.glyphicon-scissors:before {
  content: "\e226";
}
.glyphicon-bitcoin:before {
  content: "\e227";
}
.glyphicon-btc:before {
  content: "\e227";
}
.glyphicon-xbt:before {
  content: "\e227";
}
.glyphicon-yen:before {
  content: "\00a5";
}
.glyphicon-jpy:before {
  content: "\00a5";
}
.glyphicon-ruble:before {
  content: "\20bd";
}
.glyphicon-rub:before {
  content: "\20bd";
}
.glyphicon-scale:before {
  content: "\e230";
}
.glyphicon-ice-lolly:before {
  content: "\e231";
}
.glyphicon-ice-lolly-tasted:before {
  content: "\e232";
}
.glyphicon-education:before {
  content: "\e233";
}
.glyphicon-option-horizontal:before {
  content: "\e234";
}
.glyphicon-option-vertical:before {
  content: "\e235";
}
.glyphicon-menu-hamburger:before {
  content: "\e236";
}
.glyphicon-modal-window:before {
  content: "\e237";
}
.glyphicon-oil:before {
  content: "\e238";
}
.glyphicon-grain:before {
  content: "\e239";
}
.glyphicon-sunglasses:before {
  content: "\e240";
}
.glyphicon-text-size:before {
  content: "\e241";
}
.glyphicon-text-color:before {
  content: "\e242";
}
.glyphicon-text-background:before {
  content: "\e243";
}
.glyphicon-object-align-top:before {
  content: "\e244";
}
.glyphicon-object-align-bottom:before {
  content: "\e245";
}
.glyphicon-object-align-horizontal:before {
  content: "\e246";
}
.glyphicon-object-align-left:before {
  content: "\e247";
}
.glyphicon-object-align-vertical:before {
  content: "\e248";
}
.glyphicon-object-align-right:before {
  content: "\e249";
}
.glyphicon-triangle-right:before {
  content: "\e250";
}
.glyphicon-triangle-left:before {
  content: "\e251";
}
.glyphicon-triangle-bottom:before {
  content: "\e252";
}
.glyphicon-triangle-top:before {
  content: "\e253";
}
.glyphicon-console:before {
  content: "\e254";
}
.glyphicon-superscript:before {
  content: "\e255";
}
.glyphicon-subscript:before {
  content: "\e256";
}
.glyphicon-menu-left:before {
  content: "\e257";
}
.glyphicon-menu-right:before {
  content: "\e258";
}
.glyphicon-menu-down:before {
  content: "\e259";
}
.glyphicon-menu-up:before {
  content: "\e260";
}
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
html {
  font-size: 10px;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff;
}
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
a {
  color: #337ab7;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #23527c;
  text-decoration: underline;
}
a:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
figure {
  margin: 0;
}
img {
  vertical-align: middle;
}
.img-responsive,
.thumbnail > img,
.thumbnail a > img,
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
}
.img-rounded {
  border-radius: 6px;
}
.img-thumbnail {
  display: inline-block;
  max-width: 100%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: all .2s ease-in-out;
       -o-transition: all .2s ease-in-out;
          transition: all .2s ease-in-out;
}
.img-circle {
  border-radius: 50%;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
[role="button"] {
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
  font-weight: normal;
  line-height: 1;
  color: #777;
}
h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
h1 small,
.h1 small,
h2 small,
.h2 small,
h3 small,
.h3 small,
h1 .small,
.h1 .small,
h2 .small,
.h2 .small,
h3 .small,
.h3 .small {
  font-size: 65%;
}
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: 10px;
  margin-bottom: 10px;
}
h4 small,
.h4 small,
h5 small,
.h5 small,
h6 small,
.h6 small,
h4 .small,
.h4 .small,
h5 .small,
.h5 .small,
h6 .small,
.h6 .small {
  font-size: 75%;
}
h1,
.h1 {
  font-size: 36px;
}
h2,
.h2 {
  font-size: 30px;
}
h3,
.h3 {
  font-size: 24px;
}
h4,
.h4 {
  font-size: 18px;
}
h5,
.h5 {
  font-size: 14px;
}
h6,
.h6 {
  font-size: 12px;
}
p {
  margin: 0 0 10px;
}
.lead {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .lead {
    font-size: 21px;
  }
}
small,
.small {
  font-size: 85%;
}
mark,
.mark {
  padding: .2em;
  background-color: #fcf8e3;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-justify {
  text-align: justify;
}
.text-nowrap {
  white-space: nowrap;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-muted {
  color: #777;
}
.text-primary {
  color: #337ab7;
}
a.text-primary:hover {
  color: #286090;
}
.text-success {
  color: #3c763d;
}
a.text-success:hover {
  color: #2b542c;
}
.text-info {
  color: #31708f;
}
a.text-info:hover {
  color: #245269;
}
.text-warning {
  color: #8a6d3b;
}
a.text-warning:hover {
  color: #66512c;
}
.text-danger {
  color: #a94442;
}
a.text-danger:hover {
  color: #843534;
}
.bg-primary {
  color: #fff;
  background-color: #337ab7;
}
a.bg-primary:hover {
  background-color: #286090;
}
.bg-success {
  background-color: #dff0d8;
}
a.bg-success:hover {
  background-color: #c1e2b3;
}
.bg-info {
  background-color: #d9edf7;
}
a.bg-info:hover {
  background-color: #afd9ee;
}
.bg-warning {
  background-color: #fcf8e3;
}
a.bg-warning:hover {
  background-color: #f7ecb5;
}
.bg-danger {
  background-color: #f2dede;
}
a.bg-danger:hover {
  background-color: #e4b9b9;
}
.page-header {
  padding-bottom: 9px;
  margin: 40px 0 20px;
  border-bottom: 1px solid #eee;
}
ul,
ol {
  margin-top: 0;
  margin-bottom: 10px;
}
ul ul,
ol ul,
ul ol,
ol ol {
  margin-bottom: 0;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.list-inline {
  padding-left: 0;
  margin-left: -5px;
  list-style: none;
}
.list-inline > li {
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
}
dl {
  margin-top: 0;
  margin-bottom: 20px;
}
dt,
dd {
  line-height: 1.42857143;
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 0;
}
@media (min-width: 768px) {
  .dl-horizontal dt {
    float: left;
    width: 160px;
    overflow: hidden;
    clear: left;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dl-horizontal dd {
    margin-left: 180px;
  }
}
abbr[title],
abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted #777;
}
.initialism {
  font-size: 90%;
  text-transform: uppercase;
}
blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 17.5px;
  border-left: 5px solid #eee;
}
blockquote p:last-child,
blockquote ul:last-child,
blockquote ol:last-child {
  margin-bottom: 0;
}
blockquote footer,
blockquote small,
blockquote .small {
  display: block;
  font-size: 80%;
  line-height: 1.42857143;
  color: #777;
}
blockquote footer:before,
blockquote small:before,
blockquote .small:before {
  content: '\2014 \00A0';
}
.blockquote-reverse,
blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  text-align: right;
  border-right: 5px solid #eee;
  border-left: 0;
}
.blockquote-reverse footer:before,
blockquote.pull-right footer:before,
.blockquote-reverse small:before,
blockquote.pull-right small:before,
.blockquote-reverse .small:before,
blockquote.pull-right .small:before {
  content: '';
}
.blockquote-reverse footer:after,
blockquote.pull-right footer:after,
.blockquote-reverse small:after,
blockquote.pull-right small:after,
.blockquote-reverse .small:after,
blockquote.pull-right .small:after {
  content: '\00A0 \2014';
}
address {
  margin-bottom: 20px;
  font-style: normal;
  line-height: 1.42857143;
}
code,
kbd,
pre,
samp {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
}
kbd {
  padding: 2px 4px;
  font-size: 90%;
  color: #fff;
  background-color: #333;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);
}
kbd kbd {
  padding: 0;
  font-size: 100%;
  font-weight: bold;
  -webkit-box-shadow: none;
          box-shadow: none;
}
pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
pre code {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}
.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}
.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  float: left;
}
.col-xs-12 {
  width: 100%;
}
.col-xs-11 {
  width: 91.66666667%;
}
.col-xs-10 {
  width: 83.33333333%;
}
.col-xs-9 {
  width: 75%;
}
.col-xs-8 {
  width: 66.66666667%;
}
.col-xs-7 {
  width: 58.33333333%;
}
.col-xs-6 {
  width: 50%;
}
.col-xs-5 {
  width: 41.66666667%;
}
.col-xs-4 {
  width: 33.33333333%;
}
.col-xs-3 {
  width: 25%;
}
.col-xs-2 {
  width: 16.66666667%;
}
.col-xs-1 {
  width: 8.33333333%;
}
.col-xs-pull-12 {
  right: 100%;
}
.col-xs-pull-11 {
  right: 91.66666667%;
}
.col-xs-pull-10 {
  right: 83.33333333%;
}
.col-xs-pull-9 {
  right: 75%;
}
.col-xs-pull-8 {
  right: 66.66666667%;
}
.col-xs-pull-7 {
  right: 58.33333333%;
}
.col-xs-pull-6 {
  right: 50%;
}
.col-xs-pull-5 {
  right: 41.66666667%;
}
.col-xs-pull-4 {
  right: 33.33333333%;
}
.col-xs-pull-3 {
  right: 25%;
}
.col-xs-pull-2 {
  right: 16.66666667%;
}
.col-xs-pull-1 {
  right: 8.33333333%;
}
.col-xs-pull-0 {
  right: auto;
}
.col-xs-push-12 {
  left: 100%;
}
.col-xs-push-11 {
  left: 91.66666667%;
}
.col-xs-push-10 {
  left: 83.33333333%;
}
.col-xs-push-9 {
  left: 75%;
}
.col-xs-push-8 {
  left: 66.66666667%;
}
.col-xs-push-7 {
  left: 58.33333333%;
}
.col-xs-push-6 {
  left: 50%;
}
.col-xs-push-5 {
  left: 41.66666667%;
}
.col-xs-push-4 {
  left: 33.33333333%;
}
.col-xs-push-3 {
  left: 25%;
}
.col-xs-push-2 {
  left: 16.66666667%;
}
.col-xs-push-1 {
  left: 8.33333333%;
}
.col-xs-push-0 {
  left: auto;
}
.col-xs-offset-12 {
  margin-left: 100%;
}
.col-xs-offset-11 {
  margin-left: 91.66666667%;
}
.col-xs-offset-10 {
  margin-left: 83.33333333%;
}
.col-xs-offset-9 {
  margin-left: 75%;
}
.col-xs-offset-8 {
  margin-left: 66.66666667%;
}
.col-xs-offset-7 {
  margin-left: 58.33333333%;
}
.col-xs-offset-6 {
  margin-left: 50%;
}
.col-xs-offset-5 {
  margin-left: 41.66666667%;
}
.col-xs-offset-4 {
  margin-left: 33.33333333%;
}
.col-xs-offset-3 {
  margin-left: 25%;
}
.col-xs-offset-2 {
  margin-left: 16.66666667%;
}
.col-xs-offset-1 {
  margin-left: 8.33333333%;
}
.col-xs-offset-0 {
  margin-left: 0;
}
@media (min-width: 768px) {
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
  .col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
  .col-sm-pull-12 {
    right: 100%;
  }
  .col-sm-pull-11 {
    right: 91.66666667%;
  }
  .col-sm-pull-10 {
    right: 83.33333333%;
  }
  .col-sm-pull-9 {
    right: 75%;
  }
  .col-sm-pull-8 {
    right: 66.66666667%;
  }
  .col-sm-pull-7 {
    right: 58.33333333%;
  }
  .col-sm-pull-6 {
    right: 50%;
  }
  .col-sm-pull-5 {
    right: 41.66666667%;
  }
  .col-sm-pull-4 {
    right: 33.33333333%;
  }
  .col-sm-pull-3 {
    right: 25%;
  }
  .col-sm-pull-2 {
    right: 16.66666667%;
  }
  .col-sm-pull-1 {
    right: 8.33333333%;
  }
  .col-sm-pull-0 {
    right: auto;
  }
  .col-sm-push-12 {
    left: 100%;
  }
  .col-sm-push-11 {
    left: 91.66666667%;
  }
  .col-sm-push-10 {
    left: 83.33333333%;
  }
  .col-sm-push-9 {
    left: 75%;
  }
  .col-sm-push-8 {
    left: 66.66666667%;
  }
  .col-sm-push-7 {
    left: 58.33333333%;
  }
  .col-sm-push-6 {
    left: 50%;
  }
  .col-sm-push-5 {
    left: 41.66666667%;
  }
  .col-sm-push-4 {
    left: 33.33333333%;
  }
  .col-sm-push-3 {
    left: 25%;
  }
  .col-sm-push-2 {
    left: 16.66666667%;
  }
  .col-sm-push-1 {
    left: 8.33333333%;
  }
  .col-sm-push-0 {
    left: auto;
  }
  .col-sm-offset-12 {
    margin-left: 100%;
  }
  .col-sm-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-sm-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-sm-offset-9 {
    margin-left: 75%;
  }
  .col-sm-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-sm-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-sm-offset-6 {
    margin-left: 50%;
  }
  .col-sm-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-sm-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-sm-offset-3 {
    margin-left: 25%;
  }
  .col-sm-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-sm-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-sm-offset-0 {
    margin-left: 0;
  }
}
@media (min-width: 992px) {
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }
  .col-md-pull-12 {
    right: 100%;
  }
  .col-md-pull-11 {
    right: 91.66666667%;
  }
  .col-md-pull-10 {
    right: 83.33333333%;
  }
  .col-md-pull-9 {
    right: 75%;
  }
  .col-md-pull-8 {
    right: 66.66666667%;
  }
  .col-md-pull-7 {
    right: 58.33333333%;
  }
  .col-md-pull-6 {
    right: 50%;
  }
  .col-md-pull-5 {
    right: 41.66666667%;
  }
  .col-md-pull-4 {
    right: 33.33333333%;
  }
  .col-md-pull-3 {
    right: 25%;
  }
  .col-md-pull-2 {
    right: 16.66666667%;
  }
  .col-md-pull-1 {
    right: 8.33333333%;
  }
  .col-md-pull-0 {
    right: auto;
  }
  .col-md-push-12 {
    left: 100%;
  }
  .col-md-push-11 {
    left: 91.66666667%;
  }
  .col-md-push-10 {
    left: 83.33333333%;
  }
  .col-md-push-9 {
    left: 75%;
  }
  .col-md-push-8 {
    left: 66.66666667%;
  }
  .col-md-push-7 {
    left: 58.33333333%;
  }
  .col-md-push-6 {
    left: 50%;
  }
  .col-md-push-5 {
    left: 41.66666667%;
  }
  .col-md-push-4 {
    left: 33.33333333%;
  }
  .col-md-push-3 {
    left: 25%;
  }
  .col-md-push-2 {
    left: 16.66666667%;
  }
  .col-md-push-1 {
    left: 8.33333333%;
  }
  .col-md-push-0 {
    left: auto;
  }
  .col-md-offset-12 {
    margin-left: 100%;
  }
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-md-offset-9 {
    margin-left: 75%;
  }
  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-md-offset-6 {
    margin-left: 50%;
  }
  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-md-offset-3 {
    margin-left: 25%;
  }
  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0;
  }
}
@media (min-width: 1200px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-12 {
    width: 100%;
  }
  .col-lg-11 {
    width: 91.66666667%;
  }
  .col-lg-10 {
    width: 83.33333333%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-8 {
    width: 66.66666667%;
  }
  .col-lg-7 {
    width: 58.33333333%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-5 {
    width: 41.66666667%;
  }
  .col-lg-4 {
    width: 33.33333333%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-2 {
    width: 16.66666667%;
  }
  .col-lg-1 {
    width: 8.33333333%;
  }
  .col-lg-pull-12 {
    right: 100%;
  }
  .col-lg-pull-11 {
    right: 91.66666667%;
  }
  .col-lg-pull-10 {
    right: 83.33333333%;
  }
  .col-lg-pull-9 {
    right: 75%;
  }
  .col-lg-pull-8 {
    right: 66.66666667%;
  }
  .col-lg-pull-7 {
    right: 58.33333333%;
  }
  .col-lg-pull-6 {
    right: 50%;
  }
  .col-lg-pull-5 {
    right: 41.66666667%;
  }
  .col-lg-pull-4 {
    right: 33.33333333%;
  }
  .col-lg-pull-3 {
    right: 25%;
  }
  .col-lg-pull-2 {
    right: 16.66666667%;
  }
  .col-lg-pull-1 {
    right: 8.33333333%;
  }
  .col-lg-pull-0 {
    right: auto;
  }
  .col-lg-push-12 {
    left: 100%;
  }
  .col-lg-push-11 {
    left: 91.66666667%;
  }
  .col-lg-push-10 {
    left: 83.33333333%;
  }
  .col-lg-push-9 {
    left: 75%;
  }
  .col-lg-push-8 {
    left: 66.66666667%;
  }
  .col-lg-push-7 {
    left: 58.33333333%;
  }
  .col-lg-push-6 {
    left: 50%;
  }
  .col-lg-push-5 {
    left: 41.66666667%;
  }
  .col-lg-push-4 {
    left: 33.33333333%;
  }
  .col-lg-push-3 {
    left: 25%;
  }
  .col-lg-push-2 {
    left: 16.66666667%;
  }
  .col-lg-push-1 {
    left: 8.33333333%;
  }
  .col-lg-push-0 {
    left: auto;
  }
  .col-lg-offset-12 {
    margin-left: 100%;
  }
  .col-lg-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-lg-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-lg-offset-9 {
    margin-left: 75%;
  }
  .col-lg-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-lg-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-lg-offset-6 {
    margin-left: 50%;
  }
  .col-lg-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-lg-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-lg-offset-3 {
    margin-left: 25%;
  }
  .col-lg-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-lg-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-lg-offset-0 {
    margin-left: 0;
  }
}
table {
  background-color: transparent;
}
caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777;
  text-align: left;
}
th {
  text-align: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 2px solid #ddd;
}
.table .table {
  background-color: #fff;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
table col[class*="col-"] {
  position: static;
  display: table-column;
  float: none;
}
table td[class*="col-"],
table th[class*="col-"] {
  position: static;
  display: table-cell;
  float: none;
}
.table > thead > tr > td.active,
.table > tbody > tr > td.active,
.table > tfoot > tr > td.active,
.table > thead > tr > th.active,
.table > tbody > tr > th.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > tbody > tr.active > td,
.table > tfoot > tr.active > td,
.table > thead > tr.active > th,
.table > tbody > tr.active > th,
.table > tfoot > tr.active > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #e8e8e8;
}
.table > thead > tr > td.success,
.table > tbody > tr > td.success,
.table > tfoot > tr > td.success,
.table > thead > tr > th.success,
.table > tbody > tr > th.success,
.table > tfoot > tr > th.success,
.table > thead > tr.success > td,
.table > tbody > tr.success > td,
.table > tfoot > tr.success > td,
.table > thead > tr.success > th,
.table > tbody > tr.success > th,
.table > tfoot > tr.success > th {
  background-color: #dff0d8;
}
.table-hover > tbody > tr > td.success:hover,
.table-hover > tbody > tr > th.success:hover,
.table-hover > tbody > tr.success:hover > td,
.table-hover > tbody > tr:hover > .success,
.table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6;
}
.table > thead > tr > td.info,
.table > tbody > tr > td.info,
.table > tfoot > tr > td.info,
.table > thead > tr > th.info,
.table > tbody > tr > th.info,
.table > tfoot > tr > th.info,
.table > thead > tr.info > td,
.table > tbody > tr.info > td,
.table > tfoot > tr.info > td,
.table > thead > tr.info > th,
.table > tbody > tr.info > th,
.table > tfoot > tr.info > th {
  background-color: #d9edf7;
}
.table-hover > tbody > tr > td.info:hover,
.table-hover > tbody > tr > th.info:hover,
.table-hover > tbody > tr.info:hover > td,
.table-hover > tbody > tr:hover > .info,
.table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3;
}
.table > thead > tr > td.warning,
.table > tbody > tr > td.warning,
.table > tfoot > tr > td.warning,
.table > thead > tr > th.warning,
.table > tbody > tr > th.warning,
.table > tfoot > tr > th.warning,
.table > thead > tr.warning > td,
.table > tbody > tr.warning > td,
.table > tfoot > tr.warning > td,
.table > thead > tr.warning > th,
.table > tbody > tr.warning > th,
.table > tfoot > tr.warning > th {
  background-color: #fcf8e3;
}
.table-hover > tbody > tr > td.warning:hover,
.table-hover > tbody > tr > th.warning:hover,
.table-hover > tbody > tr.warning:hover > td,
.table-hover > tbody > tr:hover > .warning,
.table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc;
}
.table > thead > tr > td.danger,
.table > tbody > tr > td.danger,
.table > tfoot > tr > td.danger,
.table > thead > tr > th.danger,
.table > tbody > tr > th.danger,
.table > tfoot > tr > th.danger,
.table > thead > tr.danger > td,
.table > tbody > tr.danger > td,
.table > tfoot > tr.danger > td,
.table > thead > tr.danger > th,
.table > tbody > tr.danger > th,
.table > tfoot > tr.danger > th {
  background-color: #f2dede;
}
.table-hover > tbody > tr > td.danger:hover,
.table-hover > tbody > tr > th.danger:hover,
.table-hover > tbody > tr.danger:hover > td,
.table-hover > tbody > tr:hover > .danger,
.table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc;
}
.table-responsive {
  min-height: .01%;
  overflow-x: auto;
}
@media screen and (max-width: 767px) {
  .table-responsive {
    width: 100%;
    margin-bottom: 15px;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
  }
  .table-responsive > .table {
    margin-bottom: 0;
  }
  .table-responsive > .table > thead > tr > th,
  .table-responsive > .table > tbody > tr > th,
  .table-responsive > .table > tfoot > tr > th,
  .table-responsive > .table > thead > tr > td,
  .table-responsive > .table > tbody > tr > td,
  .table-responsive > .table > tfoot > tr > td {
    white-space: nowrap;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:first-child,
  .table-responsive > .table-bordered > tbody > tr > th:first-child,
  .table-responsive > .table-bordered > tfoot > tr > th:first-child,
  .table-responsive > .table-bordered > thead > tr > td:first-child,
  .table-responsive > .table-bordered > tbody > tr > td:first-child,
  .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:last-child,
  .table-responsive > .table-bordered > tbody > tr > th:last-child,
  .table-responsive > .table-bordered > tfoot > tr > th:last-child,
  .table-responsive > .table-bordered > thead > tr > td:last-child,
  .table-responsive > .table-bordered > tbody > tr > td:last-child,
  .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0;
  }
  .table-responsive > .table-bordered > tbody > tr:last-child > th,
  .table-responsive > .table-bordered > tfoot > tr:last-child > th,
  .table-responsive > .table-bordered > tbody > tr:last-child > td,
  .table-responsive > .table-bordered > tfoot > tr:last-child > td {
    border-bottom: 0;
  }
}
fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 20px;
  font-size: 21px;
  line-height: inherit;
  color: #333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="search"] {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}
input[type="file"] {
  display: block;
}
input[type="range"] {
  display: block;
  width: 100%;
}
select[multiple],
select[size] {
  height: auto;
}
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
output {
  display: block;
  padding-top: 7px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
}
.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
}
.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}
.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #eee;
  opacity: 1;
}
.form-control[disabled],
fieldset[disabled] .form-control {
  cursor: not-allowed;
}
textarea.form-control {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: none;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    line-height: 34px;
  }
  input[type="date"].input-sm,
  input[type="time"].input-sm,
  input[type="datetime-local"].input-sm,
  input[type="month"].input-sm,
  .input-group-sm input[type="date"],
  .input-group-sm input[type="time"],
  .input-group-sm input[type="datetime-local"],
  .input-group-sm input[type="month"] {
    line-height: 30px;
  }
  input[type="date"].input-lg,
  input[type="time"].input-lg,
  input[type="datetime-local"].input-lg,
  input[type="month"].input-lg,
  .input-group-lg input[type="date"],
  .input-group-lg input[type="time"],
  .input-group-lg input[type="datetime-local"],
  .input-group-lg input[type="month"] {
    line-height: 46px;
  }
}
.form-group {
  margin-bottom: 15px;
}
.radio,
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.radio label,
.checkbox label {
  min-height: 20px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-top: 4px \9;
  margin-left: -20px;
}
.radio + .radio,
.checkbox + .checkbox {
  margin-top: -5px;
}
.radio-inline,
.checkbox-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: normal;
  vertical-align: middle;
  cursor: pointer;
}
.radio-inline + .radio-inline,
.checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px;
}
input[type="radio"][disabled],
input[type="checkbox"][disabled],
input[type="radio"].disabled,
input[type="checkbox"].disabled,
fieldset[disabled] input[type="radio"],
fieldset[disabled] input[type="checkbox"] {
  cursor: not-allowed;
}
.radio-inline.disabled,
.checkbox-inline.disabled,
fieldset[disabled] .radio-inline,
fieldset[disabled] .checkbox-inline {
  cursor: not-allowed;
}
.radio.disabled label,
.checkbox.disabled label,
fieldset[disabled] .radio label,
fieldset[disabled] .checkbox label {
  cursor: not-allowed;
}
.form-control-static {
  min-height: 34px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 0;
}
.form-control-static.input-lg,
.form-control-static.input-sm {
  padding-right: 0;
  padding-left: 0;
}
.input-sm {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
select.input-sm {
  height: 30px;
  line-height: 30px;
}
textarea.input-sm,
select[multiple].input-sm {
  height: auto;
}
.form-group-sm .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
select.form-group-sm .form-control {
  height: 30px;
  line-height: 30px;
}
textarea.form-group-sm .form-control,
select[multiple].form-group-sm .form-control {
  height: auto;
}
.form-group-sm .form-control-static {
  height: 30px;
  min-height: 32px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.input-lg {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
select.input-lg {
  height: 46px;
  line-height: 46px;
}
textarea.input-lg,
select[multiple].input-lg {
  height: auto;
}
.form-group-lg .form-control {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
select.form-group-lg .form-control {
  height: 46px;
  line-height: 46px;
}
textarea.form-group-lg .form-control,
select[multiple].form-group-lg .form-control {
  height: auto;
}
.form-group-lg .form-control-static {
  height: 46px;
  min-height: 38px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
}
.has-feedback {
  position: relative;
}
.has-feedback .form-control {
  padding-right: 42.5px;
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  pointer-events: none;
}
.input-lg + .form-control-feedback {
  width: 46px;
  height: 46px;
  line-height: 46px;
}
.input-sm + .form-control-feedback {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.has-success .help-block,
.has-success .control-label,
.has-success .radio,
.has-success .checkbox,
.has-success .radio-inline,
.has-success .checkbox-inline,
.has-success.radio label,
.has-success.checkbox label,
.has-success.radio-inline label,
.has-success.checkbox-inline label {
  color: #3c763d;
}
.has-success .form-control {
  border-color: #3c763d;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}
.has-success .form-control:focus {
  border-color: #2b542c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;
}
.has-success .input-group-addon {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #3c763d;
}
.has-success .form-control-feedback {
  color: #3c763d;
}
.has-warning .help-block,
.has-warning .control-label,
.has-warning .radio,
.has-warning .checkbox,
.has-warning .radio-inline,
.has-warning .checkbox-inline,
.has-warning.radio label,
.has-warning.checkbox label,
.has-warning.radio-inline label,
.has-warning.checkbox-inline label {
  color: #8a6d3b;
}
.has-warning .form-control {
  border-color: #8a6d3b;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}
.has-warning .form-control:focus {
  border-color: #66512c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;
}
.has-warning .input-group-addon {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #8a6d3b;
}
.has-warning .form-control-feedback {
  color: #8a6d3b;
}
.has-error .help-block,
.has-error .control-label,
.has-error .radio,
.has-error .checkbox,
.has-error .radio-inline,
.has-error .checkbox-inline,
.has-error.radio label,
.has-error.checkbox label,
.has-error.radio-inline label,
.has-error.checkbox-inline label {
  color: #a94442;
}
.has-error .form-control {
  border-color: #a94442;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}
.has-error .form-control:focus {
  border-color: #843534;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;
}
.has-error .input-group-addon {
  color: #a94442;
  background-color: #f2dede;
  border-color: #a94442;
}
.has-error .form-control-feedback {
  color: #a94442;
}
.has-feedback label ~ .form-control-feedback {
  top: 25px;
}
.has-feedback label.sr-only ~ .form-control-feedback {
  top: 0;
}
.help-block {
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
}
@media (min-width: 768px) {
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .form-inline .form-control-static {
    display: inline-block;
  }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .form-inline .input-group .input-group-addon,
  .form-inline .input-group .input-group-btn,
  .form-inline .input-group .form-control {
    width: auto;
  }
  .form-inline .input-group > .form-control {
    width: 100%;
  }
  .form-inline .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio,
  .form-inline .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio label,
  .form-inline .checkbox label {
    padding-left: 0;
  }
  .form-inline .radio input[type="radio"],
  .form-inline .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .form-inline .has-feedback .form-control-feedback {
    top: 0;
  }
}
.form-horizontal .radio,
.form-horizontal .checkbox,
.form-horizontal .radio-inline,
.form-horizontal .checkbox-inline {
  padding-top: 7px;
  margin-top: 0;
  margin-bottom: 0;
}
.form-horizontal .radio,
.form-horizontal .checkbox {
  min-height: 27px;
}
.form-horizontal .form-group {
  margin-right: -15px;
  margin-left: -15px;
}
@media (min-width: 768px) {
  .form-horizontal .control-label {
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
  }
}
.form-horizontal .has-feedback .form-control-feedback {
  right: 15px;
}
@media (min-width: 768px) {
  .form-horizontal .form-group-lg .control-label {
    padding-top: 14.333333px;
  }
}
@media (min-width: 768px) {
  .form-horizontal .form-group-sm .control-label {
    padding-top: 6px;
  }
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
      touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: thin dotted;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}
.btn:active,
.btn.active {
  background-image: none;
  outline: 0;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
}
.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  pointer-events: none;
  cursor: not-allowed;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
          box-shadow: none;
  opacity: .65;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-default:hover,
.btn-default:focus,
.btn-default.focus,
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  background-image: none;
}
.btn-default.disabled,
.btn-default[disabled],
fieldset[disabled] .btn-default,
.btn-default.disabled:hover,
.btn-default[disabled]:hover,
fieldset[disabled] .btn-default:hover,
.btn-default.disabled:focus,
.btn-default[disabled]:focus,
fieldset[disabled] .btn-default:focus,
.btn-default.disabled.focus,
.btn-default[disabled].focus,
fieldset[disabled] .btn-default.focus,
.btn-default.disabled:active,
.btn-default[disabled]:active,
fieldset[disabled] .btn-default:active,
.btn-default.disabled.active,
.btn-default[disabled].active,
fieldset[disabled] .btn-default.active {
  background-color: #fff;
  border-color: #ccc;
}
.btn-default .badge {
  color: #fff;
  background-color: #333;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary.focus,
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-image: none;
}
.btn-primary.disabled,
.btn-primary[disabled],
fieldset[disabled] .btn-primary,
.btn-primary.disabled:hover,
.btn-primary[disabled]:hover,
fieldset[disabled] .btn-primary:hover,
.btn-primary.disabled:focus,
.btn-primary[disabled]:focus,
fieldset[disabled] .btn-primary:focus,
.btn-primary.disabled.focus,
.btn-primary[disabled].focus,
fieldset[disabled] .btn-primary.focus,
.btn-primary.disabled:active,
.btn-primary[disabled]:active,
fieldset[disabled] .btn-primary:active,
.btn-primary.disabled.active,
.btn-primary[disabled].active,
fieldset[disabled] .btn-primary.active {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary .badge {
  color: #337ab7;
  background-color: #fff;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success:hover,
.btn-success:focus,
.btn-success.focus,
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  background-image: none;
}
.btn-success.disabled,
.btn-success[disabled],
fieldset[disabled] .btn-success,
.btn-success.disabled:hover,
.btn-success[disabled]:hover,
fieldset[disabled] .btn-success:hover,
.btn-success.disabled:focus,
.btn-success[disabled]:focus,
fieldset[disabled] .btn-success:focus,
.btn-success.disabled.focus,
.btn-success[disabled].focus,
fieldset[disabled] .btn-success.focus,
.btn-success.disabled:active,
.btn-success[disabled]:active,
fieldset[disabled] .btn-success:active,
.btn-success.disabled.active,
.btn-success[disabled].active,
fieldset[disabled] .btn-success.active {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info:hover,
.btn-info:focus,
.btn-info.focus,
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  background-image: none;
}
.btn-info.disabled,
.btn-info[disabled],
fieldset[disabled] .btn-info,
.btn-info.disabled:hover,
.btn-info[disabled]:hover,
fieldset[disabled] .btn-info:hover,
.btn-info.disabled:focus,
.btn-info[disabled]:focus,
fieldset[disabled] .btn-info:focus,
.btn-info.disabled.focus,
.btn-info[disabled].focus,
fieldset[disabled] .btn-info.focus,
.btn-info.disabled:active,
.btn-info[disabled]:active,
fieldset[disabled] .btn-info:active,
.btn-info.disabled.active,
.btn-info[disabled].active,
fieldset[disabled] .btn-info.active {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning:hover,
.btn-warning:focus,
.btn-warning.focus,
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  background-image: none;
}
.btn-warning.disabled,
.btn-warning[disabled],
fieldset[disabled] .btn-warning,
.btn-warning.disabled:hover,
.btn-warning[disabled]:hover,
fieldset[disabled] .btn-warning:hover,
.btn-warning.disabled:focus,
.btn-warning[disabled]:focus,
fieldset[disabled] .btn-warning:focus,
.btn-warning.disabled.focus,
.btn-warning[disabled].focus,
fieldset[disabled] .btn-warning.focus,
.btn-warning.disabled:active,
.btn-warning[disabled]:active,
fieldset[disabled] .btn-warning:active,
.btn-warning.disabled.active,
.btn-warning[disabled].active,
fieldset[disabled] .btn-warning.active {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger:hover,
.btn-danger:focus,
.btn-danger.focus,
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  background-image: none;
}
.btn-danger.disabled,
.btn-danger[disabled],
fieldset[disabled] .btn-danger,
.btn-danger.disabled:hover,
.btn-danger[disabled]:hover,
fieldset[disabled] .btn-danger:hover,
.btn-danger.disabled:focus,
.btn-danger[disabled]:focus,
fieldset[disabled] .btn-danger:focus,
.btn-danger.disabled.focus,
.btn-danger[disabled].focus,
fieldset[disabled] .btn-danger.focus,
.btn-danger.disabled:active,
.btn-danger[disabled]:active,
fieldset[disabled] .btn-danger:active,
.btn-danger.disabled.active,
.btn-danger[disabled].active,
fieldset[disabled] .btn-danger.active {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger .badge {
  color: #d9534f;
  background-color: #fff;
}
.btn-link {
  font-weight: normal;
  color: #337ab7;
  border-radius: 0;
}
.btn-link,
.btn-link:active,
.btn-link.active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}
.btn-link:hover,
.btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover,
fieldset[disabled] .btn-link:hover,
.btn-link[disabled]:focus,
fieldset[disabled] .btn-link:focus {
  color: #777;
  text-decoration: none;
}
.btn-lg,
.btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.btn-xs,
.btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-block + .btn-block {
  margin-top: 5px;
}
input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}
.fade {
  opacity: 0;
  -webkit-transition: opacity .15s linear;
       -o-transition: opacity .15s linear;
          transition: opacity .15s linear;
}
.fade.in {
  opacity: 1;
}
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}
tr.collapse.in {
  display: table-row;
}
tbody.collapse.in {
  display: table-row-group;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition-timing-function: ease;
       -o-transition-timing-function: ease;
          transition-timing-function: ease;
  -webkit-transition-duration: .35s;
       -o-transition-duration: .35s;
          transition-duration: .35s;
  -webkit-transition-property: height, visibility;
       -o-transition-property: height, visibility;
          transition-property: height, visibility;
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
.dropup,
.dropdown {
  position: relative;
}
.dropdown-toggle:focus {
  outline: 0;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}
.dropdown-menu.pull-right {
  right: 0;
  left: auto;
}
.dropdown-menu .divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
}
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  background-color: #337ab7;
  outline: 0;
}
.dropdown-menu > .disabled > a,
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  color: #777;
}
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
  background-image: none;
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
}
.open > .dropdown-menu {
  display: block;
}
.open > a {
  outline: 0;
}
.dropdown-menu-right {
  right: 0;
  left: auto;
}
.dropdown-menu-left {
  right: auto;
  left: 0;
}
.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 12px;
  line-height: 1.42857143;
  color: #777;
  white-space: nowrap;
}
.dropdown-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 990;
}
.pull-right > .dropdown-menu {
  right: 0;
  left: auto;
}
.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
  content: "";
  border-top: 0;
  border-bottom: 4px solid;
}
.dropup .dropdown-menu,
.navbar-fixed-bottom .dropdown .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 2px;
}
@media (min-width: 768px) {
  .navbar-right .dropdown-menu {
    right: 0;
    left: auto;
  }
  .navbar-right .dropdown-menu-left {
    right: auto;
    left: 0;
  }
}
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  float: left;
}
.btn-group > .btn:hover,
.btn-group-vertical > .btn:hover,
.btn-group > .btn:focus,
.btn-group-vertical > .btn:focus,
.btn-group > .btn:active,
.btn-group-vertical > .btn:active,
.btn-group > .btn.active,
.btn-group-vertical > .btn.active {
  z-index: 2;
}
.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
  margin-left: -1px;
}
.btn-toolbar {
  margin-left: -5px;
}
.btn-toolbar .btn-group,
.btn-toolbar .input-group {
  float: left;
}
.btn-toolbar > .btn,
.btn-toolbar > .btn-group,
.btn-toolbar > .input-group {
  margin-left: 5px;
}
.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0;
}
.btn-group > .btn:first-child {
  margin-left: 0;
}
.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group > .btn:last-child:not(:first-child),
.btn-group > .dropdown-toggle:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group > .btn-group {
  float: left;
}
.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group .dropdown-toggle:active,
.btn-group.open .dropdown-toggle {
  outline: 0;
}
.btn-group > .btn + .dropdown-toggle {
  padding-right: 8px;
  padding-left: 8px;
}
.btn-group > .btn-lg + .dropdown-toggle {
  padding-right: 12px;
  padding-left: 12px;
}
.btn-group.open .dropdown-toggle {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
}
.btn-group.open .dropdown-toggle.btn-link {
  -webkit-box-shadow: none;
          box-shadow: none;
}
.btn .caret {
  margin-left: 0;
}
.btn-lg .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0;
}
.dropup .btn-lg .caret {
  border-width: 0 5px 5px;
}
.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group,
.btn-group-vertical > .btn-group > .btn {
  display: block;
  float: none;
  width: 100%;
  max-width: 100%;
}
.btn-group-vertical > .btn-group > .btn {
  float: none;
}
.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0;
}
.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
}
.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.btn-group-justified > .btn,
.btn-group-justified > .btn-group {
  display: table-cell;
  float: none;
  width: 1%;
}
.btn-group-justified > .btn-group .btn {
  width: 100%;
}
.btn-group-justified > .btn-group .dropdown-menu {
  left: auto;
}
[data-toggle="buttons"] > .btn input[type="radio"],
[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
[data-toggle="buttons"] > .btn input[type="checkbox"],
[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group[class*="col-"] {
  float: none;
  padding-right: 0;
  padding-left: 0;
}
.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 46px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
}
select.input-group-lg > .form-control,
select.input-group-lg > .input-group-addon,
select.input-group-lg > .input-group-btn > .btn {
  height: 46px;
  line-height: 46px;
}
textarea.input-group-lg > .form-control,
textarea.input-group-lg > .input-group-addon,
textarea.input-group-lg > .input-group-btn > .btn,
select[multiple].input-group-lg > .form-control,
select[multiple].input-group-lg > .input-group-addon,
select[multiple].input-group-lg > .input-group-btn > .btn {
  height: auto;
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
select.input-group-sm > .form-control,
select.input-group-sm > .input-group-addon,
select.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  line-height: 30px;
}
textarea.input-group-sm > .form-control,
textarea.input-group-sm > .input-group-addon,
textarea.input-group-sm > .input-group-btn > .btn,
select[multiple].input-group-sm > .form-control,
select[multiple].input-group-sm > .input-group-addon,
select[multiple].input-group-sm > .input-group-btn > .btn {
  height: auto;
}
.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: table-cell;
}
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.input-group-addon,
.input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group-addon.input-sm {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
}
.input-group-addon.input-lg {
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 6px;
}
.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group-addon:first-child {
  border-right: 0;
}
.input-group .form-control:last-child,
.input-group-addon:last-child,
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group > .btn,
.input-group-btn:last-child > .dropdown-toggle,
.input-group-btn:first-child > .btn:not(:first-child),
.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group-addon:last-child {
  border-left: 0;
}
.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}
.input-group-btn > .btn {
  position: relative;
}
.input-group-btn > .btn + .btn {
  margin-left: -1px;
}
.input-group-btn > .btn:hover,
.input-group-btn > .btn:focus,
.input-group-btn > .btn:active {
  z-index: 2;
}
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group {
  margin-right: -1px;
}
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  margin-left: -1px;
}
.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eee;
}
.nav > li.disabled > a {
  color: #777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777;
  text-decoration: none;
  cursor: not-allowed;
  background-color: transparent;
}
.nav .open > a,
.nav .open > a:hover,
.nav .open > a:focus {
  background-color: #eee;
  border-color: #337ab7;
}
.nav .nav-divider {
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav > li > a > img {
  max-width: none;
}
.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.nav-tabs > li > a {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}
.nav-tabs > li > a:hover {
  border-color: #eee #eee #ddd;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555;
  cursor: default;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
}
.nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.nav-tabs.nav-justified > li {
  float: none;
}
.nav-tabs.nav-justified > li > a {
  margin-bottom: 5px;
  text-align: center;
}
.nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 4px;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
  }
  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:hover,
  .nav-tabs.nav-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.nav-pills > li {
  float: left;
}
.nav-pills > li > a {
  border-radius: 4px;
}
.nav-pills > li + li {
  margin-left: 2px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #337ab7;
}
.nav-stacked > li {
  float: none;
}
.nav-stacked > li + li {
  margin-top: 2px;
  margin-left: 0;
}
.nav-justified {
  width: 100%;
}
.nav-justified > li {
  float: none;
}
.nav-justified > li > a {
  margin-bottom: 5px;
  text-align: center;
}
.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs-justified {
  border-bottom: 0;
}
.nav-tabs-justified > li > a {
  margin-right: 0;
  border-radius: 4px;
}
.nav-tabs-justified > .active > a,
.nav-tabs-justified > .active > a:hover,
.nav-tabs-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
  }
  .nav-tabs-justified > .active > a,
  .nav-tabs-justified > .active > a:hover,
  .nav-tabs-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
  border: 1px solid transparent;
}
@media (min-width: 768px) {
  .navbar {
    border-radius: 4px;
  }
}
@media (min-width: 768px) {
  .navbar-header {
    float: left;
  }
}
.navbar-collapse {
  padding-right: 15px;
  padding-left: 15px;
  overflow-x: visible;
  -webkit-overflow-scrolling: touch;
  border-top: 1px solid transparent;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);
}
.navbar-collapse.in {
  overflow-y: auto;
}
@media (min-width: 768px) {
  .navbar-collapse {
    width: auto;
    border-top: 0;
    -webkit-box-shadow: none;
            box-shadow: none;
  }
  .navbar-collapse.collapse {
    display: block !important;
    height: auto !important;
    padding-bottom: 0;
    overflow: visible !important;
  }
  .navbar-collapse.in {
    overflow-y: visible;
  }
  .navbar-fixed-top .navbar-collapse,
  .navbar-static-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    padding-right: 0;
    padding-left: 0;
  }
}
.navbar-fixed-top .navbar-collapse,
.navbar-fixed-bottom .navbar-collapse {
  max-height: 340px;
}
@media (max-device-width: 480px) and (orientation: landscape) {
  .navbar-fixed-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    max-height: 200px;
  }
}
.container > .navbar-header,
.container-fluid > .navbar-header,
.container > .navbar-collapse,
.container-fluid > .navbar-collapse {
  margin-right: -15px;
  margin-left: -15px;
}
@media (min-width: 768px) {
  .container > .navbar-header,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container-fluid > .navbar-collapse {
    margin-right: 0;
    margin-left: 0;
  }
}
.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px;
}
@media (min-width: 768px) {
  .navbar-static-top {
    border-radius: 0;
  }
}
.navbar-fixed-top,
.navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
}
@media (min-width: 768px) {
  .navbar-fixed-top,
  .navbar-fixed-bottom {
    border-radius: 0;
  }
}
.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px;
}
.navbar-fixed-bottom {
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0;
}
.navbar-brand {
  float: left;
  height: 50px;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
}
.navbar-brand:hover,
.navbar-brand:focus {
  text-decoration: none;
}
.navbar-brand > img {
  display: block;
}
@media (min-width: 768px) {
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: -15px;
  }
}
.navbar-toggle {
  position: relative;
  float: right;
  padding: 9px 10px;
  margin-top: 8px;
  margin-right: 15px;
  margin-bottom: 8px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
.navbar-toggle:focus {
  outline: 0;
}
.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}
.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}
@media (min-width: 768px) {
  .navbar-toggle {
    display: none;
  }
}
.navbar-nav {
  margin: 7.5px -15px;
}
.navbar-nav > li > a {
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 20px;
}
@media (max-width: 767px) {
  .navbar-nav .open .dropdown-menu {
    position: static;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    -webkit-box-shadow: none;
            box-shadow: none;
  }
  .navbar-nav .open .dropdown-menu > li > a,
  .navbar-nav .open .dropdown-menu .dropdown-header {
    padding: 5px 15px 5px 25px;
  }
  .navbar-nav .open .dropdown-menu > li > a {
    line-height: 20px;
  }
  .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-nav .open .dropdown-menu > li > a:focus {
    background-image: none;
  }
}
@media (min-width: 768px) {
  .navbar-nav {
    float: left;
    margin: 0;
  }
  .navbar-nav > li {
    float: left;
  }
  .navbar-nav > li > a {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
.navbar-form {
  padding: 10px 15px;
  margin-top: 8px;
  margin-right: -15px;
  margin-bottom: 8px;
  margin-left: -15px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);
}
@media (min-width: 768px) {
  .navbar-form .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .navbar-form .form-control-static {
    display: inline-block;
  }
  .navbar-form .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .navbar-form .input-group .input-group-addon,
  .navbar-form .input-group .input-group-btn,
  .navbar-form .input-group .form-control {
    width: auto;
  }
  .navbar-form .input-group > .form-control {
    width: 100%;
  }
  .navbar-form .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio,
  .navbar-form .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio label,
  .navbar-form .checkbox label {
    padding-left: 0;
  }
  .navbar-form .radio input[type="radio"],
  .navbar-form .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .navbar-form .has-feedback .form-control-feedback {
    top: 0;
  }
}
@media (max-width: 767px) {
  .navbar-form .form-group {
    margin-bottom: 5px;
  }
  .navbar-form .form-group:last-child {
    margin-bottom: 0;
  }
}
@media (min-width: 768px) {
  .navbar-form {
    width: auto;
    padding-top: 0;
    padding-bottom: 0;
    margin-right: 0;
    margin-left: 0;
    border: 0;
    -webkit-box-shadow: none;
            box-shadow: none;
  }
}
.navbar-nav > li > .dropdown-menu {
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
  margin-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.navbar-btn {
  margin-top: 8px;
  margin-bottom: 8px;
}
.navbar-btn.btn-sm {
  margin-top: 10px;
  margin-bottom: 10px;
}
.navbar-btn.btn-xs {
  margin-top: 14px;
  margin-bottom: 14px;
}
.navbar-text {
  margin-top: 15px;
  margin-bottom: 15px;
}
@media (min-width: 768px) {
  .navbar-text {
    float: left;
    margin-right: 15px;
    margin-left: 15px;
  }
}
@media (min-width: 768px) {
  .navbar-left {
    float: left !important;
  }
  .navbar-right {
    float: right !important;
    margin-right: -15px;
  }
  .navbar-right ~ .navbar-right {
    margin-right: 0;
  }
}
.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}
.navbar-default .navbar-brand {
  color: #777;
}
.navbar-default .navbar-brand:hover,
.navbar-default .navbar-brand:focus {
  color: #5e5e5e;
  background-color: transparent;
}
.navbar-default .navbar-text {
  color: #777;
}
.navbar-default .navbar-nav > li > a {
  color: #777;
}
.navbar-default .navbar-nav > li > a:hover,
.navbar-default .navbar-nav > li > a:focus {
  color: #333;
  background-color: transparent;
}
.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
  color: #555;
  background-color: #e7e7e7;
}
.navbar-default .navbar-nav > .disabled > a,
.navbar-default .navbar-nav > .disabled > a:hover,
.navbar-default .navbar-nav > .disabled > a:focus {
  color: #ccc;
  background-color: transparent;
}
.navbar-default .navbar-toggle {
  border-color: #ddd;
}
.navbar-default .navbar-toggle:hover,
.navbar-default .navbar-toggle:focus {
  background-color: #ddd;
}
.navbar-default .navbar-toggle .icon-bar {
  background-color: #888;
}
.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
  border-color: #e7e7e7;
}
.navbar-default .navbar-nav > .open > a,
.navbar-default .navbar-nav > .open > a:hover,
.navbar-default .navbar-nav > .open > a:focus {
  color: #555;
  background-color: #e7e7e7;
}
@media (max-width: 767px) {
  .navbar-default .navbar-nav .open .dropdown-menu > li > a {
    color: #777;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #333;
    background-color: transparent;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #555;
    background-color: #e7e7e7;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
  }
}
.navbar-default .navbar-link {
  color: #777;
}
.navbar-default .navbar-link:hover {
  color: #333;
}
.navbar-default .btn-link {
  color: #777;
}
.navbar-default .btn-link:hover,
.navbar-default .btn-link:focus {
  color: #333;
}
.navbar-default .btn-link[disabled]:hover,
fieldset[disabled] .navbar-default .btn-link:hover,
.navbar-default .btn-link[disabled]:focus,
fieldset[disabled] .navbar-default .btn-link:focus {
  color: #ccc;
}
.navbar-inverse {
  background-color: #222;
  border-color: #080808;
}
.navbar-inverse .navbar-brand {
  color: #9d9d9d;
}
.navbar-inverse .navbar-brand:hover,
.navbar-inverse .navbar-brand:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-text {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-nav > li > a:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
  color: #fff;
  background-color: #080808;
}
.navbar-inverse .navbar-nav > .disabled > a,
.navbar-inverse .navbar-nav > .disabled > a:hover,
.navbar-inverse .navbar-nav > .disabled > a:focus {
  color: #444;
  background-color: transparent;
}
.navbar-inverse .navbar-toggle {
  border-color: #333;
}
.navbar-inverse .navbar-toggle:hover,
.navbar-inverse .navbar-toggle:focus {
  background-color: #333;
}
.navbar-inverse .navbar-toggle .icon-bar {
  background-color: #fff;
}
.navbar-inverse .navbar-collapse,
.navbar-inverse .navbar-form {
  border-color: #101010;
}
.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
  color: #fff;
  background-color: #080808;
}
@media (max-width: 767px) {
  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
    border-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
    color: #9d9d9d;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #fff;
    background-color: transparent;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #444;
    background-color: transparent;
  }
}
.navbar-inverse .navbar-link {
  color: #9d9d9d;
}
.navbar-inverse .navbar-link:hover {
  color: #fff;
}
.navbar-inverse .btn-link {
  color: #9d9d9d;
}
.navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link:focus {
  color: #fff;
}
.navbar-inverse .btn-link[disabled]:hover,
fieldset[disabled] .navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link[disabled]:focus,
fieldset[disabled] .navbar-inverse .btn-link:focus {
  color: #444;
}
.breadcrumb {
  padding: 8px 15px;
  margin-bottom: 20px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.breadcrumb > li {
  display: inline-block;
}
.breadcrumb > li + li:before {
  padding: 0 5px;
  color: #ccc;
  content: "/\00a0";
}
.breadcrumb > .active {
  color: #777;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.pager {
  padding-left: 0;
  margin: 20px 0;
  text-align: center;
  list-style: none;
}
.pager li {
  display: inline;
}
.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}
.pager li > a:hover,
.pager li > a:focus {
  text-decoration: none;
  background-color: #eee;
}
.pager .next > a,
.pager .next > span {
  float: right;
}
.pager .previous > a,
.pager .previous > span {
  float: left;
}
.pager .disabled > a,
.pager .disabled > a:hover,
.pager .disabled > a:focus,
.pager .disabled > span {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
}
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
a.label:hover,
a.label:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.label:empty {
  display: none;
}
.btn .label {
  position: relative;
  top: -1px;
}
.label-default {
  background-color: #777;
}
.label-default[href]:hover,
.label-default[href]:focus {
  background-color: #5e5e5e;
}
.label-primary {
  background-color: #337ab7;
}
.label-primary[href]:hover,
.label-primary[href]:focus {
  background-color: #286090;
}
.label-success {
  background-color: #5cb85c;
}
.label-success[href]:hover,
.label-success[href]:focus {
  background-color: #449d44;
}
.label-info {
  background-color: #5bc0de;
}
.label-info[href]:hover,
.label-info[href]:focus {
  background-color: #31b0d5;
}
.label-warning {
  background-color: #f0ad4e;
}
.label-warning[href]:hover,
.label-warning[href]:focus {
  background-color: #ec971f;
}
.label-danger {
  background-color: #d9534f;
}
.label-danger[href]:hover,
.label-danger[href]:focus {
  background-color: #c9302c;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #777;
  border-radius: 10px;
}
.badge:empty {
  display: none;
}
.btn .badge {
  position: relative;
  top: -1px;
}
.btn-xs .badge,
.btn-group-xs > .btn .badge {
  top: 0;
  padding: 1px 5px;
}
a.badge:hover,
a.badge:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.list-group-item.active > .badge,
.nav-pills > .active > a > .badge {
  color: #337ab7;
  background-color: #fff;
}
.list-group-item > .badge {
  float: right;
}
.list-group-item > .badge + .badge {
  margin-right: 5px;
}
.nav-pills > li > a > .badge {
  margin-left: 3px;
}
.jumbotron {
  padding: 30px 15px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eee;
}
.jumbotron h1,
.jumbotron .h1 {
  color: inherit;
}
.jumbotron p {
  margin-bottom: 15px;
  font-size: 21px;
  font-weight: 200;
}
.jumbotron > hr {
  border-top-color: #d5d5d5;
}
.container .jumbotron,
.container-fluid .jumbotron {
  border-radius: 6px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding: 48px 0;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-right: 60px;
    padding-left: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 63px;
  }
}
.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 20px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: border .2s ease-in-out;
       -o-transition: border .2s ease-in-out;
          transition: border .2s ease-in-out;
}
.thumbnail > img,
.thumbnail a > img {
  margin-right: auto;
  margin-left: auto;
}
a.thumbnail:hover,
a.thumbnail:focus,
a.thumbnail.active {
  border-color: #337ab7;
}
.thumbnail .caption {
  padding: 9px;
  color: #333;
}
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
.alert-success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.alert-success hr {
  border-top-color: #c9e2b3;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.alert-info hr {
  border-top-color: #a6e1ec;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.alert-warning hr {
  border-top-color: #f7e1b5;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.alert-danger hr {
  border-top-color: #e4b9c0;
}
.alert-danger .alert-link {
  color: #843534;
}
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@-o-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progress {
  height: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
}
.progress-bar {
  float: left;
  width: 0;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
  -webkit-transition: width .6s ease;
       -o-transition: width .6s ease;
          transition: width .6s ease;
}
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  -webkit-background-size: 40px 40px;
          background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
       -o-animation: progress-bar-stripes 2s linear infinite;
          animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
}
.media {
  margin-top: 15px;
}
.media:first-child {
  margin-top: 0;
}
.media,
.media-body {
  overflow: hidden;
  zoom: 1;
}
.media-body {
  width: 10000px;
}
.media-object {
  display: block;
}
.media-right,
.media > .pull-right {
  padding-left: 10px;
}
.media-left,
.media > .pull-left {
  padding-right: 10px;
}
.media-left,
.media-right,
.media-body {
  display: table-cell;
  vertical-align: top;
}
.media-middle {
  vertical-align: middle;
}
.media-bottom {
  vertical-align: bottom;
}
.media-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.media-list {
  padding-left: 0;
  list-style: none;
}
.list-group {
  padding-left: 0;
  margin-bottom: 20px;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.list-group-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
a.list-group-item {
  color: #555;
}
a.list-group-item .list-group-item-heading {
  color: #333;
}
a.list-group-item:hover,
a.list-group-item:focus {
  color: #555;
  text-decoration: none;
  background-color: #f5f5f5;
}
.list-group-item.disabled,
.list-group-item.disabled:hover,
.list-group-item.disabled:focus {
  color: #777;
  cursor: not-allowed;
  background-color: #eee;
}
.list-group-item.disabled .list-group-item-heading,
.list-group-item.disabled:hover .list-group-item-heading,
.list-group-item.disabled:focus .list-group-item-heading {
  color: inherit;
}
.list-group-item.disabled .list-group-item-text,
.list-group-item.disabled:hover .list-group-item-text,
.list-group-item.disabled:focus .list-group-item-text {
  color: #777;
}
.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.list-group-item.active .list-group-item-heading,
.list-group-item.active:hover .list-group-item-heading,
.list-group-item.active:focus .list-group-item-heading,
.list-group-item.active .list-group-item-heading > small,
.list-group-item.active:hover .list-group-item-heading > small,
.list-group-item.active:focus .list-group-item-heading > small,
.list-group-item.active .list-group-item-heading > .small,
.list-group-item.active:hover .list-group-item-heading > .small,
.list-group-item.active:focus .list-group-item-heading > .small {
  color: inherit;
}
.list-group-item.active .list-group-item-text,
.list-group-item.active:hover .list-group-item-text,
.list-group-item.active:focus .list-group-item-text {
  color: #c7ddef;
}
.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8;
}
a.list-group-item-success {
  color: #3c763d;
}
a.list-group-item-success .list-group-item-heading {
  color: inherit;
}
a.list-group-item-success:hover,
a.list-group-item-success:focus {
  color: #3c763d;
  background-color: #d0e9c6;
}
a.list-group-item-success.active,
a.list-group-item-success.active:hover,
a.list-group-item-success.active:focus {
  color: #fff;
  background-color: #3c763d;
  border-color: #3c763d;
}
.list-group-item-info {
  color: #31708f;
  background-color: #d9edf7;
}
a.list-group-item-info {
  color: #31708f;
}
a.list-group-item-info .list-group-item-heading {
  color: inherit;
}
a.list-group-item-info:hover,
a.list-group-item-info:focus {
  color: #31708f;
  background-color: #c4e3f3;
}
a.list-group-item-info.active,
a.list-group-item-info.active:hover,
a.list-group-item-info.active:focus {
  color: #fff;
  background-color: #31708f;
  border-color: #31708f;
}
.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
}
a.list-group-item-warning {
  color: #8a6d3b;
}
a.list-group-item-warning .list-group-item-heading {
  color: inherit;
}
a.list-group-item-warning:hover,
a.list-group-item-warning:focus {
  color: #8a6d3b;
  background-color: #faf2cc;
}
a.list-group-item-warning.active,
a.list-group-item-warning.active:hover,
a.list-group-item-warning.active:focus {
  color: #fff;
  background-color: #8a6d3b;
  border-color: #8a6d3b;
}
.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
}
a.list-group-item-danger {
  color: #a94442;
}
a.list-group-item-danger .list-group-item-heading {
  color: inherit;
}
a.list-group-item-danger:hover,
a.list-group-item-danger:focus {
  color: #a94442;
  background-color: #ebcccc;
}
a.list-group-item-danger.active,
a.list-group-item-danger.active:hover,
a.list-group-item-danger.active:focus {
  color: #fff;
  background-color: #a94442;
  border-color: #a94442;
}
.list-group-item-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}
.panel-body {
  padding: 15px;
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.panel-heading > .dropdown .dropdown-toggle {
  color: inherit;
}
.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
}
.panel-title > a,
.panel-title > small,
.panel-title > .small,
.panel-title > small > a,
.panel-title > .small > a {
  color: inherit;
}
.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.panel > .list-group,
.panel > .panel-collapse > .list-group {
  margin-bottom: 0;
}
.panel > .list-group .list-group-item,
.panel > .panel-collapse > .list-group .list-group-item {
  border-width: 1px 0;
  border-radius: 0;
}
.panel > .list-group:first-child .list-group-item:first-child,
.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
  border-top: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.panel > .list-group:last-child .list-group-item:last-child,
.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
  border-bottom: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0;
}
.list-group + .panel-footer {
  border-top-width: 0;
}
.panel > .table,
.panel > .table-responsive > .table,
.panel > .panel-collapse > .table {
  margin-bottom: 0;
}
.panel > .table caption,
.panel > .table-responsive > .table caption,
.panel > .panel-collapse > .table caption {
  padding-right: 15px;
  padding-left: 15px;
}
.panel > .table:first-child,
.panel > .table-responsive:first-child > .table:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.panel > .table:first-child > thead:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
  border-top-left-radius: 3px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
  border-top-right-radius: 3px;
}
.panel > .table:last-child,
.panel > .table-responsive:last-child > .table:last-child {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
  border-bottom-left-radius: 3px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
  border-bottom-right-radius: 3px;
}
.panel > .panel-body + .table,
.panel > .panel-body + .table-responsive,
.panel > .table + .panel-body,
.panel > .table-responsive + .panel-body {
  border-top: 1px solid #ddd;
}
.panel > .table > tbody:first-child > tr:first-child th,
.panel > .table > tbody:first-child > tr:first-child td {
  border-top: 0;
}
.panel > .table-bordered,
.panel > .table-responsive > .table-bordered {
  border: 0;
}
.panel > .table-bordered > thead > tr > th:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,
.panel > .table-bordered > tbody > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,
.panel > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-bordered > thead > tr > td:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,
.panel > .table-bordered > tbody > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,
.panel > .table-bordered > tfoot > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
  border-left: 0;
}
.panel > .table-bordered > thead > tr > th:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,
.panel > .table-bordered > tbody > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,
.panel > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-bordered > thead > tr > td:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,
.panel > .table-bordered > tbody > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,
.panel > .table-bordered > tfoot > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
  border-right: 0;
}
.panel > .table-bordered > thead > tr:first-child > td,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,
.panel > .table-bordered > tbody > tr:first-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,
.panel > .table-bordered > thead > tr:first-child > th,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,
.panel > .table-bordered > tbody > tr:first-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
  border-bottom: 0;
}
.panel > .table-bordered > tbody > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,
.panel > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-bordered > tbody > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,
.panel > .table-bordered > tfoot > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
  border-bottom: 0;
}
.panel > .table-responsive {
  margin-bottom: 0;
  border: 0;
}
.panel-group {
  margin-bottom: 20px;
}
.panel-group .panel {
  margin-bottom: 0;
  border-radius: 4px;
}
.panel-group .panel + .panel {
  margin-top: 5px;
}
.panel-group .panel-heading {
  border-bottom: 0;
}
.panel-group .panel-heading + .panel-collapse > .panel-body,
.panel-group .panel-heading + .panel-collapse > .list-group {
  border-top: 1px solid #ddd;
}
.panel-group .panel-footer {
  border-top: 0;
}
.panel-group .panel-footer + .panel-collapse .panel-body {
  border-bottom: 1px solid #ddd;
}
.panel-default {
  border-color: #ddd;
}
.panel-default > .panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.panel-default > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ddd;
}
.panel-default > .panel-heading .badge {
  color: #f5f5f5;
  background-color: #333;
}
.panel-default > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ddd;
}
.panel-primary {
  border-color: #337ab7;
}
.panel-primary > .panel-heading {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.panel-primary > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #337ab7;
}
.panel-primary > .panel-heading .badge {
  color: #337ab7;
  background-color: #fff;
}
.panel-primary > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #337ab7;
}
.panel-success {
  border-color: #d6e9c6;
}
.panel-success > .panel-heading {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.panel-success > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #d6e9c6;
}
.panel-success > .panel-heading .badge {
  color: #dff0d8;
  background-color: #3c763d;
}
.panel-success > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #d6e9c6;
}
.panel-info {
  border-color: #bce8f1;
}
.panel-info > .panel-heading {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.panel-info > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #bce8f1;
}
.panel-info > .panel-heading .badge {
  color: #d9edf7;
  background-color: #31708f;
}
.panel-info > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #bce8f1;
}
.panel-warning {
  border-color: #faebcc;
}
.panel-warning > .panel-heading {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.panel-warning > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #faebcc;
}
.panel-warning > .panel-heading .badge {
  color: #fcf8e3;
  background-color: #8a6d3b;
}
.panel-warning > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #faebcc;
}
.panel-danger {
  border-color: #ebccd1;
}
.panel-danger > .panel-heading {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.panel-danger > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ebccd1;
}
.panel-danger > .panel-heading .badge {
  color: #f2dede;
  background-color: #a94442;
}
.panel-danger > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ebccd1;
}
.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden;
}
.embed-responsive .embed-responsive-item,
.embed-responsive iframe,
.embed-responsive embed,
.embed-responsive object,
.embed-responsive video {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.embed-responsive-16by9 {
  padding-bottom: 56.25%;
}
.embed-responsive-4by3 {
  padding-bottom: 75%;
}
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
}
.well blockquote {
  border-color: #ddd;
  border-color: rgba(0, 0, 0, .15);
}
.well-lg {
  padding: 24px;
  border-radius: 6px;
}
.well-sm {
  padding: 9px;
  border-radius: 3px;
}
.close {
  float: right;
  font-size: 21px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  filter: alpha(opacity=50);
  opacity: .5;
}
button.close {
  -webkit-appearance: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
}
.modal-open {
  overflow: hidden;
}
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: none;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal.fade .modal-dialog {
  -webkit-transition: -webkit-transform .3s ease-out;
       -o-transition:      -o-transform .3s ease-out;
          transition:         transform .3s ease-out;
  -webkit-transform: translate(0, -25%);
      -ms-transform: translate(0, -25%);
       -o-transform: translate(0, -25%);
          transform: translate(0, -25%);
}
.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
       -o-transform: translate(0, 0);
          transform: translate(0, 0);
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
          box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}
.modal-backdrop.fade {
  filter: alpha(opacity=0);
  opacity: 0;
}
.modal-backdrop.in {
  filter: alpha(opacity=50);
  opacity: .5;
}
.modal-header {
  min-height: 16.42857143px;
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
.modal-footer .btn + .btn {
  margin-bottom: 0;
  margin-left: 5px;
}
.modal-footer .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer .btn-block + .btn-block {
  margin-left: 0;
}
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto;
  }
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
  .modal-sm {
    width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    width: 900px;
  }
}
.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.4;
  filter: alpha(opacity=0);
  opacity: 0;
}
.tooltip.in {
  filter: alpha(opacity=90);
  opacity: .9;
}
.tooltip.top {
  padding: 5px 0;
  margin-top: -3px;
}
.tooltip.right {
  padding: 0 5px;
  margin-left: 3px;
}
.tooltip.bottom {
  padding: 5px 0;
  margin-top: 3px;
}
.tooltip.left {
  padding: 0 5px;
  margin-left: -3px;
}
.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: #000;
  border-radius: 4px;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.top .tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-left .tooltip-arrow {
  right: 5px;
  bottom: 0;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-right .tooltip-arrow {
  bottom: 0;
  left: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
}
.tooltip.left .tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #000;
}
.tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-left .tooltip-arrow {
  top: 0;
  right: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-right .tooltip-arrow {
  top: 0;
  left: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  max-width: 276px;
  padding: 1px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: left;
  white-space: normal;
  background-color: #fff;
  -webkit-background-clip: padding-box;
          background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
}
.popover.top {
  margin-top: -10px;
}
.popover.right {
  margin-left: 10px;
}
.popover.bottom {
  margin-top: 10px;
}
.popover.left {
  margin-left: -10px;
}
.popover-title {
  padding: 8px 14px;
  margin: 0;
  font-size: 14px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 5px 5px 0 0;
}
.popover-content {
  padding: 9px 14px;
}
.popover > .arrow,
.popover > .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.popover > .arrow {
  border-width: 11px;
}
.popover > .arrow:after {
  content: "";
  border-width: 10px;
}
.popover.top > .arrow {
  bottom: -11px;
  left: 50%;
  margin-left: -11px;
  border-top-color: #999;
  border-top-color: rgba(0, 0, 0, .25);
  border-bottom-width: 0;
}
.popover.top > .arrow:after {
  bottom: 1px;
  margin-left: -10px;
  content: " ";
  border-top-color: #fff;
  border-bottom-width: 0;
}
.popover.right > .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-right-color: #999;
  border-right-color: rgba(0, 0, 0, .25);
  border-left-width: 0;
}
.popover.right > .arrow:after {
  bottom: -10px;
  left: 1px;
  content: " ";
  border-right-color: #fff;
  border-left-width: 0;
}
.popover.bottom > .arrow {
  top: -11px;
  left: 50%;
  margin-left: -11px;
  border-top-width: 0;
  border-bottom-color: #999;
  border-bottom-color: rgba(0, 0, 0, .25);
}
.popover.bottom > .arrow:after {
  top: 1px;
  margin-left: -10px;
  content: " ";
  border-top-width: 0;
  border-bottom-color: #fff;
}
.popover.left > .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-right-width: 0;
  border-left-color: #999;
  border-left-color: rgba(0, 0, 0, .25);
}
.popover.left > .arrow:after {
  right: 1px;
  bottom: -10px;
  content: " ";
  border-right-width: 0;
  border-left-color: #fff;
}
.carousel {
  position: relative;
}
.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.carousel-inner > .item {
  position: relative;
  display: none;
  -webkit-transition: .6s ease-in-out left;
       -o-transition: .6s ease-in-out left;
          transition: .6s ease-in-out left;
}
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  line-height: 1;
}
@media all and (transform-3d), (-webkit-transform-3d) {
  .carousel-inner > .item {
    -webkit-transition: -webkit-transform .6s ease-in-out;
         -o-transition:      -o-transform .6s ease-in-out;
            transition:         transform .6s ease-in-out;

    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    -webkit-perspective: 1000;
            perspective: 1000;
  }
  .carousel-inner > .item.next,
  .carousel-inner > .item.active.right {
    left: 0;
    -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
  }
  .carousel-inner > .item.prev,
  .carousel-inner > .item.active.left {
    left: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
            transform: translate3d(-100%, 0, 0);
  }
  .carousel-inner > .item.next.left,
  .carousel-inner > .item.prev.right,
  .carousel-inner > .item.active {
    left: 0;
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
  }
}
.carousel-inner > .active,
.carousel-inner > .next,
.carousel-inner > .prev {
  display: block;
}
.carousel-inner > .active {
  left: 0;
}
.carousel-inner > .next,
.carousel-inner > .prev {
  position: absolute;
  top: 0;
  width: 100%;
}
.carousel-inner > .next {
  left: 100%;
}
.carousel-inner > .prev {
  left: -100%;
}
.carousel-inner > .next.left,
.carousel-inner > .prev.right {
  left: 0;
}
.carousel-inner > .active.left {
  left: -100%;
}
.carousel-inner > .active.right {
  left: 100%;
}
.carousel-control {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 15%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
  filter: alpha(opacity=50);
  opacity: .5;
}
.carousel-control.left {
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, .0001)));
  background-image:         linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
  background-repeat: repeat-x;
}
.carousel-control.right {
  right: 0;
  left: auto;
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .0001)), to(rgba(0, 0, 0, .5)));
  background-image:         linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
  background-repeat: repeat-x;
}
.carousel-control:hover,
.carousel-control:focus {
  color: #fff;
  text-decoration: none;
  filter: alpha(opacity=90);
  outline: 0;
  opacity: .9;
}
.carousel-control .icon-prev,
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  position: absolute;
  top: 50%;
  z-index: 5;
  display: inline-block;
}
.carousel-control .icon-prev,
.carousel-control .glyphicon-chevron-left {
  left: 50%;
  margin-left: -10px;
}
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-right {
  right: 50%;
  margin-right: -10px;
}
.carousel-control .icon-prev,
.carousel-control .icon-next {
  width: 20px;
  height: 20px;
  margin-top: -10px;
  font-family: serif;
  line-height: 1;
}
.carousel-control .icon-prev:before {
  content: '\2039';
}
.carousel-control .icon-next:before {
  content: '\203a';
}
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 15;
  width: 60%;
  padding-left: 0;
  margin-left: -30%;
  text-align: center;
  list-style: none;
}
.carousel-indicators li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 1px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #000 \9;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #fff;
  border-radius: 10px;
}
.carousel-indicators .active {
  width: 12px;
  height: 12px;
  margin: 0;
  background-color: #fff;
}
.carousel-caption {
  position: absolute;
  right: 15%;
  bottom: 20px;
  left: 15%;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
}
.carousel-caption .btn {
  text-shadow: none;
}
@media screen and (min-width: 768px) {
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-prev,
  .carousel-control .icon-next {
    width: 30px;
    height: 30px;
    margin-top: -15px;
    font-size: 30px;
  }
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .icon-prev {
    margin-left: -15px;
  }
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next {
    margin-right: -15px;
  }
  .carousel-caption {
    right: 20%;
    left: 20%;
    padding-bottom: 30px;
  }
  .carousel-indicators {
    bottom: 20px;
  }
}
.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-footer:before,
.modal-footer:after {
  display: table;
  content: " ";
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-footer:after {
  clear: both;
}
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.pull-right {
  float: right !important;
}
.pull-left {
  float: left !important;
}
.hide {
  display: none !important;
}
.show {
  display: block !important;
}
.invisible {
  visibility: hidden;
}
.text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
.hidden {
  display: none !important;
}
.affix {
  position: fixed;
}
@-ms-viewport {
  width: device-width;
}
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  display: none !important;
}
.visible-xs-block,
.visible-xs-inline,
.visible-xs-inline-block,
.visible-sm-block,
.visible-sm-inline,
.visible-sm-inline-block,
.visible-md-block,
.visible-md-inline,
.visible-md-inline-block,
.visible-lg-block,
.visible-lg-inline,
.visible-lg-inline-block {
  display: none !important;
}
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-block {
    display: block !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline {
    display: inline !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm {
    display: block !important;
  }
  table.visible-sm {
    display: table;
  }
  tr.visible-sm {
    display: table-row !important;
  }
  th.visible-sm,
  td.visible-sm {
    display: table-cell !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline {
    display: inline !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md {
    display: block !important;
  }
  table.visible-md {
    display: table;
  }
  tr.visible-md {
    display: table-row !important;
  }
  th.visible-md,
  td.visible-md {
    display: table-cell !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline {
    display: inline !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg {
    display: block !important;
  }
  table.visible-lg {
    display: table;
  }
  tr.visible-lg {
    display: table-row !important;
  }
  th.visible-lg,
  td.visible-lg {
    display: table-cell !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline {
    display: inline !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline-block {
    display: inline-block !important;
  }
}
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}
.visible-print {
  display: none !important;
}
@media print {
  .visible-print {
    display: block !important;
  }
  table.visible-print {
    display: table;
  }
  tr.visible-print {
    display: table-row !important;
  }
  th.visible-print,
  td.visible-print {
    display: table-cell !important;
  }
}
.visible-print-block {
  display: none !important;
}
@media print {
  .visible-print-block {
    display: block !important;
  }
}
.visible-print-inline {
  display: none !important;
}
@media print {
  .visible-print-inline {
    display: inline !important;
  }
}
.visible-print-inline-block {
  display: none !important;
}
@media print {
  .visible-print-inline-block {
    display: inline-block !important;
  }
}
@media print {
  .hidden-print {
    display: none !important;
  }
}
/*# sourceMappingURL=bootstrap.css.map */

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.4'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.4'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.4'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.4'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.4'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.4'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.4'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.4'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.4'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.4'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.4'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $(document.body).height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

�N  AM                 �   LP                      ',                  ( G L Y P H I C O N S   H a l f l i n g s    R e g u l a r   x V e r s i o n   1 . 0 0 9 ; P S   0 0 1 . 0 0 9 ; h o t c o n v   1 . 0 . 7 0 ; m a k e o t f . l i b 2 . 5 . 5 8 3 2 9   8 G L Y P H I C O N S   H a l f l i n g s   R e g u l a r     BSGP                 �� M M F�����٣(uʌ<0D�B/X�N�� CC�^�rmR2sk��PJ"5+�gl�W*i�W�/E�4#�ԣU�~�f��UD�Ĺ�����J�1�/!��/���s�7��k���(���hN��8o��d$yq��1���9�@-��HG���S"�Fj�ؠ6C3��&�����W51����B��a��QaR�U/��{*���� �=�@d��h$�1�Tۗnc+c��A���	�Zɀ�@Q�c�a���l��2>�K��m�' ��C�HMĬfB�X�,�Y��p�e��
U��*Ҕz�
m���iO1nE�.���hx!aC
XT�V������R��%�|I�H���P�5"�b�N��=���r�/_�R����_�%҄�uz��Ҙ�5�2ġ��P�)������F�7S�q�F�{n�ia���@D�s�;�}9⬥?ź���R{�Tk�;޵ǜ�U\N�Z��Q-�^�s�7�f0���S3A�_n��`W7Pp����i��!�g�/�_p���Z�-=�ץ~WZ#/�4 KF `� ��z��0�|	D�ѵ � �&däI����Ï�;�M�{'�om��m�I!wi9|H:�ۧ�������{�~���q���O�����,� �L]&�J0��9/�9&�Y�蓰{;��'�3`�e @vH�yDZ$� �3���Dx28�W� Cx5xw�B`�$C$'��El�y��h��ԀDJ
$(p���QA�A܉A�@'�$hp�0�V0 `��s��e�$�4$"t2=f��4�A�{Tk�0|rH������`L&��s�h�]��A<����`R�'��!���1N�;�_�t3�#� ������V��*ve�F`E O$�{)�W=p:���F`��2��2ړC����^�.�ć�����G�<<?���~z������>�.p�Ne2��ִ��+Y�s�l:��˼�ܫu5�����t�u�^8��6��ȄTmy�Q�%�u~��%~1rҘa�wߚ^��_�Z��Z�a���0!������N�`�.�uq����YB�\����ᨀ��[e�����:@��J'Eہ,�3ubj@�p������f����eW9(	�����ޅ���=�l�G��7gj �S�M6����0��9�Oˑ����l��B�a�݁��<����Bՙ(VRAp�f�^���+g9�q�����M�t]�ت�p�E��r@]�@��V��kV�
u��d�^�X ���R@?E��Y2�����]#�Ǽ�4�J��K����'���d��PC|m�m�n�#��$+48u'���e&���[n[L������%{BCD�L:^!����bƙ:&����g3�-3��u�������biLZ�ڂW�FS��Id��6.�k5P�l7�7�Uz�T:N�N���.�"����)����['�|U"A�����I���v�w���p��t�dk���9���嫫�9 n�D�mq��7I|6�Kbc�]�M���������B�A��B�Ȫ _�J�T��q � 6@����F�����hd`G��T��:M�7'��L,�Ih��FP	��~j ������$¡ �3�hA�� ��-S�^�چ����-%qe���~��Qq���ln"i��&����Qe?FlK�"�As�(�3Y;"�L���e�t�'�Rz<MW!��S�3$rZ:��b�-^Ǆ/�$Q��q�JB'Wd�GAO����`.�(	���o�3�B0���ɑ�1��p(���(*�o�^�Ǫk��J`v��[���C|9�=����#��A��Q���# ���7;.]L:��ϸc���d���i��Esr�����6?�}��e�@H-� b���ƖC�1;����. v.�ɾ$`T������ JW����%B�Z�I04����^:kU,��C�^�WVF����`�F�b��(�O��O��2<��@�X�u� ��g~�ɑ�W �t�&1\�1�L�:φ��"�!�P�����3/���^��ǰ�q��w`IA��D
�)�q�C�f��O�� ��0�2Y29�3N��f�p�����\ �C���ah��&�6�p�`�ځz�g�B
hRf� ��];]�#pw_t(�pq꿏ٷ,���bdk�R��B����T?��2����2�c�F�y2��%���C�n�9����0����9E&#�l�T__�Sлg�)eh/ڷ+�#:FGot�k5Gbr;Cb˴�:���#��ɜ	& �� QC��w����mxlN��q����P��)�͐3f-v5K���h��0Aכ���j�nSp�	��^H��G�F��f� ��H�	 "%[ѻ��� @ ��p �a��α �$$��͂�*��_�\��@>M��10�{=��)���K�%�$C
���9�M����4c	�Eotj��V�GD�)l�8��,�\w���! %$��3t�		TBz��Ҵ	iUJ��[��xgd�Br�$�!eq���"J>��	)\�~����3�(^�R8#>�b��H��G'7_fӫcκtD oAA߃�(q�B<�`��`V����Ϋ��֘�*�b��u�P�4v@�+��.���Q�ԥ$V����@C0
�R��ܐP[�z:X�H#e���s�>?�E�WO>@I�$|s��i�
ES��)0A�?�9�ab,��@K��̩o&�����Q�%�ϞLu+�
�+�H|�Ɛ?�NK�4����CnPt�'OT��.j5�Ĵ8��v�w֜��I�&�+�`��yS��caO[#�g��Q�����d�[�K�I矗`�ČLP���	#���� �)2�7aT���i@c\ސ�����0n�C�p�ߖ運4͵��x�*���R�z�Y�b����T[\�kU�v�Hʈ�q�p঄I��I�ŗ)�bB	X�P�N���tz�	2I�==� ������;}�b���q��jiކ�a�#"	��>1����1�A��p1���P��O��O�ux�Q�����
Fϲ(�h݄�O'MDx�L�K$ȵ�h�&���� 1���4��Si���rHJ�P�t DM�;rM�+���
*����ؗ5u2$�f3�K �<�P�L�r�c�I)����^�da>
%��ѳb(���@,�2f,~"�7�R;�E��;���HX�(���4�2Z��' T�ۿ������2J+�^!#o����Y~4�-׃�GW*�!��A�0&8�f�{`����W�=�DP8�'�= �R� g�}�iP>��#���4��E�BRY��^4e�����N8��V,[B��Ĩ�D#�X��]�,���LBsNC>+��o��^x��
�����jC�.4�Ya�_{e�A2=r���+ ������9PO�A!!
�}�Y�PJe���Gn��%x��1�/}RgH��a�^3-�� �5
�|�qS���aWK{1al`I�1���Q��f_yyCZ)�L3X�]W6@DM�T�<.��u�G�K��8�Ds��бW�r��\�7Z\����V�"I����S���d��>C���U�j���e����D	�3M�tWcP����Ӊ6#3Q��nቩ��J\���7�#磱`؀K�� ��lV6&�T��	�~��l.���� <��BP
�*�!zRZ��eљ���ٷT�#�C�LH����W�)�D����p�YU#��51{WJ���4^�f�̼Z����y6�ӑT2�d�4H=�B�Ҋ��}�&݃��,aPçv+:2�~��*0����d�ɓ��փd	���!"A+�r �Hn���sA���ڗU����b�H��N6�$.�l�};�@���iK� \�҂:v�QE� :,|��Q� Y0|�%�@�� ܁�qc���dqh��諹v�C�GV�����-(��m��1���q89KF��ä
"2��}Rrz�,j^��q�\�ݖ#p��+�`fl�����:k�t�5E�OaI�J�P@ps�E�j1�4;6��/aH�.��ӰT X�p�L���L8��F�ܚi�l�1��Y؊8�%�!/��{�����霋���X���b���� N��xp���PW�����cI9g�*�����%:��L��u��CAO��%�/œ�(Y��^�?����&I'��uh[x���Q�$�zҵŽ��	߳���(=V׀���m��U)��lΠΒ��i��d㦈���~f��jG���R{D�%>���@���6���1��`�!� ` ���wY�����k/a�0A��¹�ԁ��Yh�����d��x��k:f�����<���WL4�`8IYMB�Slc������-�E҂'�ڌ�:,�D�������Ʃ84�)~��2�j���Ǡi��B(L�|"a����4,�b8���ԓi 94�����jWщ��6*��T��c4g�̓��UM�b�R�E �����C5��)j�ȴ ��1�6pb���ƎH���Fx������ģ�%4��Q��C�ʈ��	$9�:�M>�E��a��o��̟^��<Iw� Ygq�7s[���	-y�1ع5��a��MK�א�RB�Y���Fq}����8���*�Nt�'.Yb������Z��v�K
(�]&ɜ�(�ՙ��2�:0���o�ΏхPKiBH4U�X,���[��$
0�mX��ش�� �f�5�0��VR�8�%����ާ�Dt��U��s`��-BP��z�P�s���vI�8z-�t1DiB
��"˶��YTJ	��.�?�0�7��jL��N��[2�t��Į̎��� �#�6?E׻�������:ɞ�Y;��A&q��S�IR�)�ss
9*x��0Bj)m��H�A��hyЏh�Mm�&4Ŋ�4�����g��V�&tY����OCS0�Y��d7Mv�N�j)w��A�(��o"͢�[��
E`�����7ez�ď����-�Q�]�6�+Bca�@^I�:�һ����=�����sS���nc���	6���O�B�4����L���Gp�B�q/<�zA��C��� ��A~��x�06rih��h�I�طO�N,:o��k�����/�{H�,�zЂg�fȻz���΀5��F��Tr�n/�t``l���*H6jT�tG/x��@P@(��I�p�e�!��`wv,:A쑜�N� 4}09z�qC���$r ��M`Y�Q����M�䕫���(|�B!�>���>�O	pwj A*@����J�C[h&3���B Qb�ϩ8�:�%f~�v/�l�S����0�����0a���"<TX�@�&���Jg�3ϕ��HF��o��I8��{��:YT��b(��P�j�<za{��wX�oa�04 �3��l��GȶN��0>�B�8(f	�uGoǚ�gy���t�_�y~�͔�
�%����m��L
��!I$�X<T+�3��dq�
D�M��t��2|fEV([�]�Ndb��D3Sp'R�G�m�K��<�T��ٰ }�5iܷ�ʹ���p����#�&jF�Z�'���2�%y9�Q#2�H]w�A�}�vf������%�����X�Ӛ��)�X_�S0�t�(���-��ⰓjHp��Ӗv��/���詵�,9�w<`�E��
��F�agA�ٓ�Љt��)l�e
���;���$9����{�C��� ��()��?���p���IF����������b3���l[):�drr]�?�Ֆ��?��Bd�i�D������7��hJ��:
��U%n�3aƬJ.�>t0���~�e�P�z��]�U�gН=_�?���.j#+`li��	B���M5�� ��őG�p��7�a
�֒�%Y[UG9����@\bD��Y��{��{��ED0��
�$��Q�+FvC�`ݨ�3��Q�	��E\��uC9���![�$�l��������6�D�o�Dg�G�*+�X!��%#�C�q�?�8ZUB)U@o��pgީ�Z�q����8��9���|uc�cAќ����W;�@�"���>P����h_���9}.6���V/�O:�3�}��ZS���{:��~�����y�k�c���O6;O�B�=�bV�.	R�k�
o���^�GV=�� }�oI"+�
]w���F��zϷ��`<����30��h���3]�Rf���859s�`K�M��8��
X�Uq�<���\���ZO�ss�M��&j&����	.�%���P�BL~^����G�ˈ�3p�D���:���Z������<\�Ǡi���W̆���"(��:���z���X�~��0PG]8������RQMNT �qf�W~!�0�R%Ց�0�xvGFy/F�-��w�u�/��*�+��	\��8@�6��������c<��L�;c�[������ºnr	�QS'o�Qu�T�{qҐ�_�Ϳ���Sd��A*ð:m�8Yuz2�PB��Hh`l�k�p��LLh
cEb6eۏ ҋ ?!��>|*=V����K�@��rx�0�G`%ryr[6�Y3�7���f*�*n��%9��df��1�1ޢځ^'��]���R���q���.��� ,�����^%��l����e��#wW��s�56!�=��!q[����� %�Ԯ]�5^:��m�5�)?�Vb|�u�7f���w�����,:�Ye�R%�
�[�����o g�F�Az�FP������x���{���d�xí�w�8���ٔ{{L> ��d��2C� L����L�,�L��,��(�mS�������$=�|%�֝lu�&	ą�83��
N�X�x�\Vn���J[)I��w��/�鹻���|�Gź��Y����DH���*�S������p6�0�c�J2�@�W�%Ѧc�_^�$��#*:G���6���n>�D;����~�`9�hXB �U��JB_в���ˈ�%����w'�$��v|#T<68�KM�ϑ-�5U+���'�B
�ĪN����bJ��Ov'��|��+*M��k(d�}�C�˱@���q���&�aR%}�
�!�VЃ�s3w2���a�2���awH�z�/��Q0�F� �]~;��ä��� ND�P
m��K3x��ke_������S�!��V&=�����v�_P��L9؃Y��i�
�NU��_���)���J6�9�f*��S	� �1 7�F|�BR$��y,Ʊ.���&=uqs��OD��B���R�=��ɳ�e�ؽɇ�B����H����
�2lu'�h7^#�S�)�Xi2..P e�/@F�K��$�](�%�|�2��Y1pC��8t��I��11N//+\��p�j����d���� W�m��I=߽��Y�Zx��MЉP�8��1/JG���^U	,P�d1O��^�y�pq�l���2h��$�jv���������I��%�������]V���
. '[+WU8��[��D����,߻�-=[����O

w����E�)�3������J&�d�قݶR¡��S�\.� �5J$I�&��o��Hȳ~� l���z>�
Ux/�H��u;�?Gt�{?��;�T���H �L�|F�8��}��{��p:�2t�͆<L�CA`���ʘ��Ç득��+'	������oR0D?A�ClI���Z1���F?j᧴���{^ �E�dGI��T���&#eJ}��ɣ_m�� i���A3�K["o�C�TJEߞ4�c$�jݍbY�nathY �`YG���ei����(�a�#ps�W���i-1���b��,ʎT�cm��bhv9jh��3�t�4�@z�K���Ꙇf�jĖ�\$5P��!�hR��$P�
M�њ`�����C�C^%2�]uOs��LTx���p�Y��!�UƜ{��' ����yL� +��l�J�8� ��)@�w�$F5t4����$�,��34aT��&���݄�Ui��+���-಑-��,��{!/\���ς��'&�S�� ��0xk�Y���0I�)�'����~�� �꫕j��#�m!�-TQ`���=�=�KR���,.is�gI&jf�-I�(��~���o��,�i���傌t&�\���`͞���ҕ,�Y��Gܑu��I(~[�!2=��������h��&I���{8~4��
�j(*��aA�T�R�?b�0�I��K�P�
����M��^c���Yf3��-��J��c��r�;�ru��GuA�T1?Q���8D�py�y�+��c���@6!�[o���f��Zp� ��ɲ�`$�Q��!��O�� �4���|���qi��L^��_ǀM+�ƾQb��#7Ճ��X5=��qQ���!�i���m~����������u�ݢ����	r(48zr�Y;�*1�yNk�$9j���ip+�q]��g�i�f������f�ԥ׾���׻�>a��ѧp6���������5Y"L�D���.�r��V�����S_���k��]�n&�H��z�~�9�æ
�p$�4ق��'�{�&�����M\�ΰ�ч��!�q�i�� ��(.h�'�B�T���|�{I�6cL�.���빍iI�꫿\!�;��g`1����j%C �o�3*60��E��؎�]t�.�-%0Y�K�_nft] �*VFC�tJ���T�+�\WZ�8�����gF����^
ޞf�� 5�I=���#6�.@�2z��;W�`�B/ęQ��g��h�jyJ����N�AX�3��,��� K�6��6�ڲ�M0�T@���O{���4kj�|"�ftџ�ۄU��<-��a����5b��)�^R��8�����:��il����Ka�6@���!���]�buvΏ$	�oU��~:.�L�t���e�� ���JξP
l$S[z��~Rq39钺��9�Q��/�m"�%ʤ����7��	��5MKL�鑧"IߏG�	�XTގXL�F�ݧVj�p^�/M�g�ۻ{���w�
�*����9���O�ʈ<�"a����A���q����.M� 2@m��p�^�'�wߕm��kxO8�$[�&��|Y�Zy�`2_|%r��/�J?�Q��Ṉl�3Þ��K�E$�w�vC�h��a@�U�1�M��%0?1*��$G�Z�{!|�ʿ�$��ە�-�٪Ev;��͓:���`Bl�˸�쌧�ɬ�oQ�0&�����,�F?����^�s,�c���h˕�$�E�cl0��w`�⏺�ň�@/�r^l�8cT�3���k@���J�ݔ�uP�&ʪN��d�JjT�K��i	��*u���X�{t�j~�ɡ}��i\B�Ken�ȵ|N����u���#�]@l�CZ$iP�a�㸩t04y20�s�֪�,Au�!Q��B�ϖ��^�@Vsɑ��\�Z�a�7�쾉���ш��6-T�r���U���u��~�1H�J�(<α�����bRԖ�qi����J?�e�G ��*jVħ"���:Y);�-F�d�!�H���G~��u�x	cb�6m���)&;�0��dU?�8�X~�1�2��ۼ�t��I �x�5��{(�z��
�'���[�Ńk��ZЅ����i,��b�1̇����`��(��m�H�N���e�K����/
[�(��#Q��Gd�u�T��^�m���%����!(�7Kg�P=�h�ϕ�kɐU+���.[�e������C������"GD�Ψ��<*<����h�)�` A�U@O]h�l�f2��!H���F# QB��=uȾ9f�h��;"R��� �K�3-�(G	)�P��������T],7�ec�
�	F4hH�s�73ᖟ�����`�R��T�wfͳ;6B�>Ř9&�����܂�?����)�\����<&Ŏ��5	L�Ju�@Y���,�냲ھ�_w�0�^�17�����p޻�*>D�8����_)$Uź��R�!jOF��>{�����t,�-�bP�,m`D"/�z�A�͔إ��QZG�&U]�xejx��Lwv�~��=)@�B��6�?!;53/ps@t�OZS7���ؙ��n��lx����Z?�Z��ja��{��6���L4���1�2�����Q�i��&֥l�����]o=�7�ļ	of�Ж�rMEV@��H�����/��aD�٦�H����lK5)Z	OE����3��IG�'г;�D'�zl(����E���$��.ٜ�-WR'\w+)�w3�꺾�� @�%R�)�.�~�9;]�.g+)�%ȝ�k���҉��^��N�W�>b1z:s��oD
K�����2w[|>9�vWMF�u�`���ax�chի�U��`*ʆe�]O�V'6����x�d?�H]_r�A��+z�d�F��H	�ʋ<��Ǵ���kUsFz����aH��9-��� ��gv�b�=��L/�E�)��.��x9j%B�)�$���A�B����	���t b.b�AE��Z�Rb�H(���J�ya��9Wj0f��F'��X�z���$DQ�6��q��`	o��	i=���{#4��FYH�@�J�33i~�tYТ�hkH�P�����17�����Y�D�"�p�Ħ;'�16��f�pu����>�F�oD�Qi�n�̒�-��@P#��� �h�j ނ�ŀf��C� ���7°�T5HVX�p���klĭ���]��yXr�)?ͺ�BNJ�B����#��9e� &&�_0��=��pZ��6��h��)�̗�a b���=(p)�����;�.N�,��W�^*hԺ�C��m}E�7 i���6����a�I�vͲxp�*Ac#4��������N�&�`)�ĉ��H�We��y7jl��� o�Eh_n3 �	�jp?�4�p2W�E'kT_�&��!ȖjVl�H�ӻ_kɚ����ʳ�aY���� s�@�[�G"��bY�L�ܫX��i��C��q8�&�z��VaY{��#I@����2��m�!�d�[1	�A�Ƣ��nK�����eם��/>�d�m�uX:xʷ\��p�N����l�+�H+c�tSǶ��C��[��~3��e�}6� �\�,��Ʉ��|�Y�ݧ����v]�'�|����&��M�2� d�� ds�x-((76��aX��m=��ӊ��Q��<$�� ���Q���\��
��qi�H阇���i'i��$�"�{S*V�wF��/�t<����Q`ʒZ��+�pr)�(�.j�鸫I�k5�	<�ʆ�ˮ��, kO���DT��J&^7���ĪQ�����v�e
&�Z���^4��^s��D+`WH����b�6���� ���L��W{ZZ �@��mq��v�ɷ(D�\+�l���0*�V�߇�Vm����hƏ��/S`|�^\<-����6�2�N3��"To���lr��e��!��H2�p�A ֛������{�ȼ�/��� �udU2*2�"c��"p�${��y�,饋�&\�m�&�`�|x �p��C��w#���W�9D�Ii�іC���Ks�燝S���3�,����M��;j��B�4��P�2��i���f�� ɿ��bA�]a�id�������"���i!aQh�CNO������Y�
�xF$��g�9���Z`W���VB�g�����#j\˂���e�G��[�.�]��0�~X{2�D��?��"�3�B�j,�K~� b#�0�ɒL�kc�(6 �
�a�E7λ�/Վ�% � ����� ��ġR�^J���CϏZ+71X���UO,����}#�-��e٤�4�3ł��t�8��Z7��i��<:i�?Ft�Fk�CW'��f0i<�Xdj����0�W#i����eC�
zI7��B�s���.K�  *��V����d���D�lj�@��%
�܈���Z��s�ﮐsh̸%�^�
�����@8����?�N�8g�G�gr�X��S������Ap���4�z*��4���,í��t4G�n������dS�>f�Q�C��WUZ{S�;N�x��}��H&��*� 9׸�q��U1 ��a�`(M-a�G}�n�̽��0	��p���mcn����ɘ�_�\��l������}�	� �9�F�v�Hþk�JZ�NO �mZ���Q��Ҥ	aS��f��
)QC+2
d���[���	����H"t*��c*b��ڢ��q��,����#S��#��u�'Ҭ�:4�as���CDM�F�|ɸm�_�1L]��Y��\���*�X��>t�����g���D������d@&[�)8��;<�{��8<��+VG\�H���^��a��a�e�-4��s�J�A	\��hM[�\`���#�pD5Z97g;��BW�m��qTXX�%0� v����&��]E��4]�F�IJ�����&�S�_��4�R�0���D�+�me���Y	�g��O��+M{�03�v 'ͅf���t�� �:;�ر�	N��n�\ǔ^�,)1�l��aB�ZZ��[��	��	�ZS���UYh�߆��w����S�\�/�*?zQЋ�`�X4�g�r��[��CW��G�.�Y��0Q|�Rԃ�E�[w���y�)���,ш�$�NK@c/b
-#Z�I�G$Ɨ���tm��H#��)X�wPZAD|�So�f���T���H��)������>�M1�b7���ɆS�u��q�
���jK4[s���	���xL ���Ǣ��]5�!M!A�dƧN��><�:ǻZ(�8����)e��� ����/�W���|��b����<�����T?%� �:@���,-���ecMP�8u�m�V�g��9H��6���}�=�5 ���Ab�Ď���찁�Ι�V:���_�leɹ�
��v�`�0��!$`G��A"I;$�^?�����Ke	O� ���N(ս���Yy�5B��w��V�%�ju;)lF�oa����7��x���ڸ�4-��%� ��$�ֹ/zskǘ(sh>��DD�Ń�t�T�7�rur���0�Ң�`ܴh55����� �S�}������4hrva��l�c!ZjB]������x�D���b�Tx�zYS��6_�)��o��p>�#�@P�S�*�b�S\qƋx�YfQ><"����Y6���IE r_7�ҰV�H�! ��I�r�EL�6�!N� �q"'�d��a�qMv���A�%�����	�v����n<Eб�;��,�w��2pO%�r��X�H�`�uI#�/�K���;�56��LL.�MI8�q��4U�n�rɡ"s9�(��@=��}N��)?S����.�r�0L3�m7V��K HG�/�yQ���2�/Ww�F)���d)s��F�7|���vQ̴�A�Iz`�\��������䄛<>�.;��A/���2ʲ��a8D$�GWv�#̏�9�k��'���o؟�o�@���	(]gk�+}/	(nq���K(f����Ɵи�p���2��3Y����w �pD�dG�q2$��}�KӯA�"�E&N�tg'Ne�s��!Ю�4q�o}쿝�S���,o�jr/s�T�MT�&���Qf\12�h'&ctN��'T�x7��]2� ;G�	ʅ��|T�++:%/ ������1T�������ˀ�<���4������͔���˗	�,0~��!�W�O��'� ��:s�u���Ҧن��(�^ﮎ����)��7�� f���ml��ҹ�1ūt��Z��h��L0����6�X"J҂�
��4�9�� �֩B�}��ԭ`�`�����Ӓ�	#�J��n����_�F� H|��$O�K��=�œi1���7��o-H�q���p[ɫ%%:��Ɉi3۠��G C� LL�4�S�:�dB�j|��pY��S�D�P>�p�v ��5KLe�{t0��y�END$�*�;z�5��N��BI��gn��.N�|׶��n���R�aS�Z��JcH� m��X����e�k;_6�,y��b��0#�Z��Ae|w���GU�1l��LD�7ÄV�q��t[�xu�E�QUL���PB�lZSh��.��1Q0U�ٱ8R�i��p;��{��H#�GON!?��t>�Q	|p�k����q!�gT,��j��2��sǍ4툊t�j��nƛ/I�O�E!ˋnF��4����M&�1�����x�$�ew+v�S��
bm]e%8��P��
!����s��_06��)Q�2JB�����[t9���'���Ԝ,����[�f Æג�]��B�B�@���r&B�s|�Q�����g��OC��1��J D�<���U���μ�(o�!��h���K�H�� 0q����A�V��'p�f�y"Q
O��2�Z���q��#d"�@bQ�,���w)�P�\b`x�� O�)ޢd�MC�$[Ho��Wަ�va4{�Ǳ`52�����5;��X��ao K�;�6�%�R(�����хx9�8�2r�Dc��@و�����F�<�d(�AN#F�I���zmE���F=���ƚ��S��f
4�8�<'���j���-���'ǘ<�Tb�2�v�E�t��q��3qODd_��{`/�hh���`9_�1hAY|/���޷U�-͕���A���o(���"�$r؆T��PR;�.�-w>&LJ�iC`A�^���#���X8�t���H?�d��a�ĖTST�a�H�0@����U)����^e}Jb7%�ܔ%:��ƿ@ ��M�+�y�sq� ���L�������Y�00Ô�G�D�	>ĩ�AW���2�I�:��F	����3�2<k�}[{�*�"A�z0��:@���1�A:�����ܤh�X��C�񓓣9�8����E�����U��eu)[?�mt-5�r�~J�ݪ�V2li)�՞<�ҳ?�(D���;)��o  (����XI�I$����$�)�'i(��*��_��E	K��*�4C�k����wkOI�FfQ$8γ�;(0+.�9���9u�$��0��t�170��fȦǒ�aO�=T,�m;���n�� ��˸��Χ�c�<9�0�<���_�=g �QV&��B�܀�%f�3`5�F ݶ�~��`6d�.�2`?���]�}�O�0^�A�K�N\Q�(I	{����p[Ꜫ�4�$6x�P&� :�' 7u������	���&���R��d�'�ʹ#{*W����l��D�Q��̎.*ZE���c���7��|4��Ղor\�*��
HX���'�#k?WR���mP x�$ٓ]��� ׄFK� ~�4;[Ҋh2�A�ɉf���<Pdg���)�!b#Z�?0o���[��E�hX�$�����S��ؾe���N��$����=�8Ш"^	�V�cFD��x�����RX�C�X���.:F��q,���1)b�B�1�+�Q�)�_�OyE���	
�������nTp ��}1`�#
ףd-�֥#�O��ℚt��:5Ћ�/<b0�'m�oqI���B��FW��.�\k�c�5ߦ-v�T[͂������� ���-4�:dݗu��[	8:P금���BT���U����Q�,F24�l�EO�?�D�k��{�1�k6)R�̘GI��6�Yp^U��!A�@�{xg�#^/	��E�Tz��Ēʻ@:F�'\�Q6�t,��pT!i�
N!�dG�B��^
�$@yn��_u�U��C���K�_K62��B|
^����T�mr���LDgʿ�f�)!-�����o���ch�}��@o�[r�E] ��/i�WJ8�Ogb�ӁF�e�(/��EΠ�yO��LB��]IkTډa��bV���
��
	2����ց%�b���j���g��'���2�-6���D���JZe'	�oBi2��+]x;S�P���{�{Ju�m��f^L
S0�����~o�����-���S�Ec�*�vl  pOm�@ �v	-S��D;<U�C�Y������nA)�pxO�@�i�L���7�E`K\�J`�9�U$�	p�'�Տ�����3�v+ �n��%�lS�}��A��Nj0*���׳48���i%�����8��P5�c��#��T$F�?$���L~�I�QN_�MC
Tn�L�`)e|Ȑ�!d������ܑ[�s��D�\Vo��gF���G(1� ��OJB�� J�FR%p���3N�P C�S����@pM� ��vA f,- +�H�Ft�,����wfA�� ����)y���^�Ƹ}�N�+s8Z�$j�NF����i#�l���h����P!9ge]�i���h����f�v'�l��!��yn�O��]3� i��я�F�	���Pkc�\�
`���@�92�z��X��;]۩�i�%[5����p�8Q c���d��\�Lo��;jP�/���n�g���[��qB�QP;��,V�e���3�Pr�'ط�4Y��� 8��[%���c�
^�`���	��PjL>ʠ�q����:6S����]K��"���g[��	�ϑH���B�5�VEq�LJ��X{C����B����!�P�I�q9��Llx��ʪ7�>֤��]@�!@9H�!����p�ə�$	�?��)���܎�l�/"���́��+�@`}}:\����	8�zQgS��+򒤿��C��}�R:��H�UF\�X��g��/��AZ%c1�wlET �wX�ZNh����yf2D� �ø�&v�L�q�4�7����z��\�iJy��J-k�N�3���	�-�s��J5��)�V0�N0�d�\ӛd0d-��E�[mf�\�Um�x���C�R<(`�ѕ��p4^!�h�Q� `���!l� ~ƙ�:J�ɠ�l�W���9˸�ZXB=��l)`j��eVJ��U���G!�s��1�?Ƽ3��Ê.�}bIa��6�ʕ�t?����SxZJ'�p
i�,�.�����R2T`5 �-R
Bxr�WH�JP�e#Bb�|���-������[�����P������Eh���(5S���f�r��/]���IƊ��d��E#��O�S�3�9ӻ]����e��ۮ�ɹ.9_�b�e��M���9b#e��(��-� 0����Ra����9����"������U,��%�~�X�܀����z�۽{'6[@�t[W%��*.d'vR {���h��!�Aed�C�E}�x=E[|�B$7J�* B-� ,=k7�[_��-�I�������J5e�̶��{��(	��;�WMw�`����~p�A��z 8��f�))���(��@	�Īم��<���.a%N ��n�@bz��������>����%���T*?lgb�d��<�ĵ���w9Na���8;<^*%��y�:tD�ҕZ<@��0����q4����l\��1����� `/�$IJ ғsN)�;:A;�)$ו
�Ww�y%Kr�Iv\b�V��\n�d{����6t��v���/~� �*O��
7U>�8�r�AC<�j�E�-j��牷��xs�)���D���1�Ì/��q�p**̸�$ّ�,����B�ȼp��k	Mhp�K�7�U��]���h&�-�$�鎻����Y��;�q��6w�z���W��˄֭A�h��D��^R���"��s5 f���w���+�Q&�/9Ȃ���wNb�����������z{�����Y�>
]NE���c,ߞ#BF�:0��/-EȾ��׃�F\���I�{t��A�Z�C�OR�uk�i���)�ytkd�N�&�v�A���P{�����P'��>���x�Ɔ`.��%,;:Կ�:������aF�oTQ�}v#��ף���Qk��'�s������~����z5hM�Qʒ�Y>C��ʍ� ��i��U���NF#J0u��C���8k�!
f���v�{E�/���IKIE�>�p�yd��e	
ʾ�=z�:@7�J�����|��5g8��x�3�O��������
�3�H1��؄F.�y�fz��WIM����j[�.w�%�i?҆U��f|}@+[8�k7Cx��S���EOޯp�$�����Q�+��:�<�]���K�3��T-y���[N��z���;y���-HZ��Y^��.�M *�'h8��A�.�N�2r��LB�7:Or���}�C�S˚S9�Jq#�WI}*8�D!��#	g#Y�>8`�
�В��?a��2H,^���'���?���^����n�h�Oƒ��i<����Ya2�+���6a�F��a<�!��0��2�]�c:�e�K��X�X�[Ug�O�u5i�yPcV�T��5RI��A6�OԸi��C�\�����QZ�M�D�ƃ����B!X��:���\!�^��"{�E Vax$P	\$�DBBT��Ft�~��{O� �w ���5a#�`��= g��Ё�Y�2>��MG�-G�k�è��1T�b���L
�`*ـ�V�X
��*�x�e§֊�Z*c`�V�S�b���JU����*6�TK@�zqP����h���g��*ߔU�(��QU4��9L�
�cM�*��T��R!R,B�ȅE�����*C|Tz��p��F��@��4��*��������텰��ج�X�b��L�.� T2 y` ��Upb���� 
 � T ,� %@`���� #� ?@ t� ��GL��Ş S�)��ÿ�z��tϲFy׎   14 Lh �� �� f � ��e�(.)pK�@\��� X�e@ Tb�v�h�D��&�0-I�bD�	d@ ZD1�@� D�y���ѧ CN|9�4��Ӛ#Ncl���;��,�`c�X���@�(��2$0�"@-	 �$�B@� <$ А���8p7C����b�(�@�
PA@� F �0 �� t������G���OR���Ĳ�I�T�yS��MW52\T�oR�KV�0Ȏ����(
-�$�������!6���w��H�������G���O  r~�e~/�]���V~/�P~7�Sz�K���Fv`;��`9v�#
J���B�N�,�����ӭ�'�  `  �'��`\LT���ApBs�)r�!�
�(
�i�`
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
<metadata></metadata>
<defs>
<font id="glyphicons_halflingsregular" horiz-adv-x="1200" >
<font-face units-per-em="1200" ascent="960" descent="-240" />
<missing-glyph horiz-adv-x="500" />
<glyph horiz-adv-x="0" />
<glyph horiz-adv-x="400" />
<glyph unicode=" " />
<glyph unicode="*" d="M600 1100q15 0 34 -1.5t30 -3.5l11 -1q10 -2 17.5 -10.5t7.5 -18.5v-224l158 158q7 7 18 8t19 -6l106 -106q7 -8 6 -19t-8 -18l-158 -158h224q10 0 18.5 -7.5t10.5 -17.5q6 -41 6 -75q0 -15 -1.5 -34t-3.5 -30l-1 -11q-2 -10 -10.5 -17.5t-18.5 -7.5h-224l158 -158 q7 -7 8 -18t-6 -19l-106 -106q-8 -7 -19 -6t-18 8l-158 158v-224q0 -10 -7.5 -18.5t-17.5 -10.5q-41 -6 -75 -6q-15 0 -34 1.5t-30 3.5l-11 1q-10 2 -17.5 10.5t-7.5 18.5v224l-158 -158q-7 -7 -18 -8t-19 6l-106 106q-7 8 -6 19t8 18l158 158h-224q-10 0 -18.5 7.5 t-10.5 17.5q-6 41 -6 75q0 15 1.5 34t3.5 30l1 11q2 10 10.5 17.5t18.5 7.5h224l-158 158q-7 7 -8 18t6 19l106 106q8 7 19 6t18 -8l158 -158v224q0 10 7.5 18.5t17.5 10.5q41 6 75 6z" />
<glyph unicode="+" d="M450 1100h200q21 0 35.5 -14.5t14.5 -35.5v-350h350q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-350v-350q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v350h-350q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5 h350v350q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xa0;" />
<glyph unicode="&#xa5;" d="M825 1100h250q10 0 12.5 -5t-5.5 -13l-364 -364q-6 -6 -11 -18h268q10 0 13 -6t-3 -14l-120 -160q-6 -8 -18 -14t-22 -6h-125v-100h275q10 0 13 -6t-3 -14l-120 -160q-6 -8 -18 -14t-22 -6h-125v-174q0 -11 -7.5 -18.5t-18.5 -7.5h-148q-11 0 -18.5 7.5t-7.5 18.5v174 h-275q-10 0 -13 6t3 14l120 160q6 8 18 14t22 6h125v100h-275q-10 0 -13 6t3 14l120 160q6 8 18 14t22 6h118q-5 12 -11 18l-364 364q-8 8 -5.5 13t12.5 5h250q25 0 43 -18l164 -164q8 -8 18 -8t18 8l164 164q18 18 43 18z" />
<glyph unicode="&#x2000;" horiz-adv-x="650" />
<glyph unicode="&#x2001;" horiz-adv-x="1300" />
<glyph unicode="&#x2002;" horiz-adv-x="650" />
<glyph unicode="&#x2003;" horiz-adv-x="1300" />
<glyph unicode="&#x2004;" horiz-adv-x="433" />
<glyph unicode="&#x2005;" horiz-adv-x="325" />
<glyph unicode="&#x2006;" horiz-adv-x="216" />
<glyph unicode="&#x2007;" horiz-adv-x="216" />
<glyph unicode="&#x2008;" horiz-adv-x="162" />
<glyph unicode="&#x2009;" horiz-adv-x="260" />
<glyph unicode="&#x200a;" horiz-adv-x="72" />
<glyph unicode="&#x202f;" horiz-adv-x="260" />
<glyph unicode="&#x205f;" horiz-adv-x="325" />
<glyph unicode="&#x20ac;" d="M744 1198q242 0 354 -189q60 -104 66 -209h-181q0 45 -17.5 82.5t-43.5 61.5t-58 40.5t-60.5 24t-51.5 7.5q-19 0 -40.5 -5.5t-49.5 -20.5t-53 -38t-49 -62.5t-39 -89.5h379l-100 -100h-300q-6 -50 -6 -100h406l-100 -100h-300q9 -74 33 -132t52.5 -91t61.5 -54.5t59 -29 t47 -7.5q22 0 50.5 7.5t60.5 24.5t58 41t43.5 61t17.5 80h174q-30 -171 -128 -278q-107 -117 -274 -117q-206 0 -324 158q-36 48 -69 133t-45 204h-217l100 100h112q1 47 6 100h-218l100 100h134q20 87 51 153.5t62 103.5q117 141 297 141z" />
<glyph unicode="&#x20bd;" d="M428 1200h350q67 0 120 -13t86 -31t57 -49.5t35 -56.5t17 -64.5t6.5 -60.5t0.5 -57v-16.5v-16.5q0 -36 -0.5 -57t-6.5 -61t-17 -65t-35 -57t-57 -50.5t-86 -31.5t-120 -13h-178l-2 -100h288q10 0 13 -6t-3 -14l-120 -160q-6 -8 -18 -14t-22 -6h-138v-175q0 -11 -5.5 -18 t-15.5 -7h-149q-10 0 -17.5 7.5t-7.5 17.5v175h-267q-10 0 -13 6t3 14l120 160q6 8 18 14t22 6h117v100h-267q-10 0 -13 6t3 14l120 160q6 8 18 14t22 6h117v475q0 10 7.5 17.5t17.5 7.5zM600 1000v-300h203q64 0 86.5 33t22.5 119q0 84 -22.5 116t-86.5 32h-203z" />
<glyph unicode="&#x2212;" d="M250 700h800q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#x231b;" d="M1000 1200v-150q0 -21 -14.5 -35.5t-35.5 -14.5h-50v-100q0 -91 -49.5 -165.5t-130.5 -109.5q81 -35 130.5 -109.5t49.5 -165.5v-150h50q21 0 35.5 -14.5t14.5 -35.5v-150h-800v150q0 21 14.5 35.5t35.5 14.5h50v150q0 91 49.5 165.5t130.5 109.5q-81 35 -130.5 109.5 t-49.5 165.5v100h-50q-21 0 -35.5 14.5t-14.5 35.5v150h800zM400 1000v-100q0 -60 32.5 -109.5t87.5 -73.5q28 -12 44 -37t16 -55t-16 -55t-44 -37q-55 -24 -87.5 -73.5t-32.5 -109.5v-150h400v150q0 60 -32.5 109.5t-87.5 73.5q-28 12 -44 37t-16 55t16 55t44 37 q55 24 87.5 73.5t32.5 109.5v100h-400z" />
<glyph unicode="&#x25fc;" horiz-adv-x="500" d="M0 0z" />
<glyph unicode="&#x2601;" d="M503 1089q110 0 200.5 -59.5t134.5 -156.5q44 14 90 14q120 0 205 -86.5t85 -206.5q0 -121 -85 -207.5t-205 -86.5h-750q-79 0 -135.5 57t-56.5 137q0 69 42.5 122.5t108.5 67.5q-2 12 -2 37q0 153 108 260.5t260 107.5z" />
<glyph unicode="&#x26fa;" d="M774 1193.5q16 -9.5 20.5 -27t-5.5 -33.5l-136 -187l467 -746h30q20 0 35 -18.5t15 -39.5v-42h-1200v42q0 21 15 39.5t35 18.5h30l468 746l-135 183q-10 16 -5.5 34t20.5 28t34 5.5t28 -20.5l111 -148l112 150q9 16 27 20.5t34 -5zM600 200h377l-182 112l-195 534v-646z " />
<glyph unicode="&#x2709;" d="M25 1100h1150q10 0 12.5 -5t-5.5 -13l-564 -567q-8 -8 -18 -8t-18 8l-564 567q-8 8 -5.5 13t12.5 5zM18 882l264 -264q8 -8 8 -18t-8 -18l-264 -264q-8 -8 -13 -5.5t-5 12.5v550q0 10 5 12.5t13 -5.5zM918 618l264 264q8 8 13 5.5t5 -12.5v-550q0 -10 -5 -12.5t-13 5.5 l-264 264q-8 8 -8 18t8 18zM818 482l364 -364q8 -8 5.5 -13t-12.5 -5h-1150q-10 0 -12.5 5t5.5 13l364 364q8 8 18 8t18 -8l164 -164q8 -8 18 -8t18 8l164 164q8 8 18 8t18 -8z" />
<glyph unicode="&#x270f;" d="M1011 1210q19 0 33 -13l153 -153q13 -14 13 -33t-13 -33l-99 -92l-214 214l95 96q13 14 32 14zM1013 800l-615 -614l-214 214l614 614zM317 96l-333 -112l110 335z" />
<glyph unicode="&#xe001;" d="M700 650v-550h250q21 0 35.5 -14.5t14.5 -35.5v-50h-800v50q0 21 14.5 35.5t35.5 14.5h250v550l-500 550h1200z" />
<glyph unicode="&#xe002;" d="M368 1017l645 163q39 15 63 0t24 -49v-831q0 -55 -41.5 -95.5t-111.5 -63.5q-79 -25 -147 -4.5t-86 75t25.5 111.5t122.5 82q72 24 138 8v521l-600 -155v-606q0 -42 -44 -90t-109 -69q-79 -26 -147 -5.5t-86 75.5t25.5 111.5t122.5 82.5q72 24 138 7v639q0 38 14.5 59 t53.5 34z" />
<glyph unicode="&#xe003;" d="M500 1191q100 0 191 -39t156.5 -104.5t104.5 -156.5t39 -191l-1 -2l1 -5q0 -141 -78 -262l275 -274q23 -26 22.5 -44.5t-22.5 -42.5l-59 -58q-26 -20 -46.5 -20t-39.5 20l-275 274q-119 -77 -261 -77l-5 1l-2 -1q-100 0 -191 39t-156.5 104.5t-104.5 156.5t-39 191 t39 191t104.5 156.5t156.5 104.5t191 39zM500 1022q-88 0 -162 -43t-117 -117t-43 -162t43 -162t117 -117t162 -43t162 43t117 117t43 162t-43 162t-117 117t-162 43z" />
<glyph unicode="&#xe005;" d="M649 949q48 68 109.5 104t121.5 38.5t118.5 -20t102.5 -64t71 -100.5t27 -123q0 -57 -33.5 -117.5t-94 -124.5t-126.5 -127.5t-150 -152.5t-146 -174q-62 85 -145.5 174t-150 152.5t-126.5 127.5t-93.5 124.5t-33.5 117.5q0 64 28 123t73 100.5t104 64t119 20 t120.5 -38.5t104.5 -104z" />
<glyph unicode="&#xe006;" d="M407 800l131 353q7 19 17.5 19t17.5 -19l129 -353h421q21 0 24 -8.5t-14 -20.5l-342 -249l130 -401q7 -20 -0.5 -25.5t-24.5 6.5l-343 246l-342 -247q-17 -12 -24.5 -6.5t-0.5 25.5l130 400l-347 251q-17 12 -14 20.5t23 8.5h429z" />
<glyph unicode="&#xe007;" d="M407 800l131 353q7 19 17.5 19t17.5 -19l129 -353h421q21 0 24 -8.5t-14 -20.5l-342 -249l130 -401q7 -20 -0.5 -25.5t-24.5 6.5l-343 246l-342 -247q-17 -12 -24.5 -6.5t-0.5 25.5l130 400l-347 251q-17 12 -14 20.5t23 8.5h429zM477 700h-240l197 -142l-74 -226 l193 139l195 -140l-74 229l192 140h-234l-78 211z" />
<glyph unicode="&#xe008;" d="M600 1200q124 0 212 -88t88 -212v-250q0 -46 -31 -98t-69 -52v-75q0 -10 6 -21.5t15 -17.5l358 -230q9 -5 15 -16.5t6 -21.5v-93q0 -10 -7.5 -17.5t-17.5 -7.5h-1150q-10 0 -17.5 7.5t-7.5 17.5v93q0 10 6 21.5t15 16.5l358 230q9 6 15 17.5t6 21.5v75q-38 0 -69 52 t-31 98v250q0 124 88 212t212 88z" />
<glyph unicode="&#xe009;" d="M25 1100h1150q10 0 17.5 -7.5t7.5 -17.5v-1050q0 -10 -7.5 -17.5t-17.5 -7.5h-1150q-10 0 -17.5 7.5t-7.5 17.5v1050q0 10 7.5 17.5t17.5 7.5zM100 1000v-100h100v100h-100zM875 1000h-550q-10 0 -17.5 -7.5t-7.5 -17.5v-350q0 -10 7.5 -17.5t17.5 -7.5h550 q10 0 17.5 7.5t7.5 17.5v350q0 10 -7.5 17.5t-17.5 7.5zM1000 1000v-100h100v100h-100zM100 800v-100h100v100h-100zM1000 800v-100h100v100h-100zM100 600v-100h100v100h-100zM1000 600v-100h100v100h-100zM875 500h-550q-10 0 -17.5 -7.5t-7.5 -17.5v-350q0 -10 7.5 -17.5 t17.5 -7.5h550q10 0 17.5 7.5t7.5 17.5v350q0 10 -7.5 17.5t-17.5 7.5zM100 400v-100h100v100h-100zM1000 400v-100h100v100h-100zM100 200v-100h100v100h-100zM1000 200v-100h100v100h-100z" />
<glyph unicode="&#xe010;" d="M50 1100h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM650 1100h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400 q0 21 14.5 35.5t35.5 14.5zM50 500h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM650 500h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400 q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe011;" d="M50 1100h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 1100h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200 q0 21 14.5 35.5t35.5 14.5zM850 1100h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM50 700h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200 q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 700h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM850 700h200q21 0 35.5 -14.5t14.5 -35.5v-200 q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM50 300h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 300h200 q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM850 300h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5 t35.5 14.5z" />
<glyph unicode="&#xe012;" d="M50 1100h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 1100h700q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-700q-21 0 -35.5 14.5t-14.5 35.5v200 q0 21 14.5 35.5t35.5 14.5zM50 700h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 700h700q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-700 q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM50 300h200q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5zM450 300h700q21 0 35.5 -14.5t14.5 -35.5v-200 q0 -21 -14.5 -35.5t-35.5 -14.5h-700q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe013;" d="M465 477l571 571q8 8 18 8t17 -8l177 -177q8 -7 8 -17t-8 -18l-783 -784q-7 -8 -17.5 -8t-17.5 8l-384 384q-8 8 -8 18t8 17l177 177q7 8 17 8t18 -8l171 -171q7 -7 18 -7t18 7z" />
<glyph unicode="&#xe014;" d="M904 1083l178 -179q8 -8 8 -18.5t-8 -17.5l-267 -268l267 -268q8 -7 8 -17.5t-8 -18.5l-178 -178q-8 -8 -18.5 -8t-17.5 8l-268 267l-268 -267q-7 -8 -17.5 -8t-18.5 8l-178 178q-8 8 -8 18.5t8 17.5l267 268l-267 268q-8 7 -8 17.5t8 18.5l178 178q8 8 18.5 8t17.5 -8 l268 -267l268 268q7 7 17.5 7t18.5 -7z" />
<glyph unicode="&#xe015;" d="M507 1177q98 0 187.5 -38.5t154.5 -103.5t103.5 -154.5t38.5 -187.5q0 -141 -78 -262l300 -299q8 -8 8 -18.5t-8 -18.5l-109 -108q-7 -8 -17.5 -8t-18.5 8l-300 299q-119 -77 -261 -77q-98 0 -188 38.5t-154.5 103t-103 154.5t-38.5 188t38.5 187.5t103 154.5 t154.5 103.5t188 38.5zM506.5 1023q-89.5 0 -165.5 -44t-120 -120.5t-44 -166t44 -165.5t120 -120t165.5 -44t166 44t120.5 120t44 165.5t-44 166t-120.5 120.5t-166 44zM425 900h150q10 0 17.5 -7.5t7.5 -17.5v-75h75q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5 t-17.5 -7.5h-75v-75q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v75h-75q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5h75v75q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe016;" d="M507 1177q98 0 187.5 -38.5t154.5 -103.5t103.5 -154.5t38.5 -187.5q0 -141 -78 -262l300 -299q8 -8 8 -18.5t-8 -18.5l-109 -108q-7 -8 -17.5 -8t-18.5 8l-300 299q-119 -77 -261 -77q-98 0 -188 38.5t-154.5 103t-103 154.5t-38.5 188t38.5 187.5t103 154.5 t154.5 103.5t188 38.5zM506.5 1023q-89.5 0 -165.5 -44t-120 -120.5t-44 -166t44 -165.5t120 -120t165.5 -44t166 44t120.5 120t44 165.5t-44 166t-120.5 120.5t-166 44zM325 800h350q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-350q-10 0 -17.5 7.5 t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe017;" d="M550 1200h100q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM800 975v166q167 -62 272 -209.5t105 -331.5q0 -117 -45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5 t-184.5 123t-123 184.5t-45.5 224q0 184 105 331.5t272 209.5v-166q-103 -55 -165 -155t-62 -220q0 -116 57 -214.5t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5q0 120 -62 220t-165 155z" />
<glyph unicode="&#xe018;" d="M1025 1200h150q10 0 17.5 -7.5t7.5 -17.5v-1150q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v1150q0 10 7.5 17.5t17.5 7.5zM725 800h150q10 0 17.5 -7.5t7.5 -17.5v-750q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v750 q0 10 7.5 17.5t17.5 7.5zM425 500h150q10 0 17.5 -7.5t7.5 -17.5v-450q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v450q0 10 7.5 17.5t17.5 7.5zM125 300h150q10 0 17.5 -7.5t7.5 -17.5v-250q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5 v250q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe019;" d="M600 1174q33 0 74 -5l38 -152l5 -1q49 -14 94 -39l5 -2l134 80q61 -48 104 -105l-80 -134l3 -5q25 -44 39 -93l1 -6l152 -38q5 -43 5 -73q0 -34 -5 -74l-152 -38l-1 -6q-15 -49 -39 -93l-3 -5l80 -134q-48 -61 -104 -105l-134 81l-5 -3q-44 -25 -94 -39l-5 -2l-38 -151 q-43 -5 -74 -5q-33 0 -74 5l-38 151l-5 2q-49 14 -94 39l-5 3l-134 -81q-60 48 -104 105l80 134l-3 5q-25 45 -38 93l-2 6l-151 38q-6 42 -6 74q0 33 6 73l151 38l2 6q13 48 38 93l3 5l-80 134q47 61 105 105l133 -80l5 2q45 25 94 39l5 1l38 152q43 5 74 5zM600 815 q-89 0 -152 -63t-63 -151.5t63 -151.5t152 -63t152 63t63 151.5t-63 151.5t-152 63z" />
<glyph unicode="&#xe020;" d="M500 1300h300q41 0 70.5 -29.5t29.5 -70.5v-100h275q10 0 17.5 -7.5t7.5 -17.5v-75h-1100v75q0 10 7.5 17.5t17.5 7.5h275v100q0 41 29.5 70.5t70.5 29.5zM500 1200v-100h300v100h-300zM1100 900v-800q0 -41 -29.5 -70.5t-70.5 -29.5h-700q-41 0 -70.5 29.5t-29.5 70.5 v800h900zM300 800v-700h100v700h-100zM500 800v-700h100v700h-100zM700 800v-700h100v700h-100zM900 800v-700h100v700h-100z" />
<glyph unicode="&#xe021;" d="M18 618l620 608q8 7 18.5 7t17.5 -7l608 -608q8 -8 5.5 -13t-12.5 -5h-175v-575q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v375h-300v-375q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v575h-175q-10 0 -12.5 5t5.5 13z" />
<glyph unicode="&#xe022;" d="M600 1200v-400q0 -41 29.5 -70.5t70.5 -29.5h300v-650q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v1100q0 21 14.5 35.5t35.5 14.5h450zM1000 800h-250q-21 0 -35.5 14.5t-14.5 35.5v250z" />
<glyph unicode="&#xe023;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM525 900h50q10 0 17.5 -7.5t7.5 -17.5v-275h175q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v350q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe024;" d="M1300 0h-538l-41 400h-242l-41 -400h-538l431 1200h209l-21 -300h162l-20 300h208zM515 800l-27 -300h224l-27 300h-170z" />
<glyph unicode="&#xe025;" d="M550 1200h200q21 0 35.5 -14.5t14.5 -35.5v-450h191q20 0 25.5 -11.5t-7.5 -27.5l-327 -400q-13 -16 -32 -16t-32 16l-327 400q-13 16 -7.5 27.5t25.5 11.5h191v450q0 21 14.5 35.5t35.5 14.5zM1125 400h50q10 0 17.5 -7.5t7.5 -17.5v-350q0 -10 -7.5 -17.5t-17.5 -7.5 h-1050q-10 0 -17.5 7.5t-7.5 17.5v350q0 10 7.5 17.5t17.5 7.5h50q10 0 17.5 -7.5t7.5 -17.5v-175h900v175q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe026;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM525 900h150q10 0 17.5 -7.5t7.5 -17.5v-275h137q21 0 26 -11.5t-8 -27.5l-223 -275q-13 -16 -32 -16t-32 16l-223 275q-13 16 -8 27.5t26 11.5h137v275q0 10 7.5 17.5t17.5 7.5z " />
<glyph unicode="&#xe027;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM632 914l223 -275q13 -16 8 -27.5t-26 -11.5h-137v-275q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v275h-137q-21 0 -26 11.5t8 27.5l223 275q13 16 32 16 t32 -16z" />
<glyph unicode="&#xe028;" d="M225 1200h750q10 0 19.5 -7t12.5 -17l186 -652q7 -24 7 -49v-425q0 -12 -4 -27t-9 -17q-12 -6 -37 -6h-1100q-12 0 -27 4t-17 8q-6 13 -6 38l1 425q0 25 7 49l185 652q3 10 12.5 17t19.5 7zM878 1000h-556q-10 0 -19 -7t-11 -18l-87 -450q-2 -11 4 -18t16 -7h150 q10 0 19.5 -7t11.5 -17l38 -152q2 -10 11.5 -17t19.5 -7h250q10 0 19.5 7t11.5 17l38 152q2 10 11.5 17t19.5 7h150q10 0 16 7t4 18l-87 450q-2 11 -11 18t-19 7z" />
<glyph unicode="&#xe029;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM540 820l253 -190q17 -12 17 -30t-17 -30l-253 -190q-16 -12 -28 -6.5t-12 26.5v400q0 21 12 26.5t28 -6.5z" />
<glyph unicode="&#xe030;" d="M947 1060l135 135q7 7 12.5 5t5.5 -13v-362q0 -10 -7.5 -17.5t-17.5 -7.5h-362q-11 0 -13 5.5t5 12.5l133 133q-109 76 -238 76q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5h150q0 -117 -45.5 -224 t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5q192 0 347 -117z" />
<glyph unicode="&#xe031;" d="M947 1060l135 135q7 7 12.5 5t5.5 -13v-361q0 -11 -7.5 -18.5t-18.5 -7.5h-361q-11 0 -13 5.5t5 12.5l134 134q-110 75 -239 75q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5h-150q0 117 45.5 224t123 184.5t184.5 123t224 45.5q192 0 347 -117zM1027 600h150 q0 -117 -45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5q-192 0 -348 118l-134 -134q-7 -8 -12.5 -5.5t-5.5 12.5v360q0 11 7.5 18.5t18.5 7.5h360q10 0 12.5 -5.5t-5.5 -12.5l-133 -133q110 -76 240 -76q116 0 214.5 57t155.5 155.5t57 214.5z" />
<glyph unicode="&#xe032;" d="M125 1200h1050q10 0 17.5 -7.5t7.5 -17.5v-1150q0 -10 -7.5 -17.5t-17.5 -7.5h-1050q-10 0 -17.5 7.5t-7.5 17.5v1150q0 10 7.5 17.5t17.5 7.5zM1075 1000h-850q-10 0 -17.5 -7.5t-7.5 -17.5v-850q0 -10 7.5 -17.5t17.5 -7.5h850q10 0 17.5 7.5t7.5 17.5v850 q0 10 -7.5 17.5t-17.5 7.5zM325 900h50q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5zM525 900h450q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-450q-10 0 -17.5 7.5t-7.5 17.5v50 q0 10 7.5 17.5t17.5 7.5zM325 700h50q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5zM525 700h450q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-450q-10 0 -17.5 7.5t-7.5 17.5v50 q0 10 7.5 17.5t17.5 7.5zM325 500h50q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5zM525 500h450q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-450q-10 0 -17.5 7.5t-7.5 17.5v50 q0 10 7.5 17.5t17.5 7.5zM325 300h50q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5zM525 300h450q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-450q-10 0 -17.5 7.5t-7.5 17.5v50 q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe033;" d="M900 800v200q0 83 -58.5 141.5t-141.5 58.5h-300q-82 0 -141 -59t-59 -141v-200h-100q-41 0 -70.5 -29.5t-29.5 -70.5v-600q0 -41 29.5 -70.5t70.5 -29.5h900q41 0 70.5 29.5t29.5 70.5v600q0 41 -29.5 70.5t-70.5 29.5h-100zM400 800v150q0 21 15 35.5t35 14.5h200 q20 0 35 -14.5t15 -35.5v-150h-300z" />
<glyph unicode="&#xe034;" d="M125 1100h50q10 0 17.5 -7.5t7.5 -17.5v-1075h-100v1075q0 10 7.5 17.5t17.5 7.5zM1075 1052q4 0 9 -2q16 -6 16 -23v-421q0 -6 -3 -12q-33 -59 -66.5 -99t-65.5 -58t-56.5 -24.5t-52.5 -6.5q-26 0 -57.5 6.5t-52.5 13.5t-60 21q-41 15 -63 22.5t-57.5 15t-65.5 7.5 q-85 0 -160 -57q-7 -5 -15 -5q-6 0 -11 3q-14 7 -14 22v438q22 55 82 98.5t119 46.5q23 2 43 0.5t43 -7t32.5 -8.5t38 -13t32.5 -11q41 -14 63.5 -21t57 -14t63.5 -7q103 0 183 87q7 8 18 8z" />
<glyph unicode="&#xe035;" d="M600 1175q116 0 227 -49.5t192.5 -131t131 -192.5t49.5 -227v-300q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v300q0 127 -70.5 231.5t-184.5 161.5t-245 57t-245 -57t-184.5 -161.5t-70.5 -231.5v-300q0 -10 -7.5 -17.5t-17.5 -7.5h-50 q-10 0 -17.5 7.5t-7.5 17.5v300q0 116 49.5 227t131 192.5t192.5 131t227 49.5zM220 500h160q8 0 14 -6t6 -14v-460q0 -8 -6 -14t-14 -6h-160q-8 0 -14 6t-6 14v460q0 8 6 14t14 6zM820 500h160q8 0 14 -6t6 -14v-460q0 -8 -6 -14t-14 -6h-160q-8 0 -14 6t-6 14v460 q0 8 6 14t14 6z" />
<glyph unicode="&#xe036;" d="M321 814l258 172q9 6 15 2.5t6 -13.5v-750q0 -10 -6 -13.5t-15 2.5l-258 172q-21 14 -46 14h-250q-10 0 -17.5 7.5t-7.5 17.5v350q0 10 7.5 17.5t17.5 7.5h250q25 0 46 14zM900 668l120 120q7 7 17 7t17 -7l34 -34q7 -7 7 -17t-7 -17l-120 -120l120 -120q7 -7 7 -17 t-7 -17l-34 -34q-7 -7 -17 -7t-17 7l-120 119l-120 -119q-7 -7 -17 -7t-17 7l-34 34q-7 7 -7 17t7 17l119 120l-119 120q-7 7 -7 17t7 17l34 34q7 8 17 8t17 -8z" />
<glyph unicode="&#xe037;" d="M321 814l258 172q9 6 15 2.5t6 -13.5v-750q0 -10 -6 -13.5t-15 2.5l-258 172q-21 14 -46 14h-250q-10 0 -17.5 7.5t-7.5 17.5v350q0 10 7.5 17.5t17.5 7.5h250q25 0 46 14zM766 900h4q10 -1 16 -10q96 -129 96 -290q0 -154 -90 -281q-6 -9 -17 -10l-3 -1q-9 0 -16 6 l-29 23q-7 7 -8.5 16.5t4.5 17.5q72 103 72 229q0 132 -78 238q-6 8 -4.5 18t9.5 17l29 22q7 5 15 5z" />
<glyph unicode="&#xe038;" d="M967 1004h3q11 -1 17 -10q135 -179 135 -396q0 -105 -34 -206.5t-98 -185.5q-7 -9 -17 -10h-3q-9 0 -16 6l-42 34q-8 6 -9 16t5 18q111 150 111 328q0 90 -29.5 176t-84.5 157q-6 9 -5 19t10 16l42 33q7 5 15 5zM321 814l258 172q9 6 15 2.5t6 -13.5v-750q0 -10 -6 -13.5 t-15 2.5l-258 172q-21 14 -46 14h-250q-10 0 -17.5 7.5t-7.5 17.5v350q0 10 7.5 17.5t17.5 7.5h250q25 0 46 14zM766 900h4q10 -1 16 -10q96 -129 96 -290q0 -154 -90 -281q-6 -9 -17 -10l-3 -1q-9 0 -16 6l-29 23q-7 7 -8.5 16.5t4.5 17.5q72 103 72 229q0 132 -78 238 q-6 8 -4.5 18.5t9.5 16.5l29 22q7 5 15 5z" />
<glyph unicode="&#xe039;" d="M500 900h100v-100h-100v-100h-400v-100h-100v600h500v-300zM1200 700h-200v-100h200v-200h-300v300h-200v300h-100v200h600v-500zM100 1100v-300h300v300h-300zM800 1100v-300h300v300h-300zM300 900h-100v100h100v-100zM1000 900h-100v100h100v-100zM300 500h200v-500 h-500v500h200v100h100v-100zM800 300h200v-100h-100v-100h-200v100h-100v100h100v200h-200v100h300v-300zM100 400v-300h300v300h-300zM300 200h-100v100h100v-100zM1200 200h-100v100h100v-100zM700 0h-100v100h100v-100zM1200 0h-300v100h300v-100z" />
<glyph unicode="&#xe040;" d="M100 200h-100v1000h100v-1000zM300 200h-100v1000h100v-1000zM700 200h-200v1000h200v-1000zM900 200h-100v1000h100v-1000zM1200 200h-200v1000h200v-1000zM400 0h-300v100h300v-100zM600 0h-100v91h100v-91zM800 0h-100v91h100v-91zM1100 0h-200v91h200v-91z" />
<glyph unicode="&#xe041;" d="M500 1200l682 -682q8 -8 8 -18t-8 -18l-464 -464q-8 -8 -18 -8t-18 8l-682 682l1 475q0 10 7.5 17.5t17.5 7.5h474zM319.5 1024.5q-29.5 29.5 -71 29.5t-71 -29.5t-29.5 -71.5t29.5 -71.5t71 -29.5t71 29.5t29.5 71.5t-29.5 71.5z" />
<glyph unicode="&#xe042;" d="M500 1200l682 -682q8 -8 8 -18t-8 -18l-464 -464q-8 -8 -18 -8t-18 8l-682 682l1 475q0 10 7.5 17.5t17.5 7.5h474zM800 1200l682 -682q8 -8 8 -18t-8 -18l-464 -464q-8 -8 -18 -8t-18 8l-56 56l424 426l-700 700h150zM319.5 1024.5q-29.5 29.5 -71 29.5t-71 -29.5 t-29.5 -71.5t29.5 -71.5t71 -29.5t71 29.5t29.5 71.5t-29.5 71.5z" />
<glyph unicode="&#xe043;" d="M300 1200h825q75 0 75 -75v-900q0 -25 -18 -43l-64 -64q-8 -8 -13 -5.5t-5 12.5v950q0 10 -7.5 17.5t-17.5 7.5h-700q-25 0 -43 -18l-64 -64q-8 -8 -5.5 -13t12.5 -5h700q10 0 17.5 -7.5t7.5 -17.5v-950q0 -10 -7.5 -17.5t-17.5 -7.5h-850q-10 0 -17.5 7.5t-7.5 17.5v975 q0 25 18 43l139 139q18 18 43 18z" />
<glyph unicode="&#xe044;" d="M250 1200h800q21 0 35.5 -14.5t14.5 -35.5v-1150l-450 444l-450 -445v1151q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe045;" d="M822 1200h-444q-11 0 -19 -7.5t-9 -17.5l-78 -301q-7 -24 7 -45l57 -108q6 -9 17.5 -15t21.5 -6h450q10 0 21.5 6t17.5 15l62 108q14 21 7 45l-83 301q-1 10 -9 17.5t-19 7.5zM1175 800h-150q-10 0 -21 -6.5t-15 -15.5l-78 -156q-4 -9 -15 -15.5t-21 -6.5h-550 q-10 0 -21 6.5t-15 15.5l-78 156q-4 9 -15 15.5t-21 6.5h-150q-10 0 -17.5 -7.5t-7.5 -17.5v-650q0 -10 7.5 -17.5t17.5 -7.5h150q10 0 17.5 7.5t7.5 17.5v150q0 10 7.5 17.5t17.5 7.5h750q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 7.5 -17.5t17.5 -7.5h150q10 0 17.5 7.5 t7.5 17.5v650q0 10 -7.5 17.5t-17.5 7.5zM850 200h-500q-10 0 -19.5 -7t-11.5 -17l-38 -152q-2 -10 3.5 -17t15.5 -7h600q10 0 15.5 7t3.5 17l-38 152q-2 10 -11.5 17t-19.5 7z" />
<glyph unicode="&#xe046;" d="M500 1100h200q56 0 102.5 -20.5t72.5 -50t44 -59t25 -50.5l6 -20h150q41 0 70.5 -29.5t29.5 -70.5v-600q0 -41 -29.5 -70.5t-70.5 -29.5h-1000q-41 0 -70.5 29.5t-29.5 70.5v600q0 41 29.5 70.5t70.5 29.5h150q2 8 6.5 21.5t24 48t45 61t72 48t102.5 21.5zM900 800v-100 h100v100h-100zM600 730q-95 0 -162.5 -67.5t-67.5 -162.5t67.5 -162.5t162.5 -67.5t162.5 67.5t67.5 162.5t-67.5 162.5t-162.5 67.5zM600 603q43 0 73 -30t30 -73t-30 -73t-73 -30t-73 30t-30 73t30 73t73 30z" />
<glyph unicode="&#xe047;" d="M681 1199l385 -998q20 -50 60 -92q18 -19 36.5 -29.5t27.5 -11.5l10 -2v-66h-417v66q53 0 75 43.5t5 88.5l-82 222h-391q-58 -145 -92 -234q-11 -34 -6.5 -57t25.5 -37t46 -20t55 -6v-66h-365v66q56 24 84 52q12 12 25 30.5t20 31.5l7 13l399 1006h93zM416 521h340 l-162 457z" />
<glyph unicode="&#xe048;" d="M753 641q5 -1 14.5 -4.5t36 -15.5t50.5 -26.5t53.5 -40t50.5 -54.5t35.5 -70t14.5 -87q0 -67 -27.5 -125.5t-71.5 -97.5t-98.5 -66.5t-108.5 -40.5t-102 -13h-500v89q41 7 70.5 32.5t29.5 65.5v827q0 24 -0.5 34t-3.5 24t-8.5 19.5t-17 13.5t-28 12.5t-42.5 11.5v71 l471 -1q57 0 115.5 -20.5t108 -57t80.5 -94t31 -124.5q0 -51 -15.5 -96.5t-38 -74.5t-45 -50.5t-38.5 -30.5zM400 700h139q78 0 130.5 48.5t52.5 122.5q0 41 -8.5 70.5t-29.5 55.5t-62.5 39.5t-103.5 13.5h-118v-350zM400 200h216q80 0 121 50.5t41 130.5q0 90 -62.5 154.5 t-156.5 64.5h-159v-400z" />
<glyph unicode="&#xe049;" d="M877 1200l2 -57q-83 -19 -116 -45.5t-40 -66.5l-132 -839q-9 -49 13 -69t96 -26v-97h-500v97q186 16 200 98l173 832q3 17 3 30t-1.5 22.5t-9 17.5t-13.5 12.5t-21.5 10t-26 8.5t-33.5 10q-13 3 -19 5v57h425z" />
<glyph unicode="&#xe050;" d="M1300 900h-50q0 21 -4 37t-9.5 26.5t-18 17.5t-22 11t-28.5 5.5t-31 2t-37 0.5h-200v-850q0 -22 25 -34.5t50 -13.5l25 -2v-100h-400v100q4 0 11 0.5t24 3t30 7t24 15t11 24.5v850h-200q-25 0 -37 -0.5t-31 -2t-28.5 -5.5t-22 -11t-18 -17.5t-9.5 -26.5t-4 -37h-50v300 h1000v-300zM175 1000h-75v-800h75l-125 -167l-125 167h75v800h-75l125 167z" />
<glyph unicode="&#xe051;" d="M1100 900h-50q0 21 -4 37t-9.5 26.5t-18 17.5t-22 11t-28.5 5.5t-31 2t-37 0.5h-200v-650q0 -22 25 -34.5t50 -13.5l25 -2v-100h-400v100q4 0 11 0.5t24 3t30 7t24 15t11 24.5v650h-200q-25 0 -37 -0.5t-31 -2t-28.5 -5.5t-22 -11t-18 -17.5t-9.5 -26.5t-4 -37h-50v300 h1000v-300zM1167 50l-167 -125v75h-800v-75l-167 125l167 125v-75h800v75z" />
<glyph unicode="&#xe052;" d="M50 1100h600q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-600q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 800h1000q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1000q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM50 500h800q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe053;" d="M250 1100h700q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-700q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 800h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM250 500h700q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-700q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe054;" d="M500 950v100q0 21 14.5 35.5t35.5 14.5h600q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-600q-21 0 -35.5 14.5t-14.5 35.5zM100 650v100q0 21 14.5 35.5t35.5 14.5h1000q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1000 q-21 0 -35.5 14.5t-14.5 35.5zM300 350v100q0 21 14.5 35.5t35.5 14.5h800q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5zM0 50v100q0 21 14.5 35.5t35.5 14.5h1100q21 0 35.5 -14.5t14.5 -35.5v-100 q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5z" />
<glyph unicode="&#xe055;" d="M50 1100h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 800h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM50 500h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h1100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe056;" d="M50 1100h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM350 1100h800q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM50 800h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM350 800h800q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-800 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 500h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM350 500h800q21 0 35.5 -14.5t14.5 -35.5v-100 q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM350 200h800 q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe057;" d="M400 0h-100v1100h100v-1100zM550 1100h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM550 800h500q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-500 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM267 550l-167 -125v75h-200v100h200v75zM550 500h300q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-300q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM550 200h600 q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-600q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe058;" d="M50 1100h100q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM900 0h-100v1100h100v-1100zM50 800h500q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-500 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM1100 600h200v-100h-200v-75l-167 125l167 125v-75zM50 500h300q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-300q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5zM50 200h600 q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-600q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe059;" d="M75 1000h750q31 0 53 -22t22 -53v-650q0 -31 -22 -53t-53 -22h-750q-31 0 -53 22t-22 53v650q0 31 22 53t53 22zM1200 300l-300 300l300 300v-600z" />
<glyph unicode="&#xe060;" d="M44 1100h1112q18 0 31 -13t13 -31v-1012q0 -18 -13 -31t-31 -13h-1112q-18 0 -31 13t-13 31v1012q0 18 13 31t31 13zM100 1000v-737l247 182l298 -131l-74 156l293 318l236 -288v500h-1000zM342 884q56 0 95 -39t39 -94.5t-39 -95t-95 -39.5t-95 39.5t-39 95t39 94.5 t95 39z" />
<glyph unicode="&#xe062;" d="M648 1169q117 0 216 -60t156.5 -161t57.5 -218q0 -115 -70 -258q-69 -109 -158 -225.5t-143 -179.5l-54 -62q-9 8 -25.5 24.5t-63.5 67.5t-91 103t-98.5 128t-95.5 148q-60 132 -60 249q0 88 34 169.5t91.5 142t137 96.5t166.5 36zM652.5 974q-91.5 0 -156.5 -65 t-65 -157t65 -156.5t156.5 -64.5t156.5 64.5t65 156.5t-65 157t-156.5 65z" />
<glyph unicode="&#xe063;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 173v854q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57z" />
<glyph unicode="&#xe064;" d="M554 1295q21 -72 57.5 -143.5t76 -130t83 -118t82.5 -117t70 -116t49.5 -126t18.5 -136.5q0 -71 -25.5 -135t-68.5 -111t-99 -82t-118.5 -54t-125.5 -23q-84 5 -161.5 34t-139.5 78.5t-99 125t-37 164.5q0 69 18 136.5t49.5 126.5t69.5 116.5t81.5 117.5t83.5 119 t76.5 131t58.5 143zM344 710q-23 -33 -43.5 -70.5t-40.5 -102.5t-17 -123q1 -37 14.5 -69.5t30 -52t41 -37t38.5 -24.5t33 -15q21 -7 32 -1t13 22l6 34q2 10 -2.5 22t-13.5 19q-5 4 -14 12t-29.5 40.5t-32.5 73.5q-26 89 6 271q2 11 -6 11q-8 1 -15 -10z" />
<glyph unicode="&#xe065;" d="M1000 1013l108 115q2 1 5 2t13 2t20.5 -1t25 -9.5t28.5 -21.5q22 -22 27 -43t0 -32l-6 -10l-108 -115zM350 1100h400q50 0 105 -13l-187 -187h-368q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5v182l200 200v-332 q0 -165 -93.5 -257.5t-256.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5zM1009 803l-362 -362l-161 -50l55 170l355 355z" />
<glyph unicode="&#xe066;" d="M350 1100h361q-164 -146 -216 -200h-195q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5l200 153v-103q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5z M824 1073l339 -301q8 -7 8 -17.5t-8 -17.5l-340 -306q-7 -6 -12.5 -4t-6.5 11v203q-26 1 -54.5 0t-78.5 -7.5t-92 -17.5t-86 -35t-70 -57q10 59 33 108t51.5 81.5t65 58.5t68.5 40.5t67 24.5t56 13.5t40 4.5v210q1 10 6.5 12.5t13.5 -4.5z" />
<glyph unicode="&#xe067;" d="M350 1100h350q60 0 127 -23l-178 -177h-349q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5v69l200 200v-219q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5z M643 639l395 395q7 7 17.5 7t17.5 -7l101 -101q7 -7 7 -17.5t-7 -17.5l-531 -532q-7 -7 -17.5 -7t-17.5 7l-248 248q-7 7 -7 17.5t7 17.5l101 101q7 7 17.5 7t17.5 -7l111 -111q8 -7 18 -7t18 7z" />
<glyph unicode="&#xe068;" d="M318 918l264 264q8 8 18 8t18 -8l260 -264q7 -8 4.5 -13t-12.5 -5h-170v-200h200v173q0 10 5 12t13 -5l264 -260q8 -7 8 -17.5t-8 -17.5l-264 -265q-8 -7 -13 -5t-5 12v173h-200v-200h170q10 0 12.5 -5t-4.5 -13l-260 -264q-8 -8 -18 -8t-18 8l-264 264q-8 8 -5.5 13 t12.5 5h175v200h-200v-173q0 -10 -5 -12t-13 5l-264 265q-8 7 -8 17.5t8 17.5l264 260q8 7 13 5t5 -12v-173h200v200h-175q-10 0 -12.5 5t5.5 13z" />
<glyph unicode="&#xe069;" d="M250 1100h100q21 0 35.5 -14.5t14.5 -35.5v-438l464 453q15 14 25.5 10t10.5 -25v-1000q0 -21 -10.5 -25t-25.5 10l-464 453v-438q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v1000q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe070;" d="M50 1100h100q21 0 35.5 -14.5t14.5 -35.5v-438l464 453q15 14 25.5 10t10.5 -25v-438l464 453q15 14 25.5 10t10.5 -25v-1000q0 -21 -10.5 -25t-25.5 10l-464 453v-438q0 -21 -10.5 -25t-25.5 10l-464 453v-438q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5 t-14.5 35.5v1000q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe071;" d="M1200 1050v-1000q0 -21 -10.5 -25t-25.5 10l-464 453v-438q0 -21 -10.5 -25t-25.5 10l-492 480q-15 14 -15 35t15 35l492 480q15 14 25.5 10t10.5 -25v-438l464 453q15 14 25.5 10t10.5 -25z" />
<glyph unicode="&#xe072;" d="M243 1074l814 -498q18 -11 18 -26t-18 -26l-814 -498q-18 -11 -30.5 -4t-12.5 28v1000q0 21 12.5 28t30.5 -4z" />
<glyph unicode="&#xe073;" d="M250 1000h200q21 0 35.5 -14.5t14.5 -35.5v-800q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v800q0 21 14.5 35.5t35.5 14.5zM650 1000h200q21 0 35.5 -14.5t14.5 -35.5v-800q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v800 q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe074;" d="M1100 950v-800q0 -21 -14.5 -35.5t-35.5 -14.5h-800q-21 0 -35.5 14.5t-14.5 35.5v800q0 21 14.5 35.5t35.5 14.5h800q21 0 35.5 -14.5t14.5 -35.5z" />
<glyph unicode="&#xe075;" d="M500 612v438q0 21 10.5 25t25.5 -10l492 -480q15 -14 15 -35t-15 -35l-492 -480q-15 -14 -25.5 -10t-10.5 25v438l-464 -453q-15 -14 -25.5 -10t-10.5 25v1000q0 21 10.5 25t25.5 -10z" />
<glyph unicode="&#xe076;" d="M1048 1102l100 1q20 0 35 -14.5t15 -35.5l5 -1000q0 -21 -14.5 -35.5t-35.5 -14.5l-100 -1q-21 0 -35.5 14.5t-14.5 35.5l-2 437l-463 -454q-14 -15 -24.5 -10.5t-10.5 25.5l-2 437l-462 -455q-15 -14 -25.5 -9.5t-10.5 24.5l-5 1000q0 21 10.5 25.5t25.5 -10.5l466 -450 l-2 438q0 20 10.5 24.5t25.5 -9.5l466 -451l-2 438q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe077;" d="M850 1100h100q21 0 35.5 -14.5t14.5 -35.5v-1000q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v438l-464 -453q-15 -14 -25.5 -10t-10.5 25v1000q0 21 10.5 25t25.5 -10l464 -453v438q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe078;" d="M686 1081l501 -540q15 -15 10.5 -26t-26.5 -11h-1042q-22 0 -26.5 11t10.5 26l501 540q15 15 36 15t36 -15zM150 400h1000q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1000q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe079;" d="M885 900l-352 -353l352 -353l-197 -198l-552 552l552 550z" />
<glyph unicode="&#xe080;" d="M1064 547l-551 -551l-198 198l353 353l-353 353l198 198z" />
<glyph unicode="&#xe081;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM650 900h-100q-21 0 -35.5 -14.5t-14.5 -35.5v-150h-150 q-21 0 -35.5 -14.5t-14.5 -35.5v-100q0 -21 14.5 -35.5t35.5 -14.5h150v-150q0 -21 14.5 -35.5t35.5 -14.5h100q21 0 35.5 14.5t14.5 35.5v150h150q21 0 35.5 14.5t14.5 35.5v100q0 21 -14.5 35.5t-35.5 14.5h-150v150q0 21 -14.5 35.5t-35.5 14.5z" />
<glyph unicode="&#xe082;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM850 700h-500q-21 0 -35.5 -14.5t-14.5 -35.5v-100q0 -21 14.5 -35.5 t35.5 -14.5h500q21 0 35.5 14.5t14.5 35.5v100q0 21 -14.5 35.5t-35.5 14.5z" />
<glyph unicode="&#xe083;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM741.5 913q-12.5 0 -21.5 -9l-120 -120l-120 120q-9 9 -21.5 9 t-21.5 -9l-141 -141q-9 -9 -9 -21.5t9 -21.5l120 -120l-120 -120q-9 -9 -9 -21.5t9 -21.5l141 -141q9 -9 21.5 -9t21.5 9l120 120l120 -120q9 -9 21.5 -9t21.5 9l141 141q9 9 9 21.5t-9 21.5l-120 120l120 120q9 9 9 21.5t-9 21.5l-141 141q-9 9 -21.5 9z" />
<glyph unicode="&#xe084;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM546 623l-84 85q-7 7 -17.5 7t-18.5 -7l-139 -139q-7 -8 -7 -18t7 -18 l242 -241q7 -8 17.5 -8t17.5 8l375 375q7 7 7 17.5t-7 18.5l-139 139q-7 7 -17.5 7t-17.5 -7z" />
<glyph unicode="&#xe085;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM588 941q-29 0 -59 -5.5t-63 -20.5t-58 -38.5t-41.5 -63t-16.5 -89.5 q0 -25 20 -25h131q30 -5 35 11q6 20 20.5 28t45.5 8q20 0 31.5 -10.5t11.5 -28.5q0 -23 -7 -34t-26 -18q-1 0 -13.5 -4t-19.5 -7.5t-20 -10.5t-22 -17t-18.5 -24t-15.5 -35t-8 -46q-1 -8 5.5 -16.5t20.5 -8.5h173q7 0 22 8t35 28t37.5 48t29.5 74t12 100q0 47 -17 83 t-42.5 57t-59.5 34.5t-64 18t-59 4.5zM675 400h-150q-10 0 -17.5 -7.5t-7.5 -17.5v-150q0 -10 7.5 -17.5t17.5 -7.5h150q10 0 17.5 7.5t7.5 17.5v150q0 10 -7.5 17.5t-17.5 7.5z" />
<glyph unicode="&#xe086;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM675 1000h-150q-10 0 -17.5 -7.5t-7.5 -17.5v-150q0 -10 7.5 -17.5 t17.5 -7.5h150q10 0 17.5 7.5t7.5 17.5v150q0 10 -7.5 17.5t-17.5 7.5zM675 700h-250q-10 0 -17.5 -7.5t-7.5 -17.5v-50q0 -10 7.5 -17.5t17.5 -7.5h75v-200h-75q-10 0 -17.5 -7.5t-7.5 -17.5v-50q0 -10 7.5 -17.5t17.5 -7.5h350q10 0 17.5 7.5t7.5 17.5v50q0 10 -7.5 17.5 t-17.5 7.5h-75v275q0 10 -7.5 17.5t-17.5 7.5z" />
<glyph unicode="&#xe087;" d="M525 1200h150q10 0 17.5 -7.5t7.5 -17.5v-194q103 -27 178.5 -102.5t102.5 -178.5h194q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-194q-27 -103 -102.5 -178.5t-178.5 -102.5v-194q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v194 q-103 27 -178.5 102.5t-102.5 178.5h-194q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5h194q27 103 102.5 178.5t178.5 102.5v194q0 10 7.5 17.5t17.5 7.5zM700 893v-168q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v168q-68 -23 -119 -74 t-74 -119h168q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-168q23 -68 74 -119t119 -74v168q0 10 7.5 17.5t17.5 7.5h150q10 0 17.5 -7.5t7.5 -17.5v-168q68 23 119 74t74 119h-168q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5h168 q-23 68 -74 119t-119 74z" />
<glyph unicode="&#xe088;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM759 823l64 -64q7 -7 7 -17.5t-7 -17.5l-124 -124l124 -124q7 -7 7 -17.5t-7 -17.5l-64 -64q-7 -7 -17.5 -7t-17.5 7l-124 124l-124 -124q-7 -7 -17.5 -7t-17.5 7l-64 64 q-7 7 -7 17.5t7 17.5l124 124l-124 124q-7 7 -7 17.5t7 17.5l64 64q7 7 17.5 7t17.5 -7l124 -124l124 124q7 7 17.5 7t17.5 -7z" />
<glyph unicode="&#xe089;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5t57 -214.5 t155.5 -155.5t214.5 -57t214.5 57t155.5 155.5t57 214.5t-57 214.5t-155.5 155.5t-214.5 57zM782 788l106 -106q7 -7 7 -17.5t-7 -17.5l-320 -321q-8 -7 -18 -7t-18 7l-202 203q-8 7 -8 17.5t8 17.5l106 106q7 8 17.5 8t17.5 -8l79 -79l197 197q7 7 17.5 7t17.5 -7z" />
<glyph unicode="&#xe090;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM600 1027q-116 0 -214.5 -57t-155.5 -155.5t-57 -214.5q0 -120 65 -225 l587 587q-105 65 -225 65zM965 819l-584 -584q104 -62 219 -62q116 0 214.5 57t155.5 155.5t57 214.5q0 115 -62 219z" />
<glyph unicode="&#xe091;" d="M39 582l522 427q16 13 27.5 8t11.5 -26v-291h550q21 0 35.5 -14.5t14.5 -35.5v-200q0 -21 -14.5 -35.5t-35.5 -14.5h-550v-291q0 -21 -11.5 -26t-27.5 8l-522 427q-16 13 -16 32t16 32z" />
<glyph unicode="&#xe092;" d="M639 1009l522 -427q16 -13 16 -32t-16 -32l-522 -427q-16 -13 -27.5 -8t-11.5 26v291h-550q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5h550v291q0 21 11.5 26t27.5 -8z" />
<glyph unicode="&#xe093;" d="M682 1161l427 -522q13 -16 8 -27.5t-26 -11.5h-291v-550q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v550h-291q-21 0 -26 11.5t8 27.5l427 522q13 16 32 16t32 -16z" />
<glyph unicode="&#xe094;" d="M550 1200h200q21 0 35.5 -14.5t14.5 -35.5v-550h291q21 0 26 -11.5t-8 -27.5l-427 -522q-13 -16 -32 -16t-32 16l-427 522q-13 16 -8 27.5t26 11.5h291v550q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe095;" d="M639 1109l522 -427q16 -13 16 -32t-16 -32l-522 -427q-16 -13 -27.5 -8t-11.5 26v291q-94 -2 -182 -20t-170.5 -52t-147 -92.5t-100.5 -135.5q5 105 27 193.5t67.5 167t113 135t167 91.5t225.5 42v262q0 21 11.5 26t27.5 -8z" />
<glyph unicode="&#xe096;" d="M850 1200h300q21 0 35.5 -14.5t14.5 -35.5v-300q0 -21 -10.5 -25t-24.5 10l-94 94l-249 -249q-8 -7 -18 -7t-18 7l-106 106q-7 8 -7 18t7 18l249 249l-94 94q-14 14 -10 24.5t25 10.5zM350 0h-300q-21 0 -35.5 14.5t-14.5 35.5v300q0 21 10.5 25t24.5 -10l94 -94l249 249 q8 7 18 7t18 -7l106 -106q7 -8 7 -18t-7 -18l-249 -249l94 -94q14 -14 10 -24.5t-25 -10.5z" />
<glyph unicode="&#xe097;" d="M1014 1120l106 -106q7 -8 7 -18t-7 -18l-249 -249l94 -94q14 -14 10 -24.5t-25 -10.5h-300q-21 0 -35.5 14.5t-14.5 35.5v300q0 21 10.5 25t24.5 -10l94 -94l249 249q8 7 18 7t18 -7zM250 600h300q21 0 35.5 -14.5t14.5 -35.5v-300q0 -21 -10.5 -25t-24.5 10l-94 94 l-249 -249q-8 -7 -18 -7t-18 7l-106 106q-7 8 -7 18t7 18l249 249l-94 94q-14 14 -10 24.5t25 10.5z" />
<glyph unicode="&#xe101;" d="M600 1177q117 0 224 -45.5t184.5 -123t123 -184.5t45.5 -224t-45.5 -224t-123 -184.5t-184.5 -123t-224 -45.5t-224 45.5t-184.5 123t-123 184.5t-45.5 224t45.5 224t123 184.5t184.5 123t224 45.5zM704 900h-208q-20 0 -32 -14.5t-8 -34.5l58 -302q4 -20 21.5 -34.5 t37.5 -14.5h54q20 0 37.5 14.5t21.5 34.5l58 302q4 20 -8 34.5t-32 14.5zM675 400h-150q-10 0 -17.5 -7.5t-7.5 -17.5v-150q0 -10 7.5 -17.5t17.5 -7.5h150q10 0 17.5 7.5t7.5 17.5v150q0 10 -7.5 17.5t-17.5 7.5z" />
<glyph unicode="&#xe102;" d="M260 1200q9 0 19 -2t15 -4l5 -2q22 -10 44 -23l196 -118q21 -13 36 -24q29 -21 37 -12q11 13 49 35l196 118q22 13 45 23q17 7 38 7q23 0 47 -16.5t37 -33.5l13 -16q14 -21 18 -45l25 -123l8 -44q1 -9 8.5 -14.5t17.5 -5.5h61q10 0 17.5 -7.5t7.5 -17.5v-50 q0 -10 -7.5 -17.5t-17.5 -7.5h-50q-10 0 -17.5 -7.5t-7.5 -17.5v-175h-400v300h-200v-300h-400v175q0 10 -7.5 17.5t-17.5 7.5h-50q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5h61q11 0 18 3t7 8q0 4 9 52l25 128q5 25 19 45q2 3 5 7t13.5 15t21.5 19.5t26.5 15.5 t29.5 7zM915 1079l-166 -162q-7 -7 -5 -12t12 -5h219q10 0 15 7t2 17l-51 149q-3 10 -11 12t-15 -6zM463 917l-177 157q-8 7 -16 5t-11 -12l-51 -143q-3 -10 2 -17t15 -7h231q11 0 12.5 5t-5.5 12zM500 0h-375q-10 0 -17.5 7.5t-7.5 17.5v375h400v-400zM1100 400v-375 q0 -10 -7.5 -17.5t-17.5 -7.5h-375v400h400z" />
<glyph unicode="&#xe103;" d="M1165 1190q8 3 21 -6.5t13 -17.5q-2 -178 -24.5 -323.5t-55.5 -245.5t-87 -174.5t-102.5 -118.5t-118 -68.5t-118.5 -33t-120 -4.5t-105 9.5t-90 16.5q-61 12 -78 11q-4 1 -12.5 0t-34 -14.5t-52.5 -40.5l-153 -153q-26 -24 -37 -14.5t-11 43.5q0 64 42 102q8 8 50.5 45 t66.5 58q19 17 35 47t13 61q-9 55 -10 102.5t7 111t37 130t78 129.5q39 51 80 88t89.5 63.5t94.5 45t113.5 36t129 31t157.5 37t182 47.5zM1116 1098q-8 9 -22.5 -3t-45.5 -50q-38 -47 -119 -103.5t-142 -89.5l-62 -33q-56 -30 -102 -57t-104 -68t-102.5 -80.5t-85.5 -91 t-64 -104.5q-24 -56 -31 -86t2 -32t31.5 17.5t55.5 59.5q25 30 94 75.5t125.5 77.5t147.5 81q70 37 118.5 69t102 79.5t99 111t86.5 148.5q22 50 24 60t-6 19z" />
<glyph unicode="&#xe104;" d="M653 1231q-39 -67 -54.5 -131t-10.5 -114.5t24.5 -96.5t47.5 -80t63.5 -62.5t68.5 -46.5t65 -30q-4 7 -17.5 35t-18.5 39.5t-17 39.5t-17 43t-13 42t-9.5 44.5t-2 42t4 43t13.5 39t23 38.5q96 -42 165 -107.5t105 -138t52 -156t13 -159t-19 -149.5q-13 -55 -44 -106.5 t-68 -87t-78.5 -64.5t-72.5 -45t-53 -22q-72 -22 -127 -11q-31 6 -13 19q6 3 17 7q13 5 32.5 21t41 44t38.5 63.5t21.5 81.5t-6.5 94.5t-50 107t-104 115.5q10 -104 -0.5 -189t-37 -140.5t-65 -93t-84 -52t-93.5 -11t-95 24.5q-80 36 -131.5 114t-53.5 171q-2 23 0 49.5 t4.5 52.5t13.5 56t27.5 60t46 64.5t69.5 68.5q-8 -53 -5 -102.5t17.5 -90t34 -68.5t44.5 -39t49 -2q31 13 38.5 36t-4.5 55t-29 64.5t-36 75t-26 75.5q-15 85 2 161.5t53.5 128.5t85.5 92.5t93.5 61t81.5 25.5z" />
<glyph unicode="&#xe105;" d="M600 1094q82 0 160.5 -22.5t140 -59t116.5 -82.5t94.5 -95t68 -95t42.5 -82.5t14 -57.5t-14 -57.5t-43 -82.5t-68.5 -95t-94.5 -95t-116.5 -82.5t-140 -59t-159.5 -22.5t-159.5 22.5t-140 59t-116.5 82.5t-94.5 95t-68.5 95t-43 82.5t-14 57.5t14 57.5t42.5 82.5t68 95 t94.5 95t116.5 82.5t140 59t160.5 22.5zM888 829q-15 15 -18 12t5 -22q25 -57 25 -119q0 -124 -88 -212t-212 -88t-212 88t-88 212q0 59 23 114q8 19 4.5 22t-17.5 -12q-70 -69 -160 -184q-13 -16 -15 -40.5t9 -42.5q22 -36 47 -71t70 -82t92.5 -81t113 -58.5t133.5 -24.5 t133.5 24t113 58.5t92.5 81.5t70 81.5t47 70.5q11 18 9 42.5t-14 41.5q-90 117 -163 189zM448 727l-35 -36q-15 -15 -19.5 -38.5t4.5 -41.5q37 -68 93 -116q16 -13 38.5 -11t36.5 17l35 34q14 15 12.5 33.5t-16.5 33.5q-44 44 -89 117q-11 18 -28 20t-32 -12z" />
<glyph unicode="&#xe106;" d="M592 0h-148l31 120q-91 20 -175.5 68.5t-143.5 106.5t-103.5 119t-66.5 110t-22 76q0 21 14 57.5t42.5 82.5t68 95t94.5 95t116.5 82.5t140 59t160.5 22.5q61 0 126 -15l32 121h148zM944 770l47 181q108 -85 176.5 -192t68.5 -159q0 -26 -19.5 -71t-59.5 -102t-93 -112 t-129 -104.5t-158 -75.5l46 173q77 49 136 117t97 131q11 18 9 42.5t-14 41.5q-54 70 -107 130zM310 824q-70 -69 -160 -184q-13 -16 -15 -40.5t9 -42.5q18 -30 39 -60t57 -70.5t74 -73t90 -61t105 -41.5l41 154q-107 18 -178.5 101.5t-71.5 193.5q0 59 23 114q8 19 4.5 22 t-17.5 -12zM448 727l-35 -36q-15 -15 -19.5 -38.5t4.5 -41.5q37 -68 93 -116q16 -13 38.5 -11t36.5 17l12 11l22 86l-3 4q-44 44 -89 117q-11 18 -28 20t-32 -12z" />
<glyph unicode="&#xe107;" d="M-90 100l642 1066q20 31 48 28.5t48 -35.5l642 -1056q21 -32 7.5 -67.5t-50.5 -35.5h-1294q-37 0 -50.5 34t7.5 66zM155 200h345v75q0 10 7.5 17.5t17.5 7.5h150q10 0 17.5 -7.5t7.5 -17.5v-75h345l-445 723zM496 700h208q20 0 32 -14.5t8 -34.5l-58 -252 q-4 -20 -21.5 -34.5t-37.5 -14.5h-54q-20 0 -37.5 14.5t-21.5 34.5l-58 252q-4 20 8 34.5t32 14.5z" />
<glyph unicode="&#xe108;" d="M650 1200q62 0 106 -44t44 -106v-339l363 -325q15 -14 26 -38.5t11 -44.5v-41q0 -20 -12 -26.5t-29 5.5l-359 249v-263q100 -93 100 -113v-64q0 -21 -13 -29t-32 1l-205 128l-205 -128q-19 -9 -32 -1t-13 29v64q0 20 100 113v263l-359 -249q-17 -12 -29 -5.5t-12 26.5v41 q0 20 11 44.5t26 38.5l363 325v339q0 62 44 106t106 44z" />
<glyph unicode="&#xe109;" d="M850 1200h100q21 0 35.5 -14.5t14.5 -35.5v-50h50q21 0 35.5 -14.5t14.5 -35.5v-150h-1100v150q0 21 14.5 35.5t35.5 14.5h50v50q0 21 14.5 35.5t35.5 14.5h100q21 0 35.5 -14.5t14.5 -35.5v-50h500v50q0 21 14.5 35.5t35.5 14.5zM1100 800v-750q0 -21 -14.5 -35.5 t-35.5 -14.5h-1000q-21 0 -35.5 14.5t-14.5 35.5v750h1100zM100 600v-100h100v100h-100zM300 600v-100h100v100h-100zM500 600v-100h100v100h-100zM700 600v-100h100v100h-100zM900 600v-100h100v100h-100zM100 400v-100h100v100h-100zM300 400v-100h100v100h-100zM500 400 v-100h100v100h-100zM700 400v-100h100v100h-100zM900 400v-100h100v100h-100zM100 200v-100h100v100h-100zM300 200v-100h100v100h-100zM500 200v-100h100v100h-100zM700 200v-100h100v100h-100zM900 200v-100h100v100h-100z" />
<glyph unicode="&#xe110;" d="M1135 1165l249 -230q15 -14 15 -35t-15 -35l-249 -230q-14 -14 -24.5 -10t-10.5 25v150h-159l-600 -600h-291q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h209l600 600h241v150q0 21 10.5 25t24.5 -10zM522 819l-141 -141l-122 122h-209q-21 0 -35.5 14.5 t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h291zM1135 565l249 -230q15 -14 15 -35t-15 -35l-249 -230q-14 -14 -24.5 -10t-10.5 25v150h-241l-181 181l141 141l122 -122h159v150q0 21 10.5 25t24.5 -10z" />
<glyph unicode="&#xe111;" d="M100 1100h1000q41 0 70.5 -29.5t29.5 -70.5v-600q0 -41 -29.5 -70.5t-70.5 -29.5h-596l-304 -300v300h-100q-41 0 -70.5 29.5t-29.5 70.5v600q0 41 29.5 70.5t70.5 29.5z" />
<glyph unicode="&#xe112;" d="M150 1200h200q21 0 35.5 -14.5t14.5 -35.5v-250h-300v250q0 21 14.5 35.5t35.5 14.5zM850 1200h200q21 0 35.5 -14.5t14.5 -35.5v-250h-300v250q0 21 14.5 35.5t35.5 14.5zM1100 800v-300q0 -41 -3 -77.5t-15 -89.5t-32 -96t-58 -89t-89 -77t-129 -51t-174 -20t-174 20 t-129 51t-89 77t-58 89t-32 96t-15 89.5t-3 77.5v300h300v-250v-27v-42.5t1.5 -41t5 -38t10 -35t16.5 -30t25.5 -24.5t35 -19t46.5 -12t60 -4t60 4.5t46.5 12.5t35 19.5t25 25.5t17 30.5t10 35t5 38t2 40.5t-0.5 42v25v250h300z" />
<glyph unicode="&#xe113;" d="M1100 411l-198 -199l-353 353l-353 -353l-197 199l551 551z" />
<glyph unicode="&#xe114;" d="M1101 789l-550 -551l-551 551l198 199l353 -353l353 353z" />
<glyph unicode="&#xe115;" d="M404 1000h746q21 0 35.5 -14.5t14.5 -35.5v-551h150q21 0 25 -10.5t-10 -24.5l-230 -249q-14 -15 -35 -15t-35 15l-230 249q-14 14 -10 24.5t25 10.5h150v401h-381zM135 984l230 -249q14 -14 10 -24.5t-25 -10.5h-150v-400h385l215 -200h-750q-21 0 -35.5 14.5 t-14.5 35.5v550h-150q-21 0 -25 10.5t10 24.5l230 249q14 15 35 15t35 -15z" />
<glyph unicode="&#xe116;" d="M56 1200h94q17 0 31 -11t18 -27l38 -162h896q24 0 39 -18.5t10 -42.5l-100 -475q-5 -21 -27 -42.5t-55 -21.5h-633l48 -200h535q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-50v-50q0 -21 -14.5 -35.5t-35.5 -14.5t-35.5 14.5t-14.5 35.5v50h-300v-50 q0 -21 -14.5 -35.5t-35.5 -14.5t-35.5 14.5t-14.5 35.5v50h-31q-18 0 -32.5 10t-20.5 19l-5 10l-201 961h-54q-20 0 -35 14.5t-15 35.5t15 35.5t35 14.5z" />
<glyph unicode="&#xe117;" d="M1200 1000v-100h-1200v100h200q0 41 29.5 70.5t70.5 29.5h300q41 0 70.5 -29.5t29.5 -70.5h500zM0 800h1200v-800h-1200v800z" />
<glyph unicode="&#xe118;" d="M200 800l-200 -400v600h200q0 41 29.5 70.5t70.5 29.5h300q42 0 71 -29.5t29 -70.5h500v-200h-1000zM1500 700l-300 -700h-1200l300 700h1200z" />
<glyph unicode="&#xe119;" d="M635 1184l230 -249q14 -14 10 -24.5t-25 -10.5h-150v-601h150q21 0 25 -10.5t-10 -24.5l-230 -249q-14 -15 -35 -15t-35 15l-230 249q-14 14 -10 24.5t25 10.5h150v601h-150q-21 0 -25 10.5t10 24.5l230 249q14 15 35 15t35 -15z" />
<glyph unicode="&#xe120;" d="M936 864l249 -229q14 -15 14 -35.5t-14 -35.5l-249 -229q-15 -15 -25.5 -10.5t-10.5 24.5v151h-600v-151q0 -20 -10.5 -24.5t-25.5 10.5l-249 229q-14 15 -14 35.5t14 35.5l249 229q15 15 25.5 10.5t10.5 -25.5v-149h600v149q0 21 10.5 25.5t25.5 -10.5z" />
<glyph unicode="&#xe121;" d="M1169 400l-172 732q-5 23 -23 45.5t-38 22.5h-672q-20 0 -38 -20t-23 -41l-172 -739h1138zM1100 300h-1000q-41 0 -70.5 -29.5t-29.5 -70.5v-100q0 -41 29.5 -70.5t70.5 -29.5h1000q41 0 70.5 29.5t29.5 70.5v100q0 41 -29.5 70.5t-70.5 29.5zM800 100v100h100v-100h-100 zM1000 100v100h100v-100h-100z" />
<glyph unicode="&#xe122;" d="M1150 1100q21 0 35.5 -14.5t14.5 -35.5v-850q0 -21 -14.5 -35.5t-35.5 -14.5t-35.5 14.5t-14.5 35.5v850q0 21 14.5 35.5t35.5 14.5zM1000 200l-675 200h-38l47 -276q3 -16 -5.5 -20t-29.5 -4h-7h-84q-20 0 -34.5 14t-18.5 35q-55 337 -55 351v250v6q0 16 1 23.5t6.5 14 t17.5 6.5h200l675 250v-850zM0 750v-250q-4 0 -11 0.5t-24 6t-30 15t-24 30t-11 48.5v50q0 26 10.5 46t25 30t29 16t25.5 7z" />
<glyph unicode="&#xe123;" d="M553 1200h94q20 0 29 -10.5t3 -29.5l-18 -37q83 -19 144 -82.5t76 -140.5l63 -327l118 -173h17q19 0 33 -14.5t14 -35t-13 -40.5t-31 -27q-8 -4 -23 -9.5t-65 -19.5t-103 -25t-132.5 -20t-158.5 -9q-57 0 -115 5t-104 12t-88.5 15.5t-73.5 17.5t-54.5 16t-35.5 12l-11 4 q-18 8 -31 28t-13 40.5t14 35t33 14.5h17l118 173l63 327q15 77 76 140t144 83l-18 32q-6 19 3.5 32t28.5 13zM498 110q50 -6 102 -6q53 0 102 6q-12 -49 -39.5 -79.5t-62.5 -30.5t-63 30.5t-39 79.5z" />
<glyph unicode="&#xe124;" d="M800 946l224 78l-78 -224l234 -45l-180 -155l180 -155l-234 -45l78 -224l-224 78l-45 -234l-155 180l-155 -180l-45 234l-224 -78l78 224l-234 45l180 155l-180 155l234 45l-78 224l224 -78l45 234l155 -180l155 180z" />
<glyph unicode="&#xe125;" d="M650 1200h50q40 0 70 -40.5t30 -84.5v-150l-28 -125h328q40 0 70 -40.5t30 -84.5v-100q0 -45 -29 -74l-238 -344q-16 -24 -38 -40.5t-45 -16.5h-250q-7 0 -42 25t-66 50l-31 25h-61q-45 0 -72.5 18t-27.5 57v400q0 36 20 63l145 196l96 198q13 28 37.5 48t51.5 20z M650 1100l-100 -212l-150 -213v-375h100l136 -100h214l250 375v125h-450l50 225v175h-50zM50 800h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v500q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe126;" d="M600 1100h250q23 0 45 -16.5t38 -40.5l238 -344q29 -29 29 -74v-100q0 -44 -30 -84.5t-70 -40.5h-328q28 -118 28 -125v-150q0 -44 -30 -84.5t-70 -40.5h-50q-27 0 -51.5 20t-37.5 48l-96 198l-145 196q-20 27 -20 63v400q0 39 27.5 57t72.5 18h61q124 100 139 100z M50 1000h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v500q0 21 14.5 35.5t35.5 14.5zM636 1000l-136 -100h-100v-375l150 -213l100 -212h50v175l-50 225h450v125l-250 375h-214z" />
<glyph unicode="&#xe127;" d="M356 873l363 230q31 16 53 -6l110 -112q13 -13 13.5 -32t-11.5 -34l-84 -121h302q84 0 138 -38t54 -110t-55 -111t-139 -39h-106l-131 -339q-6 -21 -19.5 -41t-28.5 -20h-342q-7 0 -90 81t-83 94v525q0 17 14 35.5t28 28.5zM400 792v-503l100 -89h293l131 339 q6 21 19.5 41t28.5 20h203q21 0 30.5 25t0.5 50t-31 25h-456h-7h-6h-5.5t-6 0.5t-5 1.5t-5 2t-4 2.5t-4 4t-2.5 4.5q-12 25 5 47l146 183l-86 83zM50 800h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v500 q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe128;" d="M475 1103l366 -230q2 -1 6 -3.5t14 -10.5t18 -16.5t14.5 -20t6.5 -22.5v-525q0 -13 -86 -94t-93 -81h-342q-15 0 -28.5 20t-19.5 41l-131 339h-106q-85 0 -139.5 39t-54.5 111t54 110t138 38h302l-85 121q-11 15 -10.5 34t13.5 32l110 112q22 22 53 6zM370 945l146 -183 q17 -22 5 -47q-2 -2 -3.5 -4.5t-4 -4t-4 -2.5t-5 -2t-5 -1.5t-6 -0.5h-6h-6.5h-6h-475v-100h221q15 0 29 -20t20 -41l130 -339h294l106 89v503l-342 236zM1050 800h100q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5 v500q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe129;" d="M550 1294q72 0 111 -55t39 -139v-106l339 -131q21 -6 41 -19.5t20 -28.5v-342q0 -7 -81 -90t-94 -83h-525q-17 0 -35.5 14t-28.5 28l-9 14l-230 363q-16 31 6 53l112 110q13 13 32 13.5t34 -11.5l121 -84v302q0 84 38 138t110 54zM600 972v203q0 21 -25 30.5t-50 0.5 t-25 -31v-456v-7v-6v-5.5t-0.5 -6t-1.5 -5t-2 -5t-2.5 -4t-4 -4t-4.5 -2.5q-25 -12 -47 5l-183 146l-83 -86l236 -339h503l89 100v293l-339 131q-21 6 -41 19.5t-20 28.5zM450 200h500q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-500 q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe130;" d="M350 1100h500q21 0 35.5 14.5t14.5 35.5v100q0 21 -14.5 35.5t-35.5 14.5h-500q-21 0 -35.5 -14.5t-14.5 -35.5v-100q0 -21 14.5 -35.5t35.5 -14.5zM600 306v-106q0 -84 -39 -139t-111 -55t-110 54t-38 138v302l-121 -84q-15 -12 -34 -11.5t-32 13.5l-112 110 q-22 22 -6 53l230 363q1 2 3.5 6t10.5 13.5t16.5 17t20 13.5t22.5 6h525q13 0 94 -83t81 -90v-342q0 -15 -20 -28.5t-41 -19.5zM308 900l-236 -339l83 -86l183 146q22 17 47 5q2 -1 4.5 -2.5t4 -4t2.5 -4t2 -5t1.5 -5t0.5 -6v-5.5v-6v-7v-456q0 -22 25 -31t50 0.5t25 30.5 v203q0 15 20 28.5t41 19.5l339 131v293l-89 100h-503z" />
<glyph unicode="&#xe131;" d="M600 1178q118 0 225 -45.5t184.5 -123t123 -184.5t45.5 -225t-45.5 -225t-123 -184.5t-184.5 -123t-225 -45.5t-225 45.5t-184.5 123t-123 184.5t-45.5 225t45.5 225t123 184.5t184.5 123t225 45.5zM914 632l-275 223q-16 13 -27.5 8t-11.5 -26v-137h-275 q-10 0 -17.5 -7.5t-7.5 -17.5v-150q0 -10 7.5 -17.5t17.5 -7.5h275v-137q0 -21 11.5 -26t27.5 8l275 223q16 13 16 32t-16 32z" />
<glyph unicode="&#xe132;" d="M600 1178q118 0 225 -45.5t184.5 -123t123 -184.5t45.5 -225t-45.5 -225t-123 -184.5t-184.5 -123t-225 -45.5t-225 45.5t-184.5 123t-123 184.5t-45.5 225t45.5 225t123 184.5t184.5 123t225 45.5zM561 855l-275 -223q-16 -13 -16 -32t16 -32l275 -223q16 -13 27.5 -8 t11.5 26v137h275q10 0 17.5 7.5t7.5 17.5v150q0 10 -7.5 17.5t-17.5 7.5h-275v137q0 21 -11.5 26t-27.5 -8z" />
<glyph unicode="&#xe133;" d="M600 1178q118 0 225 -45.5t184.5 -123t123 -184.5t45.5 -225t-45.5 -225t-123 -184.5t-184.5 -123t-225 -45.5t-225 45.5t-184.5 123t-123 184.5t-45.5 225t45.5 225t123 184.5t184.5 123t225 45.5zM855 639l-223 275q-13 16 -32 16t-32 -16l-223 -275q-13 -16 -8 -27.5 t26 -11.5h137v-275q0 -10 7.5 -17.5t17.5 -7.5h150q10 0 17.5 7.5t7.5 17.5v275h137q21 0 26 11.5t-8 27.5z" />
<glyph unicode="&#xe134;" d="M600 1178q118 0 225 -45.5t184.5 -123t123 -184.5t45.5 -225t-45.5 -225t-123 -184.5t-184.5 -123t-225 -45.5t-225 45.5t-184.5 123t-123 184.5t-45.5 225t45.5 225t123 184.5t184.5 123t225 45.5zM675 900h-150q-10 0 -17.5 -7.5t-7.5 -17.5v-275h-137q-21 0 -26 -11.5 t8 -27.5l223 -275q13 -16 32 -16t32 16l223 275q13 16 8 27.5t-26 11.5h-137v275q0 10 -7.5 17.5t-17.5 7.5z" />
<glyph unicode="&#xe135;" d="M600 1176q116 0 222.5 -46t184 -123.5t123.5 -184t46 -222.5t-46 -222.5t-123.5 -184t-184 -123.5t-222.5 -46t-222.5 46t-184 123.5t-123.5 184t-46 222.5t46 222.5t123.5 184t184 123.5t222.5 46zM627 1101q-15 -12 -36.5 -20.5t-35.5 -12t-43 -8t-39 -6.5 q-15 -3 -45.5 0t-45.5 -2q-20 -7 -51.5 -26.5t-34.5 -34.5q-3 -11 6.5 -22.5t8.5 -18.5q-3 -34 -27.5 -91t-29.5 -79q-9 -34 5 -93t8 -87q0 -9 17 -44.5t16 -59.5q12 0 23 -5t23.5 -15t19.5 -14q16 -8 33 -15t40.5 -15t34.5 -12q21 -9 52.5 -32t60 -38t57.5 -11 q7 -15 -3 -34t-22.5 -40t-9.5 -38q13 -21 23 -34.5t27.5 -27.5t36.5 -18q0 -7 -3.5 -16t-3.5 -14t5 -17q104 -2 221 112q30 29 46.5 47t34.5 49t21 63q-13 8 -37 8.5t-36 7.5q-15 7 -49.5 15t-51.5 19q-18 0 -41 -0.5t-43 -1.5t-42 -6.5t-38 -16.5q-51 -35 -66 -12 q-4 1 -3.5 25.5t0.5 25.5q-6 13 -26.5 17.5t-24.5 6.5q1 15 -0.5 30.5t-7 28t-18.5 11.5t-31 -21q-23 -25 -42 4q-19 28 -8 58q6 16 22 22q6 -1 26 -1.5t33.5 -4t19.5 -13.5q7 -12 18 -24t21.5 -20.5t20 -15t15.5 -10.5l5 -3q2 12 7.5 30.5t8 34.5t-0.5 32q-3 18 3.5 29 t18 22.5t15.5 24.5q6 14 10.5 35t8 31t15.5 22.5t34 22.5q-6 18 10 36q8 0 24 -1.5t24.5 -1.5t20 4.5t20.5 15.5q-10 23 -31 42.5t-37.5 29.5t-49 27t-43.5 23q0 1 2 8t3 11.5t1.5 10.5t-1 9.5t-4.5 4.5q31 -13 58.5 -14.5t38.5 2.5l12 5q5 28 -9.5 46t-36.5 24t-50 15 t-41 20q-18 -4 -37 0zM613 994q0 -17 8 -42t17 -45t9 -23q-8 1 -39.5 5.5t-52.5 10t-37 16.5q3 11 16 29.5t16 25.5q10 -10 19 -10t14 6t13.5 14.5t16.5 12.5z" />
<glyph unicode="&#xe136;" d="M756 1157q164 92 306 -9l-259 -138l145 -232l251 126q6 -89 -34 -156.5t-117 -110.5q-60 -34 -127 -39.5t-126 16.5l-596 -596q-15 -16 -36.5 -16t-36.5 16l-111 110q-15 15 -15 36.5t15 37.5l600 599q-34 101 5.5 201.5t135.5 154.5z" />
<glyph unicode="&#xe137;" horiz-adv-x="1220" d="M100 1196h1000q41 0 70.5 -29.5t29.5 -70.5v-100q0 -41 -29.5 -70.5t-70.5 -29.5h-1000q-41 0 -70.5 29.5t-29.5 70.5v100q0 41 29.5 70.5t70.5 29.5zM1100 1096h-200v-100h200v100zM100 796h1000q41 0 70.5 -29.5t29.5 -70.5v-100q0 -41 -29.5 -70.5t-70.5 -29.5h-1000 q-41 0 -70.5 29.5t-29.5 70.5v100q0 41 29.5 70.5t70.5 29.5zM1100 696h-500v-100h500v100zM100 396h1000q41 0 70.5 -29.5t29.5 -70.5v-100q0 -41 -29.5 -70.5t-70.5 -29.5h-1000q-41 0 -70.5 29.5t-29.5 70.5v100q0 41 29.5 70.5t70.5 29.5zM1100 296h-300v-100h300v100z " />
<glyph unicode="&#xe138;" d="M150 1200h900q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM700 500v-300l-200 -200v500l-350 500h900z" />
<glyph unicode="&#xe139;" d="M500 1200h200q41 0 70.5 -29.5t29.5 -70.5v-100h300q41 0 70.5 -29.5t29.5 -70.5v-400h-500v100h-200v-100h-500v400q0 41 29.5 70.5t70.5 29.5h300v100q0 41 29.5 70.5t70.5 29.5zM500 1100v-100h200v100h-200zM1200 400v-200q0 -41 -29.5 -70.5t-70.5 -29.5h-1000 q-41 0 -70.5 29.5t-29.5 70.5v200h1200z" />
<glyph unicode="&#xe140;" d="M50 1200h300q21 0 25 -10.5t-10 -24.5l-94 -94l199 -199q7 -8 7 -18t-7 -18l-106 -106q-8 -7 -18 -7t-18 7l-199 199l-94 -94q-14 -14 -24.5 -10t-10.5 25v300q0 21 14.5 35.5t35.5 14.5zM850 1200h300q21 0 35.5 -14.5t14.5 -35.5v-300q0 -21 -10.5 -25t-24.5 10l-94 94 l-199 -199q-8 -7 -18 -7t-18 7l-106 106q-7 8 -7 18t7 18l199 199l-94 94q-14 14 -10 24.5t25 10.5zM364 470l106 -106q7 -8 7 -18t-7 -18l-199 -199l94 -94q14 -14 10 -24.5t-25 -10.5h-300q-21 0 -35.5 14.5t-14.5 35.5v300q0 21 10.5 25t24.5 -10l94 -94l199 199 q8 7 18 7t18 -7zM1071 271l94 94q14 14 24.5 10t10.5 -25v-300q0 -21 -14.5 -35.5t-35.5 -14.5h-300q-21 0 -25 10.5t10 24.5l94 94l-199 199q-7 8 -7 18t7 18l106 106q8 7 18 7t18 -7z" />
<glyph unicode="&#xe141;" d="M596 1192q121 0 231.5 -47.5t190 -127t127 -190t47.5 -231.5t-47.5 -231.5t-127 -190.5t-190 -127t-231.5 -47t-231.5 47t-190.5 127t-127 190.5t-47 231.5t47 231.5t127 190t190.5 127t231.5 47.5zM596 1010q-112 0 -207.5 -55.5t-151 -151t-55.5 -207.5t55.5 -207.5 t151 -151t207.5 -55.5t207.5 55.5t151 151t55.5 207.5t-55.5 207.5t-151 151t-207.5 55.5zM454.5 905q22.5 0 38.5 -16t16 -38.5t-16 -39t-38.5 -16.5t-38.5 16.5t-16 39t16 38.5t38.5 16zM754.5 905q22.5 0 38.5 -16t16 -38.5t-16 -39t-38 -16.5q-14 0 -29 10l-55 -145 q17 -23 17 -51q0 -36 -25.5 -61.5t-61.5 -25.5t-61.5 25.5t-25.5 61.5q0 32 20.5 56.5t51.5 29.5l122 126l1 1q-9 14 -9 28q0 23 16 39t38.5 16zM345.5 709q22.5 0 38.5 -16t16 -38.5t-16 -38.5t-38.5 -16t-38.5 16t-16 38.5t16 38.5t38.5 16zM854.5 709q22.5 0 38.5 -16 t16 -38.5t-16 -38.5t-38.5 -16t-38.5 16t-16 38.5t16 38.5t38.5 16z" />
<glyph unicode="&#xe142;" d="M546 173l469 470q91 91 99 192q7 98 -52 175.5t-154 94.5q-22 4 -47 4q-34 0 -66.5 -10t-56.5 -23t-55.5 -38t-48 -41.5t-48.5 -47.5q-376 -375 -391 -390q-30 -27 -45 -41.5t-37.5 -41t-32 -46.5t-16 -47.5t-1.5 -56.5q9 -62 53.5 -95t99.5 -33q74 0 125 51l548 548 q36 36 20 75q-7 16 -21.5 26t-32.5 10q-26 0 -50 -23q-13 -12 -39 -38l-341 -338q-15 -15 -35.5 -15.5t-34.5 13.5t-14 34.5t14 34.5q327 333 361 367q35 35 67.5 51.5t78.5 16.5q14 0 29 -1q44 -8 74.5 -35.5t43.5 -68.5q14 -47 2 -96.5t-47 -84.5q-12 -11 -32 -32 t-79.5 -81t-114.5 -115t-124.5 -123.5t-123 -119.5t-96.5 -89t-57 -45q-56 -27 -120 -27q-70 0 -129 32t-93 89q-48 78 -35 173t81 163l511 511q71 72 111 96q91 55 198 55q80 0 152 -33q78 -36 129.5 -103t66.5 -154q17 -93 -11 -183.5t-94 -156.5l-482 -476 q-15 -15 -36 -16t-37 14t-17.5 34t14.5 35z" />
<glyph unicode="&#xe143;" d="M649 949q48 68 109.5 104t121.5 38.5t118.5 -20t102.5 -64t71 -100.5t27 -123q0 -57 -33.5 -117.5t-94 -124.5t-126.5 -127.5t-150 -152.5t-146 -174q-62 85 -145.5 174t-150 152.5t-126.5 127.5t-93.5 124.5t-33.5 117.5q0 64 28 123t73 100.5t104 64t119 20 t120.5 -38.5t104.5 -104zM896 972q-33 0 -64.5 -19t-56.5 -46t-47.5 -53.5t-43.5 -45.5t-37.5 -19t-36 19t-40 45.5t-43 53.5t-54 46t-65.5 19q-67 0 -122.5 -55.5t-55.5 -132.5q0 -23 13.5 -51t46 -65t57.5 -63t76 -75l22 -22q15 -14 44 -44t50.5 -51t46 -44t41 -35t23 -12 t23.5 12t42.5 36t46 44t52.5 52t44 43q4 4 12 13q43 41 63.5 62t52 55t46 55t26 46t11.5 44q0 79 -53 133.5t-120 54.5z" />
<glyph unicode="&#xe144;" d="M776.5 1214q93.5 0 159.5 -66l141 -141q66 -66 66 -160q0 -42 -28 -95.5t-62 -87.5l-29 -29q-31 53 -77 99l-18 18l95 95l-247 248l-389 -389l212 -212l-105 -106l-19 18l-141 141q-66 66 -66 159t66 159l283 283q65 66 158.5 66zM600 706l105 105q10 -8 19 -17l141 -141 q66 -66 66 -159t-66 -159l-283 -283q-66 -66 -159 -66t-159 66l-141 141q-66 66 -66 159.5t66 159.5l55 55q29 -55 75 -102l18 -17l-95 -95l247 -248l389 389z" />
<glyph unicode="&#xe145;" d="M603 1200q85 0 162 -15t127 -38t79 -48t29 -46v-953q0 -41 -29.5 -70.5t-70.5 -29.5h-600q-41 0 -70.5 29.5t-29.5 70.5v953q0 21 30 46.5t81 48t129 37.5t163 15zM300 1000v-700h600v700h-600zM600 254q-43 0 -73.5 -30.5t-30.5 -73.5t30.5 -73.5t73.5 -30.5t73.5 30.5 t30.5 73.5t-30.5 73.5t-73.5 30.5z" />
<glyph unicode="&#xe146;" d="M902 1185l283 -282q15 -15 15 -36t-14.5 -35.5t-35.5 -14.5t-35 15l-36 35l-279 -267v-300l-212 210l-308 -307l-280 -203l203 280l307 308l-210 212h300l267 279l-35 36q-15 14 -15 35t14.5 35.5t35.5 14.5t35 -15z" />
<glyph unicode="&#xe148;" d="M700 1248v-78q38 -5 72.5 -14.5t75.5 -31.5t71 -53.5t52 -84t24 -118.5h-159q-4 36 -10.5 59t-21 45t-40 35.5t-64.5 20.5v-307l64 -13q34 -7 64 -16.5t70 -32t67.5 -52.5t47.5 -80t20 -112q0 -139 -89 -224t-244 -97v-77h-100v79q-150 16 -237 103q-40 40 -52.5 93.5 t-15.5 139.5h139q5 -77 48.5 -126t117.5 -65v335l-27 8q-46 14 -79 26.5t-72 36t-63 52t-40 72.5t-16 98q0 70 25 126t67.5 92t94.5 57t110 27v77h100zM600 754v274q-29 -4 -50 -11t-42 -21.5t-31.5 -41.5t-10.5 -65q0 -29 7 -50.5t16.5 -34t28.5 -22.5t31.5 -14t37.5 -10 q9 -3 13 -4zM700 547v-310q22 2 42.5 6.5t45 15.5t41.5 27t29 42t12 59.5t-12.5 59.5t-38 44.5t-53 31t-66.5 24.5z" />
<glyph unicode="&#xe149;" d="M561 1197q84 0 160.5 -40t123.5 -109.5t47 -147.5h-153q0 40 -19.5 71.5t-49.5 48.5t-59.5 26t-55.5 9q-37 0 -79 -14.5t-62 -35.5q-41 -44 -41 -101q0 -26 13.5 -63t26.5 -61t37 -66q6 -9 9 -14h241v-100h-197q8 -50 -2.5 -115t-31.5 -95q-45 -62 -99 -112 q34 10 83 17.5t71 7.5q32 1 102 -16t104 -17q83 0 136 30l50 -147q-31 -19 -58 -30.5t-55 -15.5t-42 -4.5t-46 -0.5q-23 0 -76 17t-111 32.5t-96 11.5q-39 -3 -82 -16t-67 -25l-23 -11l-55 145q4 3 16 11t15.5 10.5t13 9t15.5 12t14.5 14t17.5 18.5q48 55 54 126.5 t-30 142.5h-221v100h166q-23 47 -44 104q-7 20 -12 41.5t-6 55.5t6 66.5t29.5 70.5t58.5 71q97 88 263 88z" />
<glyph unicode="&#xe150;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM935 1184l230 -249q14 -14 10 -24.5t-25 -10.5h-150v-900h-200v900h-150q-21 0 -25 10.5t10 24.5l230 249q14 15 35 15t35 -15z" />
<glyph unicode="&#xe151;" d="M1000 700h-100v100h-100v-100h-100v500h300v-500zM400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM801 1100v-200h100v200h-100zM1000 350l-200 -250h200v-100h-300v150l200 250h-200v100h300v-150z " />
<glyph unicode="&#xe152;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM1000 1050l-200 -250h200v-100h-300v150l200 250h-200v100h300v-150zM1000 0h-100v100h-100v-100h-100v500h300v-500zM801 400v-200h100v200h-100z " />
<glyph unicode="&#xe153;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM1000 700h-100v400h-100v100h200v-500zM1100 0h-100v100h-200v400h300v-500zM901 400v-200h100v200h-100z" />
<glyph unicode="&#xe154;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM1100 700h-100v100h-200v400h300v-500zM901 1100v-200h100v200h-100zM1000 0h-100v400h-100v100h200v-500z" />
<glyph unicode="&#xe155;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM900 1000h-200v200h200v-200zM1000 700h-300v200h300v-200zM1100 400h-400v200h400v-200zM1200 100h-500v200h500v-200z" />
<glyph unicode="&#xe156;" d="M400 300h150q21 0 25 -11t-10 -25l-230 -250q-14 -15 -35 -15t-35 15l-230 250q-14 14 -10 25t25 11h150v900h200v-900zM1200 1000h-500v200h500v-200zM1100 700h-400v200h400v-200zM1000 400h-300v200h300v-200zM900 100h-200v200h200v-200z" />
<glyph unicode="&#xe157;" d="M350 1100h400q162 0 256 -93.5t94 -256.5v-400q0 -165 -93.5 -257.5t-256.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5zM800 900h-500q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5 v500q0 41 -29.5 70.5t-70.5 29.5z" />
<glyph unicode="&#xe158;" d="M350 1100h400q165 0 257.5 -92.5t92.5 -257.5v-400q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-163 0 -256.5 92.5t-93.5 257.5v400q0 163 94 256.5t256 93.5zM800 900h-500q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5 v500q0 41 -29.5 70.5t-70.5 29.5zM440 770l253 -190q17 -12 17 -30t-17 -30l-253 -190q-16 -12 -28 -6.5t-12 26.5v400q0 21 12 26.5t28 -6.5z" />
<glyph unicode="&#xe159;" d="M350 1100h400q163 0 256.5 -94t93.5 -256v-400q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 163 92.5 256.5t257.5 93.5zM800 900h-500q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5 v500q0 41 -29.5 70.5t-70.5 29.5zM350 700h400q21 0 26.5 -12t-6.5 -28l-190 -253q-12 -17 -30 -17t-30 17l-190 253q-12 16 -6.5 28t26.5 12z" />
<glyph unicode="&#xe160;" d="M350 1100h400q165 0 257.5 -92.5t92.5 -257.5v-400q0 -163 -92.5 -256.5t-257.5 -93.5h-400q-163 0 -256.5 94t-93.5 256v400q0 165 92.5 257.5t257.5 92.5zM800 900h-500q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5 v500q0 41 -29.5 70.5t-70.5 29.5zM580 693l190 -253q12 -16 6.5 -28t-26.5 -12h-400q-21 0 -26.5 12t6.5 28l190 253q12 17 30 17t30 -17z" />
<glyph unicode="&#xe161;" d="M550 1100h400q165 0 257.5 -92.5t92.5 -257.5v-400q0 -165 -92.5 -257.5t-257.5 -92.5h-400q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h450q41 0 70.5 29.5t29.5 70.5v500q0 41 -29.5 70.5t-70.5 29.5h-450q-21 0 -35.5 14.5t-14.5 35.5v100 q0 21 14.5 35.5t35.5 14.5zM338 867l324 -284q16 -14 16 -33t-16 -33l-324 -284q-16 -14 -27 -9t-11 26v150h-250q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5h250v150q0 21 11 26t27 -9z" />
<glyph unicode="&#xe162;" d="M793 1182l9 -9q8 -10 5 -27q-3 -11 -79 -225.5t-78 -221.5l300 1q24 0 32.5 -17.5t-5.5 -35.5q-1 0 -133.5 -155t-267 -312.5t-138.5 -162.5q-12 -15 -26 -15h-9l-9 8q-9 11 -4 32q2 9 42 123.5t79 224.5l39 110h-302q-23 0 -31 19q-10 21 6 41q75 86 209.5 237.5 t228 257t98.5 111.5q9 16 25 16h9z" />
<glyph unicode="&#xe163;" d="M350 1100h400q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-450q-41 0 -70.5 -29.5t-29.5 -70.5v-500q0 -41 29.5 -70.5t70.5 -29.5h450q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400 q0 165 92.5 257.5t257.5 92.5zM938 867l324 -284q16 -14 16 -33t-16 -33l-324 -284q-16 -14 -27 -9t-11 26v150h-250q-21 0 -35.5 14.5t-14.5 35.5v200q0 21 14.5 35.5t35.5 14.5h250v150q0 21 11 26t27 -9z" />
<glyph unicode="&#xe164;" d="M750 1200h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -10.5 -25t-24.5 10l-109 109l-312 -312q-15 -15 -35.5 -15t-35.5 15l-141 141q-15 15 -15 35.5t15 35.5l312 312l-109 109q-14 14 -10 24.5t25 10.5zM456 900h-156q-41 0 -70.5 -29.5t-29.5 -70.5v-500 q0 -41 29.5 -70.5t70.5 -29.5h500q41 0 70.5 29.5t29.5 70.5v148l200 200v-298q0 -165 -93.5 -257.5t-256.5 -92.5h-400q-165 0 -257.5 92.5t-92.5 257.5v400q0 165 92.5 257.5t257.5 92.5h300z" />
<glyph unicode="&#xe165;" d="M600 1186q119 0 227.5 -46.5t187 -125t125 -187t46.5 -227.5t-46.5 -227.5t-125 -187t-187 -125t-227.5 -46.5t-227.5 46.5t-187 125t-125 187t-46.5 227.5t46.5 227.5t125 187t187 125t227.5 46.5zM600 1022q-115 0 -212 -56.5t-153.5 -153.5t-56.5 -212t56.5 -212 t153.5 -153.5t212 -56.5t212 56.5t153.5 153.5t56.5 212t-56.5 212t-153.5 153.5t-212 56.5zM600 794q80 0 137 -57t57 -137t-57 -137t-137 -57t-137 57t-57 137t57 137t137 57z" />
<glyph unicode="&#xe166;" d="M450 1200h200q21 0 35.5 -14.5t14.5 -35.5v-350h245q20 0 25 -11t-9 -26l-383 -426q-14 -15 -33.5 -15t-32.5 15l-379 426q-13 15 -8.5 26t25.5 11h250v350q0 21 14.5 35.5t35.5 14.5zM50 300h1000q21 0 35.5 -14.5t14.5 -35.5v-250h-1100v250q0 21 14.5 35.5t35.5 14.5z M900 200v-50h100v50h-100z" />
<glyph unicode="&#xe167;" d="M583 1182l378 -435q14 -15 9 -31t-26 -16h-244v-250q0 -20 -17 -35t-39 -15h-200q-20 0 -32 14.5t-12 35.5v250h-250q-20 0 -25.5 16.5t8.5 31.5l383 431q14 16 33.5 17t33.5 -14zM50 300h1000q21 0 35.5 -14.5t14.5 -35.5v-250h-1100v250q0 21 14.5 35.5t35.5 14.5z M900 200v-50h100v50h-100z" />
<glyph unicode="&#xe168;" d="M396 723l369 369q7 7 17.5 7t17.5 -7l139 -139q7 -8 7 -18.5t-7 -17.5l-525 -525q-7 -8 -17.5 -8t-17.5 8l-292 291q-7 8 -7 18t7 18l139 139q8 7 18.5 7t17.5 -7zM50 300h1000q21 0 35.5 -14.5t14.5 -35.5v-250h-1100v250q0 21 14.5 35.5t35.5 14.5zM900 200v-50h100v50 h-100z" />
<glyph unicode="&#xe169;" d="M135 1023l142 142q14 14 35 14t35 -14l77 -77l-212 -212l-77 76q-14 15 -14 36t14 35zM655 855l210 210q14 14 24.5 10t10.5 -25l-2 -599q-1 -20 -15.5 -35t-35.5 -15l-597 -1q-21 0 -25 10.5t10 24.5l208 208l-154 155l212 212zM50 300h1000q21 0 35.5 -14.5t14.5 -35.5 v-250h-1100v250q0 21 14.5 35.5t35.5 14.5zM900 200v-50h100v50h-100z" />
<glyph unicode="&#xe170;" d="M350 1200l599 -2q20 -1 35 -15.5t15 -35.5l1 -597q0 -21 -10.5 -25t-24.5 10l-208 208l-155 -154l-212 212l155 154l-210 210q-14 14 -10 24.5t25 10.5zM524 512l-76 -77q-15 -14 -36 -14t-35 14l-142 142q-14 14 -14 35t14 35l77 77zM50 300h1000q21 0 35.5 -14.5 t14.5 -35.5v-250h-1100v250q0 21 14.5 35.5t35.5 14.5zM900 200v-50h100v50h-100z" />
<glyph unicode="&#xe171;" d="M1200 103l-483 276l-314 -399v423h-399l1196 796v-1096zM483 424v-230l683 953z" />
<glyph unicode="&#xe172;" d="M1100 1000v-850q0 -21 -14.5 -35.5t-35.5 -14.5h-150v400h-700v-400h-150q-21 0 -35.5 14.5t-14.5 35.5v1000q0 20 14.5 35t35.5 15h250v-300h500v300h100zM700 1000h-100v200h100v-200z" />
<glyph unicode="&#xe173;" d="M1100 1000l-2 -149l-299 -299l-95 95q-9 9 -21.5 9t-21.5 -9l-149 -147h-312v-400h-150q-21 0 -35.5 14.5t-14.5 35.5v1000q0 20 14.5 35t35.5 15h250v-300h500v300h100zM700 1000h-100v200h100v-200zM1132 638l106 -106q7 -7 7 -17.5t-7 -17.5l-420 -421q-8 -7 -18 -7 t-18 7l-202 203q-8 7 -8 17.5t8 17.5l106 106q7 8 17.5 8t17.5 -8l79 -79l297 297q7 7 17.5 7t17.5 -7z" />
<glyph unicode="&#xe174;" d="M1100 1000v-269l-103 -103l-134 134q-15 15 -33.5 16.5t-34.5 -12.5l-266 -266h-329v-400h-150q-21 0 -35.5 14.5t-14.5 35.5v1000q0 20 14.5 35t35.5 15h250v-300h500v300h100zM700 1000h-100v200h100v-200zM1202 572l70 -70q15 -15 15 -35.5t-15 -35.5l-131 -131 l131 -131q15 -15 15 -35.5t-15 -35.5l-70 -70q-15 -15 -35.5 -15t-35.5 15l-131 131l-131 -131q-15 -15 -35.5 -15t-35.5 15l-70 70q-15 15 -15 35.5t15 35.5l131 131l-131 131q-15 15 -15 35.5t15 35.5l70 70q15 15 35.5 15t35.5 -15l131 -131l131 131q15 15 35.5 15 t35.5 -15z" />
<glyph unicode="&#xe175;" d="M1100 1000v-300h-350q-21 0 -35.5 -14.5t-14.5 -35.5v-150h-500v-400h-150q-21 0 -35.5 14.5t-14.5 35.5v1000q0 20 14.5 35t35.5 15h250v-300h500v300h100zM700 1000h-100v200h100v-200zM850 600h100q21 0 35.5 -14.5t14.5 -35.5v-250h150q21 0 25 -10.5t-10 -24.5 l-230 -230q-14 -14 -35 -14t-35 14l-230 230q-14 14 -10 24.5t25 10.5h150v250q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe176;" d="M1100 1000v-400l-165 165q-14 15 -35 15t-35 -15l-263 -265h-402v-400h-150q-21 0 -35.5 14.5t-14.5 35.5v1000q0 20 14.5 35t35.5 15h250v-300h500v300h100zM700 1000h-100v200h100v-200zM935 565l230 -229q14 -15 10 -25.5t-25 -10.5h-150v-250q0 -20 -14.5 -35 t-35.5 -15h-100q-21 0 -35.5 15t-14.5 35v250h-150q-21 0 -25 10.5t10 25.5l230 229q14 15 35 15t35 -15z" />
<glyph unicode="&#xe177;" d="M50 1100h1100q21 0 35.5 -14.5t14.5 -35.5v-150h-1200v150q0 21 14.5 35.5t35.5 14.5zM1200 800v-550q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v550h1200zM100 500v-200h400v200h-400z" />
<glyph unicode="&#xe178;" d="M935 1165l248 -230q14 -14 14 -35t-14 -35l-248 -230q-14 -14 -24.5 -10t-10.5 25v150h-400v200h400v150q0 21 10.5 25t24.5 -10zM200 800h-50q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h50v-200zM400 800h-100v200h100v-200zM18 435l247 230 q14 14 24.5 10t10.5 -25v-150h400v-200h-400v-150q0 -21 -10.5 -25t-24.5 10l-247 230q-15 14 -15 35t15 35zM900 300h-100v200h100v-200zM1000 500h51q20 0 34.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-34.5 -14.5h-51v200z" />
<glyph unicode="&#xe179;" d="M862 1073l276 116q25 18 43.5 8t18.5 -41v-1106q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v397q-4 1 -11 5t-24 17.5t-30 29t-24 42t-11 56.5v359q0 31 18.5 65t43.5 52zM550 1200q22 0 34.5 -12.5t14.5 -24.5l1 -13v-450q0 -28 -10.5 -59.5 t-25 -56t-29 -45t-25.5 -31.5l-10 -11v-447q0 -21 -14.5 -35.5t-35.5 -14.5h-200q-21 0 -35.5 14.5t-14.5 35.5v447q-4 4 -11 11.5t-24 30.5t-30 46t-24 55t-11 60v450q0 2 0.5 5.5t4 12t8.5 15t14.5 12t22.5 5.5q20 0 32.5 -12.5t14.5 -24.5l3 -13v-350h100v350v5.5t2.5 12 t7 15t15 12t25.5 5.5q23 0 35.5 -12.5t13.5 -24.5l1 -13v-350h100v350q0 2 0.5 5.5t3 12t7 15t15 12t24.5 5.5z" />
<glyph unicode="&#xe180;" d="M1200 1100v-56q-4 0 -11 -0.5t-24 -3t-30 -7.5t-24 -15t-11 -24v-888q0 -22 25 -34.5t50 -13.5l25 -2v-56h-400v56q75 0 87.5 6.5t12.5 43.5v394h-500v-394q0 -37 12.5 -43.5t87.5 -6.5v-56h-400v56q4 0 11 0.5t24 3t30 7.5t24 15t11 24v888q0 22 -25 34.5t-50 13.5 l-25 2v56h400v-56q-75 0 -87.5 -6.5t-12.5 -43.5v-394h500v394q0 37 -12.5 43.5t-87.5 6.5v56h400z" />
<glyph unicode="&#xe181;" d="M675 1000h375q21 0 35.5 -14.5t14.5 -35.5v-150h-105l-295 -98v98l-200 200h-400l100 100h375zM100 900h300q41 0 70.5 -29.5t29.5 -70.5v-500q0 -41 -29.5 -70.5t-70.5 -29.5h-300q-41 0 -70.5 29.5t-29.5 70.5v500q0 41 29.5 70.5t70.5 29.5zM100 800v-200h300v200 h-300zM1100 535l-400 -133v163l400 133v-163zM100 500v-200h300v200h-300zM1100 398v-248q0 -21 -14.5 -35.5t-35.5 -14.5h-375l-100 -100h-375l-100 100h400l200 200h105z" />
<glyph unicode="&#xe182;" d="M17 1007l162 162q17 17 40 14t37 -22l139 -194q14 -20 11 -44.5t-20 -41.5l-119 -118q102 -142 228 -268t267 -227l119 118q17 17 42.5 19t44.5 -12l192 -136q19 -14 22.5 -37.5t-13.5 -40.5l-163 -162q-3 -1 -9.5 -1t-29.5 2t-47.5 6t-62.5 14.5t-77.5 26.5t-90 42.5 t-101.5 60t-111 83t-119 108.5q-74 74 -133.5 150.5t-94.5 138.5t-60 119.5t-34.5 100t-15 74.5t-4.5 48z" />
<glyph unicode="&#xe183;" d="M600 1100q92 0 175 -10.5t141.5 -27t108.5 -36.5t81.5 -40t53.5 -37t31 -27l9 -10v-200q0 -21 -14.5 -33t-34.5 -9l-202 34q-20 3 -34.5 20t-14.5 38v146q-141 24 -300 24t-300 -24v-146q0 -21 -14.5 -38t-34.5 -20l-202 -34q-20 -3 -34.5 9t-14.5 33v200q3 4 9.5 10.5 t31 26t54 37.5t80.5 39.5t109 37.5t141 26.5t175 10.5zM600 795q56 0 97 -9.5t60 -23.5t30 -28t12 -24l1 -10v-50l365 -303q14 -15 24.5 -40t10.5 -45v-212q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v212q0 20 10.5 45t24.5 40l365 303v50 q0 4 1 10.5t12 23t30 29t60 22.5t97 10z" />
<glyph unicode="&#xe184;" d="M1100 700l-200 -200h-600l-200 200v500h200v-200h200v200h200v-200h200v200h200v-500zM250 400h700q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-12l137 -100h-950l137 100h-12q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5 t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe185;" d="M700 1100h-100q-41 0 -70.5 -29.5t-29.5 -70.5v-1000h300v1000q0 41 -29.5 70.5t-70.5 29.5zM1100 800h-100q-41 0 -70.5 -29.5t-29.5 -70.5v-700h300v700q0 41 -29.5 70.5t-70.5 29.5zM400 0h-300v400q0 41 29.5 70.5t70.5 29.5h100q41 0 70.5 -29.5t29.5 -70.5v-400z " />
<glyph unicode="&#xe186;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 700h-200v-100h200v-300h-300v100h200v100h-200v300h300v-100zM900 700v-300l-100 -100h-200v500h200z M700 700v-300h100v300h-100z" />
<glyph unicode="&#xe187;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 300h-100v200h-100v-200h-100v500h100v-200h100v200h100v-500zM900 700v-300l-100 -100h-200v500h200z M700 700v-300h100v300h-100z" />
<glyph unicode="&#xe188;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 700h-200v-300h200v-100h-300v500h300v-100zM900 700h-200v-300h200v-100h-300v500h300v-100z" />
<glyph unicode="&#xe189;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 400l-300 150l300 150v-300zM900 550l-300 -150v300z" />
<glyph unicode="&#xe190;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM900 300h-700v500h700v-500zM800 700h-130q-38 0 -66.5 -43t-28.5 -108t27 -107t68 -42h130v300zM300 700v-300 h130q41 0 68 42t27 107t-28.5 108t-66.5 43h-130z" />
<glyph unicode="&#xe191;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 700h-200v-100h200v-300h-300v100h200v100h-200v300h300v-100zM900 300h-100v400h-100v100h200v-500z M700 300h-100v100h100v-100z" />
<glyph unicode="&#xe192;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM300 700h200v-400h-300v500h100v-100zM900 300h-100v400h-100v100h200v-500zM300 600v-200h100v200h-100z M700 300h-100v100h100v-100z" />
<glyph unicode="&#xe193;" d="M200 1100h700q124 0 212 -88t88 -212v-500q0 -124 -88 -212t-212 -88h-700q-124 0 -212 88t-88 212v500q0 124 88 212t212 88zM100 900v-700h900v700h-900zM500 500l-199 -200h-100v50l199 200v150h-200v100h300v-300zM900 300h-100v400h-100v100h200v-500zM701 300h-100 v100h100v-100z" />
<glyph unicode="&#xe194;" d="M600 1191q120 0 229.5 -47t188.5 -126t126 -188.5t47 -229.5t-47 -229.5t-126 -188.5t-188.5 -126t-229.5 -47t-229.5 47t-188.5 126t-126 188.5t-47 229.5t47 229.5t126 188.5t188.5 126t229.5 47zM600 1021q-114 0 -211 -56.5t-153.5 -153.5t-56.5 -211t56.5 -211 t153.5 -153.5t211 -56.5t211 56.5t153.5 153.5t56.5 211t-56.5 211t-153.5 153.5t-211 56.5zM800 700h-300v-200h300v-100h-300l-100 100v200l100 100h300v-100z" />
<glyph unicode="&#xe195;" d="M600 1191q120 0 229.5 -47t188.5 -126t126 -188.5t47 -229.5t-47 -229.5t-126 -188.5t-188.5 -126t-229.5 -47t-229.5 47t-188.5 126t-126 188.5t-47 229.5t47 229.5t126 188.5t188.5 126t229.5 47zM600 1021q-114 0 -211 -56.5t-153.5 -153.5t-56.5 -211t56.5 -211 t153.5 -153.5t211 -56.5t211 56.5t153.5 153.5t56.5 211t-56.5 211t-153.5 153.5t-211 56.5zM800 700v-100l-50 -50l100 -100v-50h-100l-100 100h-150v-100h-100v400h300zM500 700v-100h200v100h-200z" />
<glyph unicode="&#xe197;" d="M503 1089q110 0 200.5 -59.5t134.5 -156.5q44 14 90 14q120 0 205 -86.5t85 -207t-85 -207t-205 -86.5h-128v250q0 21 -14.5 35.5t-35.5 14.5h-300q-21 0 -35.5 -14.5t-14.5 -35.5v-250h-222q-80 0 -136 57.5t-56 136.5q0 69 43 122.5t108 67.5q-2 19 -2 37q0 100 49 185 t134 134t185 49zM525 500h150q10 0 17.5 -7.5t7.5 -17.5v-275h137q21 0 26 -11.5t-8 -27.5l-223 -244q-13 -16 -32 -16t-32 16l-223 244q-13 16 -8 27.5t26 11.5h137v275q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe198;" d="M502 1089q110 0 201 -59.5t135 -156.5q43 15 89 15q121 0 206 -86.5t86 -206.5q0 -99 -60 -181t-150 -110l-378 360q-13 16 -31.5 16t-31.5 -16l-381 -365h-9q-79 0 -135.5 57.5t-56.5 136.5q0 69 43 122.5t108 67.5q-2 19 -2 38q0 100 49 184.5t133.5 134t184.5 49.5z M632 467l223 -228q13 -16 8 -27.5t-26 -11.5h-137v-275q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v275h-137q-21 0 -26 11.5t8 27.5q199 204 223 228q19 19 31.5 19t32.5 -19z" />
<glyph unicode="&#xe199;" d="M700 100v100h400l-270 300h170l-270 300h170l-300 333l-300 -333h170l-270 -300h170l-270 -300h400v-100h-50q-21 0 -35.5 -14.5t-14.5 -35.5v-50h400v50q0 21 -14.5 35.5t-35.5 14.5h-50z" />
<glyph unicode="&#xe200;" d="M600 1179q94 0 167.5 -56.5t99.5 -145.5q89 -6 150.5 -71.5t61.5 -155.5q0 -61 -29.5 -112.5t-79.5 -82.5q9 -29 9 -55q0 -74 -52.5 -126.5t-126.5 -52.5q-55 0 -100 30v-251q21 0 35.5 -14.5t14.5 -35.5v-50h-300v50q0 21 14.5 35.5t35.5 14.5v251q-45 -30 -100 -30 q-74 0 -126.5 52.5t-52.5 126.5q0 18 4 38q-47 21 -75.5 65t-28.5 97q0 74 52.5 126.5t126.5 52.5q5 0 23 -2q0 2 -1 10t-1 13q0 116 81.5 197.5t197.5 81.5z" />
<glyph unicode="&#xe201;" d="M1010 1010q111 -111 150.5 -260.5t0 -299t-150.5 -260.5q-83 -83 -191.5 -126.5t-218.5 -43.5t-218.5 43.5t-191.5 126.5q-111 111 -150.5 260.5t0 299t150.5 260.5q83 83 191.5 126.5t218.5 43.5t218.5 -43.5t191.5 -126.5zM476 1065q-4 0 -8 -1q-121 -34 -209.5 -122.5 t-122.5 -209.5q-4 -12 2.5 -23t18.5 -14l36 -9q3 -1 7 -1q23 0 29 22q27 96 98 166q70 71 166 98q11 3 17.5 13.5t3.5 22.5l-9 35q-3 13 -14 19q-7 4 -15 4zM512 920q-4 0 -9 -2q-80 -24 -138.5 -82.5t-82.5 -138.5q-4 -13 2 -24t19 -14l34 -9q4 -1 8 -1q22 0 28 21 q18 58 58.5 98.5t97.5 58.5q12 3 18 13.5t3 21.5l-9 35q-3 12 -14 19q-7 4 -15 4zM719.5 719.5q-49.5 49.5 -119.5 49.5t-119.5 -49.5t-49.5 -119.5t49.5 -119.5t119.5 -49.5t119.5 49.5t49.5 119.5t-49.5 119.5zM855 551q-22 0 -28 -21q-18 -58 -58.5 -98.5t-98.5 -57.5 q-11 -4 -17 -14.5t-3 -21.5l9 -35q3 -12 14 -19q7 -4 15 -4q4 0 9 2q80 24 138.5 82.5t82.5 138.5q4 13 -2.5 24t-18.5 14l-34 9q-4 1 -8 1zM1000 515q-23 0 -29 -22q-27 -96 -98 -166q-70 -71 -166 -98q-11 -3 -17.5 -13.5t-3.5 -22.5l9 -35q3 -13 14 -19q7 -4 15 -4 q4 0 8 1q121 34 209.5 122.5t122.5 209.5q4 12 -2.5 23t-18.5 14l-36 9q-3 1 -7 1z" />
<glyph unicode="&#xe202;" d="M700 800h300v-380h-180v200h-340v-200h-380v755q0 10 7.5 17.5t17.5 7.5h575v-400zM1000 900h-200v200zM700 300h162l-212 -212l-212 212h162v200h100v-200zM520 0h-395q-10 0 -17.5 7.5t-7.5 17.5v395zM1000 220v-195q0 -10 -7.5 -17.5t-17.5 -7.5h-195z" />
<glyph unicode="&#xe203;" d="M700 800h300v-520l-350 350l-550 -550v1095q0 10 7.5 17.5t17.5 7.5h575v-400zM1000 900h-200v200zM862 200h-162v-200h-100v200h-162l212 212zM480 0h-355q-10 0 -17.5 7.5t-7.5 17.5v55h380v-80zM1000 80v-55q0 -10 -7.5 -17.5t-17.5 -7.5h-155v80h180z" />
<glyph unicode="&#xe204;" d="M1162 800h-162v-200h100l100 -100h-300v300h-162l212 212zM200 800h200q27 0 40 -2t29.5 -10.5t23.5 -30t7 -57.5h300v-100h-600l-200 -350v450h100q0 36 7 57.5t23.5 30t29.5 10.5t40 2zM800 400h240l-240 -400h-800l300 500h500v-100z" />
<glyph unicode="&#xe205;" d="M650 1100h100q21 0 35.5 -14.5t14.5 -35.5v-50h50q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-300q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h50v50q0 21 14.5 35.5t35.5 14.5zM1000 850v150q41 0 70.5 -29.5t29.5 -70.5v-800 q0 -41 -29.5 -70.5t-70.5 -29.5h-600q-1 0 -20 4l246 246l-326 326v324q0 41 29.5 70.5t70.5 29.5v-150q0 -62 44 -106t106 -44h300q62 0 106 44t44 106zM412 250l-212 -212v162h-200v100h200v162z" />
<glyph unicode="&#xe206;" d="M450 1100h100q21 0 35.5 -14.5t14.5 -35.5v-50h50q21 0 35.5 -14.5t14.5 -35.5v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-300q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h50v50q0 21 14.5 35.5t35.5 14.5zM800 850v150q41 0 70.5 -29.5t29.5 -70.5v-500 h-200v-300h200q0 -36 -7 -57.5t-23.5 -30t-29.5 -10.5t-40 -2h-600q-41 0 -70.5 29.5t-29.5 70.5v800q0 41 29.5 70.5t70.5 29.5v-150q0 -62 44 -106t106 -44h300q62 0 106 44t44 106zM1212 250l-212 -212v162h-200v100h200v162z" />
<glyph unicode="&#xe209;" d="M658 1197l637 -1104q23 -38 7 -65.5t-60 -27.5h-1276q-44 0 -60 27.5t7 65.5l637 1104q22 39 54 39t54 -39zM704 800h-208q-20 0 -32 -14.5t-8 -34.5l58 -302q4 -20 21.5 -34.5t37.5 -14.5h54q20 0 37.5 14.5t21.5 34.5l58 302q4 20 -8 34.5t-32 14.5zM500 300v-100h200 v100h-200z" />
<glyph unicode="&#xe210;" d="M425 1100h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM425 800h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5 t17.5 7.5zM825 800h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM25 500h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150 q0 10 7.5 17.5t17.5 7.5zM425 500h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM825 500h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5 v150q0 10 7.5 17.5t17.5 7.5zM25 200h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM425 200h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5 t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM825 200h250q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-250q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe211;" d="M700 1200h100v-200h-100v-100h350q62 0 86.5 -39.5t-3.5 -94.5l-66 -132q-41 -83 -81 -134h-772q-40 51 -81 134l-66 132q-28 55 -3.5 94.5t86.5 39.5h350v100h-100v200h100v100h200v-100zM250 400h700q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-12l137 -100 h-950l138 100h-13q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe212;" d="M600 1300q40 0 68.5 -29.5t28.5 -70.5h-194q0 41 28.5 70.5t68.5 29.5zM443 1100h314q18 -37 18 -75q0 -8 -3 -25h328q41 0 44.5 -16.5t-30.5 -38.5l-175 -145h-678l-178 145q-34 22 -29 38.5t46 16.5h328q-3 17 -3 25q0 38 18 75zM250 700h700q21 0 35.5 -14.5 t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-150v-200l275 -200h-950l275 200v200h-150q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe213;" d="M600 1181q75 0 128 -53t53 -128t-53 -128t-128 -53t-128 53t-53 128t53 128t128 53zM602 798h46q34 0 55.5 -28.5t21.5 -86.5q0 -76 39 -183h-324q39 107 39 183q0 58 21.5 86.5t56.5 28.5h45zM250 400h700q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-13 l138 -100h-950l137 100h-12q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe214;" d="M600 1300q47 0 92.5 -53.5t71 -123t25.5 -123.5q0 -78 -55.5 -133.5t-133.5 -55.5t-133.5 55.5t-55.5 133.5q0 62 34 143l144 -143l111 111l-163 163q34 26 63 26zM602 798h46q34 0 55.5 -28.5t21.5 -86.5q0 -76 39 -183h-324q39 107 39 183q0 58 21.5 86.5t56.5 28.5h45 zM250 400h700q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-13l138 -100h-950l137 100h-12q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe215;" d="M600 1200l300 -161v-139h-300q0 -57 18.5 -108t50 -91.5t63 -72t70 -67.5t57.5 -61h-530q-60 83 -90.5 177.5t-30.5 178.5t33 164.5t87.5 139.5t126 96.5t145.5 41.5v-98zM250 400h700q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-13l138 -100h-950l137 100 h-12q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5zM50 100h1100q21 0 35.5 -14.5t14.5 -35.5v-50h-1200v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe216;" d="M600 1300q41 0 70.5 -29.5t29.5 -70.5v-78q46 -26 73 -72t27 -100v-50h-400v50q0 54 27 100t73 72v78q0 41 29.5 70.5t70.5 29.5zM400 800h400q54 0 100 -27t72 -73h-172v-100h200v-100h-200v-100h200v-100h-200v-100h200q0 -83 -58.5 -141.5t-141.5 -58.5h-400 q-83 0 -141.5 58.5t-58.5 141.5v400q0 83 58.5 141.5t141.5 58.5z" />
<glyph unicode="&#xe218;" d="M150 1100h900q21 0 35.5 -14.5t14.5 -35.5v-500q0 -21 -14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5v500q0 21 14.5 35.5t35.5 14.5zM125 400h950q10 0 17.5 -7.5t7.5 -17.5v-50q0 -10 -7.5 -17.5t-17.5 -7.5h-283l224 -224q13 -13 13 -31.5t-13 -32 t-31.5 -13.5t-31.5 13l-88 88h-524l-87 -88q-13 -13 -32 -13t-32 13.5t-13 32t13 31.5l224 224h-289q-10 0 -17.5 7.5t-7.5 17.5v50q0 10 7.5 17.5t17.5 7.5zM541 300l-100 -100h324l-100 100h-124z" />
<glyph unicode="&#xe219;" d="M200 1100h800q83 0 141.5 -58.5t58.5 -141.5v-200h-100q0 41 -29.5 70.5t-70.5 29.5h-250q-41 0 -70.5 -29.5t-29.5 -70.5h-100q0 41 -29.5 70.5t-70.5 29.5h-250q-41 0 -70.5 -29.5t-29.5 -70.5h-100v200q0 83 58.5 141.5t141.5 58.5zM100 600h1000q41 0 70.5 -29.5 t29.5 -70.5v-300h-1200v300q0 41 29.5 70.5t70.5 29.5zM300 100v-50q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v50h200zM1100 100v-50q0 -21 -14.5 -35.5t-35.5 -14.5h-100q-21 0 -35.5 14.5t-14.5 35.5v50h200z" />
<glyph unicode="&#xe221;" d="M480 1165l682 -683q31 -31 31 -75.5t-31 -75.5l-131 -131h-481l-517 518q-32 31 -32 75.5t32 75.5l295 296q31 31 75.5 31t76.5 -31zM108 794l342 -342l303 304l-341 341zM250 100h800q21 0 35.5 -14.5t14.5 -35.5v-50h-900v50q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe223;" d="M1057 647l-189 506q-8 19 -27.5 33t-40.5 14h-400q-21 0 -40.5 -14t-27.5 -33l-189 -506q-8 -19 1.5 -33t30.5 -14h625v-150q0 -21 14.5 -35.5t35.5 -14.5t35.5 14.5t14.5 35.5v150h125q21 0 30.5 14t1.5 33zM897 0h-595v50q0 21 14.5 35.5t35.5 14.5h50v50 q0 21 14.5 35.5t35.5 14.5h48v300h200v-300h47q21 0 35.5 -14.5t14.5 -35.5v-50h50q21 0 35.5 -14.5t14.5 -35.5v-50z" />
<glyph unicode="&#xe224;" d="M900 800h300v-575q0 -10 -7.5 -17.5t-17.5 -7.5h-375v591l-300 300v84q0 10 7.5 17.5t17.5 7.5h375v-400zM1200 900h-200v200zM400 600h300v-575q0 -10 -7.5 -17.5t-17.5 -7.5h-650q-10 0 -17.5 7.5t-7.5 17.5v950q0 10 7.5 17.5t17.5 7.5h375v-400zM700 700h-200v200z " />
<glyph unicode="&#xe225;" d="M484 1095h195q75 0 146 -32.5t124 -86t89.5 -122.5t48.5 -142q18 -14 35 -20q31 -10 64.5 6.5t43.5 48.5q10 34 -15 71q-19 27 -9 43q5 8 12.5 11t19 -1t23.5 -16q41 -44 39 -105q-3 -63 -46 -106.5t-104 -43.5h-62q-7 -55 -35 -117t-56 -100l-39 -234q-3 -20 -20 -34.5 t-38 -14.5h-100q-21 0 -33 14.5t-9 34.5l12 70q-49 -14 -91 -14h-195q-24 0 -65 8l-11 -64q-3 -20 -20 -34.5t-38 -14.5h-100q-21 0 -33 14.5t-9 34.5l26 157q-84 74 -128 175l-159 53q-19 7 -33 26t-14 40v50q0 21 14.5 35.5t35.5 14.5h124q11 87 56 166l-111 95 q-16 14 -12.5 23.5t24.5 9.5h203q116 101 250 101zM675 1000h-250q-10 0 -17.5 -7.5t-7.5 -17.5v-50q0 -10 7.5 -17.5t17.5 -7.5h250q10 0 17.5 7.5t7.5 17.5v50q0 10 -7.5 17.5t-17.5 7.5z" />
<glyph unicode="&#xe226;" d="M641 900l423 247q19 8 42 2.5t37 -21.5l32 -38q14 -15 12.5 -36t-17.5 -34l-139 -120h-390zM50 1100h106q67 0 103 -17t66 -71l102 -212h823q21 0 35.5 -14.5t14.5 -35.5v-50q0 -21 -14 -40t-33 -26l-737 -132q-23 -4 -40 6t-26 25q-42 67 -100 67h-300q-62 0 -106 44 t-44 106v200q0 62 44 106t106 44zM173 928h-80q-19 0 -28 -14t-9 -35v-56q0 -51 42 -51h134q16 0 21.5 8t5.5 24q0 11 -16 45t-27 51q-18 28 -43 28zM550 727q-32 0 -54.5 -22.5t-22.5 -54.5t22.5 -54.5t54.5 -22.5t54.5 22.5t22.5 54.5t-22.5 54.5t-54.5 22.5zM130 389 l152 130q18 19 34 24t31 -3.5t24.5 -17.5t25.5 -28q28 -35 50.5 -51t48.5 -13l63 5l48 -179q13 -61 -3.5 -97.5t-67.5 -79.5l-80 -69q-47 -40 -109 -35.5t-103 51.5l-130 151q-40 47 -35.5 109.5t51.5 102.5zM380 377l-102 -88q-31 -27 2 -65l37 -43q13 -15 27.5 -19.5 t31.5 6.5l61 53q19 16 14 49q-2 20 -12 56t-17 45q-11 12 -19 14t-23 -8z" />
<glyph unicode="&#xe227;" d="M625 1200h150q10 0 17.5 -7.5t7.5 -17.5v-109q79 -33 131 -87.5t53 -128.5q1 -46 -15 -84.5t-39 -61t-46 -38t-39 -21.5l-17 -6q6 0 15 -1.5t35 -9t50 -17.5t53 -30t50 -45t35.5 -64t14.5 -84q0 -59 -11.5 -105.5t-28.5 -76.5t-44 -51t-49.5 -31.5t-54.5 -16t-49.5 -6.5 t-43.5 -1v-75q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v75h-100v-75q0 -10 -7.5 -17.5t-17.5 -7.5h-150q-10 0 -17.5 7.5t-7.5 17.5v75h-175q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5h75v600h-75q-10 0 -17.5 7.5t-7.5 17.5v150 q0 10 7.5 17.5t17.5 7.5h175v75q0 10 7.5 17.5t17.5 7.5h150q10 0 17.5 -7.5t7.5 -17.5v-75h100v75q0 10 7.5 17.5t17.5 7.5zM400 900v-200h263q28 0 48.5 10.5t30 25t15 29t5.5 25.5l1 10q0 4 -0.5 11t-6 24t-15 30t-30 24t-48.5 11h-263zM400 500v-200h363q28 0 48.5 10.5 t30 25t15 29t5.5 25.5l1 10q0 4 -0.5 11t-6 24t-15 30t-30 24t-48.5 11h-363z" />
<glyph unicode="&#xe230;" d="M212 1198h780q86 0 147 -61t61 -147v-416q0 -51 -18 -142.5t-36 -157.5l-18 -66q-29 -87 -93.5 -146.5t-146.5 -59.5h-572q-82 0 -147 59t-93 147q-8 28 -20 73t-32 143.5t-20 149.5v416q0 86 61 147t147 61zM600 1045q-70 0 -132.5 -11.5t-105.5 -30.5t-78.5 -41.5 t-57 -45t-36 -41t-20.5 -30.5l-6 -12l156 -243h560l156 243q-2 5 -6 12.5t-20 29.5t-36.5 42t-57 44.5t-79 42t-105 29.5t-132.5 12zM762 703h-157l195 261z" />
<glyph unicode="&#xe231;" d="M475 1300h150q103 0 189 -86t86 -189v-500q0 -41 -42 -83t-83 -42h-450q-41 0 -83 42t-42 83v500q0 103 86 189t189 86zM700 300v-225q0 -21 -27 -48t-48 -27h-150q-21 0 -48 27t-27 48v225h300z" />
<glyph unicode="&#xe232;" d="M475 1300h96q0 -150 89.5 -239.5t239.5 -89.5v-446q0 -41 -42 -83t-83 -42h-450q-41 0 -83 42t-42 83v500q0 103 86 189t189 86zM700 300v-225q0 -21 -27 -48t-48 -27h-150q-21 0 -48 27t-27 48v225h300z" />
<glyph unicode="&#xe233;" d="M1294 767l-638 -283l-378 170l-78 -60v-224l100 -150v-199l-150 148l-150 -149v200l100 150v250q0 4 -0.5 10.5t0 9.5t1 8t3 8t6.5 6l47 40l-147 65l642 283zM1000 380l-350 -166l-350 166v147l350 -165l350 165v-147z" />
<glyph unicode="&#xe234;" d="M250 800q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44zM650 800q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44zM1050 800q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44z" />
<glyph unicode="&#xe235;" d="M550 1100q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44zM550 700q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44zM550 300q62 0 106 -44t44 -106t-44 -106t-106 -44t-106 44t-44 106t44 106t106 44z" />
<glyph unicode="&#xe236;" d="M125 1100h950q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-950q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5zM125 700h950q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-950q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5 t17.5 7.5zM125 300h950q10 0 17.5 -7.5t7.5 -17.5v-150q0 -10 -7.5 -17.5t-17.5 -7.5h-950q-10 0 -17.5 7.5t-7.5 17.5v150q0 10 7.5 17.5t17.5 7.5z" />
<glyph unicode="&#xe237;" d="M350 1200h500q162 0 256 -93.5t94 -256.5v-500q0 -165 -93.5 -257.5t-256.5 -92.5h-500q-165 0 -257.5 92.5t-92.5 257.5v500q0 165 92.5 257.5t257.5 92.5zM900 1000h-600q-41 0 -70.5 -29.5t-29.5 -70.5v-600q0 -41 29.5 -70.5t70.5 -29.5h600q41 0 70.5 29.5 t29.5 70.5v600q0 41 -29.5 70.5t-70.5 29.5zM350 900h500q21 0 35.5 -14.5t14.5 -35.5v-300q0 -21 -14.5 -35.5t-35.5 -14.5h-500q-21 0 -35.5 14.5t-14.5 35.5v300q0 21 14.5 35.5t35.5 14.5zM400 800v-200h400v200h-400z" />
<glyph unicode="&#xe238;" d="M150 1100h1000q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-50v-200h50q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-50v-200h50q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5t-35.5 -14.5h-50v-200h50q21 0 35.5 -14.5t14.5 -35.5t-14.5 -35.5 t-35.5 -14.5h-1000q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5h50v200h-50q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5h50v200h-50q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5h50v200h-50q-21 0 -35.5 14.5t-14.5 35.5t14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe239;" d="M650 1187q87 -67 118.5 -156t0 -178t-118.5 -155q-87 66 -118.5 155t0 178t118.5 156zM300 800q124 0 212 -88t88 -212q-124 0 -212 88t-88 212zM1000 800q0 -124 -88 -212t-212 -88q0 124 88 212t212 88zM300 500q124 0 212 -88t88 -212q-124 0 -212 88t-88 212z M1000 500q0 -124 -88 -212t-212 -88q0 124 88 212t212 88zM700 199v-144q0 -21 -14.5 -35.5t-35.5 -14.5t-35.5 14.5t-14.5 35.5v142q40 -4 43 -4q17 0 57 6z" />
<glyph unicode="&#xe240;" d="M745 878l69 19q25 6 45 -12l298 -295q11 -11 15 -26.5t-2 -30.5q-5 -14 -18 -23.5t-28 -9.5h-8q1 0 1 -13q0 -29 -2 -56t-8.5 -62t-20 -63t-33 -53t-51 -39t-72.5 -14h-146q-184 0 -184 288q0 24 10 47q-20 4 -62 4t-63 -4q11 -24 11 -47q0 -288 -184 -288h-142 q-48 0 -84.5 21t-56 51t-32 71.5t-16 75t-3.5 68.5q0 13 2 13h-7q-15 0 -27.5 9.5t-18.5 23.5q-6 15 -2 30.5t15 25.5l298 296q20 18 46 11l76 -19q20 -5 30.5 -22.5t5.5 -37.5t-22.5 -31t-37.5 -5l-51 12l-182 -193h891l-182 193l-44 -12q-20 -5 -37.5 6t-22.5 31t6 37.5 t31 22.5z" />
<glyph unicode="&#xe241;" d="M1200 900h-50q0 21 -4 37t-9.5 26.5t-18 17.5t-22 11t-28.5 5.5t-31 2t-37 0.5h-200v-850q0 -22 25 -34.5t50 -13.5l25 -2v-100h-400v100q4 0 11 0.5t24 3t30 7t24 15t11 24.5v850h-200q-25 0 -37 -0.5t-31 -2t-28.5 -5.5t-22 -11t-18 -17.5t-9.5 -26.5t-4 -37h-50v300 h1000v-300zM500 450h-25q0 15 -4 24.5t-9 14.5t-17 7.5t-20 3t-25 0.5h-100v-425q0 -11 12.5 -17.5t25.5 -7.5h12v-50h-200v50q50 0 50 25v425h-100q-17 0 -25 -0.5t-20 -3t-17 -7.5t-9 -14.5t-4 -24.5h-25v150h500v-150z" />
<glyph unicode="&#xe242;" d="M1000 300v50q-25 0 -55 32q-14 14 -25 31t-16 27l-4 11l-289 747h-69l-300 -754q-18 -35 -39 -56q-9 -9 -24.5 -18.5t-26.5 -14.5l-11 -5v-50h273v50q-49 0 -78.5 21.5t-11.5 67.5l69 176h293l61 -166q13 -34 -3.5 -66.5t-55.5 -32.5v-50h312zM412 691l134 342l121 -342 h-255zM1100 150v-100q0 -21 -14.5 -35.5t-35.5 -14.5h-1000q-21 0 -35.5 14.5t-14.5 35.5v100q0 21 14.5 35.5t35.5 14.5h1000q21 0 35.5 -14.5t14.5 -35.5z" />
<glyph unicode="&#xe243;" d="M50 1200h1100q21 0 35.5 -14.5t14.5 -35.5v-1100q0 -21 -14.5 -35.5t-35.5 -14.5h-1100q-21 0 -35.5 14.5t-14.5 35.5v1100q0 21 14.5 35.5t35.5 14.5zM611 1118h-70q-13 0 -18 -12l-299 -753q-17 -32 -35 -51q-18 -18 -56 -34q-12 -5 -12 -18v-50q0 -8 5.5 -14t14.5 -6 h273q8 0 14 6t6 14v50q0 8 -6 14t-14 6q-55 0 -71 23q-10 14 0 39l63 163h266l57 -153q11 -31 -6 -55q-12 -17 -36 -17q-8 0 -14 -6t-6 -14v-50q0 -8 6 -14t14 -6h313q8 0 14 6t6 14v50q0 7 -5.5 13t-13.5 7q-17 0 -42 25q-25 27 -40 63h-1l-288 748q-5 12 -19 12zM639 611 h-197l103 264z" />
<glyph unicode="&#xe244;" d="M1200 1100h-1200v100h1200v-100zM50 1000h400q21 0 35.5 -14.5t14.5 -35.5v-900q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v900q0 21 14.5 35.5t35.5 14.5zM650 1000h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400 q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM700 900v-300h300v300h-300z" />
<glyph unicode="&#xe245;" d="M50 1200h400q21 0 35.5 -14.5t14.5 -35.5v-900q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v900q0 21 14.5 35.5t35.5 14.5zM650 700h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400 q0 21 14.5 35.5t35.5 14.5zM700 600v-300h300v300h-300zM1200 0h-1200v100h1200v-100z" />
<glyph unicode="&#xe246;" d="M50 1000h400q21 0 35.5 -14.5t14.5 -35.5v-350h100v150q0 21 14.5 35.5t35.5 14.5h400q21 0 35.5 -14.5t14.5 -35.5v-150h100v-100h-100v-150q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v150h-100v-350q0 -21 -14.5 -35.5t-35.5 -14.5h-400 q-21 0 -35.5 14.5t-14.5 35.5v800q0 21 14.5 35.5t35.5 14.5zM700 700v-300h300v300h-300z" />
<glyph unicode="&#xe247;" d="M100 0h-100v1200h100v-1200zM250 1100h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM300 1000v-300h300v300h-300zM250 500h900q21 0 35.5 -14.5t14.5 -35.5v-400 q0 -21 -14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe248;" d="M600 1100h150q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-150v-100h450q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5h350v100h-150q-21 0 -35.5 14.5 t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5h150v100h100v-100zM400 1000v-300h300v300h-300z" />
<glyph unicode="&#xe249;" d="M1200 0h-100v1200h100v-1200zM550 1100h400q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-400q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM600 1000v-300h300v300h-300zM50 500h900q21 0 35.5 -14.5t14.5 -35.5v-400 q0 -21 -14.5 -35.5t-35.5 -14.5h-900q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5z" />
<glyph unicode="&#xe250;" d="M865 565l-494 -494q-23 -23 -41 -23q-14 0 -22 13.5t-8 38.5v1000q0 25 8 38.5t22 13.5q18 0 41 -23l494 -494q14 -14 14 -35t-14 -35z" />
<glyph unicode="&#xe251;" d="M335 635l494 494q29 29 50 20.5t21 -49.5v-1000q0 -41 -21 -49.5t-50 20.5l-494 494q-14 14 -14 35t14 35z" />
<glyph unicode="&#xe252;" d="M100 900h1000q41 0 49.5 -21t-20.5 -50l-494 -494q-14 -14 -35 -14t-35 14l-494 494q-29 29 -20.5 50t49.5 21z" />
<glyph unicode="&#xe253;" d="M635 865l494 -494q29 -29 20.5 -50t-49.5 -21h-1000q-41 0 -49.5 21t20.5 50l494 494q14 14 35 14t35 -14z" />
<glyph unicode="&#xe254;" d="M700 741v-182l-692 -323v221l413 193l-413 193v221zM1200 0h-800v200h800v-200z" />
<glyph unicode="&#xe255;" d="M1200 900h-200v-100h200v-100h-300v300h200v100h-200v100h300v-300zM0 700h50q0 21 4 37t9.5 26.5t18 17.5t22 11t28.5 5.5t31 2t37 0.5h100v-550q0 -22 -25 -34.5t-50 -13.5l-25 -2v-100h400v100q-4 0 -11 0.5t-24 3t-30 7t-24 15t-11 24.5v550h100q25 0 37 -0.5t31 -2 t28.5 -5.5t22 -11t18 -17.5t9.5 -26.5t4 -37h50v300h-800v-300z" />
<glyph unicode="&#xe256;" d="M800 700h-50q0 21 -4 37t-9.5 26.5t-18 17.5t-22 11t-28.5 5.5t-31 2t-37 0.5h-100v-550q0 -22 25 -34.5t50 -14.5l25 -1v-100h-400v100q4 0 11 0.5t24 3t30 7t24 15t11 24.5v550h-100q-25 0 -37 -0.5t-31 -2t-28.5 -5.5t-22 -11t-18 -17.5t-9.5 -26.5t-4 -37h-50v300 h800v-300zM1100 200h-200v-100h200v-100h-300v300h200v100h-200v100h300v-300z" />
<glyph unicode="&#xe257;" d="M701 1098h160q16 0 21 -11t-7 -23l-464 -464l464 -464q12 -12 7 -23t-21 -11h-160q-13 0 -23 9l-471 471q-7 8 -7 18t7 18l471 471q10 9 23 9z" />
<glyph unicode="&#xe258;" d="M339 1098h160q13 0 23 -9l471 -471q7 -8 7 -18t-7 -18l-471 -471q-10 -9 -23 -9h-160q-16 0 -21 11t7 23l464 464l-464 464q-12 12 -7 23t21 11z" />
<glyph unicode="&#xe259;" d="M1087 882q11 -5 11 -21v-160q0 -13 -9 -23l-471 -471q-8 -7 -18 -7t-18 7l-471 471q-9 10 -9 23v160q0 16 11 21t23 -7l464 -464l464 464q12 12 23 7z" />
<glyph unicode="&#xe260;" d="M618 993l471 -471q9 -10 9 -23v-160q0 -16 -11 -21t-23 7l-464 464l-464 -464q-12 -12 -23 -7t-11 21v160q0 13 9 23l471 471q8 7 18 7t18 -7z" />
<glyph unicode="&#xf8ff;" d="M1000 1200q0 -124 -88 -212t-212 -88q0 124 88 212t212 88zM450 1000h100q21 0 40 -14t26 -33l79 -194q5 1 16 3q34 6 54 9.5t60 7t65.5 1t61 -10t56.5 -23t42.5 -42t29 -64t5 -92t-19.5 -121.5q-1 -7 -3 -19.5t-11 -50t-20.5 -73t-32.5 -81.5t-46.5 -83t-64 -70 t-82.5 -50q-13 -5 -42 -5t-65.5 2.5t-47.5 2.5q-14 0 -49.5 -3.5t-63 -3.5t-43.5 7q-57 25 -104.5 78.5t-75 111.5t-46.5 112t-26 90l-7 35q-15 63 -18 115t4.5 88.5t26 64t39.5 43.5t52 25.5t58.5 13t62.5 2t59.5 -4.5t55.5 -8l-147 192q-12 18 -5.5 30t27.5 12z" />
<glyph unicode="&#x1f511;" d="M250 1200h600q21 0 35.5 -14.5t14.5 -35.5v-400q0 -21 -14.5 -35.5t-35.5 -14.5h-150v-500l-255 -178q-19 -9 -32 -1t-13 29v650h-150q-21 0 -35.5 14.5t-14.5 35.5v400q0 21 14.5 35.5t35.5 14.5zM400 1100v-100h300v100h-300z" />
<glyph unicode="&#x1f6aa;" d="M250 1200h750q39 0 69.5 -40.5t30.5 -84.5v-933l-700 -117v950l600 125h-700v-1000h-100v1025q0 23 15.5 49t34.5 26zM500 525v-100l100 20v100z" />
</font>
</defs></svg> 
     �  pFFTMm*��   �   GDEFD       OS/2g�k�  8   `cmapڭ�  �  rcvt  (�     gasp��      glyf}]�o    ��headM/�  ��   6hhea
D  ��   $hmtx�� `  �  tlocao���  ��  0maxpj �  ��    name�,��  ��  �post���5  ��  
�webf�TP  �T          �=��    �v�u    �vs�                      ��  �   Z�  � 2�                          UKWN @  ����   {                         ,   
  �     h     ,  
  � �   h @  (   + � � 
 / _ � �"#%�&&�'	'��	��)�9�I�Y�`�i�y�����	��)�9�F�I�Y�i�y�����	���!�'�9�I�Y�`����     * � �   / _ � �"#%�&&�'	'���� �0�@�P�`�b�p������� �0�@�H�P�`�p���� �	���!�#�0�@�P�`���������f�b���ߵ�i�Y������!��     
 ������|vpjdc]WQKED����������                                                                                                              �       5              *   +      �   �      �   �          
      /   /      _   _      �   �      �   �     "  "     #  #     %�  %�     &  &     &�  &�     '	  '	     '  '     �  �     �  �	   !  �  �   &  �   �)   0  �0  �9   :  �@  �I   D  �P  �Y   N  �`  �`   X  �b  �i   Y  �p  �y   a  ��  ��   k  ��  ��   u  �  �	   }  �  �   �  �   �)   �  �0  �9   �  �@  �F   �  �H  �I   �  �P  �Y   �  �`  �i   �  �p  �y   �  �  �   �  �  �   �  �  �   �  �   �   �  �	  �	   �  �  �   �  �  �   �  �!  �!   �  �#  �'   �  �0  �9   �  �@  �I   �  �P  �Y  	  �`  �`    ��  ��   � �   �� ��   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           (�   ��   (  h    .� /<� �2��<� �2 � /<� �2��<� �23!%3#(@���� ��(�  d dLL [  27>32+&/#"&/.=/&6?#"&'&546?>;'.?654676X&
�j��

��j�
)"&
�j��

��j�
)L
��j�
)"&
�j��

��j�
)"&
�j��
        LL #  32!2#!+"&5!"&=463!46��^�����^L�����^�^     p  @L E  32!2+!2++"&=!"&?>;5!"&?>;&'&6;22?69�
��
x
}
x
}���
x
}��
x
v��
���L
���d����d�l
��   d �� ;  2#4.#"!!!!32>53#"'.'#7367#73>76��p<�#4@9+820{d���d��	09B49@4#�bk��v$B�dp�d�>u��hi-K0!.O2d22dJtB+"0J+�ku�0�wd/5dW�%�   {  L� > G  !2+!2++"&=!"&?>;5!"&?>;4632654&#�^CjB00BjC� 
x
�
�
��
x
u��
x
u��@--@�$?2O*$$*P2@%d��
��d��
���BVT@   ��L�   !2#!"&=46� �����    �  �� % A  +32!546;5467.=#"&=!54&'.467>=�2cQQc2��2cQQc2�A7  7A�A7  7A��d[�##�[����[�##�[d��d<c2<2c<��<c2<2c<d               1  ��,�A   2632#!"&5467&546�n�,,.x��x�OqUB�Awa�xy�rPEk��      d��     32!546;'&>76!'� 	
���Pԇ
	 $
op	zy���#��%**%�$	���p       d�L   # 7  !2"'&6&546	6'&4#!"&7622?62~
������

�

��\l
��
l��L
��7
�����
&
��
��
���

l��   ������ 	     2'7'	�&�c�_"���f���n��&\�`�t���f�jpO       ��   32!546;!����������22&&     L�   %6.676.67646p�'0SFO�$WOHB��XAO�$WOHB��"��7Q)mr	���*`)nq&*    	����  )   2"'#'".4>"2>4&�ȶ�NN;)��w�d��NN�r��VV���VV�N��d�y��%:MN��ȶ�[V���VV���  d X�D   >.54>�0{xuX6Cy��>>��xC8Zvxy�DH-Sv@9y��UU��y9@vS-H   �� ^{�   62!2'%&7%&63�������������� a����o���� �� ^{�  "  62!2'%&7%&63#7'7#'�����������������J��J��N a����o����d�⋌��      �� &  2##!"&=467%>="&=46X|�>&	f	
��
	f	&>���|�.hK
�
]

]
�
Kh.�|�       �L   # ' + / 3 7 G K O S W  !2#!"&54635)"3!2654&33535!3535!35!"3!2654&35!3535!35~

��
Ud���

&
sd�d d�d d���

&
��d d�d dL
��


ddd
��

^
dd�dddd�ddddd
��

^
ddddd�dddd      LL   / ?  !2#!"&546)2#!"&546!2#!"&546)2#!"&5462��pm��p����pm��pL�p��p����p��p�  	    LL   / ? O _ o  �  32+"&=46!32+"&=46!32+"&=4632+"&=46!32+"&=46!32+"&=4632+"&=46!32+"&=46!32+"&=462����������������������������L�������p�������p������     �L   / ? O _  32+"&=46)2#!"&=4632+"&=46)2#!"&=4632+"&=46)2#!"&=462�����D�������D�������DL�����p�����p����     & ,�    	62"'&4?622�;��������;������  n nBB #  	"'	"/&47	&4?62	62�������������;������������  ����  % I   2"'#".4>"2>4&3232++"&=#"&=46;546�ĳ�MN,m��w�b��MM�o��XX���XX���
K

K
�
K

K�M��b�y��l+MM��ĳ�MX���XX���#
K
�
K

K
�
K
   ����  % 5   2"'#".4>"2>4&!2#!"&=46�ĳ�MN,m��w�b��MM�o��XX���XX�X^

��
�M��b�y��l+MM��ĳ�MX���XX����
�

�
      ��  -  32+"&5465".5472>54&&dd��[���֛[ҧg|r���r|��p��>�ٸu֛[[��u�'>�7�xt�rr�tx�  d  ��   / ?  32+"&54632+"&54632+"&54632+"&=46�

�
�ޖ

�
�ޖ

�
�ޖ

�
�
��

~
�p
�

�
��
�>

�
�
�

�
      �� G O  27'#"/&/&'7'&/&54?6?'6776?6"264X!)&1-�=+P��P08�,2&+!)&1-�<,P��P/:�-1&+x�~~�~��P09�,1&+"(&1,�=,Q��Q09�-0&* !(&0-�=,P���~�~~�  d  �   ! % ) - 1  !2!2!5463!546!5#!"&53333333�,);
��
;),,;)�D);dddddddd;)d
KK
d);ddd����);;) d�D��D��D��D�    �   62++"&5!+"&5#"&l`
�
�
��
�
�
j`��
��

w��

?
  d  ��    3!#!"&5463#"&=X;),��R���p);�vL�p�   ��   0   2".4>"2>4&3232+"&546��֛[[���֛[[����rr���rr�|2
�

�
�[���֛[[���֛;r���rr���
��
2

^
    ��  �    )#!3333��)�)�����������p���,�p��,     d  ��  /  3232"'&6;4632#!"&546;2!546&����&���T2

��

2
���>�p����
��

^

��
   ��   1   2".4>"2>4&3232"'&6;46��֛[[���֛[[����rr���rr�|�
�
�&�
��[���֛[[���֛;r���rr���
����
     ��   1   2".4>"2>4&%++"&5#"&762��֛[[���֛[[����rr���rr���
�
�
�
�&�[���֛[[���֛;r���rr�������

        ��  9  !2#!"&'&547>!";2;26?>;26'.��
�������
W
�
&
�
&
�
W�
�t�W��
��>
�

�
�   ��   '   2".4>"2>4&&546��֛[[���֛[[����rr���rr�����[���֛[[���֛;r���rr���]�$��   �� (  76#!"&?&#"2>53".4>32��
���m�t�rr���r�[���֛[[��u�$���
�Lr���rr�tu֛[[���֛[      ��  5  76#!"&?&#"#4>323#"'&5463!232>�����n�t�r�[��u��[��u���h
�n�t�r$����Kr�tu֛[��u֛[v�
h�Lr�   
 d  ��   / ? O _ o  � �  !2#!"&546!"3!2654&32+"&=463!2#!"&=4632+"&=463!2#!"&=4632+"&=463!2#!"&=4632+"&=463!2#!"&=46}

��
���

R
�2

2
��

�>
�2

2
��

�>
�2

2
��

�>
�2

2
��

�>
�
��

~
�
��

R
d
2

2

2

2
�
2

2

2

2
�
2

2

2

2
�
2

2

2

2
        L�  #  54&#!"#"3!2654&#!546;2�uS��Rvd);;)�);;)��� �SuvR�;)��);;)X);��  d  LL 	 7  32#462#".'.#"#"'&5>763276}2
d�!C@1?*'),GUKx;(.9)-EgPL
��3
0�[;P$9�7WW      �� ! 1 A   2+"&54. +"&54>32+"&546!32+"&546��ޣc
2
�����
2
c�*��`���c��t��

,�rr���

,tޣ���4��4�       �G�  9  %6'%&+"&546;2762"/"/&4?'&4?62A		���

�Xx"xx"xx"ww".�
�
�
^
�x"xx"ww"xx"       �r�  /  %6'%&+"&546;2%3"/.7654'&6?6A		���

��
`Z	HN.�
�
�
^
d	���	g~�j       �b�  1 K  3#"/.7654&'&6?6%6'%&+"&546;2%3"/.7654'&6?6��D@
	*o;7	*��		���

��
`Z	HN�	��i�T	"��Z�G	!��
�
�
^
d	���	g~�j        �� 	    ! % - ; ? C G K O  3#!#!#3!##5!!!!#53#533!3533##5#535#5!!#53#53#53!5!�dd�pd�������dX��,�,��dd�dd�D���d��d�dd�,�D,ddd�dd�dd���,�dddX�d�,,�d��,��,�ddd���d��dddd�d���,�ddd��ddd    	    ��         #  7#3#3#3#3#3!5!#53#53#53ddd�dd����dd,������,�dd�dd,�������������Pdd[[[[[     
��    	"'463&"26���0�V
C;S;;S;��V�0��
�;;T;;       
��   !  	"'463!"/	&"26���0�V
��08��D��;S;;S;��V�0��
�V�08���;;T;;     d  �� &  !2&54&#!"3!2#!"&54?6,9K@

�D@
�

��
��K�|@
�
@

�J

��    ���L� 
  !2	46� �>�>�����C        ��  E U  !"3!26?6'.#"#!"&/.+";26=463!2;2654&!"3!26/.6�DN9
�
>SV�
N
��
N
�

�

�

�
���
&
X
&�
��l		l-
�p	�		�	
�v

�

�

�
��
�

�
       d�L  ! ) 1  3232#!"&546;>35"264$2"&4��8]4$�);;)�);;)�	'3]�d�Ͼ������V<<V<L);;;)��);;)X);E5+��ddF�����<V<<V     5  ��   #  	!526/!3!567>?!��(%	
�_5,R�y:"	*2��8��T���2*BBW-ޑY".BB%��Z�     d  �� ' 2 ;  #!5>54.'52%32654.+32654&+�50;*7Xml0�);!�9uc>--���Ni*S>v�PR}^��3:R.CuN7Y3(;	G)IsC3[:+	1aJ);4��ePZ�   �  o�   !56764.'&'5mSB�	,J����95(��1(aaR@	9    ��  � % /  #4.+!52>5#"#!#3'3#72&�2�p"�&2���KK}}KK}� ��dd	R ,��১ �  !���� % /  #4.+!52>5#"#!5!'7!5L2&�2�p"�&2�C��১ � �vdd	� ,��}KK}}KK     �L   / ?  !2#!"&=46!2#!"&=46!2#!"&=46!2#!"&=462X���� ��L��Ldd��dd��dd��dd     �L   / ?  !2#!"&=46!2#!"&=46!2#!"&=46!2#!"&=46���D�L�����D�L��Ldd��dd��dd��dd     �L   / ?  5463!2#!"&5463!2#!"&5463!2#!"&5463!2#!"&�X���p��� ����L���dd��dd��dd��dd      �L   / ?  !2#!"&=46!2#!"&=46!2#!"&=46!2#!"&=462L��L��L��L��Ldd��dd��dd��dd     �L   / ? O _ o   32+"&=46)2#!"&=4632+"&=46)2#!"&=4632+"&=46)2#!"&=4632+"&=46)2#!"&=462ddA ����ddA ����ddA ����ddA ��Ldddd��dddd��dddd��dddd  ��  �L   # * : J  !#;2+"&=46!2#!"&=465#535!2#!"&=46!2#!"&=46�dd�dd��������,��X��Ldd��dd�}KdK�dd��dd       L   # * : J  32+"&=46#3!2#!"&=463#'7!2#!"&=46!2#!"&=462ddgdd����/�ȧ���,��X��Ldd��L��dd�dK}}�dd��dd       ���    !2#!"&546	K�,,�,,���,�,�v,,�,�D,,     �L     !2#!"&5467'2"&4,X��J�*J%���pNNpNL��d����>���tNoOOo     � 6�    2.'&54>"264�u�sFE�66	!^Xm)<Ds��������x�us�m�?>!fh�H�uX�yHÂ����     ��     2".4>"��֛[[���֛[[�Kt�rr��[���֛[[���֛�oVr���r   u �  5  .54>6?6&'.'&76#&*IOWN>%3Vp}?T�|J$?LWPI�)(!1		) H�uwsu�EG�^F&:c�YE�vsxv���!K�:%A'#"
A)Y�       �l  * /  7>%!2!"3!26=7#!"&546	7�l
l��27���);;)�);Ȼ��p���8���7c�s*
s��;)�);;)���������������2�c     �L  6  !#"3!2657#!"&546&'5&>75>^i�4�);;)�);ȹ��p���S��9dTX
.9I@F*L�6;)�);;)�g�����������	�0!;bA4�
        �L  5  !2!"3!26=7#!"&546	62"/&4?622^^<C���);;)�);ȹ��p�����e���eoL�;)�);;)E�ۥ�������3�e���eo    
 
�� ;  	62+3546&=#32"'&6;5#'&47635#"&>
��
��
Ȫ
����
��
��
ȯ
���
ȭ
����
��
��
ȭ
	
��
  �  �L   326'+"&546�d��0dL�J����J�       �L #  3266''+"&5462d���0�0dL�J��J����J��J�    � �3   ''&4766��0������J�*��J�    � 36   &546�.��2���  � d��    32+"&546!32+"&546��������� ��    � dL�   #!"&5463!2L�� ���        3   46&5&546����0d�� *� ��;�  �� �O #  72#"&5&5&5464646dd�1�2��N���:	��9	�	�>�	�=�  ,  �L   32+"&5&54646Rdd�0�L���;��;�   d ��H    	#!"&762!2#!"&=46��	��	�*����9���Hdd  ���uJ   		u��`���(������(&    ;��(J   	'	7(���a���#���aa�   ��  3   2".4>#"#";;26=326=4&+54&��֛[[���֛[[�}d��d���[���֛[[���֛��d��d�      ��     2".4>!"3!26=4&��֛[[���֛[[�E���[���֛[[���֛�~dd   ��  3   2".4>"'&"2?2?64/764/��֛[[���֛[[��	xx		�		xx		�		xx		�		xx		��[���֛[[���֛�	xx		�		xx		�		xx		�		xx		�   ��  $   2".4>'&"2764/&"��֛[[���֛[[�T��w��[���֛[[���֛�1U��w�      ��  ; K   2".4>";7>32";2>54.#";26=4&��֛[[���֛[[�?<B2!��(#"3D<:�

�
�[���֛[[���֛�/O2*(8\6/H*	��
�

�
    ��   >   2".4>#";26=4&#";#"3!26=4&+4&��֛[[���֛[[���

�

�

KK

^

K�[���֛[[���֛V
�

�
��
2
�
2

2

     �� / _  3232++"&=.'#"&=46;>7546+"&=32+546;2>7#"&=46;.�
g��

��g
�
g��

��g�
�
Df�

�fD
�
Df�

�f�
��g
�
g��

��g
�
g��
�ͨ

�fD
�
Df�

�fD
�
Df   ��   ?   2".4>"2>4&"/"/&4?'&4?62762��֛[[���֛[[����rr���rr�@||@||@||@||�[���֛[[���֛;r���rr���Z@||@||@||@||     ��   0   2".4>"2>4&"/&4?62762��֛[[���֛[[����rr���rr�j���jO��[���֛[[���֛;r���rr���}j���jO�     ��   !   2".4>"&32>54��֛[[���֛[[�Kt�rAKi���hst�r�[���֛[[���֛;r�txiKA���>r�ts      S��   6!2#!'&4'
&����F�
�����
�&       S��   	&5!"&=463!46
����&��U&�U
#�#
    �  ]�   	#!+"&5!"&762��
�����
�&�����&
    � ]�   32!2"'&63!46&�#
�U&�U
#�����
&     ��]   	&5>746
��^���$,[��~U�U&�U
#$DuMi��qF
     ��  +  !2/"/&4?'&6!"&546762R,^�j�^�!��^�j�^���^�j�^�P,^�j�^    I Igg  +  #!"&546762!2/"/&4?'&6�j�^��^��,^�j�^`j�^,^�����^�j�^      ��   /   2".4>#";2676&#";26=4&��֛[[���֛[[���:#6#:1�

�
�[���֛[[���֛���.�
�

�
        �� I U a h o  276?67632;2+"!#!54&+"&=46;2654?67>;26/.'&;26!"&5)#!	�&�0
=

2
�p��p
2

=	��
�

3�5�3

���
�X
���
v	v
!{,	
2

�,�ԯ

2
0�y�

�
��
�

�r
w��
�       �� + I  6.'&&&547>7>'.>7>&67>7>7>�-Bla�b�D8=3�*U 	:1'Ra\�{�%&�=>8\tYR-!�q[Fak[)����ȕX1�"@&J<7_�?3J5%#/D	&/q!!6ROg58<'([@1%@_U2  ] r� O  .>7'&767>.'&'.'&>77>.'&>�'
'8GB 

	`�H >JS>H7'+"	NA
5M[`/Pg!;('2"&"IbY�C�e\D9$886#1%)*����J7gG:  8G\au9h�oK$�]54<<E"5cQ8	.@AU!U�hQ)    �� j�F  ? Q   2".4>&"&5476&2>76&'&6?6&'&'.��{nO9:On{���{nO:9On{���FZ2Z_���_Z2Z��#		%8-#,-"F-I\b\I*I\b\I--I\b\I*I\b\I�9>|��|;7Es1$F^D10E^E$1u$/D0"%,I   ��  ��  ' ; L  !#7.54>327377>76&'&%7.5476&6?'&'.P�[�vY,9On{�R=A �&/l�'Pj�R.Mv&6�QFZ*HLh5)k�|#		%8-,-"xatzbI\b\I-y�R�U�4Zrnc�1�?1FrEs1<QA9��n;7p$/D0V,I   ��  �   (  '6#!"&%!546;2!32+"&/&6Z�8�%��%
Y
�
Y�Ch�:#6#:d*!�� GD�K

K����    d �� (   2'%/&=47&=4674L|Xk��d��d��k�X>����1)���]@	��	@]�)1ES>       L�  ' + / 3 7 ; ? C G K O S W [ _ c  3232!546;546;2!546#!"&5353353353353353533533533533535335335335335Rd2��2d��dddddddddd�|ddddddddd�|ddddddddd�2��222�p���dddddddddd�dddddddddd�dddddddddd      w�  % 7  &=#!"&=46;3546'#"&=463!&=#'73546o��������X����z�#���z���*����dX����zd�M�*����z�       �L   !2#!#"&546d�);;)����d);;L;)��);��,;)X);    d  L� 	  ?  32!546!32!546".5!2>&54=��������(Lf���fL(,'6B6'������p��)IjV\>((>\VjI),�	+'%!	!%'*�   �� �L�   	'L������'��a���'    �M�   	7	M�����aa��'���a    �Q d_�  )  !232"/&6;!%+!!"&5#"&?62����*������������*���������p�&�     �� 0  32!2#!!2+"&=!"&=#"&/#"&468^&�d,!��02*��*�6��%�%+�*2222	
�*        �L    !53463!2!!��P�;),);�D��P�dd);;)���     �L    3463!2!!���;),*:�,���P, �pX);;)�d�D� E  k�   +32"/&6;#"&?62{����*����*������Y�    D�k   &=!/&4?6!546�������X`�)�	��	�)�	��	       �� 	   !  .#!"!"3!26=4&53353��$�`$�-�);;)�);;��ddd��-(�d;)d);;)d);�dddd   �� d�L  # 1   2"&54%##"+"&'=454>;%".=4>7i**d�]&/T7���"L��R�����Q�����)2(    J  f� , 5  3232#"./.46;7>7'&6327"&)^Sz?vdj�O9t\U>/v?zS$24517F8�%M���)(
()�GM~ ��1==   ��   7'''7'7'7'77 �N괴�N�-��-�N괴�N�-���N�-��-�N괴�N�-��-�N괴    d�� ! - =  32!2+"&/#"&54?>335!7532+"&546�2(<H(<�,�F=-7�`1d�d����>2�vdd�Q,�}Q,d-��!2$'�$��(d����dw}�����        �L   0 <  32#!+"&/&546;632+"&546!#35'!5X�,�<(��<(21`�7-=|��dd_�d�d22��L!��-d,Qv�,Q(��$�'$dd��d���ԯ�}w    dO  7 G  %6!2+#!"&5467!>;26&#!*.'&?'32+"&546dknT.TlnTj����:d%���8
	�V�Oddi�p&yL�N��(�%
H�	YS(22�S���   �� d�O  6 F  #!"&'#"&463!'&6?6*#!32!7%32+"&546�n����jUmlT.UnJ�	
�%��&j��PddO����(SN�Ly&p��d(��Y�����    a  L  7 G   2#!"&/&?>454&/!7%.!2#!"&=46ސNS(���%
	�p&y�22�S��Y��(���nTj����knT.T���8
	�V��d%��dd �� �  - I  !26=4&#!""&5&/&7>3!2766=467%'^��N�Ly&p��(���S�22(SYLdd��jTnlT.Tnk������V�	
�8��%d   ��  %   2".4>%&!"3!7%64��֛[[���֛[[������

�[���֛[[���֛�9�
�
�
�
�&    ��  %   2".4>6=!26=4&#!54&��֛[[���֛[[�%��

���[���֛[[���֛��&�
�
�
�
     ��  %   2".4>&";;265326��֛[[���֛[[�K�&�
�
�
�
�[���֛[[���֛�@����

    ��  %   2".4>#"#"276&+4&��֛[[���֛[[���
�
�&�
��[���֛[[���֛�
����
    ��  � �   2".4>%&277>7.'.'"'&65.'6.'&767>'&>7>7&72267.'4>&'?6.'.'>72>��՛\\���՛\\�d+:
=?1	""/?9#hu!$0E.(,3)(	 	
*!A7,8!?*

�\���՛\\���՛	'"r"v	G
	.&*
r$> #1	
% *
	'"	$g2(	%
       ��   67'"/&47&6�������PM<�;��+oX"O�\e��~Y�+"��n+We�    `��   # ' 7 ;  !2#!"&=46#3!2#!"&=46!!!2#!"&=46!!d�);;)�);;����);;)�);;����);;)�);;��,�;)d);;)d);dd�;)d);;)d);dd�;)d);;)d);dd    d  L�    !2#!"&46!���|;�����**�D�����      d��   %  32!2!5#!463!54635#!"&=��);,);���;),;)��;)�);�;)d;)�pdd�);d);ddd�D�);;)�       ��  + A W  !2"/&546)2/"/&4?'&6#!"&54676276#!"&?'&4?622,^�j�^5,^�j�^�/j�^��^��^��^�j�^�j�^,��^�j�^�&j�^,^��^��^�j       ��   # ; C K   2".4>"2>4&$2"&4$2#"'"&546?&542"&4$2"&4��ݟ__���ݠ^^���oo��oo�--  - L-  73H3)z	��-  - -  - �_���ݠ^^���ݟWo��oo�� -!!-  -!
�$33$ 1~� -  -  -  - �� Z�� [  %676&'&#" 3276'.#"&47 7>32#"&'&6767632'."�[v_"A0?! ��-	Y7J3$$��)G"#A.,=#(wn�kV8@Fv"0D�G([kPHNg8B�*��[eb�2!��5(7>B3$$'��)M"#!7)/c#*xn�fL@9N�D�H7!$�W]�B�$&    d X�D  D  >.54>"".#"2>767>54&�0{xuX6Cy��>>��xC8Zvxy#!?2-*!')-?"CoA23:+1!"3)@+)?j�DH-Sv@9y��UU��y9@vS-H-&65&&56&oM8J41<*.0(@	)*D*2Om  9��w�  .   2&/7'/&477"/&4?��B�B8"._��{�i�BBi
	�BB��B�B�BB7._���B�B^*k"5._��{�j�B�B�Fi	�B�B��BB�B�B77/_��     �  ��      2#!"&54>! "264��d:;)��);<f>X��V==V=�.2�G);;)�3-��D��=V==V     ��   	"/''!'&462�*$��������3�,#*���*#��������4�$*    ' 	� 2 @ K  #.'#5&'.'3'.54>75>4.�&ER<,�3'@"<P7(��d�W(�WJ.BN0 2Uh:**&	h)1"37�N,?iB$.,��-<d>��MOW(kVMbO/9X6FpH*M�6&+���	 4C4%    d f�� J  2#4.#"3#>36327#".'>7>'#53&'.>761T�^�'<;%T)��-6"b �"S5268 jt&'V7	0$ݦ
-$a�P�N(?",9J0*	d2�>2
"�"�
7�Gd/9+DAL!X    ����    32"/&6;3+##"&?62���*�����Ȗ�*,�����|��   ����    %  #5##!32"/&6;3353!57#5!�ddd,����*����dc������,�dd��|���d����d��d     ����   ! %  32"/&6;33!57#5!#5##!35���*���X������,ddd,�d,�����d��d�Pdd�d��    ��L�      32"/&6;3##53#5#!35���*���Xdd�dd�,�d,�����d�Pd�d��     ��L�      32"/&6;3#5#!35##53���*����d�,�ddd�,����d�d�����d     ����       32"/&6;3#53!5!!5!!5!���*������d��,d�p�d��,�����������  ����       32"/&6;3!5!!5!!5!#53���*��� ��d�p�d��,d��,�����������     LL    !2#!"&546!"3!2654&^������p���g�);;)�);;L���p��������;)�);;)�);        LL   +  !2#!"&546!"3!2654&&546^������p���d�);;)�);;�o��L���p��������;)�);;)�);��$��        LL   +  !2#!"&546!"3!2654&!2"/&6^������p���g�);;)�);;���$�L���p��������;)�);;)�);���       LL   +  !2#!"&546!"3!2654&#!"&?62^������p���g�);;)�);;����p�$L���p��������;)�);;)�);���        L  5  !2#!"&=463!2654&#!"&=46&=#"&=46;546&������p�);;)�>�D����L���p��d;)�);d���&��
���
   � �� #  %2"+'&7>?!"'&76 6763	�,����			P''��
K�	�	
�S#����	�nnV/�       �L  5  !2#!"3!2#!"&546&=#"&=46;546^��>);;)��p����D����Ld;)�);d��������&��
���
     ��  1  !2/"/&47'&6#"3!26=7#!"&5463!��m��)�8m��);;)�);Ȼ��p����,��pm���)8m��;)�);;)���֥������    ��   #   2".4>"2>4&2"&4��ٝ]]���ٝ]]����qq���qq�{�rr�r�]���ٝ]]���ٝGq���qq���sr�rr�      L�   #  3232"'&6;46!2!54635���
��'��	������gd����V�^�|��d22       L�   #  	++"&=#"&7>!2!54635Gz
�"��'�����gd��M ��!����d22     LK   "  	62"'&4?62!2!54635�q����������gd�q���#�����d22     L� 	  # '  762'&476#"&?'7!2!54635��*M�M���К��=���gd��M�L*����Л��:��d22       L�   # '  /'7'&6"/&4?!2!54635^WЛԛ��L*�M�����gd���КԚ��PM�*M�X��d22  ����    %	!	�����q��3�g�q�����       dL�    +!#"&546;!3#53L��D���d�dd�����p���,��     E��   /  '&"!#"&546;!3#53"/&4?6262L��_		��Ȗ��d�dd�j�\�jO)���_		��p���,����j�[�jO)    �   >  '.!#"&546;!3#53"/"/&4?'&4?62762Lg�%�������d�dd�F��F)��)F��F)��)���g����p���,����F)��)F��F)��)F��     ��   /  !"!#"&546;!3#533232"/&6;546L������d�dd�d��*�������p���,��������        ��   /  '&"!#"&546;!3#53++"&=#"&?62L�*���n���d�dd���d��*��p����p���,��������    ��L 	    !2!546#!"&5!52L�P���d�L������&����    }��    - 1 ;  &=!5!546#"&=46;#5376!!/&4#5;2+����p��/22�dd�����p��ddd33��*��Ȗ��d������Ȗ�*y�d     d  ��  Q  %6+"&5.546%2+"&5.54>323<>3234>^%�"%��
�"
d	d	1t���5gD��>?1)�A�..@���^��^  d  �L 3  "!5265!3!52>54&/5!"!4&#5�"2�pK�K�p"2�K�KL8
��88%��v%88
x88%�v�%8       LL     $ ( 4  !2#5'!7!!2#!"&546!55%!5#!!'!73�wi����pdw�%,);;)��);;),��p��,���d��d��i��bb�d�;)�);;)�);d����������f�dd�   �� &  767>".'.7�.�wf��w3��.1LOefx;JwF2��1v��ev�/� 5Cc;J�|sU@       �L # A   2/.=& &=>2#!"&=46754>���ud?,		����1;ft�pR&m��m&L!(("

�""��""�'$+ ��

2��2��2/2!      ��   '  !'3353353!2+!7#"&46!2!546L��������������J��L�P����������*dd*��22    d  �L 	    #"!4&#"!4&!46;2�d);,;gd);,;���;)d);L;)��);��;)�D�);���);;)    ��  �L    % )  !2#!"&546!#3!535#!#33��|��|�D|����������,�d��ddL�|�|��|�|���D��d��dd,d��d�d��,   ��  �L    % )  !2#!"&546!#5##3353#33��|��|�D|����dddddd�d��ddL�|�|��|�|���D��������d��d�d��, ��  �L    #  !2#!"&546!#3!!#3!!��|��|�D|��������,�����,L�|�|��|�|���D����d�d��d�   ��  �L      !2#!"&546!-��|��|�D|������,���L�|�|��|�|���D������,   ��  �L      )  !2#!"&546!!!#";32654&#��|��|�D|���d�D�d�&96)���)69&L�|�|��|�|���D����dVAAT,��TAAV   ��  �L    % )  !2#!"&546!#3!535#!##53#53��|��|�D|����������,�dd��ddL�|�|��|�|���D��d��dd,��d�d ��  �L     # '  !2#!"&546!3!3##5335#53��|��|�D|����D���dXdd���d,ddL�|�|��|�|���D���p���d�����d ��  �L    " &  !2#!"&546!#575#5!##53#53��|��|�D|�����d��,�dd��ddL�|�|��|�|���D��p�2Ȗd��d�d    	 	��   %   2".4>"2>4&!!!'57!��۞^^���۞^^����qq���qql��,��dd,�^���۞^^���۞Lq���qq�����dd�d     	 	��   ' +   2".4>"2>4&#'##!35��۞^^���۞^^����qq���qql2ddd�d,���^���۞^^���۞Lq���qq����d2d2dd�ddd  �����A   6  2632+54&#!"#"&5467&54>3232"/&6;46�n�,,.x��x����PpVAb�z�
�
�&�
�Awa����sOEkd�b��
����
    �����A  3  2632&"#"&5467&54>++"&5#"&76762�n�,+.y�xZ��%��	OqVAb���
�
�
�
�Awa�xc�h��sOEkd�c�����

�    d  Lm   %5!33	33!#"!54&#���������Ԫ�����2�dd,,M������d22     y  7� /  2#"'2!54635#"&547.546324&546X^�Y{;2	iJ7-��-7Ji/9iJ��qY�Z=gJi�22�iJX5Jit�    ' ��  * B J b {  "&'&7>2"3276767>/&'&"327>7>/&'&&"267"327>76&/&"327>76&/&�oOOoS���SoOOoS����=y�"$GF`	Pu"Q9	�c�cc�cVQ:	Pu"�GF`	y�"$�o����oSWWSo++oSWW"�y	`FG#�uP	:Q#�cc�cc:Q#uP	$`FG#"�y	    d  ��     "  !#5!!463!#53'353!"&5+�,�����
?,�d��Ԣd��u
�
� �����
���������
���
     d  �� 	    !  !	463!#5##5#7!"&=)+5�,����
?,�>�d�Ԫ��
|
� ��^��G
����|����d
77
P        ��     #3!#732!!34>3!!��dd�Ԣ���!,���d!s����,� �d,��+$d���$+�p�p�       LL  2 9  3232#!"&=46;54652#!"'74633!265#535�d2��2s);;)�����;)X>,>X�����L2dd2��;)��);�FD);�>XX��Ԣd�  d  �L  6 =  3232#!"&=46;54652#3#!"&54633!265#535�d2��2s);��!��);;)X>,>X����L2dd2��;)���$+;) );�>XX��Ԣd�   ��  �     	#!"&762#";2676&35�} ,�, }@D�:#6#:�����&77&P'�L��.�dd    	    LL   / ? O _ o  �  32+"&=4632+"&=46!32+"&=4632+"&=46!32+"&=46!32+"&=4632+"&=46!32+"&=46!32+"&=46��

�

�

�
��

�
���

�
��

�
��

�
���

�
��

�
��

�
L
�

�
��
�

�

�

�
��
�

�

�

�

�

�
��
�

�

�

�

�

�
       �  ) 3  3#!2!&/&63!5#5353!2+!7#"&46!2!546�dd^>1B)(��()B1>^dd��>���J��L�P��dO7�S33S�7Od�d�|*dd*��22      �   + 5   2#4!!2!'&63!&54!2+!%5#"&46!2!5460P9�<:H)"��Z�"
)H����J��L�P;))�%&!��!&��*����*��22     ��   $ .   2"&432!65463!2+!7#"&46!2!546�jj�j�."+'��'+#�����J��L�P�j�jj���9:LkkL:9�r*dd*��22     �   , 6  2"&5477'632!65463!2+!7#"&46!2!546X/[3o�o"�o�"."+'��'+#�����J��L�Pk�6NooN>Q�o��
9:LkkL:9�r*dd*��22       �  " ,  !!.54>7!2+!7#"&46!2!546X,��%??M��<=Bm�J�����J��L�P���9fQ?HS�TT�vK�~*dd*��22  �  �  )   2!546754!2#3#3#3#!"&546/R;.6�p6.d�6\������uS�pSuu;)N\6226\N)�G6.dddddSuuS�Su   d��LL  / 3  !2#!"&546!2#!"/!"&4?!"&=46!'���|�

���%X��W&���
�dDdL���D
2
�%XX%�
2
ddd        �L  # - 7  !2#4&+"#4&+"#546!2!46+"&=!+"&=� Sud;)�);d;)�);du�);�P;�d�dLuS�);;));;)�Su�;)��,);�2222    ��     	!&4762	!2!546������  'Y��V/��� �|��UY�Y(�n��0U�22     �  !�  /  .#!"3!26=326!546;546;33232!�'�p'�q*}���20�/2�������22,��2      ��    "  !#!5463!#5!#!"&5463!#5�,
����
w,���,
�v

w,� ��
O,T
������

�
��� �� dG F V  32676'&7>++"&?+"'+"&?&/.=46;67'&6;6#";26=4&��K�jIC


)V=>8'"d1*�)"dT,�|-o�tE�

�
GAk�I
! "%,=?W7|&�F@�Je5&2WO_e_
2

2
 ����~ 	 $ 4 < R b  %6%32!2&'&#!"&=46#";2654&'&"2647>?&/&6%?6'.'.��. ��+jCHf7�"	*:��>XX�P*� �@--@-�� -?0!3P/|)�(	)f!%=��&*x�"6�2&�CX>�>X�83D�-@--@�ۂ
# �=I+E(	/�/}X&+	5!H	     d  9� Q ` o  322#+"&=#+"&=#"&=46;#"&=46;546;23546!2>574.#!2>574.#q�
Oh ..40:*"6-@#
�
d
�
�

KK

�
�
d�))��k))�
m!mJ.M-(2N-;]<*K

KK

K
�
X
�
K

KK
���
"�p�
"    ��  ) ,  !2#!"&'.546"!7.#�Vz$�R��R�(z �}VG+�0� )IU!���zV�`3�BBWwvXZ�3�Vz�&--%��,(1#��  �  �    32#!"&546+"&=ۖg�T)�>)T�H6�6�g�)TT)�g���66�   �  �    33#!"&546+"&=�`��T)�>)T�H6�6���B)TT)�g���66�         	%'5754&>?'	%5%����Nd��d/��\����^^���<��ǔ�Ȗ�
(A�b�����   d��      2"&4$2"&4$2"&4�|XX|X�|XX|X�|XX|X X|XX|XX|XX|XX|XX|    �  �L      2"&42"&42"&4�|XX|XX|XX|XX|XX|XLX|XX|��X|XX|��X|XX|    d dLL   /  !2#!"&=46!2#!"&=46!2#!"&=46}�

�J

�

�J

�

�J
L
�

�
�p
�

�
�p
�

�
       ��   / 3  !2#!"&546!"3!2654&!2#!"&546!5^������������);;)X);;����G�������������;)��);;)X);d��,d��     d d�L ;  !2+32+32+32#!"&46;5#"&46;5#"&46;5#"&46��222222�222222L*�*�*�**�*�*�*   , ��      *  .62"&%#462"&%#46"&=32�W??WW??��|�|���|���|�|���|��*(�C��BB�����|�||�|��԰|�||�|��Ӑ�  �� ��� B  76+2+"47&"+".543#"&'&676/!'.6�E*'?)��
T��0I'*L
#3�{�,#
n��6F82 ��*<SC#
(#(��(#        �� % C  #4.+!52>5#"#!#4.+3#525#"#5!�2&�2�p"�&2��D
d�2d
�� ��dd	R ,�
�W22�
�        L�    0  5"'./#!5"&?!##!"&=463!2���E��	1;E%=!'��y���,2 "
��#	22+.��"A2�V����dd     ��  G J  !2#!"&546#"3!26=4&#"'&?!#"3!26=4&'"'&'#&#2L��FF��&	7

?
99���g���LR� 22��22$��      ��   # '  !5!!2#!"&546)2#!"&546!��P�����pm��pG,Ld��|��p�d��,     ��   # '  !2#!"&546!2#!"&546!!5!2��pm��pG,��P���|���p�d��,��d       d�� ' +  !235463!23##!"&=##!"&546!2�d�dd�pd�p�,�����d���� ����,      ��    '  3#3!2#!"&546!!2#!"&546ddd���pG,����|�d�p�d��,��p�     d  L� ' +  32+!2#!"&5463!5#"&546;53!X����|^��d�,L�pd�p�d�d���,       ��    '  !#3!2#!"&546!!2#!"&546�dd�v��pG,����|�d�p�d��,��p�  , 0o�   	#"&54632a��5���*    A 2�~   	6'&4O�**�{�)�)�*     2A~�   !2"'&6d�)�*��*��*     2,~o   	#!"&762{�)�)�*a�**�       �(  
  5-5!5!��L��c��� ����������       d��  1  #3!35#5!34>;!5".5323!�������,�P2&d2�"d&2���dd,dd� ��dd	& ,      L� % 1  #4.+!52>5#"#!#3!35#5! 2&d2�p"d&2 ,������,� ��dd	& ,��dd,dd   � frJ   32	+"'&476��
�0�
�
�)�
J�0�0	��	  > f�J   32+"&7	&6S�
��)
�
��0
J	�)�)	��   f �Jr    "'&=46	4	�)�)	��w
�
�)�
�
�0�    f>J�   	'	&=4762j�	�0�0	���)
�
��0
�
�    ���=�  :  #463267>"&#""'./.>'&6�|��Vd&O"(P3G*+*3M,:IG79_7&%*>7F1��|�|���5KmCKG\JBktl$#?hI7 �     � ��    !2+&5#"&546!5�X����,��p��	��ddd    � L�    !2%!#4675��'=�DX�Ddd�Q,�[u�}�4�]dd    Mo�__<� �    �vs�    �vs��Q���             ��  �Q���                �� (    �  �  � d�  �  � p�    �    �  E   �   �   �     H    E  � d� {� �� ��  ����  �  ����  � � 	� d�������  �  �  �  �  � &� n� � � � d� � d� � d� ���� d� � �  � � � � d�  � d�  �  �  �  �  �  �  �  � d� ��  �  � 5� d� ����� !�  �  �  �  �  ����  �  �  � �� � u�  �  �  � 
� ��  � �� �� �� ��  ����,� d� ��;� � � � � � �  � � � � �  � �� ��  �  � I� �  �  � ]���������� d�  �  �  � d����  ��Q� �  �  �E� �  ���� J� �  �  �  ���� a���� � � � � �  �  � d      �� d 9 �  ' d                  �                              d d        d���������������� 	 	���� d y ' d d     d��             � d    �  ���� d  � �   d� d   d,��               d  ,A 2 2      �> f f � � �   * * * * � � �NNNNNNNNNNNNNN�"~���Fn��2b��\�r� b�b�	6	�	�	�
(
L
�
�0��X*^�h�(��T��*v�
8|�t�*�<��6`��R�.j����(h����6h��^�2��Dl���.v�b� F �!2!v!�"@"�"�##"#8#z#�#�$$0$^$�$�%4%`%�&&~&�'P'�'�(4(p(�)�)�*&*J*�+
+z,,h,�,�--�-�.(.f.�.�//F/~/�/�0>0�0�11`1�1�2$2^2�2�3"3>3h3�44`4�4�5,5�5�6>6|6�77N7�7�88B8�8�9
9J9�9�::l:�:�;�;�<<P<�<�=2=�>:>�>�?(?n?�?�@H@�@�AA~BB�B�CCBCvC�C�DD`D�D�EZE�FFtF�F�G6GvG�G�HH2HNHjH�H�II8I^I�I�JJ.JR    �             @ .        �           	   j   	  ( |  	   �  	  L �  	  8 �  	  x6  	  6�  	  �  	 	 �  	  $  	  $4  	  $X  	 � |  	 � 0�  	� �www.glyphicons.com C o p y r i g h t   �   2 0 1 4   b y   J a n   K o v a r i k .   A l l   r i g h t s   r e s e r v e d . G L Y P H I C O N S   H a l f l i n g s R e g u l a r 1 . 0 0 9 ; U K W N ; G L Y P H I C O N S H a l f l i n g s - R e g u l a r G L Y P H I C O N S   H a l f l i n g s   R e g u l a r V e r s i o n   1 . 0 0 9 ; P S   0 0 1 . 0 0 9 ; h o t c o n v   1 . 0 . 7 0 ; m a k e o t f . l i b 2 . 5 . 5 8 3 2 9 G L Y P H I C O N S H a l f l i n g s - R e g u l a r J a n   K o v a r i k J a n   K o v a r i k w w w . g l y p h i c o n s . c o m w w w . g l y p h i c o n s . c o m w w w . g l y p h i c o n s . c o m W e b f o n t   1 . 0 W e d   O c t   2 9   0 6 : 3 6 : 0 7   2 0 1 4 F o n t   S q u i r r e l         �� 2                          �	
 � !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~�������������������������������������������������������������������������������������������������������������������������������� 	
glyph1glyph2uni00A0uni2000uni2001uni2002uni2003uni2004uni2005uni2006uni2007uni2008uni2009uni200Auni202Funi205FEurouni20BDuni231Buni25FCuni2601uni26FAuni2709uni270FuniE001uniE002uniE003uniE005uniE006uniE007uniE008uniE009uniE010uniE011uniE012uniE013uniE014uniE015uniE016uniE017uniE018uniE019uniE020uniE021uniE022uniE023uniE024uniE025uniE026uniE027uniE028uniE029uniE030uniE031uniE032uniE033uniE034uniE035uniE036uniE037uniE038uniE039uniE040uniE041uniE042uniE043uniE044uniE045uniE046uniE047uniE048uniE049uniE050uniE051uniE052uniE053uniE054uniE055uniE056uniE057uniE058uniE059uniE060uniE062uniE063uniE064uniE065uniE066uniE067uniE068uniE069uniE070uniE071uniE072uniE073uniE074uniE075uniE076uniE077uniE078uniE079uniE080uniE081uniE082uniE083uniE084uniE085uniE086uniE087uniE088uniE089uniE090uniE091uniE092uniE093uniE094uniE095uniE096uniE097uniE101uniE102uniE103uniE104uniE105uniE106uniE107uniE108uniE109uniE110uniE111uniE112uniE113uniE114uniE115uniE116uniE117uniE118uniE119uniE120uniE121uniE122uniE123uniE124uniE125uniE126uniE127uniE128uniE129uniE130uniE131uniE132uniE133uniE134uniE135uniE136uniE137uniE138uniE139uniE140uniE141uniE142uniE143uniE144uniE145uniE146uniE148uniE149uniE150uniE151uniE152uniE153uniE154uniE155uniE156uniE157uniE158uniE159uniE160uniE161uniE162uniE163uniE164uniE165uniE166uniE167uniE168uniE169uniE170uniE171uniE172uniE173uniE174uniE175uniE176uniE177uniE178uniE179uniE180uniE181uniE182uniE183uniE184uniE185uniE186uniE187uniE188uniE189uniE190uniE191uniE192uniE193uniE194uniE195uniE197uniE198uniE199uniE200uniE201uniE202uniE203uniE204uniE205uniE206uniE209uniE210uniE211uniE212uniE213uniE214uniE215uniE216uniE218uniE219uniE221uniE223uniE224uniE225uniE226uniE227uniE230uniE231uniE232uniE233uniE234uniE235uniE236uniE237uniE238uniE239uniE240uniE241uniE242uniE243uniE244uniE245uniE246uniE247uniE248uniE249uniE250uniE251uniE252uniE253uniE254uniE255uniE256uniE257uniE258uniE259uniE260uniF8FFu1F511u1F6AA    TP�  
wOFF     [�     �\                       FFTM  X      m*��GDEF  t       D OS/2  �   E   `g�k�cmap  �  �  rڭ�cvt   �       (�gasp  �      �� glyf  �  M  ��}]�ohead  Q�   4   6M/�hhea  Q�      $
Dhmtx  R  O  t�� `loca  S`  '  0o���maxp  U�        j �name  U�  �  ��,��post  WH  -  
Ѻ��5webf  [x      �TP       �=��    �v�u    �vs�x�c`d``�b	`b`d`d�,` H J x�c`f�f��������t���!
B3.a0b����	���������?��@u"�@aF$%
� 1�   x��?hSA���iS�����m߽44���,q�PK� q��XE]�(2	�.�ԩ�]�� "E�D�
����i]DԡZJ���\��8�����w��w�������V"�F�pUԯ���.Χ(�g�K�4On�;�N���R{�g`'!��P�M�UHEՠJ��ʫ�*����Yq�9�c��<��U��9�!�Q�I��Y�ׅ-��KC���+	դ��U)�Q9�4�J���Yp�]Nq��9�.q��yVV
�n��)��9����[��{�����v�V��כ־���FWb++{�>�׍�a|��*��g�Q���,K�<'����<!�ɣr�Yw֜β��y�<q9�{-]����c���]o���I���!0l6�7��͍��{j�G,�OX�^�P�d�Q����{,�M4�c�(QBX� �m!�K�,��Y��Ha�2�}�̘��0B�A�)ؐF}΀,�Q8����'A5�(�>W@�Ex̢�D���&�U�d�#����&�x�Mx�<�a�a���,l2<���M��02���6�Π^����P�$Ґ6{��,�#�ƞ�{�M�wp�B��8H�� #�6�7ad�&'~�95r
3w�"�[�Et���W�:�ӭ:$"��>2��c��5*�.�l����N��/����h����]Gt��T��� �� (�   �� x�Ž	|յ0>w��m#Y�e[�%Y�-YR'r���Y�j��D% 	�,@�B�KZjH�ڤ@b���-�R���+�n�hK�~���룼���$��;��h������^f�ܹs��n�{ι˴0��kb8Fd:�%Lה�"��1��A�Ք�A�Y��>,�ؔ����#�p�Z�4�؟��5�ma�d�e�� ?Ȝy�=����I:C�� �D���(nI��x�L�.1�!�P'�JD�t�Hj�@L4��P���h' )�b�)vH�X,f�1�c\'��cG�����u��>��1�~�t��?����!x���T_q�?qB���F���#�L%��D�ћ"��?Y�����ǯ����j??8>N�Skem���AY���Db�4�J)��;�@�j��P$
��'qh�8`��;a���X��6C��F�*�d�Y�c��"����������'?h�L�V㗌�,�>c�e�3eV��h� =C�������~��xC��\((qb@�4��x�K&hׁ���4\2�Ǳ6N1|-�;���j���Yu�@��j��ѫx�����i�䊧�mK���ٍD�E�w�q3�̷.��cAw@�4t.�g����kg��r�{~��Wl~�{��lW2����}�27�6a2�\�6o�z@�$�����H�S��H� �g����b�t�X7�0K�t��c1�,��7�B�oL��Ə�6��6[,���%�i�Z��,�l>T�p�K��SGg�\>�#��A�#3���E��y�k��6v���������;u3�!ZI�8��M �k?�8�C��Wq{`�C*��h>H���1�_s��k��h)����oj�OO'�
!~dX�g��B(����0<kOYx�e����Ƨĭ5k��=d���ϧ> ��+�t�C�-o
Ǫ��/���_ko�ܶ���s��+f���O�z�tp�u7-�}�d���9�	s���e ��\9.H4�!0��S\ ʱk2��"?ip7�\2z����lް�t=��W��\!�KyOXimU���nov����6�:���2��LZkA�A�^�qC�ޔ	&P���aF��I�0��>�&���Q�#F�Q���l�>A�·q*�O��������Ȧ��_@27��l�,���s�����f��6�p7�ܩ?���M�����1v�A��2��]$j"��;�v�lk~va0��g�j���z����RD:�g����c�6���yw�%�g�(þ��#'��uB��#�=�_@?�>�F��Vb�0�a�!�aL4tXv���:�F��h��9��j^�xތ����z��}�Wn�}7}���j���Κ��i�H���������i���t���K�S���a�XE��E�bbBQ1���f�t�x��FȮ��-"dqA���\��~F`���6�i䁕+��Ԣ�^Ȳ�}ש�׆k&��Ĺ�����<-\�;��g1>�w�0�0�v��^x ���7l�<��y��}��S�o�9��-ۮ�6k�бl˴��n�����o�庾i[�u���~¬�o�`j����{i�\C4,"iW8�J�o�V�bp��w��C����!�;�'7�D.v���֏�n��oZ-n�����e��P��io4�~LY�/zm�w_�������g�Ͻ����R��"tޠ�&NoN��)4��M�C�G2��\j��8�d-�@>#�Ot^���5�+x��e.^�]�׼���G�8�^� �m��(��t1	�s��bf�J����	�%�����<� �4��H�����@e���8C���,�5<�(��k�c5Y�I���������A��]|�ך�l6+��=�HV�cb�KՋB�6�i4�#��_��|&�>NvQ�k#�pW�=�u�7��HɰR$�����[5싙����g�	���%�1��9}���������&@$&�������l���=�1RI��}9��#�ς�z�??1z&��ı_a��c|P�I[��:u�;�����l��->k4���G���Y�m|Z��w�}���Hn�R=-B����~�m����.ِ�	.����Mz^,���0�%���8��E��G��**|�sg|o����zO���֬0s��z���.���WN��^�	��yHk<J����{n��E��h�

TG�~��o]��V�ṇ��zn�Аzd�,/�)j�l.��w<w	��?5*F�qH|�<f7�[�6T��d��������?�C8��S�'��N
#�0�f�2^~7��:
�m���M	I��`M�:ӊH����F��9�B��:����g���Sk�oz��k���#�S�o�̨oc3�����A��'ӹm׾�i�k�n��Z�-�y�ZP��=Uc�'����?&ȏ�K��Eu�l�;��><�v3t{8-�|�'
��e��a~���H94��x���A�-�@�ybT4@0�b#]D�D����lj�DSio:Ag����S��P z:�;��-�|yH"r��{�B{\��5RLi�6�A��A���tM�]����t���a�R�K����C��!�1��C��gC�샂� +���1EG�!����Xz������ٛnz��v�@�x� �����-#i^��x�*�$)���W���=�O\f���[W�����X~V�?�����`Lei�::v4��$?�=R��a#�c��]8Y��FJ�b&'{%LC�E�������Cf�]�^$��/����fߪ�M;À�;�����	�����6��CX��V�����#��X~F���<�	:�vC��c��yBpLv�����1��F�v#�9�
/��8VF�01��_K��?��x�>�}��#�G7�т\W�p!.@������b�wɡ+{�o����#�ԍP�QҮnī66
cZ����D�����(. ����u�;n�M}�����?������v�t��x��F���{�+�����`�
�=��"�rPπl�D�V̶� ������?� �Z@�H�䰅]��[��3��5��%O���)�\^���� Z;��>�F��tf�-I�zӮ�� �y�u�1�u�o<�:�oa:uq����w�ykk ⋜�}0?jv��X+����}V�����G$s����
?2�6������Y�I5c�$�Cf�b!�X�*|F���^�$�p�7�p��55���߶6[�m��jg������l>�*��	KO&
 ��8�ܝ�:ǰ�o���k���K�m~�o�S�-*4�E�}P/���%�k:�e�"�1A�J�����CAX�����8=	 L�Ţ>�ܱa����v{�|K.3���:\B�x���w���b�eb��<n�/�N����jN�j�OTQM������է ��g��[
׼1��J�[H*�d÷���J�(�R�Y}����Ҙ�c�hC;�ay�h��&�Cq;7/SG�n���y'^���9wה[�y��F`4;��upX_#��6Qy'�xC��q/�Q�P&�N�t ��4p����ԍqD�2/ع��i=����X�܆D�A�<���-��>>�1ۿv�H�?�f��58����%�6�$ɲ�'p�L^H��X�bpI�Vqn�����A�8��K�g'i�!Uz��SE��I�����5���N=��hp��V�?��(�E� ������V��r��?޴��7�������V�ڋ�ɿ�.��O���;������p� 4��N�RZm.�O��> Mu��L'��j5����`;�Mt�AQܶM����y�V��<`��$m)�y��ڳ�X���Da�:��݁��q�1�J�Fq�15��-�l��\��3�~X��-2pF�D�e���/�f!��2��i�:��=�h��{�%�{t�^���*�P����Bͽ]��Y�D3��jd����*�w|��GLϽ}�ˑk7��Ç�=0��6�o�z*����zo��1~J�w0�0S��e�Pw%���#@BJB	��%��+��	�'����;�%!&��)�H�q �7f�q�H.�������!�E�ǎf��,�9՚�$9� �H{~i���	�Z��)O|��!"��D.K��Qa2�
%���2W��ɂ\�{�*��B{7�,�9.�'ew U^��W��&�$�r9���rcG�B��wl�����l�<�����ʷ�SQ�ゅ��h�! i�Ѩv���J:�Y?��#���_�m4��q[�������}�,�E��A{V�П������P|�D��g�?9M���Id?{�)���/���	/\[ ��J�ҏ����[��f4G>����Q�K��^��m�� ���O��� -7w�]����<�U3jƏ,���:��Y��q�~�0��/�m��ŵ@C��C�F�q<��y�x�h����\�0=�RgY�d�(��(_�2������a��_�{p�M�T*��0�U��T���!�if$ԟ�(W�q�RC:P�a3=b�� rK1'-�{����H�ʽH�1��'`�kϯex�$��.�h�{܆`�F�z�E�0��c5xfM���䏾}�߾S��S�����K�]N�f'�pPιS�`BmmH�v9�4ሄ^�m �D	$����,�'܄ �p�Wɭ�g�dV/L�;���MZL����ꭵ�H>{�,�������Θ������쬷ΘQSo�l���sɿh���?A��2q���`��5����Z��&*�X1L5:�6����ς+����O]ue�j�����%?�ۼ&���aW?{����2[�}��W?��J�b��Ι��k�-\���b7�sI�kf&Λ�f�x~���n�O-9�V����~c�W"ȗy)b\)�2MrW��f�;M��U�7��'[�������-c/��.�ؾ���u�M��l�&��.��9��) G���!�!W*	�60C�ф#��q�����rq�O��K�ZO�Wq�,�8́/Xp����T��ȑ�g<>�¤)��[J8�o`
;��S\�S���������%��h~��p�|J˾F~K�=E0N�Q�X�����*����8;D7�Q��1��QC�%*E�y�y}�� �UG?>�I`�>���'�6<�+�����3IV�g�Ϯ�yO����Q$WBv��H	v�[�Ϗ	2�+����'�ø6N�߆<�������ɕ����2��S�娚9��X�1�\�┣����df>�B�~�����-��t>�W�]��p�Pr��Z[��'����+��ƌ�l�9]�8q��C��!��'�@AA�Ou�Ш�
!?M\�JMͭ�fǞ)�ߕ�=���w?A�N>�����¼}�jQ<ǏpǠ^���(��}����1�+��2��qF��4R���iHď��IT�r8���^����!gm���>������'����ڸh��E�`�s̊o����l���!�(9~��o���%#�)�~ƃ�j$�@�Ք�Lp�G�Oa{��߿f��é�)�z�ؔY�<����������~����^��c�����s����潺��������ݴN�RU����R�T�Y%8�����K�s3�q�d]^�QTb' ��zx�)�H���FҩP�mU�Z�jQ&�X��Ɓ�o��<0�j�YG����z�]����$8c��&�h�y�ݼ���wΞ{��9^����sf߹�m[v������ӣ!�(Z�As��ۧ��y�B�������8RiԣB�g6�{�Um��tyW!b�pǮdn�/ŷ�ʼ@v��/����%�c������x�En�:��4Y���²�,yZ-�kr���cH&��^ȩ�C�'Ȯ'^T����5�������r)(�(I��J�U��&#�݌!+YM.�J�EX^|����L��w@��ھ��Zsg�Y�洺���\� ��x�ԟ����x���y���L��Cyo���<�Q�O$)�W�6�m%݆�r݆�d����ս���{��O�b��p��AE܀ʌ�g���������i��~�A������O"mo*�!��[T�����m�dH�T1�$�
	�PԐ4^��sfcA3��,��XA��P��b�ks�Y���	�yH�h�P����+b�W�=}���;�����"Z&x<SySVY��&=��4��&��1J�5u~��,ӿ�z�e��g^QB\/�Pʄ%�+p�re|Pn� �T��cZ>?���e�V"_[��Q�/�5Y ��|���qI��/\��9������di��EBh$���v�������wOL� ����fp�a�,?H�gH�f2���RbL
v	>�U�So���^1/,��ē�vc��Y��Gm��Ũ��~�Am��z��?�/���4��0� �yj̸p�k����2��H
��eE�R�b���/"M7�5u�l�[�drC�&Y͐�&I�
`!>p��;���J-�b���--.�V�M��4>��Fj��/�5���σ�������t5}�>C�*�<'���d��?,c�����d�Gf����2ҁ0w��6����L�h"�f�K����ζp;���ǿ϶P�d�c��1�EO���i�%����Ř(DC���W�����V�2��I)��T�i�M���F T�z�0������U�� S��7V��mBW6;�nYZU�zS�Tg>(�h���F"�޽T뽷���R]���L۶�|��Lx�[�s,'NU|����E�<�4)�R����p�*��vU#�g��*�g��jə*=�~܃��A�S��ē���AJ�Hw�3@Nur�bw���Ȁʌx�}[�`�7������Z����tPlh	���L.)NU�}���kq�'��v����FQr׷��{ˤ�S]�Z�L��(�@�*�Sf�^��+u�Pe_k#��.�8��ɂ%��ՠ�,���@���TK��х���
t`�ߑ�X�AD;��b���|p�A��7�}q���2
@Y�`�~�������iԬK��0j���Y�(���R����~^��ҧ8�>��=�F"�˜A[��Dq�vQ�C�X�|Z��sO���<NǦ�c�PI|���։��2����ů��1��Q|��FH\[��T�k�޽$���3���X����5��ˮA��q�_��rv��7���@��v�2ˀ��i%��m�؊�f���P��^{�ovvy�fV�w4e�w�""Zd�[��T�Cʭ"ٛ!C�ƛ���#^���
��Z���fR�4���x� p�V�rSK\���B��]Q�
���B~#�V*�p�x��^��(���o/`D��ס�.����E�OWTv���6�����M^~Ey�l��/�ѫ��Ǌ�l�Q�6M����q�":}H�ea���-EY�"��z"�ȏVKF5����8�/7
t��D�n#D*'����^I��������Z}pITmdL%�7�@�C�:F��By%�� �������KS<K�Re��ī�so�k��|ȝr��^�s�u�~�����w�N�_�V�P�6;�Y�\�\�l�m����I��"����R�
2 ��ts�0��^~������
��;�gELc�7�����"�����<^����$�g$�y����s��L״���$֠ D�>	\�/�f.����F;���k�P��b�d�z7ԐeͶ-6�b�y���b�aWjnh7Y�L�F�!�4��w��ssF�C�n�h��_0����>�M�Z�� ���nC������*#5/O�U�N\(3o�@�[7`�Mg8x��g�e;f\y�|f֤�ޑ��]�i5��q5q&�>�'����������353��k�Yꭑ��=W�7��+΋yx�I�e<�����P��h�X	a��v׸��"���cJc�oH�O�Cu]�L5��������k����і�����]x���~�#�;!���)B58�/P����H��F#0��B(��p�}�Fst��M|���l��)]tϼ&�ݖ��,㙗nt,�h[��Y4ݬ$�wQג�,��@�����k�`D��g]r����|��Y}�Vq�wRC*��9[o�����Ν�d�X6��&�=���}��߰�/*͏\ ˔)���5gO�l�Ӧ���}��1:>O��YǏ�s(�p6��[��B/t爁*̠-n:��<Ц����)����+�ް~q_}����oxt>L���V�F���G�@d�9��[<�s/���.<7���s�B���d�B'�wX�����ο���Z鵣��W��՗�>2��?�2ȳ���8�笞��={��fg�csC����m�����r��e��#���E>���45�qo:�J���X��^io��P,x��f�:/y��n9��V�ѥS�7=����u-�\�%�K�ϦUv���,�Ⳁ����Z=�v���k���N�*+_�.�ڊ��֞�i��ڃ=w@��l�m�r��>��O���o,VԲ���ɝz&:'�4��5���!��9�pI	0@I[�PU""�s��Inv�R>�A����9t�$�3/���|k�8y�i�E�����c8��E�!Q�\ۂ}%A��f4�s*�A8���A��΀�>D��=5uw�����j��nG z?2�Q�/I=��f�H���4�n���]�澀�Ym�G"��2�PE�H��f�vZn�<�PiA_�q/��P�Dտ�	�$$�~%Nyhr�OdM\�-��m�(��@\���#����Ƽ��N��J�O���>a+� �uJ�*(%�¢FP�J�W����������,$)���)��������}���
B\����_������w�V�] 0��T�OCÊQ}��5����{Ho*�;;�葞�rǨ���M�c�5����4S
: ��M�����7�(kY:�����z�`�gp�J�stˉ��v'���e��G^~����i�D��1����6�dA �@'N �����֭<?�Ғ9庳b���ɩ�EÁ:��h�{��h��0��vۧ�Q~�{�"�H����GQ�kl�<�:ʛ^g�/���_i��������P������>N.��?�f��1��b��zJ���D �V
o@7R@6�<��%IF��0�mj=�[�}N����ۊ�57��p��y��v4@<mЭ��9T��p?��R7�����0қ���Q�G�[j�������zi���b����~��/)wC?��	רa�-/�C�n���.ĕ�Hj63������p���Krh�����X��I�Ǝj�
��o��1��9
�f�\�~�:-��ѓK��4��7BY���̆�y%�DC~e��m��@�]���%�r����s4T�	������G-�Ug��>���H�OpV�B��]�{9&�^6�|�m���_PLLI7ǒ�i����"'T	}���? 4�����|��[Fǭ�tu/�_y;Z��?��H�K�0W�z��c#����)��~.r��ĥ+�B����&J���G�0��[������.Ρ�r��O�k��;VC���oX� ���K۝S߳�r�t����:z�X\��xm��Jh��x���N��h�5��K�`�;ydp.Ec�4�X�D<-�ll��ip.�^��p��:��u�/����.��Y[�rl��_�4����kz�$~Dq�]7/T_<菵�����4K�$�Ɩ�� ���&w�������S��7���|K�^�������7�MsMG�������h��w����㢴0]?���fja�5a�i��Ц�6C�2�no���f��=�)�d^����v�	qNc�Ԏ����l=u���]?;�f��-E�~�����n�v��}5����%���������Oջ�d덿=�Z%v��� ���n�K��u �̓*J���#1�h�u1Hr��	o��}����SZ�u=���w�;�nϗU������`�F���ȶ��En?����߫k&����l9�Y���d��gA��8NSG���D�09M�AK{ހK3݊��� [_]�%W4z�ۈu9�\~����n3���~��zir���������X3k�`Ps�������n����=m���]�ԃJ�ks���T�9d���eYN`}��/�]U#��b�;R�����t,��l�h*���#JB+
(��iGx\}~IֳF��v@T��u��֭��J��
�������
�@-L����w�z�Y��g�����w�`wx-�����(d٢]����F�3_��X�cY�mQԃ��W�b�-��F���K�5�d-0b��球֨�T+�_�Z�x�c���j*`���}�|x�~�L�F�*�S*o�Mت�A�����T�1p�7�1?�Rt>��R'"�������E�y�)o�P�7����%���$r�v��Q����eE�����+���n�zl��Vl�Frkt��'��'?R��'Z�CE�I�Ky�	ga��0����^��}�pE;��Kq{��T/�?�i"%���1�ޒ�b�-�Ծqƛ�˵��+ ��8�]��rI����ڣV�{�dȪ͜�\�A���Q�vO�S��]0.���N��X9s��v�b?OE~�FPU}o�[Y�K�r�����A��̓U%���7D�w����q�b�/�h���A���hPbQؓJB8�I��?�I%=�X�t�O�;�(P�h�L�d��S �'h�ݱ�>|���T����V?�,O���"\�`�7�����.�2���>���D���f��m�g;��-����C�'����u�,���� z�A`-�ټ��$�xvc��k2��[x�p\c�b��l΀�ih�s���iv�aÛ��M,gĨl��M���z����7Jv����ˑV�RWϋN����o�4�(�-��XB^�Cl&Vn��n����n D4[k6�����N��&��}f��3Y�Qw�@$�U$(Ǫo�:-�ZG��#&���/�}�?��N}ƥ��7�A!M���h��W>���?iX�p���r��A�١�b���?uϱ�ι�-h������6;��S�B�#/���@ѿJ	���
!%Q�)��Dq:{JI^ޑˡ�PY7UG��(������h�?Hm���ъ�vRE��H����=�N`P)Q�����G9��FM��S�MG��@2�E�$Q
�$�s�~�TkN�"�9�Ն8�c�F��^�"?+G٠
^�*��gUlFVx���U�poC���.XCƵ��׵͉�q�K�[�k[���K�(l��;��ӡ�n� %^�R�j�,$)� ����1��n.���G�:C��f��(��,���;��Ĵ��R�F�_~���^��;��ի�D��;6|/jGGSSG��G�ӎļD��zbR�/X?�������U��p14u�$`��[ߜH47�7I�~��~I�r�ߙs��#�6��+�h��e�W�6@wK�̸h6,	�1C�"������=�m���e�A����=����@�z�����	�s��ls�]�;kkl���r�^"s��青�>�&Մ�-[��{�JiҴ9[�ݵ�ȩ�-�]�dޢ��c��An�۹��g�}ꒇ��6hT���ɖ�?3s���^k���L�cY�1�Z��n[���bݴ�E߆��դ�w���k3�f���>���fM��D��ՠ�a��D���~}&���@��5�ugn��OȢ<��'`&bӬ��-6���;��X�"�d*�a�w���Y���v��t�L��X�ָk�U ߩ����a���=HR_�@���+j�2��T*�£�%��/͸oƤ����y������1��9/7� ��~�7����_���o����+��$D�үs�IH�:�r�	��	�yiF:�����v�����(��d�O":��om����dM�8��;��Z9u�ʩ�HCg\�K/*���ԙ�g*�-�I�������_�E���Rq�R'�[�f�?G�U��Ao�vb	A$�e�]��/�Կ��o�?|�Ԑ�Q�m�4�G���7�G�83��3+�74�z*)�$݋J��pD��N�j5p�q���e�Df/���>�������%��g�W���{�U��:g,�n���l���U�\��t�'���%���E��}��͝�u��C��ꘒ�ܻߺp�}U�+^b'�����o(5g�V�B�I���OE�m>�������5y�zg��}�����A��P-�P/���ޫ ���6�)�x5/t;1�p�1�L��9�Aܳ|����)�����X]m����kFE�H/�4}:�,oLM�o�6]Y�M�5���0u[��yҫ�fV�h��?���E-A�_i﫝��j���.
6|��5�`#��Z-�sv�fq�ӟ����s�͚>���w����7C��{	A������]B����z,i�H'd����v�?�`E���
�x,��m��z�`�F[��2a�v�hp�%(�̒���ʂ���5Ԧ;G�юh����\�y";|"�ٝʖ��rx�z�s�P�HCT�v�P$���ly}�iyhvM�C��r)�#�x���-�.(�t%fu���(ۅe��UU�o�
�p��qe�ˡ啗�s�y�i�	X��k�`�>�X�@2P��.�2͌>�n�|��,/4����}����?A�&�J����r�+����ɐ��CV�]{���Z�0 -	��A=��
F��$�+����%U�Z�y���ޗ��ٲR��B��)�����wT8��(�a��R�Σ*-�����s�r5v��!^tZ:/�K,'���F9��=���G�< ��C��u�"$�-��F��S2�(��F
0Q��+X����w�,�]=b�h[q�B�QI����;)"�Ō��9��2��6�r?��}l�V�=b�[���j��4�Az���K�kQ?T��[%��$�K�Q�-��l_@l/	&;���차�Dr�?P_d�E1�~�z��^I�~b����r��e�u��f��P�/�պ#�E�+�S\�G�-�R4���	�S���S��V俑;���*`�G��*5'���d�L�
���~����	��5��F���hb`�
�ꁜ���4��[b$~�G�N�AX$����~�}[��W�}��_��z×6m��&~O�%��j/�r�&|_S����y�<��-�*Lϛ���,��JQ�z�ͤ�𫷣�����|�V|�GVW~��<mbl���������B�&���̭j���y��\r=���'�9�H�f)������ԅr�	w��!;;vs��B�7Ӏ��'�k��*��ir�����b�/�K�+ԔW��R��O ����h$!`�1�[�r�����(�a\T�R�����"P�?]Y�;?��х�yKRX�W�OCz���ܩ�H�jPn��[��忊�;�͇G��q��Z.�A��.*�@/�)WQHQ���U�L�2^��$,T=Q��� (J~�BI�UP�J���=�WC@�ﰉ8&�~D���W�����k�[��<�Տ}�.�"S<#A�>�z	����
�H�����E�	���Y�n���H4�r7P?99���ߡ|O-��5��	�%�4�	ǳ�O/4�L_Ps��T�>�LQ��D(�����J8��F��+)jCb
�Mu�2Xc8$�t�}�&<?��9lW��~�ҿ͑��n��90A�=&W=s�Կ���_V����}�?k�U(�m��utE��*�
�K%��t���Z�p�J�� �B�W���P �A�l��(Z�L��zF���Z�}��/��40�l�V	���i%L��^V`�jp�P������5QV��V�k���zX8���^s��ţW4U*u��}�L��8�F� � �~�3��B�"I�/.��O
=7B�JA����� K��Q-�|����Vw|()8��C������%ʴ��To�l�s�7*���rev�٢���6m���ǖ	���C�T��pT'ǑpL!�jRC4���}a��Sm���[��%�4a.��첹},�L���B���=�:ݍ'�b����dm��}V����Y,�t��;���9������	�:\�I5��fDA����u�I���F�H2� @:2	�!�ԏ��j�-���@ٵ�G������`vKcw��I�lar��%l��Es�
��rDe��T��ib����@���d4�����B�DH��T�. ]��K�*��շs�\m�F�:�:��4v��X��<�;���r�����%���6�aꇷ����ܥG����������ѧ���|��g�у����h��v�qtJ�J��K����H�^v������gp�.��?뜸�B����0�^q�8�|f�S[�t����Cx�Ҕ������׬�f�й
�^�FB�
�Pi��WFpR�U
�:̓�D��}���فv���������}4��z�/���F<���P莣\��U�'c?��4�sJ���jj>�@��Qr�-��֤��U_o6���q7�P1�ˤ+���rc6�I
�\ �(*v�2��4Uc(A� ̣9�3���]�z�����;0'�=���*,e5�6��V�a,�qh�*��P@wȬ�G��/�O�j�|�FIm�	#Pz�;J�wʎ}��<�����zT� �t��~�`�ȱGP%;?�5(�(u��#���vՊI���#9,?G����b4K]�Qgԟ]�E[�phʯ���G���+`���Ęp�?�@�>!�}"
�ҽ��r=�C�D5� 62��ZY���  ?����i��A���
T(�EU�Ju�;"}��պ#��L�c����ӗ�V����W�O��&�CIԙ���u8*烞Q��a�Q^*z(�L�|Jӏ��^�f�p1����0�4~��C��Ux��*r�V�*�N9π�׳�P���ūs��p���_L�������3�Z"}�&�r�O�|l���~���k�C�/Wj><��S�x���M�bS������g(]�J(Z#��x�\$OC6�8-�f:{�S�ҳ蚨o�4:����)���Wb�"u�iu�h��~�d����%����B����AM
s���WH.gv�%��4���v�+����=¿
��S�G�ϋjWHW���u>��[�B{[�u�ɶs�;la�z�i���W߭�\z���C����|��\f���� te��&��ߕ+B�k���/t��
�CM��	/@S�>Tm
�G`v�`?�������G�(�,zb"���e���A��A�i�����7���Q���R<�"i�X��:�I܋(a�V�������;4R����]}����^���1�v�Ե�����7���=�p�|�[Jο�e�µ{)�e����#��ief0�K�J�q�"*�F#�(��GjJF�h���X�#ш������ݍk���5E�R�P�΋�	^p�C�eo���e��:��{6�۬��5�͝s��ƙ8�X�K6��V[��=��}V+��hͧ���J��l��ZZ�5��W����;��T��e�V-�@�H��I����D<͙[�)֐�����l^b�Xe��NN���"K]�@���b����?.�H�H
gzXa���ْA��}MO�e�X��H�N�r���ڟW�;�ht�gttO�yu3=���*פ���ؿ�C��FGsh9J�ͽZ�-�k��]L-�~h�ii�.�49�Qr5��I,Vݓ��^jf��_}�,��Q6?�5��NV����
ޞˍ�YٜN��%ez��qƨ�>�Z���Nt��1�  a�%��=� y�hޙ��H����J�Z��?�	h�vr�k��@�m�Y`�^ins��F\�*�|L�z!/?�)(�0��
MS4(�ȗh��{������-�'�h���o�7�cCҞ�?�6���'|ub�գ@����!�b�Ù�����f{tz��1U�A?=�@���	t%�䕉��� iu��[N��i�D���G�T@�:�p<�(�c�X���Um�2�ϱ7z��O��M^�FϴYUfwGs���#�t:�/�������~�Os�]��F����ݑ��(��(^����?L��$�Sʽ�WzT>m�'_���d�����:�� 5�Lh;�H7�Wgz�g�Z��Zb3�{2d5�Jj��9�c+���\vqz�Db���b��ƶ�g �"l@צ�p�QB�b ��S Q�>��+d	�p���%}�L!��������cdwHo�����p�x(T�p��x��p#� :dvQq�dA�QFd�L��K�m�PR���pU?�l�����zg�-�����jP��b��G�aR���&^q���>u�8��p&�Ӯф�`�MGS������ܵao����WܛZ�aâ�ٟݰ�V5��R�s2NX	�qGB	��O���K�g�����BW��)Sg\����ӡl����]z��<߲o-_��-����A��KMqӭ!�æSi�gy�����۰]K�;S��T'���kPq��e��e�7cZT{~*�7�b�\H�?�jٵl3��P��оw�T2��j�Y;� )�lD�ueytOT���jö���U�H����X�gɬ,��W��Ϣ^���u��![]�v�F���|
�QG�h`(�#	�R�'5X�D��Q��qM�6g�c'b��u�:'�����H(�?�yյ����6�~.�e��[n	����*��U�yZs�t�9�R!G���������MM$�x�z��$]��{��L<�}���4���JZ���~�MV�Օhy� >@u��������+������]��2FqO8j��ѥ�WC��Qq����rw��.��䄫�ޥ\��_�������y��\O�n�)I�KGR��HŁq���I���.
d+u@ϴ�� �k��Ť}9��T�v6�*x�g�e7?��ì�}�S���-��AU����OMlJ�p��ժݧ����Yw���h�i6�\fA�Zc,�rjF�T��Mj8kO�51��T���qW�_�n��`�7�%�K����W�s�d0���:��`��OX����s$�4�?:�SI1� �W-�Pr}�²���9�.��&�P��^f
�8(�W�I���`��`@5a}�z��i�V �p��PԽ+:��d\j�"=�a�j����)W��$q�{���͜�p)�V���|�7hj�������������$�L��֡�9�\���ځn[ ��k{lG���.m�m~�T���E������b�ȭ�m�`
��w�ny�P&�:P�LJ��Y������_�p�NW����zV��S׃]7��E�d�%i�癬|������E�WM���7r���HB���6�`UG�Z��� �9�N2l2��ɅHY��(�ŗ���iw��ݓ[��`�cZ��R;Yz=Tr�vH��9�c.�ֲ�G���6�*p��΅�'�[�:�/�ҪX����CYхM��t��-'�]�n,{@��c��Ob�����I�N�.�x�N��F9��뛝N��K��[���X�r=���W�m���ݏ�Ʀ�Y+���?s�J����g�X�u�P���%ȗV^����[��� ����W���;��W��xv�i�/��XS3��ȼ�2���ԩZ�<F��=0V�[%�R~ˌ�x���y�s��y?�Θ(O�q_�V-��aQ�*Q1	�t$�j�D�pRR~�zǢ��p�"�]�gw���=�%GV�����rt����>��f�2���/y���?���8�M@�Q��*˄�������C�X��k���?MzT y?���Z��Yu׳)���]͕��1�-��a��7j�~����
.d���
���'��������V��z�tXK��2k̹d?��z���z���K�.�>,��BZ��`q��'�k�H�qy����5��j>a���\C��#��H;#p����7l�4�}��IR�7���ފ0����$��=�V�������#���_.�v��s�{g><c������_����O���gx���5&�?���̠';z���a��a�:zӑ��Q�Fꉢ��^��MF� ���9��&��A������Eb���ٽ\�|�3�gE}"+�>��h!���A�b�/p7����=�z����mi�%�͟�3)^O�j�<_�U��NY63dsIr���8E�j�����U�*�33�|v���;��O��B@��,��,��\cwd}6k.�u�k�F9��'��2�6D]e��x�G�J�K.׽}��S��$�@t"�;2 ɩ �*�����4��1_��x�7��Q�bj�X����9����Q��;�#��{9��e�I
�-�奐br	B<��9�dpz��IV����Q:l�+�s�i�#=��T��+R��(��M�DC$�
��a�̱	�ONg�j1�9������gqXk��}F�����d�����c��G�,���&��.��.^ɷwwc��>�E�_]3��U��|�t{J�f�窂u_�.�\����*���W�=��}�lN���o+^���Ṿ��	v�P�>~��s��T�jWz~_��o�gS�}-��D�Td��-T�Aa��Yf����3,PATcm��ռ4g�}���m�E$B��w��Ū8�>��9����JW⁩�O��/9�P�JC�XA{,�@c,tEJ��T�j��9� �8Q����&� �H���P�l~K%ƞ�1��ѻ��-�e�DzxN���Xuz���.9��}�M�c�&�:��Z5��ә8��%յս�m����om�CB�:����l��8�����~��ܦ�E��j�T����YH�Y�v�n�V^IN]]�CXkg#�sc�S��B�$�Ý=�$��k�}cG�&��/��z��}������_��v6<�7����IVGG���g*l��\RXS�T���)�E��%Y�u���~Q~>X����Ѕ��`9�W��k*�@_ՊpM�]0�*��%�a��3X팁K�M�|�{��FԔ����
췾d7[�n��l��ͬ�D������@��m�����8����e �cż�#�gH���dd@~.�j�l�lɛ��eRcx�E��((	��K����m¼��G�X�A7��S���@[l��.%���գnMDs�]n�_Q �5�i?z��G�T�G3��T�@e	�i���,���r��
O2<�����l+���/,��%���m�� ��ۚX�n�|�E����]����l�í������[m<�|#�z�+�5�� 7&\5S�-�{��AE��^���t�K�������M�^rq]��Fm�C%2��vJ��)W-�}OM"`�9l�+�=�%"����T�'8�zH3QҐ��ѩ�Y�P~V��ز�Ni���7����ۛ� ���?w1�� x�c`d```d��?��o�A�eP��BY�t�?���;�"@.H c�x�c`d``��
&�]a�� A���_x�}S�JA��S<�`��������� �b)6���>@D��"�X\o��!�����ι{��,_��o�gg��g� ��#J�VYp>uC4�&*�<=$���g9�W@.0��q���- ������;�:pt"H�U�e���5����Vg(�[A�x�9��!�޴�EM���ߗ�4�N�&Ӟ��wj�t���Ԟeσ�Lp�>�w���>G��pfz`�|����^�a�ż�>���)�o�o���M�g+R�m�Rq��,���RJ��1���X�T��N7t�{I�E�\�F��8�U���mb��:f�N�&��j9�Y x�c``Ђ�M/^0��K�ؘ���ژ�0=avc�c�a>���bĒĲ��k�.�"�/�
�I�8�8�8�q�q�pn�ǥ���5���w�)�^-�8�||||[�5���?� �JPK�Lp����P��a)��"Z"WDmDW��c3K� �O<H|����D��4�$�IjHfHN�<"yK򝔙T���o�q�[d�d��<���u�͑�"�G����\���$�K
n
���w(9(MSڡ̧��l�\�|H��
���J��4�G�&�	�{�D��Ԟ���Q��a�Q��Fs��-5-/�m.�*��]:otet;t��i��-һ�ϧ�_��I����A��%C!��u�/�T��f�3V2�3�0�f"a�`��䒩��<�fvf5fw̥���'�_��p�h�8a�e�e�ay�J�*�j��=��wl$ll���5�}cge�cw�^�>�~��/��c�L�uNN+��9K8;9�9/p>�"�����k��676��-n�����ܷ���0�����h�8�)�i����ʋ�K�+ �s�9     �             @ .    xڭ��NA��w��h����
/�"�T�D�#J$��r�qr|�!'�O�3��X�F�ާ�0�wY� �1�fg;73;3� �x��E0C�q=���q�X�4���G�A$�x�ZB�8ڃ�	D�w�!��I��a�S���X���w����.�0�?��o��N��؍�gڍ��@\�A�`��sb��
�k`��sݡ}�,�0�Y��aD��ȵȵMyF�Mv�Yd��S����2����0~�>�/�qJ��G
i��<��#c���0�C~G�����9eeKv���в[ڷ{&V(Ө1j�1�M�Zqr�7�,gKܥ�X�����0�����QY{�
���M�Y��жz=���a�:[jEݢ�	��BZ�Z�=n��s�`�+o���̏�  x�m�U�SgF���B�]���9I�$uw�-J;m���Pwwwwwwww�l�ޕ���]<3)e��׿7�R�^����V�V�_@��$zГ^���З~�g �`�0m�[�czf`(3233�2�3s2s3�2� ������e�D�*95�4X��X�eX��X��1�4i�+�+�
����k�k�����	����[�[�۲�3�Q�fvd;1�q�gg&����n��LdO�bo�a_�c�@�`�P�p��H��h��X��xN�DN�dNa�r�sgrgs�r�srs	�r�sWrWs�r�s7r7s�r�swrws�r�� ������O�O�����/�/�
����o�o�������	����_�_�����?�?��������f��,˺eݳYϬW�;�M����e����lP68�s䘉�GE{R�α����M���7����n��ܺ�p;ڛZ��[ݛ�Ƶ?ѵ�ֵykx�~y�j?\3V+wE������5=��QM�jzTӣ��(�v�N؉�k/셽����d/�K���d/�K���d�b�b�b�b�b�b�b�b�b�b�j�j�j�j�j�j�j�j�j�j/�������r{���^n/���+�v
;���Na��S�)���Լ�f�f�f�f�f�f�f�f�n�n�n�n�n�n�n�n�n�n�a�a�a�a�a�a�a����C���h�QN��-ܩ��������?�����C�����?�����C�����?�����C�����?�����C�����?��݇�C����}�>t�݇�C����}������C�����?�����C�����?�����C�����?�����C�����?�����v�Nj�HM�p�[q�n����?�?�?�?�?�?�?�>�>�=�<�<�<�<�<�:�:�:�:�:�:�:U�>���:�:�:�:�:�:�:�:�=�;�;�;�;�;�;�;�;�;�;�;�;�}��V��h�S�������o    TP�  
wOF2     Fl     �\  F	 M                    ?FFTM ` �r
��$��e6$�t�0  �"�Q?webfe�5옏��@��?��
��� �t������������,3+2q�F�YO�&>��b�m�5�Z��H$��Y���{�H	jd�Չ��%��٧y"����+�@��]��e��{���v��Nc�)�n���?~?萤h� ��_�&i���ѝ���?�>��^K �v�-cۍ1���2K��y��,'n�� (�3Ewi�B��&����T�lh�0M���҆d�Y�r�ﲬ�nti�]�yur�������VXsj����gMn�әH�W���� r2�>iT`V7��R(������+�o6�'c��B����4��ι����㿚�T	]a[Qd<3wq8,���rTI�8��0>E�?�*E�痦�#��7'�����S	oc�ʷ�_�7&#*�+)����+4a�A6�c��y�٣�f(bF�����$;{ YA�1vP-tG�������"����C�f- W����ԙ�uKְK�#����*K�<�� (�������Z�`٫�[�%�YT��{%�Ɋ$���s{o����ջ�vt"p��4`��ߩ�Ϥ}o`���'ne�>
�G5s z�_N�
�PKӦvmU�ɾ{z�����������"3`l��W#Ԑ�^@+�,c��ko��AOpnu���z�zJ)��Υ���1�}���O=����x�R��`�J�`�q���Us/�+�k�v�1xl���jl�El�\nD���ƶ�V�����jg�{Zd�z7�5��!xm�5o�[��u��&��1ڂHBkA��qr��R������(\gh��7��Ҋy�=�H�Z�UPh��$8Rg���z�gͭ�N:�� 1u�$܅����>R�]�����"��f7���K�^'���3�+E/��^�YU5]�NB.�ʋ��8��+�͏8��,|�{M|�A��ua|�a�����˅՝% 
lKG�P�,Nu���k�c�8mX@��d�̘?�����Y�&��{�������?�P�(�G�]������O������r-��\LF�9�,&��y�8r����3�ܟ�?p��>�~����s��������D��z�1��?\U5q=��t�zԒ�&Z�nj�%�mM�"}���tk�D�wh�-=�m��B���76����&:һ�qt"�1:���Е��u;�"K_�/Jd�c0�l��0��'^B��8VC��zg����[ ;��d�
�Y�bȃu���u;�@�*}y�|.��'C>\g=�9�V�Ő��[o�|g��^���>��d�
9����������
*E|A���*M�[�[*mO��Q�z?P�n�?R)Y��oT&[�U*��5�S�MB�����[�
���oYDh��{��,}1<f�&6h��'��ʥU#V������E�D"T��ީ��AD9��eB�:��%O�� ����Fu�n 7?%RG4"��f�g��F꺁 a=��-��Q��y+B�,���2��օ5���𙄌xn�Ϊf*!����l�|GXQ� ރUp��
�Eu �@����-��Do.6YZ��-&a>f?� ��N�N��	]�O/^;\��J��B�EsJr���Ě��'�g/���B%��o C��n�7��:|�y�Kt�&�$��s�|��wP���\i]�$Z@+���Հ90x]�r��%���+�RU�Em�+ܰ��;w�u��9/I��7�7զ�Q�lu\�y�W�N)�8�ܰvY�*u�m��������m(	f�E���G8��j#I��R���z#q�߷�	�)Y��$��Л�c_%�m-{!0-`;�公�hyV���]Hv!	�ta�\K���[�1{"�j 6@�3T0%���Θ"�ԙ�ZI�G��S����.��Σp��ӬS�1e��ٓ�؛��Y��v�8d�\�B�l�S��R)�ӆ������{I�ӆ��%���>�0Ўڦ�\�'�cg�2%4�Q�D�
0͒3B�"�M�Վ&�ۊhI��ڧ�Rg�ME������I��(���5U�D]}��b�8$���8�>��X �h�"l�΀�j�.%�ۀHH�-I��ݸ#1�C4��Y�7����Yݖ�Vo>P�]�6�����O4�7f�~ AJdYF��.��o���y)	�8l��22�e����1H�[t��@!ȅ2\�@�5�ٓ�%Z����kޒa����@�.`n�3�OF��R(󅥶���ZkLkF �HWjYI��5��*�6��e�Sbk.��5F,�.�N0�ԙ���|��V��||~N�(	 4����],�Jp|~�xe��A����5��/�ڻS������v���y?���'_v|r��X���H�Q���ēB@=�X����B9�4����T��B�B�c����H�P��+��_���YH�#�$���`��F���B;��+���BPR�4̼ t�:t�"ZE�J^!X�Ǔ�q4_dTW(5�܀������I��UŇ�A�z�@U6�n.WGX����H�RK��&'swM�j�ʎ���<����3�)���`#F@F Ԣ���v�o�b$x�+��u�&�}�|�X&[٪�8F�-�E&/>�/�G�.a�z^��/���})����'�x��$O=<��z��o��A9M؝&�~�3r�3g���'�8ң\�-�MDz����k��5����A
����G9��|1-�! �87�[���,mR�u|�57�
=X���,�aJ����^t�N�4��\fЄ]AzH^7��F������&k"LU>}�>�rB�X(ۂ��T�%��J����dhK���P��K�TFaA�3HH�C[r;a���d����54����lL�kjG{��8�h~�fR@���9w�B����0�zS�����'��a7�@�@N����ƹl�bj3hN�X��F/��e�s��'��DsQ��<�k^���׼���ZASO�id�SJ�xN4D���K�!����	!٫v��hA`�E��X�� ��-�P��:���ѤC�:��W�zS�s�dO:�_����`�:t�aηБ����س�����IY�4�# ��*��+<�q n�o� �u
U�cww��x$d���ƿ�}ρ���94�����9p�*T:�%GQ�^a������'��e��b���l-��*X�L�%*ź�.�ڊ�\�@pR$T�*K����hp���������m����-/�oS�3���E����to��}�жV�o�eJ`<�$��t�����	�]g*�Z���6q���l��~�E��
�S��/���i��T�t�k�Ǯ�W�þ�=?j� G����UUAJ����`��b�ˑ��G�Q�Aϫ���Ö����c���W���WSm���g���F��&�^��ؘԡ�6;C1:=ۈP���`�ڜ�VV���E��5"�hO�X�~���N3_5Ӂ]�z-���CW��tԥ��ӈ���e�]�\����V����c�#m[�kuޗ�_ʱ"���s�H��<}x��m0b�xH�qb�a3tf�MT���*]I�
�}�(���,M����=�	�@�JA���d�����?§6PV��[dV�v��4j��ߛ�lH\������{���M��Ș\����Y�܁��`9M�`Db�<�;a#z�<�x"�,�d�gCi�`�c��:���I��>jw��}J��z��^:V.�:��ڋ{�ͼ(ȲB���ɦ���x�<Db#"S��{��P�Hu�N�/�{r6;wU����s�PО�<��X��Y�s����Mxu��\�b ��s�$��x��(��/^|^*0j~m�;#�%J��M4��p�QM׬�::b\C2gf��]�z�P8T� U��Qb��t��C�T�>
p�8+6g_2�lΡ6�H� �� ǆH�:�d�<�C��6��ؤ�/��6�E:�K��"�`kJ�<��Ƣ�=�v�7���N5��`��Jt��\j�6ͅ%˞7�*�'��U��4�:�X+�\b ��E
����af��x��}��1+p��B��0�6�����3r�A$N�~��#�d�}�פ�P7h�H7b�F��§���8��P>�BtGN����m��x�@�j	���|{�s9�=�wR�/��oDJs5z>�;�'x��E�q^r�^=G?��9A���A�_���K%�Dɮ:uikjk�Ie���G�՝#*��)�jm��|�t��}`J�Z؈���H=4�{g߁��)�qX�MA,�H��7�1��V"��o,�Y#h���ݨS�_�;��a_ԗZ^cn4�����H�E��?���}�
ȝ�����٤=}B�WvުUe��h��� G��F�����;�@2S����@�f ����n��2�#�����f�Y:]�Jy�H]��-��G׌wgv'��|��0e�
�_7��Ґ�n+f�ٸ��Y<��(�
�?����y���%wm�+j�&&!�c�^�u'�b�&�h�m6¤����*2?�A�I��Ʋ5FW�ؙ[�Ɯ�B�Uz�I�E��!�m:����xh�e��Ǯn�z|]%��m�r�U�F�گ����1��};!n F�&�g����P�����;&������$$��F�).t�B�Q�3���(�C=����X���es�;�i����ي@��~�N��ΡE�	�SR���h�\����Be�o��������bT��nΒju���	g@��'qQ딎nx.u6bVU&��]�;��!C_���5�*�z�ɺ�m�RQu��q�����P��Z0��}m����n��^n�Or�T������:�U�'�h��0nZ�p^R�|DF�_b\�@��m���DE�8� �{o�GM�᠜q���}��Sd �C,�i�ܚE���/��Ë[d8]��,MCI����_u�,]V��c�"��p�g@�`"y)�,;B�^e��l���2'�.(���Ę�y>�-|�h����w����;�j����Ս��iԽ���_o|!@�)ɢ���=�̌SPz����*!z})�|ƧT}�j��E�tC�Z�n���ý�*՞��4ۆ׽[����9�Ю�����ݓ��z`Wme�o��|j8j��5��9���@.��E�V�/�ZW@|��f_�\"${���v������/��;a�:Se�i3T�G�*����]�ơ/�h�2C32$�����1}��D��NX���t�?Fϝ�~n,Pj9.�>ף���{
9��EN-v|3h��C�иE��� XT���;P�$�=�J�-��gݕ��igz~q�(A�<:h1�9�3�N�̽�Q����}CL��W�ߧ�׎�~���b��"����|�4u}����c�y����6��2�[ ���\d�,�Ҏճb�k���D��%0T�x��{=;�Է��(�i���LS���1������3�N�h/�6?�'E^�~���P�{sZ��Z�K�ĞB{�D�t�&���z���)�Uoa�5Q�3��ȗ�r~����
����F]�$�<��tm(�}���MB@��[�Gx��F�h8 �#}��,�#��u�Laz(�Qh�4%�xm`U��չ.E��v1a��4_'/[�d�{Fx�I�59���D�<��&�8V�E�Fg���芘#�I�䟍2S����_�]QqA�n��_�Q�>bޘ4g����-�0&E#c��i8�	vR/�4�r����P7��KsOW�N3ՏvE\bq��Q�5�Z�ڽVy5]�����h/	i)�����-/���k�N�ю���#e�)"P���	{�KSQ�x�����>a�&��<a,릌HEH���]�%,eD��U~W�l��ڛ�;c�ᘓ�`��? ��p�M�l��.�P�W7��٣�./�W�#;W�d*�:z;E2�������j��9y��A�S�S8�u����;fY8�m Kѯ��ԄԶ�͡>,��_�g���-m�c<�n]Ч-�5�2c�����z�7d P�z������V�����OPvf�R�R���ఓ9�Z-���d������C�����`,�at�=�k?v��4#P�B���إ�/[�s.<a0e�{��&��v��a~e��8��)f��ny��f�BPL�u�Iy�H=S�2����"[��(�¼O@�z*I��@��0��#����,� ���I$Q��yc�ўF�a�ߞv"��|R�ܘ	'W�F�x?�+aN�M���K�`�D�/�nf:X�I8:H	�IRm]�K��6i �@U�H*N��oF���;����ᇏ"W�q��d\���Ѝ*C=#�2�6x�7�<T��
7y��rU>-bH)ɺz� '}�׶��w�!r�X�Z��	�.:�Vn�;�-�>�:�
6�r���U�cs�4k�VW�{����#��5ߑ0�B����`ܝ�0u��".Q����dB��0����C��r�]���#�Q9lq��N^�ֳ����h~�NU\� �16�
~����S�n�T�l��\�THҲڛ-��~�G~)$�oQ7-�C�����}q%/a���vO��|[q4�����~Bc-$N�7<V�HE�i-���R�F�GNM�{�"3���49�[�j<����Wӭ��h����l�n�� ���QҨډGcq��@w�/e q����g���<����: ���a钷��u����_P�`��b{E��I(��OWG��fEy���ABa_��;O^�DQ��'�s�������`D�#њi�:Ѵ�+�Y{�{�p�&��\�Ra�����g�Ϟ0��g��T�L�i<'�7��?���X1���C��
a����n0o�r1��/U������o�/?�♯a��_�p�HֱG�촠��8�ݣ?3F�0����`%��ϑ��<�
G�]Խ�8bl͏%-,�)}%�J�:�Y��j�T�;Ыȶ5Œ>�6���w�{�V餃.&��(�o��*�n<��n9��J�
"a��Д��+��a�/�����;7zD�Zη{�t�M	Mp��	iؚk�NPw�ؑͺ�H`T�$23��f�����0�z��;�����"�]��*�Y���,�Q�W�����lS���O�rW$5]K�VٻB��ܚ�I��k�|�=�&�[�������58E�R�0ދGk�sS���n��nnu���ExK��r����}�~m��`�G4u{���=]6f� ��ר
Bo�&<�ñc;2��P$�ǃ{mW_c��ª'B6Њ?$�^z[�C�Y�ݭ��j�N�~��ۮ0����t������6/)-�1:p$Dꥅȗ
�
,'���y�����v�� �n��F�T�с�['a�Mb�J]�%�&î�lc6&��IpF����o��i������5���'r����r�(q�������z6������(5���E��ɢ՟l\�L�k�7��1�Y4^)bٗ¦8��y�Ə���
N��=��9zT�^[T$�dk��Q�iK%�6����q������fO|���c�8$�ji^vr�.QQR"�Y�rĊ������k����r���K���<QI�"�@���R9��/��\&7Y}m�gҊ7��z6�-M�u=���,��N3O\�6��aDA��ޮ�Ld^r��/.�>����
N�e��Ri�4���!3R����"�4������n�b�m�-y[X�����."��!���QK��E\N��4gՠם������aN�p�>k)9��0�B�Z��Bs
��y�r��er�)v���D��t�rv�\�v�[��>�r�Jm���
a��̼�~u���Տ�>�rMZ���c�B<��`)\y�t|ۍ��r'<����>�����[�Î���h7����Z��8caI�!��p⢟�̮ ,�G���k�5@�����`��iw��nО8p�v� ���*����'O
�������A[�.��r�h�TpR?+;���\*H�sLq���U��f��:ql-ć��*6!�h�+ˬ {h���- jg�k�MM��P#��:�}���{/���V��ŶC]옙�&[�W$ګ^�#����4fWa\��5��躺M[6��)T�3���~�������
�:. Z����`s�i(�R��Q����|/�`�
il�^�L#����f�-��;-C;_���*�{@EMCooÂ_�����7�T��rqz�F�%ׯ|��U<Z��o�[TA=���'DPJ]�;,U9���Q���p��k�4~�����_�C�^�qE�Ů��b�SGs����Y��2N�A��u�%��SD�� �hj	
�y;9$ߴIA��h�EO�����}
�g�����/+ �Ճ��5�JY� @�G��������f2����Y���/��߼�e�߷��|v�/�"���p��~刋�T��8OK�r*���*���4hi�@Q��3g"�j��:�$��;:���f������,d���z��Ț��Ԍ꺳��u%�ˣ}O�&���i2U�,@�k�j%u?��4�N�Km����d?5�ݓ;�0�Y���e}sZ���>EƫUs^ݜv{����fQ<Đ��VP����Tfͦ�?���m�p�P* �&���Q�G��{c�J��EPe2)�xP�0A����MɪZH�j�"׻"�A��C+zq�mVzᖞ�U%�C� :@1���W���[y)�J@�o�b%�j�A>)N�ǀ�i�$�A���t`>�?f0g �H36p�6��D|�M����4N���
�� 4J�Jڃ�
�j���Ƈ��\�p�3����8������Я���6p��V?:�$�sD��N��ƹ�2�n�,��H�O\�[��ո��K�-)��W~�i�m�?���T�:���޺U�eY���-#dJe)����Z��5�?�$���\d�W<���,Ɇ��;�ط��5���S�ո���T�T���̄f(�PY�v=Q~DX*���8�辩s-	�˨�΀55�X�R�l QC��������l|��5�{�ӦT\t꼕+��e�n�۸���Ps��l�3���UO�[����Z��S3���*��,����:ÛZ����L�����S���'̵��*��*@���ı~xgno2�����-
�� �W����V ;�pZ�9�?~��$�6�<��Qr�bQ8&�se��Eb��Q,��^|B���碘�Vd�V-�(�]� .��ˎ8/qhV�nR��Q�D�*�U(*1h�1�`؝QL{��Uj`��"�o3 ܻ�V�l��:	������jaFa��E��̞Z��g1��z���2֠�:�Au�ZIf6��2�tw+���f��D�������CL-}g��Z�0>҄�xJ����>\���Q��A�_C�i�h��bl]�6����4*�A˯ɰ�qX��7��Y�X.�-���ո�aɇ�V�h��iKg���qN�RĆN(r'�]��%٘�����@3�̀�j�Z��J�.;��nm�����,S���0x������ͻ�OF33�ҧ���<$'���G�E+��}������'1�f3����y�5�/&�Z�\RB�7dm��]�8���\���3߂�Ȫ�@��o��T�3eu^�W@�������e7l�!B�,�s���1���$����Z��&���?��dC�� �(YЦSm>�J"&pt�܈�P㇄BF���������4�G�5�	t^Ć$���j-a㠍g^�ʐC����As�T=k�TS,|�r���9I��BϘЬ��'��vG A��@��t��hQ�Nj�&��T=�xt;2]�P�|T-	LÞ�����e1�ݽW�ZŚ*MrH5?��=� ��o��"��9�K5��=�'k�-*���A�E|	� � qҔ�_?\�7%��|M6�f�+��+�S*}�W _�]3����fmܮ��˳��m w!�����.�R#�鬪;�����q�q�71���$ݙկ_��iK�&�J�άM������em�V�5P�0>�� Q��5��W��H�Ih���&�4ҍIl�E7}�s���m[cȾ���|�d^	���%Uv�1�D��>�.�T��7*�=t�Z�_�㟾1Х:=0pZ��6ҋ�N�t (�u�Ɲ�; �B�]��$�k�ڌ��.�{�F�*/UZ��N�砦|oq��K�G;^�侞9N��e��xK����\�wh���~���ZpH�b���䉸���[k�8����k��.bX.Q�Xp�xYa^��"��#���B�wnb����u���m5�F��~>��8���b����N:�p4�[gv^
B��F�Uz�)?��60��F��8�� �/2��C8���>�N8G��%l�%��5�FH�{4�6h���4�%�#7������x�o��N t�\�'�Ȩ� ��E����0#��j�NãV�ӹd�?WlcW�������
ž�ֵ�u�-��}2�2���EN��}#�䵵2H^a3����r��qs�����-�S3&���f�퇣���fwl.�=W�8�,���cH�j�cT�W��נs�9�0��Z�D�M���C2�ZM�����dj��t�"8�:g�{.Ʊ��1Fb6�1�8"yԦ>�����W�9�� �V�����`�j������T򔔑��<I��MԱW'%�f&�\y�Z�dkʹ��Ry�jw��}��Ѐ��[8�ԍ����bB� �'d'm�o�'<��|E���5��:��ڋo����>��r,n��i���<T��S���>�d�� ���qN���.g+ �S��Q������	��KaB����?_��Q�E ���r���j��h>��E��ӛ;�C�׭7���^q�
�`U�e�#-���;oJ�ċ���ԝ>)���;Jg��׭9R;Og���iI7�}��8K���ہq�j���eؓ�+ٗ'n�Ϸk3�����eFρ����0����V#���p�MAzb^P��V�u��~�1u��ғ�wn�	^�.II���_���vdW������[Q,���+L�b������ćq��9�V}�	�ΏV�w4qU�3&j�ıHYb� ����tt�T���7ρ��arBwP9?)�u��T/�a���A19��k�M
\��P��s�<�Ta����@�<?M�(��.�,'%?,�%�a~e������U�0��/zQ��(Ѹ����a���p:.6�j��dF@\V�4��{�Ri����8�ɪnu��F�M_��=���Z8�H��l�sy5k%��|(�i9"�6�}ԋ~WK�۟�hY�k�����\���l�Rm���&������0���b�]g����"��ހD^���ތ�j��J*)��6���-Yb�h�����
Z����=ޑ�A,��(��K#�	��Of�J:�;�I���!6Yi&�d���%m�86#���Q�����W_��A�v}?+�G���	cc*�m���g`�>��q��+��=�[5�͔����?�9�W��+^�o�^E��8s�)�f��2a���Q�x��i��&	NE>"^Na�a�;f���9]NE&	t^��CLz'�e�8ZR�s&6��7_ �ãcyJ��1��@TZ�?S D2�
�|�P���Oӌ�\d�R����7zH����9i� �Q#����zr��c.�4��G�R�4��qx��<2~X�h��n��ੳ��2�auB�NC� +��k�X�0�aj5n>މ���e3�vާ���<�>��_�����uH:��XR��%~9�!4��o�Ѽ�� 3���8?�� �1d#������A&���{A!i6����/Xa����㇤=W�;|���)� �g�~�?*�悽� }��ڧ�Kt�>5|�E�������.���A��Q�6�����(6

6є�7 ���<9��_�C�f1��Ў�i8����,V�4$��ut������i�,.`v6r	��P��gFB�Ɏ�
t����C3�;�,�oÂ���x|	
/K�Mp�1S_��X.f�V���#�U>Ȓ���#B��]�A��IVo��Іϵ����GTV1nr+��OX�S�%��³��f�OZ[�_�9���P�߰� {Gln�%�#��h�dw�H��=� �y�e/�W����>�,����IP,*MV���~ºK&�e�ċ��M콣=�)�qF��S���"�G��T�F��*�LX,h�[�����w�w��e�WQE�x��?��{^چE�x�h��i���ׂ��J����H��|�^�͓���e*^�Я.�u�xE����b#�;���ԝ<]z]\����w�N�ho�chq�E��=���4Q1�7���W��̓lÕ6�᧿�HE_̣��qy���YR��۫<x=�cS�Xy!=0�8Ǘ�x�����?�{}�����F_���Ǡ�z���kt�ɱ��7��ڂ|t��+a�m�<xe$��e���ɍ��<[�T����X[������� �s�V�̋�ާU��*��h�S�K=Fe�sw uY�o��ٯnQ��=NE:[�(t]�k�|�@�ٿuZ\9{h���v��ܕӆ.ڡ�sa��$u+�q�w:#��?�e�T�3=��л�!�p�PL`�:����R;�gʮ�Fha�ΐ;���5Ie�+�������bt06AW40T�hJcc<&�mJcc�
���OCn�W?��N�i��o](XЄ��{�Lz���;����g��|Ǐ�>�9~l4s�Vy���`��Uߛ,������#_�u��+De�����M���~h�q�벇��#Y����z�$;�5ͯ9$�� z�>�
�*j�O������$��$O/���xR��t�f-}*�o�ɦ���|3�M;xި�U���l/.�~Xǎ�Y�4�x3&���x�";�$�KI��5�dڭ������~w[��M9O��%4��Q�}�S^��t���@���w[�Y;-������s;�b��wH-*�im��I�-�1e/�~��TNN�.�p���)H$��W��~������Ʀ�O
(��9�,�]gM6r�+�#�%��/s�w�A�$��q�4�O>
d9}��+��$�s����?0��a,>�y��ڈs<��=�,��c_*\�D��}�2M���T8/�4�g�'ڦ���8'�}"�C�*�\9�#Y�>z$����7c[s�|"$}�	ym�����zQx 5�%�o��$j�k��p)�x���-:��И|?��o��f��gFr���2�S��Z��q}q���	�o�,wy�O�g��CF1�l��'�L5T3��3���y��M�9�2"s���5uD��6��-J�U�bs��
�O)��w�R-2�/5f�<�BQ�4k��ꐭ�G�	)%߼�<d��ĪĞ�3�2`�a��]��S{�K%�\]�3&��p����ڸ���Cո����놶�,����^�T���7�h�5�u�lD��xڷ���L'D���r�6�vշfc\�����gA������@ ?�������	��GF��VA�l,���:����i#~NU��DV~7��k�K`!�P��MX��R��$#�Tiih���om՘�<.8Um�<��3���ES�4ܫ���V9��'��bv�{���?�VV���3��;�U'֬���1R�V�{B����i��4CRh��r6~�Ӗ�J��P�͎��M�7G�� -,NLo��<���ѣz����2H&|$����<{�ڜ�K�_����mmS�)>r�ϛf@=��BF���CB ������&'�F}@�&����y�ub�����C?'�����S�49+�Ó�C����Iî���+���f/R�U���C�Fu:C*�}�T:��}{��ݽⲷ�u������e[!��>�?����ڸ�"�M
8gz��0\Hk��Z�:�h��~�@�+�#�N���fj��y���io�!�B�	������R'�5>�`��[!��T�`mC��I�ѝ�}�n
�>W��!M}U�av��4��3)!�kcȂ��m�?��	��d�w��v�!ה;Xϡۨ}�8�vt���"Ӽ#k�vX�J��[�l��[ZݙMÀ���XC3l�[�Ta�Vj����ʻ���Ѭ"œ��t:�(�����<�cZ�ve��Q���T���qH�i{��銀Q埓'��Ö��i��P��￭������mK�A�I�����BF�
�=�����Tᅽ��(��&TS�?/�؁A:ַ��ОV�(��@w�Fa^�]����o]*��99�R�i��_�������2vM���`P���f��{QY���H#V7v�7�Ұ�q>@��~uɘ׆Ax��/��x��B��3�Ġ��t���y�b0��nG`��E�D�ٍ�A��:�P�wI�7��nW��2ED<hD�&Z���	Π7�3�&���)LD�4;�7��Ѵ?$���k@�"��"L&~���1ʺf�14�ʱ|���7Os��}��L1;��?�{1$���w)��1}��0�~7��#E5��`�q&o�ow����_��鴊��8Q1��G�����Ɋ���08��h��W�e��+��\��ԉ�R�����U?w��e���O���Sx�AU�̞3�|	=WA����R�
P�tO%Q"1Yה!so%%�^�z�_hn,�{?���"L�5�_D6���+����Sb�<���gfJ���0�b�_��x�-��;�H�����W�:G�M�i�Ee�Iu��vJ]~m����QHLKk��hb�A>}.(h��"���U]�9I�h_�V�@��GZ0C
�pb�:�L3��tN*�N�2��!�3��Ca��yn.���ɋW�`̳�}�QB�C���i ��8*��{57���O#aT��B����U�o�i�0��_����^
ChrU}~r�L 1�z�>..�=%G���G����o ����E�u�P�Psؘ޸��8����P��u&;��*���|i&��Pb�ț���h�;�[��|y*c�V�h�Ҽ�(��~�_A�qU2����GIQ�3`�^�v�=�@��K'��Ї��Z#4sJ=��:sY��	sڥb�yj��S_E܃"����@�~���>�86��#�y����[��c�S�Ŭ�����#�SJ�GZ��yvv��S�я扝p�waT�����/,
9'Jkv%%.�~o�[�� 衧���R�Bj��S�Ȁ*$'�腁�pçS�u �+�9\��_f+����8�u\,����t���p�э�kخJ0h�(]N�Q�v�W����7��8��6:��ݣ����Wc��Y_i>����"��R�����(�e]�6���RA%U�6&�F]��7@̳k3Xh�?��K���� Q�2�Bk�[<o�-[ s~��0��]T���2���h���J�q�K�v���(32J���//W��,����z��d$2�cA�kP���	��K�+��Ec�����[Q�������i��EdV��xR8��B�5���a=:��KQ�����\��@�V�^;Kr�	�M{����{#��C�w}{^,��$0Rc�\o��Q�Ѽ�ץP��$��Y�vp�>?.���.K��KAb��6���5��k�e�+]�F<H�e"�;{wN�yx/���&f檄/XZ[��7���c%�ŀ5�d�Y_�y"Ыߞ�2\37�
�k\�띲|FO ���68���������������nK�zR"�������?/7�32�:а�>��e�WH�U��0O�ק�5��������e3H��co�>l]0�2��c����H�9�{Z{sO��!�A,�7�?ŷ3 w俎A
�Fj���8�B�&8U$G��� ����$�Y5���F�L�5n����1��>q�2��.�6�e��
������+��@/���k�b{��(��7�i=��{l͍�݂���濦��8��1g�(���%��h/�Ef�M�ҍ�t� 5��̼vg�o� �~ਜ਼WKi父U��أݖ�w�RS�E�F��T��%�`=���|*=1��*�����S�X�����^���w)l���fQ�H���(YS��SˌK���1����W]�f����7ך�^&�p�@T'.��%3�������������5�zaTf6��A5�L��X̡��|�L�-��η��T�g{A)�F��."h���j��A;.��~����o�%���G#�}&]�׾c�`C�hH9xnN��Y �l�c��\+v\E���Ƨ1�D9K�X�)2b.��N���W����Qש$�/��|6tð��32ԛ��7��� �2���иyu�0e��)�N�uh'd������~xY�� ���>��#b�"k3�������:�9���v��$ПC�:�)H��>	զ�z��;e�d\jmf��O�a%�9���cK�x��ۥ�!k�%H��Dn��{Y�"�{n_�}
�)9�=_/��Z�(��>l����Y���V��gQ#�߭:Q���bw����$�zw��ٮ�#���U�?|���G���h�z�{�o�$w��Ϝ���)|Vh��?��ZV�7�%��G�o/�׆���E�"�KӲ����l�p76� -z!�l�4n>��$\��zV?sz�qej�Q���]m���^�=^���!���l��HB4sLi9}�2�^��K�5�OB�)��O��v^~����݀x��rm\K�&G^�5�C��L�}&F�����B]K��n3��|�sGjy�k�O���b�sܽ�aW?R6�����J���fh��2	��lBS�\=�j��V��*��Y��^�����˺^E)��*�\���
��r�r(a�@��6nԌ�?�}�dL�����g�Ivq�Nc��a��Ʈk���mL��c�A!��hd���V����wc=��憖����s_�:��җ��sL��g>���1�*4-%�&��0Ub�)Eܬ��*b���51����	�+�+;��<����`!q�f��M�*�,[/GK+{����,>C�L���R%%c�����~��'EG��A��G��=�h�䟔��8:ID�N)�W̻�AF)ucw'qh�Xè�L@a��~�6�Pc2L�"�A�2b��U	��&�����9�A#�QLO�:�E�9k�����f�KF�b93t�L$c�ˬp�Lz���5�d�p����۰>$`�.��~X�=� ��?��N�Ͱ/���L�P���No0�����p���� �b8AR4�r� J��j�}���Ӳ��0��4ˋ�����q��uۏ���AFP'H�fX�DIVTM7L�v\��(N�,/ʪnڮ�i^�m?��~�����	����Q�U�Ӳ��0��4ˋ�����q��uۏ���� b$��tV&g�ϖ��r>�<�y��?������f�{�紷�� ����%����~�Z��a�zW�������2��sv��������eW� ����    @DDDD$""""bffff�}�X	�O�0�cDDDDD���Z�6W�08B��I�        �   �.H��W      
�߈��9� �u�*��R*J^}��:M��$I�$I�F������yџ�����_W���<G<�  