module.exports = {
  plugins: [
    // require('postcss-easy-import')({prefix: '_'}), // keep this first
    require('autoprefixer')({ browsers: ['last 2 versions'], cascade: false }) // so imports are auto-prefixed too
  ]
}
