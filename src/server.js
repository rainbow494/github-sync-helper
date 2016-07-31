var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express');
var app = express();
app.use(bodyParser);
app.use(morgan('combined'));

var exec = require('child_process').exec;
var path = require('path');

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.post('/payload', function(req, res) {
    var repositoryName = req.body.repository.name;
    execScript(getPullReporsitoryScriptPath(repositoryName));

    res.send('pulled code from repository: ' + repositoryName);
});

app.get('/pull/:reporsityName', function(req, res) {
    var repositoryName = req.req.repositoryName;
    execScript(getPullReporsitoryScriptPath(repositoryName));

    res.send('force pulled code from repository: ' + repositoryName);
});

function getPullReporsitoryScriptPath(type) {
    var scriptPath = '';
    switch (type) {
        case value:
            scriptPath = path.resolve('./sync-fiona-blog.bat');
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

app.listen(4041);