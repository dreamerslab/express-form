var utils           = require( './utils' );
var validator       = require( 'validator' );
var FilterPrototype = validator.Filter.prototype;
var externalFilter  = new validator.Filter();
var filters         = {};

Object.keys( FilterPrototype ).forEach( function ( name ){
  if( name.match( /^ifNull$/ )) return;

  filters[ name ] = function (){
    var args = arguments;

    return this.add( function ( val ){
      return FilterPrototype[ name ].
        apply( externalFilter.sanitize( val ), args );
    });
  };
});

filters.ifNull = function ( replacement ){
  return this.add( function ( val ){
    return ( utils.typeof( val ) === 'undefined' ||
             val === null ||
             val === '' ) ? replacement : val;
  });
};

filters.toUpper = filters.toUpperCase = function (){
  return this.add( function ( val ){
    return val.toUpperCase();
  });
};

filters.toLower = filters.toLowerCase = function (){
  return this.add( function ( val ){
    return val.toLowerCase();
  });
};

filters.truncate = function ( len ){
  return this.add( function ( val ){
    if( val.length <= len ) return val;
    if( len <= 3 )          return '...';
    if( val.length > len - 3 ){
      return val.substr( 0, len - 3 ) + '...';
    }

    return val;
  });
};

filters.array = function (){
  return this.array();
};

module.exports = filters;