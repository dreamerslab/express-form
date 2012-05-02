var extend          = require( 'node.extend' );
var utils           = require( './utils' );
var filters         = require( './filters' );
var validators      = require( './validators' );
var validator       = require( 'validator' );
var FilterPrototype = validator.Filter.prototype;
var externalFilter  = new validator.Filter();

var Field = function ( prop, label, msg ){
  var stack   = [];
  var isArray = false;

  label = label || prop;

  this.name       = prop;
  this.__required = false;
  this.msg        = msg;

  this.add = function ( func ){
    stack.push( func );
    return this;
  };

  this.array = function (){
    isArray = true;
    return this;
  };

  this.run = function ( src, form, opt ){
    var self   = this;
    var errors = [];
    var val    = utils.get( prop, form ) ||
      utils.get( prop, src );

    if( opt.autoTrim ){
      stack.unshift( function ( val ){
        return utils.typeof( val ) === 'string' ?
          FilterPrototype.trim.apply( externalFilter.sanitize( val )) :
          val;
      });
    }

    function runStack( foo ){
      stack.forEach( function ( proc ){
        var result = proc( foo, src ); // Pass src for 'equals' proc.

        if( result.valid ) return;
        if( result.error ){
          // If this field is not required and it doesn't have a val, ignore error.
          if( !utils.hasValue( val ) && !self.__required ) return;

          return errors.push( result.error.replace( '%s', label ) );
        }

        foo = result;
      });

      return foo;
    }

    if( isArray ){
      if( !utils.hasValue( val ) || !Array.isArray( val )){
        if( self.__required ){
          errors.push({
            field : self.name,
            msg   : msg.isArray
          });
        }
      }else{
        val = val.map( runStack );
      }
    }else{
      if( Array.isArray( val )) val = val[ 0 ];

      val = runStack( val );
    }

    utils.set( prop, form, val );

    if( errors.length ) return errors;
  };
};

Field.prototype.custom = function ( func, msg ){
  var self = this;

  return this.add( function ( val, src ){
    try{
      var result = func( val, src );
    }catch( e ){
      return { error :  msg || e.message || self.msg.custom };
    }

    // Functions that return values are filters.
    if( result != null ) return result;

    return { valid : true };
  });
};

extend( Field.prototype, filters );
extend( Field.prototype, validators );

module.exports = Field;