// vim:ts=4:sts=4:sw=4:
var suspend = require('suspend');
var fs = require('fs');

// Exercice 2 : 
// Réécrire grepDir & grepFile en générateurs afin de pouvoir être appelés comme ceci : 
suspend(function* (resume) {
    var files = yield* grepDir('text', 'ngInclude', resume);
    files.forEach(function (file) {
        console.log(file + " matches.");
    });
})();

function* grepDir(path, text, resume) {
    var matchingFiles = [];

    var files = yield fs.readdir(path, resume);
    for (var i = 0; i < files.length; i++) {
        var fullname = path + '/' + files[i];

        var stat = yield fs.stat(fullname, resume);
        if (stat.isDirectory()) {
            matchingFiles = matchingFiles.concat(yield* grepDir(fullname, text, resume));
        } else {
            if (yield* matches(fullname, text, resume)) {
                matchingFiles.push(fullname);
            }
        }
    }

    return matchingFiles;
}

function* matches(path, text, resume) {
    var content = yield fs.readFile(path, 'utf8', resume);
    return content.match(text);
}
