abstract class Loger {
    abstract log(message: string): void;

    printDate(date: Date): void {
        this.log(date.toString());
    }
}

class MyLoger extends Loger {
    log(message: string): void {
        console.log(message);
    }

    logWithDate(message: string): void {
        this.printDate(new Date());
        this.log(message);
    }
}

new MyLoger().logWithDate('Hello world');
