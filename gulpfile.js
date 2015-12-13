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


const gulp = require('gulp');
const eslint = require('gulp-eslint');
const tape = require('gulp-tape');
const tapColorize = require('tap-colorize');
const nsp = require('gulp-nsp');


// Lint all our files using ESlint.
gulp.task('lint', () => {
  return gulp.src(['index.js', 'gulpfile.js', 'src/*.js', 'examples/*.js'])
    // Attaches the lint output to the eslint property of the file object,
    // so it can be used by other modules.
    .pipe(eslint())
    // Print to console.
    .pipe(eslint.format());
});


// Run the tests.
gulp.task('test', () => {
  return gulp.src('test/**/*.js')
    .pipe(tape({
      reporter: tapColorize(),
    }));
});


// To check for know vunerabilities in dependencies.
gulp.task('nsp', (cb) => {
  nsp({ package: __dirname + '/package.json' }, cb);
});


gulp.task('travis', gulp.series('nsp', 'test'));
