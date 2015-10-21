/**
 * Show a list of regions and countries
 * @module Countries
 */
angular
  .module( 'CountriesApp', [ 'ngRoute', 'PlayFairApp' ] );

angular
  .module( 'CountriesApp' )
  .config( [ '$routeProvider', CountriesConfig ] );
/**
 * Route for nav templates
 * @class CountriesConfig
 */
function CountriesConfig( $routeProvider ) {
  'use strict';

  return {
    configRouteProvider: configRouteProvider(),
  };
  /**
   * Route nav html templates
   * @method configRouteProvider
   */
  function configRouteProvider() {
    return $routeProvider
      .when( '/', {
        controller: 'CountriesController',
        controllerAs: 'countries',
        templateUrl: 'templates/home.html',
      }
    )
      .when( '/playfair', {
        controller: 'CountriesController',
        controllerAs: 'countries',
        templateUrl: 'templates/playfair.html',
      }
    )
      .when( '/options', {
        controller: 'CountriesController',
        controllerAs: 'countries',
        templateUrl: 'templates/options.html',
      }
    );
  }
}


angular
  .module( 'CountriesApp' )
  .directive( 'countriesWeather', countriesWeather );
/**
 * Templates for modules Countries
 * @class CountriesDirectives
 */

/**
 * create template for weather
 * @method countriesWeather
 * @return {Object}{ restrict: string, templateUrl: string }
 */
function countriesWeather() {
  'use strict';
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'ng-template/my-weather.html',
  };
}

angular
  .module( 'CountriesApp' )
  .factory( 'CountriesFactory', CountriesFactory );
/**
 * Factoy Countries
 * @class CountriesFactory
 */

function CountriesFactory() {
  'use strict';

  return {
    listRegions: listRegions(),
  };

  /**
   * Create object with list Regions
   * @method listRegions
   * @return {Object}
   */

  function listRegions() {
    return [
      {
        name: 'Africa',
      },
      {
        name: 'Asia',
      },
      {
        name: 'Americas',
      },
      {
        name: 'Europe',
      },
      {
        name: 'Oceania',
      }, ];
  }
}

angular
  .module( 'CountriesApp' )
  .controller( 'CountriesController', [ '$http', 'CountriesFactory', countriesController ] );
/**
 * Get info countries and countries for api
 * @class CountriesController
 * @param {Object} $http
 * @param {Object} CountriesFactory
 */
function countriesController( $http, CountriesFactory ) {
  'use strict';
  var _this = this;
  /**
   * Object for save response success http request
   * @property countriesList
   * @type {Object}
   */
  _this.countriesList = [];
  _this.listRegions = CountriesFactory.listRegions;
  _this.countryInfo = [];
  _this.default = 'Select country';
  /**
   * Generate {object} with countries names
   * @method countriesListAction
   * @param {string} regionName
   */
  _this.countriesListAction = function ( regionName ) {
    $http.get( 'https://restcountries-v1.p.mashape.com/region/' + regionName + '', {
      headers: {
        'X-Mashape-Key': 'WKkKOMj8VrmshIpe09gefLUWEVKrp1Xxhd3jsnmAGHiks0J1NG',
        Accept: 'application/json',
      },
    } ).success(
      function ( response ) {
        _this.countriesList = response;
      }
    );
  };
  /**
   * Generate {object} with country info
   * @method countryInformation
   * @param nameCountry
   */
  _this.countryInformation = function ( nameCountry ) {
    $http.get( 'https://restcountries-v1.p.mashape.com/name/' + nameCountry + '', {
      headers: {
        'X-Mashape-Key': 'WKkKOMj8VrmshIpe09gefLUWEVKrp1Xxhd3jsnmAGHiks0J1NG',
        Accept: 'application/json',
      },
    } ).success(
      function ( response ) {
        _this.countryInfo = response;
        _this.weatherCountry( response[ 0 ].capital, response[ 0 ].alpha2Code );
      } );
  };
  /**
   * Push weather to countryInfo Json
   * @method weatherCountry
   * @param nameCapital
   * @param alpha2Code
   */
  _this.weatherCountry = function ( nameCapital, alpha2Code ) {
    $http.get( 'http://api.openweathermap.org/data/2.5/weather?q=' + nameCapital + ',' + alpha2Code + '&appid=bd82977b86bf27fb59a04b61b657fb6f' )
      .success( function ( weather ) {
        _this.countryInfo.push( weather );
      } );
  };
}

/**
 * Module
 * @module PlayFair
 */
angular
  .module( 'PlayFairApp', [] );

angular
  .module( 'PlayFairApp' )
  .controller( 'PlayFairController', [ '$http', PlayFairController ] );
/**
 * Encrypt methods
 * @class PlayFairController
 */
function PlayFairController( $http ) {
  'use strict';
  var _this = this, alphabet = '';
  _this.result = '';
  _this.message = '';
  _this.messageToCipher = '';
  _this.showMatrix = [];
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  _this.addValues = function ( method, keyword, message ) {

    if ( method === 'encode' ) {
      _this.result = encode( keyword, message );
    } else if ( method === 'decode' ) {
      _this.result = decode( keyword, message );
    } else {
      forceBrute( message );
    }

    return _this.result;
  };

  function encode( keyword, message ) {
    var newMatrix = createMatrix( keyword ),
      msgCipher = messageFormat( message );
    _this.showMatrix = newMatrix;
    _this.messageToCipher = msgCipher;
    return cipherMessage( msgCipher, newMatrix, 1 );
  }

  function decode( keyword, message ) {
    var newMatrix = createMatrix( keyword ),
      msgCipher = messageFormat( message );
    _this.showMatrix = newMatrix;
    _this.messageToCipher = msgCipher;
    return cipherMessage( msgCipher, newMatrix, 4 );
  }

  function searchPositionCharInMatrix( matrix, char ) {
    var row;
    var column;
    for ( var i = 0; i < matrix.length; i++ ) {
      var _row = matrix[ i ];
      for ( var j = 0; j < _row.length; j++ ) {
        var _column = _row[ j ];
        if ( _column == char ) {
          row = i;
          column = j;
        }
      }
    }
    return row + '|' + column;
  }

  function cipherMessage( msgCipher, newMatrix, iterator ) {
    var arrayMsgCipher = [];
    for ( var i = 0; i < msgCipher.length; i += 2 ) {
      var a = msgCipher.charAt( i ),
        b = msgCipher.charAt( i + 1 ),
        char1 = searchPositionCharInMatrix( newMatrix, a ).split( '|' ),
        char2 = searchPositionCharInMatrix( newMatrix, b ).split( '|' ),
        row1 = parseInt( char1[ 0 ] ),
        row2 = parseInt( char2[ 0 ] ),
        col1 = parseInt( char1[ 1 ] ),
        col2 = parseInt( char2[ 1 ] );
      if ( row1 == row2 ) {
        col1 = (col1 + iterator) % 5;
        col2 = (col2 + iterator) % 5;
      } else if ( col1 == col2 ) {
        row1 = (row1 + iterator) % 5;
        row2 = (row2 + iterator) % 5;
      } else {
        var tmp = col1;
        col1 = col2;
        col2 = tmp;
      }
      arrayMsgCipher[ i ] = newMatrix[ row1 ][ col1 ];
      arrayMsgCipher[ i + 1 ] = newMatrix[ row2 ][ col2 ];
    }
    return arrayMsgCipher.join( '' );
  }

  function createMatrix( keyword ) {
    var key = keyword.toUpperCase(), keyArray,
      keyReplace, keyUnique, list = [],
      matrix5X5 = [], k = -1;
    keyReplace = key.replace( /\J/g, '' );
    keyReplace = keyReplace.replace( /[^A-Z]/g, '' );
    keyUnique = keyReplace.split( '' ).filter( function ( x, n, s ) {
        return s.indexOf( x ) === n;
      }
    ).join( '' );
    _this.keyword = keyUnique;
    keyArray = keyUnique.split( '' );
    keyArray.forEach( function ( val ) {
        list.push( val );
      }
    );
    alphabet.forEach( function ( val ) {
        if ( keyUnique.indexOf( val ) === -1 ) {
          list.push( val );
        }
      }
    );
    list.reduce( function ( all, item, index ) {
        if ( index % 5 === 0 ) {
          k++;
          matrix5X5[ k ] = [];
        }

        matrix5X5[ k ].push( item );
        return all;
      }, {}
    );
    return matrix5X5;
  }

  function messageFormat( message ) {
    var strTrim, i;
    strTrim = ( ( message.toUpperCase() ).trim() ).replace( /[^A-Z]/g, '' ).replace( /\J/g, 'I' );
    _this.message = strTrim;

    for ( i = 0; i < strTrim.length; i += 2 ) {
      if ( i === strTrim.length - 1 ) {
        if ( strTrim.length % 2 === 1 ) {
          strTrim = strTrim.concat( 'X' );
        }
      } else if ( strTrim.charAt( i ) === strTrim.charAt( i + 1 ) ) {
        strTrim = strTrim.substring( 0, i + 1 ) + 'X' + strTrim.substring( i + 1 );
      }
    }

    return strTrim;
  }

  function forceBrute( message ) {
    $http.get( '/playFair/dictionary/keywords.txt' ).success( function ( responseKeywords ) {
      var keywordArray = responseKeywords.split( ' ' ), key, arrayClear = [];
      //console.log(responseKeywords);
      keywordArray.forEach( function ( val ) {
        key = (val.toUpperCase()).replace( /[^A-Z]/g, '' );
        if ( key.length >= 6 && key.length <= 12 ) {
          var cipher = decode( key, message );
          //if(cipher == 'ELATAQUEESALASDOCEDELANOCHEX'){
          //  console.log(cipher);
          //}
          //var test = getIndicesOf(cipher, responseKeywords.toUpperCase(), false);
          //
          //if(test.length > 0){
          //  console.log(test);
          //
          //}


          //if ( responseKeywords.indexOf( cipher ) != -1) {
          //  //console.log( cipher );
          //}
          _this.result = cipher;
        }
      } );


    } );
  }

  function getIndicesOf(searchStr, str, caseSensitive) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if (!caseSensitive) {
      str = str.toLowerCase();
      searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }
}
