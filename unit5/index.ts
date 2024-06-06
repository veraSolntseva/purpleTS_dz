class UserCl {
    name: string;
    age: number;

    // реализация (публичные конструкторы) - overload (перегрузки)
    constructor();
    constructor(name: string);
    constructor(age: number);
    // имплементация - должна удовлетворять всем конструкторам реализации
    constructor(ageOrName?: string | number) {
        if (typeof ageOrName === 'string') {
            this.name = ageOrName;
        } else if (typeof ageOrName === 'number') {
            this.age = ageOrName;
        }
    }
}

const userClass = new UserCl('Vasya');
console.log(userClass);
userClass.name = 'Vova';
console.log(userClass);

class AdminCl {
    // role!: number; ! снимает ошибку strictPropertyInitialization - отсутствие конструктора с инициализацией
    role: number;
}

const adminClass = new AdminCl();
adminClass.role = 1;

const userClass2 = new UserCl();
const userClass3 = new UserCl(33);

enum PaymentSt {
    Holded,
    Processed,
    Reversed
}
class Payment {
    id: number;
    status: PaymentSt;
    createdAt: Date = new Date(); // по дефолту если нет в конструкторе, порядок заполнения полей: сначала по дефолту, потом из конструктора
    updatedAt: Date;

    constructor(id: number) {
        this.id = id;
        this.status = PaymentSt.Holded;
    }

    getPaymentLifeTime(): number {
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
    _login: string;
    password: string;

    // если l не указали тип, то он по умолчанию будет типа возвращаемого из get - они взаимозависимые
    // если нет set, а только get, то _login становится readonly
    // только синхронные - хорошо если есть еще сайдэффекты (попутные действия в присвоении или получении), для асинхронного лучше метод
    set login(l: string) {
        this._login = 'user-' + l;
    }

    get login() {
        return 'no_login';
    }

    // getLogin(l: string){
    //     this.login = 'user-' + l;
    // }
}

const userL = new UserLogin();
userL.login = 'login';
console.log(userL);
console.log(userL.login);

interface ILogger {
    log(...args): void;
    error(...args): void;
}

class Logger implements ILogger {
    log(...args: any[]): void {
        console.log(...args);
    }
    async error(...args: any[]): Promise<void> {
        console.error(...args);
    }

}

interface IPayable {
    pay(paymentId: number): void;
    price?: string;
}

interface IDeletable {
    delete(): void;
}

class UserPayable implements IPayable, IDeletable {
    delete(): void {
        throw new Error('Method not implemented.');
    }
    // можно расширить тип при имплементации
    pay(paymentId: number | string): void {
        ///
    }
    //price?: string | undefined; необязательное можно убрать

}

type statusPayment = 'new' | 'paid';

class PaymentNew {
    id: number;
    status: statusPayment = 'new';

    constructor(id: number) {
        this.id = id;
    }

    pay() {
        this.status = 'paid';
    }
}

class PersistentPayment extends PaymentNew {
    databaseId: number;
    payAt: Date;

    constructor() {
        const id = Math.random();
        super(id); // нужен при переопределении конструктора родителя, можно обратиться к this только после super
    }

    // override для безопасности, будет ругаться, если метод удалят у родителя
    override pay(date?: Date) {
        //this.status = 'paid';
        super.pay();
        if (date)
            this.payAt = date;
    }
}

new PersistentPayment();

// наследование не стоит применять пересекая область применения DDD - платежи не наследуются от пользователей и т.п.

class Vehicle {
    make: string;
    private damages: string[]; // недоступно внутри наследника
    private _model: string;
    protected run: number; // доступен внутри, не доступен извне, доступен внутри наследников 

    #price: number; // приватное свойство в js #=private

    set model(m: string) {
        this._model = m;
    }

    get model() {
        return this._model;
    }

    protected addDamage(damage: string) {
        this.damages.push(damage);
        this.run = 1;
        this.#price = 100;
    }

    isPriceEqual(v: Vehicle) {
        return this.#price === v.#price;
    }
}

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
    // static name: string = 'fff'; статическое поле name зарезервировано, переопределить нельзя, только не статическое можно добавить и присвоить
    private static db: any; // не доступен в конструкторе, полезен для получения из бд

    static async getUser(id: number): Promise<UserCl> {
        const dbConection = UserService.db; // к статичным обращаемся не через this
        return new UserCl(id);
    }

    create(): UserCl {
        const dbConection = UserService.db;
        return new UserCl('Kolya');
    }

    // вместо конструктора для статич. полей вызывается сразу при компиляции
    // нельзя ничего асинхронного вызвать
    static {
        UserService.db = 'WTF';
    }
}

const userStatic = UserService.getUser(1); // доступны только статические свойства и методы
const userNotStatic = new UserService().create(); // статические свойства и методы не доступны

// js: this - контекст текущего объекта

class PaymentThis {
    private date: Date = new Date();

    // this: PaymentThis можно не указывать, подсказка для тс, но тс не будет ругаться тогда если потерян контекст, при компиляции не будет ничего в параметрах
    //(usTh.paymentDt() без бинда при такой записи будет ругаться)
    getDate(this: PaymentThis) {
        return this.date;
    }

    // у стрелочных методов контекст не теряется, поэтому можно не биндить переменную
    getDateArrow = () => {
        return this.date;
    }
}
const pt = new PaymentThis();
const usTh = {
    id: 1,
    paymentDtArrow: pt.getDateArrow,
    paymentDt: pt.getDate.bind(pt) // прибиндили переменную, показали из какой именно переменной берем функцию
    // paymentDt: pt.getDate - undefined результат, т.к. потерян контекст this.date, внутри пользователя this - это пользователь, у которого нет никакого dste
}
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
    name: string;

    // для наследника возвращаться будет тип наследника, т.к. this будет по наследнику
    setName(name: string): this {
        this.name = name;
        return this;
    }

    // Type Guard для класса, что объект является инстансом класса, проверка исходный или наследник
    // если по структуре родитель и наследник полностью совпадают, то эта проверка ничего не даст, результат будет UserBuilder|AdminBuilder
    isAdmin(): this is AdminBuilder {
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder extends UserBuilder {
    roles: string[];
}

const resul = new UserBuilder().setName('Vasya');
const resul2 = new AdminBuilder().setName('Vasya');

let userManyTypes: UserBuilder | AdminBuilder = new UserBuilder();
const isA = userManyTypes.isAdmin();

// as C# можно только наследоваться
// плюс абстрактного класса от интерфейса: можно реализовать в абстр классе не абстрактный метод, который унаследуют все наследники, у интерфейса так нельзя
abstract class Controler {
    abstract handle(req: any): void;

    // не абстрактный метод
    handleWithLogs(req: any) {
        console.log('Start');
        this.handle(req); // точно будет у всех наследников
        console.log('End');
    }
}

class UserController extends Controler {
    handle(req: any): void {
        console.log(req);
    }
}

new UserController().handleWithLogs('gghghg');