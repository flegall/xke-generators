// vim:ts=4:sts=4:sw=4:

// Exercice 1 : 
// Transformer la fonction fibonacci() en générateur afin de pouvoir l'appeler comme ceci : 
 for (n of fibonacci()) {
     console.log(n);        
 }

function* fibonacci() {
    var prev = 0;
    var curr = 1;
    for (;;) {
        var sum = prev + curr;
        // truncate the sequence at 1000
        if (sum > 1000) {
            return;
        }
        yield sum;
        prev = curr;
        curr = sum;
    }
}
