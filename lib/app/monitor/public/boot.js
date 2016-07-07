(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
'use strict';



var angular = require('angular');


var mod = module.exports = angular.module('app.directives.image-controls', []);



mod.directive('imageControls', function() {
	return {
		restrict: 'E',
		template: require('./template.pug'),
		replace: true,
		scope: {
			image: '='
		}
	}
});

},{"./template.pug":3,"angular":"angular"}],3:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"Ns5DbCka\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$event.stopPropagation(); $root.$cmd.exec('restart', { image: image.id })\" ng-if=\"image.isRunning\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-refresh\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$event.stopPropagation(); $root.$cmd.exec('start', { image: image.id })\" ng-if=\"!image.isRunning\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-play\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$event.stopPropagation(); $root.$cmd.exec('stop', { image: image.id })\" ng-if=\"image.isRunning\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-controls\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-stop\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],4:[function(require,module,exports){
'use strict';



var angular = require('angular');


var mod = module.exports = angular.module('app.directives.image-status', []);



mod.directive('imageStatus', function() {
	return {
		restrict: 'E',
		template: require('./template.pug'),
		replace: true,
		scope: {
			image: '='
		}
	}
});

},{"./template.pug":5,"angular":"angular"}],5:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-status\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa G4fEHzEw\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-status\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"G4fEHzEw-on fa fa-heart\" ng-if=\"image.isRunning\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Fimage-status\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"G4fEHzEw-off fa fa-heart-o\" ng-if=\"!image.isRunning\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],6:[function(require,module,exports){
'use strict';


var angular = require('angular');


var mod = module.exports = angular.module('app.directives.log-monitor', []);


mod.directive('logMonitor', function() {
	return {
		restrict: 'E',
		template: require('./template.jade'),
		replace: true,
		scope: {
			tags: '='
		},
		link: function(scope, el) {

		},
		controller: ["$scope", "$data", "$element", function($scope, $data, $element) {

			var $screen = $element.find('.screen');

			$scope.conf = {
				limit: 10
			};

			$scope.attach({
				logs: $data.collection('logs').changes
				.map(function(logs) {
					return logs.filter(function(log) {
						if($scope.tags) {
							return $every($scope.tags, log.tags);
						} else {
							return true;
						}
					})
				})
				.do(function() {
					setTimeout(function() {
						$screen[0].scrollTop = $screen[0].scrollHeight
					});
				})
			});

		}]
	}
});


mod.filter('logMonitorTags', function() {
	return function(tags, remove) {
		return tags.filter(function(tag) {
			return !$some(tag, ['#image', 'log', 'error'].concat(remove||[]))
		})
	}
});




function $every(needle, haystack ) {
	if (Array.isArray(needle)) {
		return needle.every(function(val) {
			return haystack.indexOf(val) !== -1;
		});
	} else {
		return haystack.indexOf(needle) !== -1
	}
}


function $some(needle, haystack ) {
	if (Array.isArray(needle)) {
		return needle.every(function(val) {
			return haystack.indexOf(val) !== -1;
		});
	} else {
		return haystack.indexOf(needle) !== -1
	}
}

},{"./template.jade":7,"angular":"angular"}],7:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cdiv class=\"d4Ijm7XD\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cselect ng-model=\"conf.limit\" ng-options=\"item as item for item in [10, 50, 100]\"\u003E\u003C\u002Fselect\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cdiv class=\"screen\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cdiv class=\"item\" ng-repeat=\"log in logs | limitTo:conf.limit:0-conf.limit\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cspan class=\"tags\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "[{{ (log.tags | logMonitorTags).join(', ') }}]\u003C\u002Fspan\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fdirectives\u002Flog-monitor\u002Ftemplate.jade";
pug_html = pug_html + "\u003Cspan class=\"msg\" ng-bind-html=\"log.data | ansi2html\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],8:[function(require,module,exports){
'use strict';


var angular = require('angular');
require('rx-angular');


var mod = module.exports = angular.module('app', [

	require('angular-ui-router'),
	require('angular-moment'),
	'rx',


	require('./modules/ansi').name,
	require('./modules/rx-ext').name,


	require('./services/socket').name,
	require('./services/data').name,
	require('./services/cmd').name,

	require('./directives/log-monitor').name,
	require('./directives/image-status').name,
	require('./directives/image-controls').name,

	require('./states').name,
]);

mod.value('config', {

});



mod.run(["socket", "$data", function(socket, $data) {

	var ddpRx = socket.channelObservable('ddp');
	var ddpTx = socket.channelObserver('ddp');

	ddpRx
	.subscribe(function(e) {
		if(e.type === 'collection') {
			$data.collection(e.name).push(e.id, e.model);
		}
	});

}]);



},{"./directives/image-controls":2,"./directives/image-status":4,"./directives/log-monitor":6,"./modules/ansi":9,"./modules/rx-ext":11,"./services/cmd":12,"./services/data":13,"./services/socket":14,"./states":23,"angular":"angular","angular-moment":"angular-moment","angular-ui-router":"angular-ui-router","rx-angular":"rx-angular"}],9:[function(require,module,exports){
'use strict';


var angular = require('angular');
var ansi2html = require('./lib/ansi2html');

var mod = module.exports = angular.module('ansi2html', []);

mod.value('ansi2html', ansi2html);


mod.filter('ansi2html', ["$sce", function($sce) {
	return function(input) {
		return $sce.trustAsHtml(ansi2html(input));
	}
}]);

},{"./lib/ansi2html":10,"angular":"angular"}],10:[function(require,module,exports){
function trimWhitespace(str) {
	return (str || '').toString().replace(/^\s+|\s+$/g, '');
}


function ansi2html(str) {
	str = trimWhitespace(str);

	var props = {},
		open = false

	var stylemap = {
		bold: "font-weight",
		underline: "text-decoration",
		color: "color",
		background: "background"
	}

	function style() {
		var key, val, style = []
		for (var key in props) {
			val = props[key]
			if (!val) continue
			if (val == true) {
				style.push(stylemap[key] + ':' + key)
			} else {
				style.push(stylemap[key] + ':' + val)
			}
		}
		return style.join(';')
	}


	function tag(code) {
		var i, tag = '',
			n = ansi2html.table[code]

		if (open) tag += '</span>'
		open = false

		if (n) {
			for (i in n) props[i] = n[i]
			tag += '<span style="' + style() + '">'
			open = true
		} else {
			props = {}
		}

		return tag
	}

	return str.replace(/\[(\d+;)?(\d+)*m/g, function(match, b1, b2) {
		var i, code, res = ''
		if (b2 == '' || b2 == null) b2 = '0'
		for (i = 1; i < arguments.length - 2; i++) {
			if (!arguments[i]) continue
			code = parseInt(arguments[i])
			res += tag(code)
		}
		return res
	}) + tag()
}

/* not implemented:
 *   italic
 *   blink
 *   invert
 *   strikethrough
 */
ansi2html.table = {
	0: null,
	1: {
		bold: true
	},
	3: {
		italic: true
	},
	4: {
		underline: true
	},
	5: {
		blink: true
	},
	6: {
		blink: true
	},
	7: {
		invert: true
	},
	9: {
		strikethrough: true
	},
	23: {
		italic: false
	},
	24: {
		underline: false
	},
	25: {
		blink: false
	},
	27: {
		invert: false
	},
	29: {
		strikethrough: false
	},
	30: {
		color: 'black'
	},
	31: {
		color: 'red'
	},
	32: {
		color: 'green'
	},
	33: {
		color: 'yellow'
	},
	34: {
		color: 'blue'
	},
	35: {
		color: 'magenta'
	},
	36: {
		color: 'cyan'
	},
	37: {
		color: 'white'
	},
	39: {
		color: null
	},
	40: {
		background: 'black'
	},
	41: {
		background: 'red'
	},
	42: {
		background: 'green'
	},
	43: {
		background: 'yellow'
	},
	44: {
		background: 'blue'
	},
	45: {
		background: 'magenta'
	},
	46: {
		background: 'cyan'
	},
	47: {
		background: 'white'
	},
	49: {
		background: null
	}
}



module.exports = ansi2html;

},{}],11:[function(require,module,exports){
'use strict';


var angular = require('angular');
require('rx-angular');


var mod = module.exports = angular.module('rx-angular-extensions', ['rx']);


mod.run(["$rootScope", "$parse", function($rootScope, $parse) {

	$rootScope.__proto__.autoDispose = function(sub) {
		this.$on('$destroy', function() {
			sub.dispose();
		});
		return this;
	};

	$rootScope.__proto__.attach = function(obj) {
		var $scope = this;

		angular.forEach(obj, function(val, key) {

			var setter = $parse(key).assign;

			var sub = val.safeApply($scope, function(result) {
				setter($scope, result);
			})
			.subscribe();

			$scope.autoDispose( sub );

		});
	};

}]);

},{"angular":"angular","rx-angular":"rx-angular"}],12:[function(require,module,exports){
'use strict';


var angular = require('angular');

var mod = module.exports = angular.module('app.cmd', []);


mod.service('$cmd', ["socket", function(socket) {

	this.exec = function(cmd, args) {
		socket.tx.onNext({
			channel: 'cmd',
			data: {
				cmd: cmd,
				args: args
			}
		});
	};

}]);

mod.run(["$cmd", "$rootScope", function($cmd, $rootScope) {
	$rootScope.$cmd = $cmd;
}]);


},{"angular":"angular"}],13:[function(require,module,exports){
'use strict';


var angular = require('angular');
require('rx-angular');

var mod = module.exports = angular.module('app.data', [
	'rx'
]);


mod.factory('$data', ["rx", function(rx) {

	var service = {};
	var collections = {};

	service.collection = function(name) {
		if(collections[name]) {
			return collections[name];
		} else {
			return collections[name] = new Collection();
		}
	};

	return service;




	function Collection() {

		var store = {};

		var observable = new rx.BehaviorSubject([]);

		function update() {
			var models = Object.keys(store).map(function(id) {
				return store[id];
			});
			observable.onNext(models);
		}

		this.push = function(id, data) {
			if(store[id]) {
				angular.extend(store[id], data);
			} else {
				store[id] = data;
			}
			update();
		};

		this.changes = observable;

	}


}]);




},{"angular":"angular","rx-angular":"rx-angular"}],14:[function(require,module,exports){
'use strict';

var angular = require('angular');
var SocketIo = require('socket.io-client');


var mod = module.exports = angular.module('socket', [
	'rx'
]);



mod.service('socket', ["rx", function(rx) {

	var socket = SocketIo();

	var onevent = socket.onevent;
	socket.onevent = function (packet) {
		var args = packet.data || [];
		onevent.call (this, packet);    // original call
		packet.data = ["*"].concat(args);
		onevent.call(this, packet);      // additional call to catch-all
	};

	var _rx = this.rx = new rx.Subject();
	var _tx = this.tx = new rx.Subject();

	socket.on('*',function(channel, data) {
		_rx.onNext({
			channel: channel,
			data: data
		})
	});


	_tx.subscribe(function(msg) {
		socket.emit(msg.channel, msg.data);
	});


	this.channelObservable = function(name) {
		return _rx.filter(function(e) {
			return e.channel = name;
		})
		.map(function(e) {
			return e.data;
		});
	};

	this.channelObserver = function(name) {
		return rx.Observer.create(function(data) {
			_tx.onNext({
				channel: name,
				data: data
			})
		});
	};

}]);

},{"angular":"angular","socket.io-client":"socket.io-client"}],15:[function(require,module,exports){
'use strict';

module.exports = {
	url: '/',
	template: require('./template.pug'),
	controller: ['$scope', '$data', function($scope, $data) {
		$scope.attach({
			images: $data.collection('images').changes
		})
	}]
};

},{"./template.pug":16}],16:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"R4rmOwgT\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "Images\u003C\u002Fh1\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctable\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "No\u003C\u002Ftd\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "Name\u003C\u002Ftd\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "Status\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctr ng-repeat=\"image in images\" ui-sref=\"^.images.image({ imageId: image.id })\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "{{ $index + 1 }}\u003C\u002Ftd\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.id }}\u003C\u002Ftd\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.status }}\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "Logs\u003C\u002Fh1\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.dashboard\u002Ftemplate.pug";
pug_html = pug_html + "\u003Clog-monitor logs=\"data.logs\"\u003E\u003C\u002Flog-monitor\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],17:[function(require,module,exports){
'use strict';

module.exports = {
	url: '/:imageId',
	template: require('./template.pug'),
	controller: ['$scope', '$state', '$data', 'rx', function($scope, $state, $data, rx) {

		var id = $state.params.imageId;

		var image = $data.collection('images')
		.changes.flatMap(function(items) {
			return rx.Observable.from(items);
		})
		.filter(function(model) {
			return model.id === id;
		});

		$scope.attach({
			image: image
		});

	}]
};

},{"./template.pug":18}],18:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"UyjZzIBR\" ng-if=\"image\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"details\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ch1 class=\"title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cimage-status image=\"image\"\u003E\u003C\u002Fimage-status\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.id }}\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctable class=\"table--config\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "Path\u003C\u002Ftd\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.absPath }}\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "Env\u003C\u002Ftd\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"env\" ng-repeat=\"env in image.config.environment\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "{{ env }}\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"controls\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cimage-controls image=\"image\"\u003E\u003C\u002Fimage-controls\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Csection class=\"logs\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images.image\u002Ftemplate.pug";
pug_html = pug_html + "\u003Clog-monitor tags=\"['#image', image.id]\"\u003E\u003C\u002Flog-monitor\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],19:[function(require,module,exports){
'use strict';

module.exports = {
	url: '/images',
	template: require('./template.pug'),
	controller: ['$scope', '$data', '$state', function($scope, $data, $state) {

		$scope.$watch(function() {
			$scope.showAside = $state.params.imageId || false;
		});

		$scope.showAside = $state.params.imageId || false;

		$scope.attach({
			images: $data.collection('images').changes
		});

	}]
};

},{"./template.pug":20}],20:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"Qepcd21K\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Caside ng-if=\"showAside\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli ng-repeat=\"image in images\" ui-sref=\".image({ imageId: image.id })\" ui-sref-active=\"active\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.id }}\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"status\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cimage-status image=\"image\"\u003E\u003C\u002Fimage-status\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Faside\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cmain class=\"ui-view\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"image-list\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli ng-repeat=\"image in images\" ui-sref=\".image({ imageId: image.id })\" ui-sref-active=\"active\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"title\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cimage-status image=\"image\"\u003E\u003C\u002Fimage-status\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.id }}\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"details\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "{{ image.absPath }}\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"controls\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp.images\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cimage-controls image=\"image\"\u003E\u003C\u002Fimage-controls\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],21:[function(require,module,exports){
'use strict';

module.exports = {
	abstract: true,
	url: '^',
	template: require('./template.pug')
};

},{"./template.pug":22}],22:[function(require,module,exports){
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"RCgWH2Vt\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cnav class=\"left\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ui-sref=\".dashboard\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-tachometer\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Dashboard\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ui-sref=\".images\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-sitemap\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Images\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cnav class=\"right\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$cmd.exec('reload')\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-refresh\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Reload\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$cmd.exec('stop', { image: 'all'})\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-stop\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Stop all\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn--default\" ng-click=\"$cmd.exec('start', { image: 'all'})\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cdiv class=\"fa fa-play\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Start all\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fli\u003E\u003C\u002Fnav\u003E\u003C\u002Fheader\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cmain class=\"ui-view\"\u003E\u003C\u002Fmain\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "Build with&nbsp;&nbsp;\u003C\u002Fspan\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan class=\"fa fa-heart\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Fplati\u002Fgithub\u002Fnode-compose\u002Flib\u002Fapp\u002Fmonitor\u002Fsrc\u002Fapp\u002Fstates\u002Fapp\u002Ftemplate.pug";
pug_html = pug_html + "by \u003Ca href=\"http:\u002F\u002Fplatdesign.de\"\u003Eplatdesign\u003C\u002Fa\u003E\u003C\u002Fspan\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;};;
module.exports = template();
},{"fs":1}],23:[function(require,module,exports){
'use strict';

var angular = require('angular');

var mod = module.exports = angular.module('app.states', []);


mod.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');


	$stateProvider
		.state('app', require('./app'))
		.state('app.dashboard', require('./app.dashboard'))
		.state('app.images', require('./app.images'))
		.state('app.images.image', require('./app.images.image'))

}]);

},{"./app":21,"./app.dashboard":15,"./app.images":19,"./app.images.image":17,"angular":"angular"}],24:[function(require,module,exports){
(function (global){
'use strict';

var $ = global.$ = global.jQuery = require('jquery');
var angular = require('angular');
var app = require('./app');

var EQ = require('css-element-queries/src/ElementQueries');

// Really the best approach?
app.run(["$rootScope", function($rootScope) {
	$rootScope.$watch(function() {
		EQ.init();
	});
}]);


$(document).ready(function() {
	try {
		angular.bootstrap($('html'), [app.name]);
	} catch(e) {
		console.error(e.message)
	}
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./app":8,"angular":"angular","css-element-queries/src/ElementQueries":"css-element-queries/src/ElementQueries","jquery":"jquery"}]},{},[24]);
