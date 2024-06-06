"use strict";
class Loger {
    printDate(date) {
        this.log(date.toString());
    }
}
class MyLoger extends Loger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate(new Date());
        this.log(message);
    }
}
new MyLoger().logWithDate('Hello world');
