/*

Copyright Jesus Perez <jesusprubio gmail com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

'use strict';

var JS_SOURCES = ['Gruntfile.js', 'src/*.js', 'examples/*.js'];


module.exports = function (grunt) {

    // Load all Grunt tasks at once
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: JS_SOURCES,
            options: {
                jshintrc: true
            }
        },
        jscs: {
            src: JS_SOURCES,
            options: {
                config: '.jscsrc'
            }
        },

        retire: {
            js: JS_SOURCES,
            node: ['./'],
            options: {
                verbose: true,
                packageOnly: true,
                jsRepository: 'https://raw.github.com/bekk/retire.js/master/repository/jsrepository.json',
                nodeRepository: 'https://raw.github.com/bekk/retire.js/master/repository/npmrepository.json'
            }
        }
    });

    // Aliases
    grunt.task.registerTask('contribute', ['jshint', 'jscs']);

};
