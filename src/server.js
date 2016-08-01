var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express');
const timeout = require('connect-timeout');
const port = '<server.port>';

var app = express();
app.use(timeout('30s'));
app.use(haltOnTimedout);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

var exec = require('child_process').exec;
var path = require('path');

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.post('/payload', function(req, res) {
    var repositoryName = req.body.repository.name;
    execScript(getPullRepositoryScriptPath(repositoryName));

    res.send('pulled code from repository: ' + repositoryName);
});

app.get('/pull/:repositoryName', function(req, res) {
    var repositoryName = req.params.repositoryName;
    execScript(getPullRepositoryScriptPath(repositoryName));

    res.send('force pulled code from repository: ' + repositoryName);
});

app.listen(port, (error) => {
    if (error) {
        console.log('Server Start Up Error:' + error);
    } else {
        console.log(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});

app.use(function(err, req, res, next) { // jshint ignore:line
    res.send('Exprssjs Error Stack:' + err.stack);
});

process.on('uncaughtException', function(error) {
    console.log('server is broken by unhandle exception :' + error);
});






function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

function getPullRepositoryScriptPath(type) {
    var scriptPath = '';
    switch (type) {
        case 'fiona.link':
            scriptPath = path.resolve('<fiona_link_bat>');
            break;
        default:
            break;
    }

    return scriptPath;
}

function execScript(scriptFullPath) {
    var cmd = scriptFullPath;
    execCmd(cmd);
}

function gitPull() {
    var cmd = 'pull';
    var projectPath = path.resolve('f:/github/fiona.link-mirror');
    git(cmd, projectPath);
}

function git(cmd, projectPath) {
    cmd = "git " + cmd + " -v --progress origin";
    execCmd(cmd, projectPath);
}

function execCmd(cmd, projectPath) {
    var child = null;
    if (projectPath) {
        var execPath = path.relative(process.cwd(), projectPath);
        child = exec(cmd, { cwd: execPath });
    } else
        child = exec(cmd);

    child.stdout.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);

    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });
}