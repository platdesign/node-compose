'use strict';


const gulp = require('gulp');
const path = require('path');

const knurly = require('knurly')(gulp);
const transpiler = knurly.transpiler;



transpiler.loadComponent( path.join(__dirname, 'lib', 'app', 'monitor') );



knurly.registerDefaultTasks();
