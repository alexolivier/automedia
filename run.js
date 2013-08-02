'use strict';
var automedia = require('./lib/automedia.js');
var selectors = new Array();
selectors['wp'] = [
	{
		type:'youtube',
		name:'YouTube (iFrame)',
		code:'iframe[src^=\'http://www.youtube.com/embed\']',
		attr:'src',
		postfilter:function(url) {
			var u = url.split("?");
			var parts = u[0].split("/");
			var id = parts[parts.length-1];
			var thumb = "http://i1.ytimg.com/vi/"+id+"/maxresdefault.jpg";
			var o = {
				id:id,
				embed:u[0],
				thumb:thumb
			}
			return o;
		}
	},
	{
		type:'image',
		name:'Images (attachments)',
		code:'img[class^=\'attachment\'], img[class*=\' wp-image\']',
		attr:'src',
		postfilter:function(url) {
			var re = /\b\-\-?[0-9]+x[0-9]+\b/;
			var filename=url.replace(re,'');

			return filename;
		}
	}
];

var pages = [
	{
		url:'http://www.heyuguys.co.uk/lone-survivor-trailer-poster-images/',
		root:'.entry-content',
		type:'wp'
	},
	{
		url:'http://www.heyuguys.co.uk/thor-the-dark-world-poster-2/',
		root:'.entry-content',
		type:'wp'
	},
	{
		url:'http://www.heyuguys.co.uk/thor-the-dark-world-trailer/',
		root:'.entry-content',
		type:'wp'
	},
	{
		url:'http://itskindacool.com/2013/07/30/1439/that-puppet-game-show-trailer/',
		root:'section.article',
		type:'wp'
	}
];

for (var i = pages.length - 1; i >= 0; i--) {
	var p = pages[i];
	automedia.awesome(p.url,p.root,selectors[p.type],function(r) {
		console.log(r.youtube);
	});
};