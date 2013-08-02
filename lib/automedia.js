/*
 * automedia
 * http://olivierdigital.com
 *
 * Copyright (c) 2013 Alex Olivier
 * Licensed under the MIT license.
 */

'use strict';

Array.prototype.unique= function() {
    var unique= [];
    for (var i = 0; i < this.length; i += 1) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i])
        }
    }
    return unique;
};

var jsdom = require('jsdom');

exports.awesome = function(url,root,selectors,cb) {
  var output={};
  output.youtube=[];
  output.images=[];
  jsdom.env({
    url: url,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      var $ = window.jQuery;
      for (var i = selectors.length - 1; i >= 0; i--) {
        var s = selectors[i];
        var objs = $(root+' '+s.code);
        if(objs.length>0) {
          //console.log(s.name);
          if(objs.length>1) {
          objs.each(function(index) {
              //console.log((index+1) + ": " + $(this).attr(s.attr));
              if(s.type=="youtube") {
                if(typeof s.postfilter !== "undefined") {
                  output.youtube[output.youtube.length] = s.postfilter($(this).attr(s.attr));
                } else {
                  output.youtube[output.youtube.length] = $(this).attr(s.attr);
                }
              }
              if(s.type=="image") {
                if(typeof s.postfilter !== "undefined") {
                  output.images[output.images.length] = s.postfilter($(this).attr(s.attr));
                } else {
                  output.images[output.images.length] = $(this).attr(s.attr);
                };
              }
            });
          } else {
            //console.log("1: "+objs.attr(s.attr));
              if(s.type=="youtube") {
                if(typeof s.postfilter !== "undefined") {
                  output.youtube[output.youtube.length] = s.postfilter(objs.attr(s.attr));
                } else {
                  output.youtube[output.youtube.length] = objs.attr(s.attr);
                }
              }
              if(s.type=="image") {
                if(typeof s.postfilter !== "undefined") {
                  output.images[output.images.length] = s.postfilter(objs.attr(s.attr));
                } else {
                  output.images[output.images.length] = objs.attr(s.attr);
                };
              }
          }  
        }
      }
      output.images=output.images.unique();
      output.youtube=output.youtube.unique();
      //console.log("\n");
      cb(output);
    }
  });

  return 'awesome';
};
