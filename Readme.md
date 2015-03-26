# Freman
Simple and small **node/express** app for no fuss UI developers and fast prototyping.

- Node.js with Express.js
- Gulp
  - stylus using nib,
  - js that concatenates and minifies
- Livereload
- Handlebars and partials

## Steps to create

### Express

    $ npm install express --save
    $ express --hbs
    $ DEBUG=myapp ./bin/www

### Setup gulp, stylus, watchers etc

    $ npm init
    $ npm install gulp gulp-jshint gulp-stylus nib gulp-concat gulp-uglify gulp-rename gulp-express --save-dev
    $ touch gulpfile.js

See gulpfile.js

### Livereload

    $ npm install gulp-livereload connect-livereload --save-dev

See gulpfile.js for 'server' task addition. Had to change the port in node_modules for some reason.

#### Heroku

Simply add to git repository and deploy via Github on heroku.com

#### Handlebars/partials

Use [this code](https://gist.github.com/benw/3824204) to utilise the hbs that express installed already with the --hbs flag
