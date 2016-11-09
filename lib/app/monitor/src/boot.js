'use strict';

require('./main.scss');
require('font-awesome/scss/font-awesome.scss');



const $ = global.$ = global.jQuery = require('jquery');
const angular = require('angular');
const app = require('./app');
const EQ = require('css-element-queries/src/ElementQueries');



// Really the best approach?
app.run(($rootScope) =>	$rootScope.$watch(() => EQ.init()));



$(global.document).ready(() => {
	try {
		angular.bootstrap(global.document, [app.name]);
	} catch(e) {
		console.error(e.message);
	}
});

