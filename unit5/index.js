"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Vehicle_price;
class UserCl {
    // имплементация - должна удовлетворять всем конструкторам реализации
    constructor(ageOrName) {
        if (typeof ageOrName === 'string') {
            this.name = ageOrName;
        }
        else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
    }
}
const userClass = new UserCl('Vasya');
console.log(userClass);
userClass.name = 'Vova';
console.log(userClass);
class AdminCl {
}
const adminClass = new AdminCl();
adminClass.role = 1;
const userClass2 = new UserCl();
const userClass3 = new UserCl(33);
var PaymentSt;
(function (PaymentSt) {
    PaymentSt[PaymentSt["Holded"] = 0] = "Holded";
    PaymentSt[PaymentSt["Processed"] = 1] = "Processed";
    PaymentSt[PaymentSt["Reversed"] = 2] = "Reversed";
})(PaymentSt || (PaymentSt = {}));
class Payment {
    constructor(id) {
        this.createdAt = new Date(); // по дефолту если нет в конструкторе, порядок заполнения полей: сначала по дефолту, потом из конструктора
        this.id = id;
        this.status = PaymentSt.Holded;
    }
    getPaymentLifeTime() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
        if (this.status === PaymentSt.Processed) {
            throw new Error('Платеж не может быть возвращен');
        }
        this.status = PaymentSt.Reversed;
        this.updatedAt = new Date();
    }
}
const payment = new Payment(1);
payment.unholdPayment();
console.log(payment);
const time = payment.getPaymentLifeTime();
console.log(time);
class UserLogin {
    // если l не указали тип, то он по умолчанию будет типа возвращаемого из get - они взаимозависимые
    // если нет set, а только get, то _login становится readonly
    // только синхронные - хорошо если есть еще сайдэффекты (попутные действия в присвоении или получении), для асинхронного лучше метод
    set login(l) {
        this._login = 'user-' + l;
    }
    get login() {
        return 'no_login';
    }
}
const userL = new UserLogin();
userL.login = 'login';
console.log(userL);
console.log(userL.login);
class Logger {
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error(...args);
        });
    }
}
class UserPayable {
    delete() {
        throw new Error('Method not implemented.');
    }
    // можно расширить тип при имплементации
    pay(paymentId) {
        ///
    }
}
class PaymentNew {
    constructor(id) {
        this.status = 'new';
        this.id = id;
    }
    pay() {
        this.status = 'paid';
    }
}
class PersistentPayment extends PaymentNew {
    constructor() {
        const id = Math.random();
        super(id); // нужен при переопределении конструктора родителя, можно обратиться к this только после super
    }
    // override для безопасности, будет ругаться, если метод удалят у родителя
    pay(date) {
        //this.status = 'paid';
        super.pay();
        if (date)
            this.payAt = date;
    }
}
new PersistentPayment();
// наследование не стоит применять пересекая область применения DDD - платежи не наследуются от пользователей и т.п.
class Vehicle {
    constructor() {
        _Vehicle_price.set(this, void 0); // приватное свойство в js #=private
    }
    set model(m) {
        this._model = m;
    }
    get model() {
        return this._model;
    }
    addDamage(damage) {
        this.damages.push(damage);
        this.run = 1;
        __classPrivateFieldSet(this, _Vehicle_price, 100, "f");
    }
    isPriceEqual(v) {
        return __classPrivateFieldGet(this, _Vehicle_price, "f") === __classPrivateFieldGet(v, _Vehicle_price, "f");
    }
}
_Vehicle_price = new WeakMap();
const veh = new Vehicle();
veh.model = 'fff';
class Truk extends Vehicle {
    setDamage() {
        this.addDamage('foo'); // у наследника приватные поля также не доступны
        this.run = 5;
    }
}
// статического класса нет в тс
class UserService {
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConection = UserService.db; // к статичным обращаемся не через this
            return new UserCl(id);
        });
    }
    create() {
        const dbConection = UserService.db;
        return new UserCl('Kolya');
    }
}
// вместо конструктора для статич. полей вызывается сразу при компиляции
// нельзя ничего асинхронного вызвать
(() => {
    UserService.db = 'WTF';
})();
const userStatic = UserService.getUser(1); // доступны только статические свойства и методы
const userNotStatic = new UserService().create(); // статические свойства и методы не доступны
// js: this - контекст текущего объекта
class PaymentThis {
    constructor() {
        this.date = new Date();
        // у стрелочных методов контекст не теряется, поэтому можно не биндить переменную
        this.getDateArrow = () => {
            return this.date;
        };
    }
    // this: PaymentThis можно не указывать, подсказка для тс, но тс не будет ругаться тогда если потерян контекст, при компиляции не будет ничего в параметрах
    //(usTh.paymentDt() без бинда при такой записи будет ругаться)
    getDate() {
        return this.date;
    }
}
const pt = new PaymentThis();
const usTh = {
    id: 1,
    paymentDtArrow: pt.getDateArrow,
    paymentDt: pt.getDate.bind(pt) // прибиндили переменную, показали из какой именно переменной берем функцию
    // paymentDt: pt.getDate - undefined результат, т.к. потерян контекст this.date, внутри пользователя this - это пользователь, у которого нет никакого dste
};
// console.log(pt.getDate());
// console.log(usTh.paymentDt());
// console.log(usTh.paymentDtArrow());
class PaymentChild extends PaymentThis {
    save() {
        return this.getDateArrow(); // унаследованный стрелочный метод доступен только через this
        // return super.getDateArrow(); // не работает т.к. через super нельзя обратиться к стрелочному методу
        // return super.getDate(); // работает т.к. getDate обычная функция
    }
}
class UserBuilder {
    // для наследника возвращаться будет тип наследника, т.к. this будет по наследнику
    setName(name) {
        this.name = name;
        return this;
    }
    // Type Guard для класса, что объект является инстансом класса, проверка исходный или наследник
    // если по структуре родитель и наследник полностью совпадают, то эта проверка ничего не даст, результат будет UserBuilder|AdminBuilder
    isAdmin() {
        return this instanceof AdminBuilder;
    }
}
class AdminBuilder extends UserBuilder {
}
const resul = new UserBuilder().setName('Vasya');
const resul2 = new AdminBuilder().setName('Vasya');
let userManyTypes = new UserBuilder();
const isA = userManyTypes.isAdmin();
// as C# можно только наследоваться
// плюс абстрактного класса от интерфейса: можно реализовать в абстр классе не абстрактный метод, который унаследуют все наследники, у интерфейса так нельзя
class Controler {
    // не абстрактный метод
    handleWithLogs(req) {
        console.log('Start');
        this.handle(req); // точно будет у всех наследников
        console.log('End');
    }
}
class UserController extends Controler {
    handle(req) {
        console.log(req);
    }
}
new UserController().handleWithLogs('gghghg');
