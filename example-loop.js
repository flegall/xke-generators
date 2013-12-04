// vim:ts=4:sts=4:sw=4:
function* loop() {
    for (var i = 0; i < 3; i++) {
        yield i;
    }
}

for (n of loop()) {
    console.log(n);
}
