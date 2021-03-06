var gulp       = require( 'gulp' ),
    compass    = require( 'gulp-compass' ),
    uglifyJS   = require( 'gulp-uglify' ),
    connect    = require( 'gulp-connect-php' ),
    browserify = require( 'browserify' ),
    babelify   = require( 'babelify' ),
    source     = require( 'vinyl-source-stream' );


function swallowError( error ) {
    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task( 'js', function() {
    return browserify({
            entries: './js/main.js',
            extensions: ['.js'],
            debug: true
        })
        .transform( babelify )
        .bundle()
        .pipe( source( 'main.js' ) )
        .pipe( gulp.dest( 'dist/js' ) );
});

gulp.task( 'compass' , function() {
  gulp.src( './sass/*.scss' )
    .pipe(compass({
      css: 'dist/css',
      sass: 'sass'
    }))
    .on( 'error', swallowError )
    .pipe( gulp.dest( 'dist/css' ) );
});

gulp.task( 'serve', function() {
    connect.server();
});

gulp.task( 'watch', function() {
    gulp.watch( 'sass/**/*.scss', [ 'compass' ] );
});

gulp.task( 'default', [ 'compass' ] );
