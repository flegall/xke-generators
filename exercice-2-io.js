// vim:ts=4:sts=4:sw=4:
var suspend = require('suspend');
var fs = require('graceful-fs');

// Exercice 2 : 
// Réécrire grepDir & grepFile en générateurs afin de pouvoir être appelés comme ceci : 
//
// suspend(function* (resume) {
//     var files = yield* grepDir('text', 'ngInclude', resume);
//     files.forEach(function (file) {
//         console.log(file + " matches.");
//     });
// })();
// 
// function* grepDir(path, text, resume) {....}
// function* fileMatches(path, text, resume) {....}

grepDir('text', 'ngInclude');

function grepDir(path, text) {
    fs.readdir(path, function(err, files) {
        files.forEach(function (file) {
            var fullname = path + '/' + file;
            fs.stat(fullname, function(err, stat) {
                if (stat.isDirectory()) {
                    grepDir(fullname, text);
                } else {
                    grepFile(fullname, text);
                }
            });
        });
    });
}

function grepFile(path, text) {
    fs.readFile(path, 'utf8', function(err, content) {
        if (content.match(text)) {
            console.log(path + " matches.");
        }
    }); 
}
