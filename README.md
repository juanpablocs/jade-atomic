# Jade Atomic Design
jade-atomic es una extension para jade que nos permite incluir de manera dinamica componentes bajo el concepto de diseño atomico.

## install
```
npm install --save-dev jade-atomic
```

##example for jade
```js
//module: home
// index from: ./home/index.jade
doctype html
html(lang="en")
  head
    //add molecule from: ./all/molecules/jade/head.jade
    +molecule all/head

  body
    //add organism from: ./home/organisms/jade/header.jade
    +organism header

    .main
      .sideleft
        //add organism from: ./home/organisms/jade/sideleft.jade
        +organism sideleft
    
      .content
        // add organism from: ./home/organisms/jade/posts.jade
        +organism posts
        //add molecule from: ./home/molecules/jade/comments.jade
        +molecule comments
    
    //add organism from: ./all/organisms/jade/footer.jade
    +organism all/footer
```
##usage for gulp
```js
var gulpJade = require('gulp-jade');
var jadeAtomic = require('jade-atomic');

gulp.task('jade-html',function(){
  return gulp.src('./home/*.jade')
    .pipe(gulpJade({
      jade:jadeAtomic({
        basePath:__dirname,
        fileStructure:'/[module]/[atomic]s/jade/[file].jade'
      }),
      pretty:true
    }))
    .pipe(gulp.dest('./public/')); 
});
```

##usage
```js
var jade = require('jade');
var jadeAtomic = require('jade-atomic');

//setting for jadeAtomic
jadeAtomic({
  jade:jade,
  basePath:__dirname,
  fileStructure:'/[module]/[atomic]s/jade/[file].jade'
});

//little example
var compiled = jade.compileFile(__dirname + '/home/index.jade');

console.log("it works!", compiled());
```
