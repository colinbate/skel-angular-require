'use strict';

exports.description = "Create an Angular Module, including Karma unit tests";
exports.notes = "";

exports.after = "You should now install project dependencies with _npm install_," +
    " followed by _grunt install_.  After that, you may start the environment with _grunt_.";

exports.warnOn = '*';

exports.template = function(grunt, init, done) {
    init.process({}, [
        init.prompt("name"),
        init.prompt("description"),
        init.prompt("version"),
        init.prompt("repo", 'bitbucket'),
        init.prompt("repo_type", 'mercurial'),
        init.prompt("homepage", 'bitbucket'),
        init.prompt("bugs", 'bitbucket'),
        init.prompt("author_name"),
        init.prompt("author_email")
    ], function(err, props) {

        props.keywords = [];

        if (props.repo === 'bitbucket' && init.defaults.username) {
            props.repo = 'https://bitbucket.org/' + init.defaults.username + '/' + props.name;
        }
        props.repository = {
            type: props.repo_type,
            url: props.repo
        };
        delete props['repo_type'];
        delete props['repo'];

        if (props.homepage === 'bitbucket' && init.defaults.username) {
            props.homepage = 'https://bitbucket.org/' + init.defaults.username + '/' + props.name;
        }
        if (props.bugs === 'bitbucket' && init.defaults.username) {
            props.bugs = 'https://bitbucket.org/' + init.defaults.username + '/' + props.name + '/issues';
        }

        props.sterileName = props.name.replace(/\W/g, '');

        props.devDependencies = {
            "grunt-angular-templates":"~0.4.1",
            "grunt-contrib-cssmin":"~0.6.2",
            "grunt-contrib-watch": "~0.5.3",
            "grunt-contrib-clean": "~0.5.0",
            "grunt-contrib-copy":"~0.4.1",
            "grunt-concurrent": "~0.3.1",
            "grunt-karma": "~0.6.2",
            "grunt-contrib-jshint": "~0.6.4",
            "grunt": "~0.4.1",
            "grunt-contrib-connect": "~0.5.0",
            "karma-coverage": "~0.1.0",
            "grunt-contrib-concat": "~0.3.0",
            "grunt-bump": "0.0.11",
            "grunt-bowercopy": "~0.7.1",
            "grunt-contrib-requirejs": "~0.4.1",
            "grunt-contrib-less": "~0.9.0"
        };

        var files = init.filesToCopy(props);

        init.copyAndProcess(files, props);
        init.writePackageJSON('package.json', props);

        done();
    });
};