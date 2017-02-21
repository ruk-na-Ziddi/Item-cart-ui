module.exports = function(grunt) {

//%trifacta_url% etc are place holders which will be replaced while deploying
  grunt.initConfig({
    shell: {
      webpackBuild: {
        command: './node_modules/.bin/webpack -p --progress --colors --base'
      },
      webpackDevServer: {
				command: './node_modules/.bin/webpack-dev-server --hot --progress --colors --base'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['shell:webpackBuild'])
  grunt.registerTask('run', ['shell:webpackDevServer'])
}
