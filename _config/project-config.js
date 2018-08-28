module.exports = {
  basePixel: 16,
  src: './_client/',
  dest: './public/',
  views: './views/_partials/',
  images: 'images/',
  scripts: 'scripts/',
  styles: 'styles/',
  html: 'html/',
  fonts: 'fonts/',
  vendorScriptFileList: [
    './_client/scripts/src/*.js'
  ],
  mainScriptFileList: [
    './_client/scripts/vendor/*.js'
  ],
  stylesSrc: [
    './_client/styles/_settings/*.scss',
    './_client/styles/_tools/*.scss',
    './_client/styles/_generic/*.scss',
    './_client/styles/_elements/*.scss',
    './_client/styles/_objects/*.scss',
    './views/_partials/**/*.scss'
  ]
}
