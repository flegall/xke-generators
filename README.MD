Installation de node.js 0.11.x : 
====

* Si vous avez déjà Node : 
    * brew unlink node
    * brew install --devel node

* Si vous n'avez pas Node : 
    * brew install --devel node

* Pour revenir à la version stable de Node : 
    * brew switch node 0.10.22
    * brew switch node 0.11.9

* Pour lister les différentes versions installés de Node :
    * brew info node

* Comment lancer node 0.11.X pour utiliser les nouveautés ECMAScript 6
    * node --harmony


Generateurs JS : Howto : 
====
Boucles : 
----
    function* loop() {
        for (var i = 0; i < 3; i++) {
            yield i;
        }
    }
    
    for (n of loop()) {
        console.log(n);
    }
    
Appeler un générateur manuellement :
----
    function* generator() {
        var result = yield 'hello';
        yield result + '!'; 
    }

    var iterator = generator();
    console.log(iterator.next()); // prints { value: 'hello', done: false }
    console.log(iterator.next('world')); // prints { value: 'world !', done: false }
    console.log(iterator.next()); // prints { value: undefined, done: true }

Déléguer à un autre générateur : 
----
    function* generator() {
        yield* readFile();
    }
    function* readFile() {
        yield result;
    }

Lire un fichier de façon asynchrone avec suspend.js : 
----
    var suspend = require('suspend');

    suspend(function* (resume) {
        try {
            var data = yield fs.readFile(__filename, 'utf8', resume);
            console.log(data);
        } catch (err) {
            // handle error
        }
    })();

Effectuer une requête asynchrone avec des promesses : 
----
    var suspend = require('suspend');

    suspend(function* () {
        try {
            var user = yield db.users.findWithPromise({ username: 'jmar777' });
            console.log(user.favoriteColor);
        } catch (err) {
            // handle error
        }
    })();

Exercices
=====

1. Fibonacci : Réécrire la suite de Fibonacci pour utiliser un générateur : **exercice-1-fibonacci.js**
2. I/O asynchrones : Réécrire la lecture des fichiers pour utiliser des générateurs avec suspend.js : **exercice-2-io.js**

Liens
=====

* [Generators specification](http://wiki.ecmascript.org/doku.php?id=harmony:generators)
* [Suspend](https://github.com/jmar777/suspend)
* [Galaxy](https://github.com/bjouhier/galaxy)
* [Devsmash.com - what's the big deal with generators](http://devsmash.com/blog/whats-the-big-deal-with-generators)
* [Comparison of async/generators frameworks](http://spion.github.io/posts/analysis-generators-and-other-async-patterns-node.html)
