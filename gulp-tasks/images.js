import gulp from 'gulp';
import path from 'path';
import config from '../_config/project-config.js';
import svgSprite from 'gulp-svg-sprite';
import imagemin  from 'gulp-imagemin';

const svgSpriteConfig = {
  svgSrc: config.src + config.images + 'svgs/*.svg',
  outDir: './',
  settings: {
    dest: '',
    mode: {
      css: {
        dest: config.src + config.styles + '_tools',
        sprite: path.join(process.cwd(), config.dest + config.images + 'sprite.svg'),
        render: {
          scss: {
            dest: '_tools.svg-sprite.scss',
            template: config.src + config.images + 'svg-sprite-sass.tpl'
          }
        },
        layout: 'packed',
        prefix: '.svgsprite--%s',
        dimensions: '__dimensions',
        bust: false
      }
    },
    shape: {
      spacing: {
        padding: 4,
        box: 'content'
      }
    },
    variables: {
      pxToEm : function () {
        return function(pixelValue, render) {
          pixelValue = parseFloat(render(pixelValue));
          return (pixelValue / config.basePixel) + 'em';
        };
      },
      pxToEmPosition : function () {
        return function(pixelValue, render) {
          pixelValue = parseFloat(render(pixelValue)) - 4;
          return (pixelValue / config.basePixel) + 'em';
        };
      }
    }
  }
};

export function svg() {
  return gulp.src(svgSpriteConfig.svgSrc)
    .pipe(svgSprite(svgSpriteConfig.settings)).on('error', function(error) { console.log(error); })
    .pipe(gulp.dest(svgSpriteConfig.outDir))
}

export function bitmap() {
  return gulp.src(config.src + config.images + 'bitmap/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(config.dest + config.images + 'bitmap/'));
}
