module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                //grep: '*-test',
                ui: 'bdd',
                reporter: 'dot'
            },

            all: { src: 'test/**/*-test.js' }
        }
    });
    
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['simplemocha']);
};