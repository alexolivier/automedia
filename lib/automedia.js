/*
 * automedia
 * http://olivierdigital.com
 *
 * Copyright (c) 2013 Alex Olivier
 * Licensed under the MIT license.
 */

'use strict';

var jsdom = require('jsdom');

exports.awesome = function(url,selector) {

  jsdom.env({
    url: url,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      var $ = window.jQuery;
      console.log($(selector).attr("src"));
      //console.log($(selector).html());
    }
  });

  return 'awesome';
};
