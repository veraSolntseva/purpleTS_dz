const skills: string[] = ['Dev', 'DevOps', 'Admin', 'Testing'];

for (const skill of skills) {
    console.log(skill.toLowerCase());
}

const res = skills
    .filter((s: string) => s !== 'DevOps')
    .map(s => s + '!')
    .reduce((a, b) => a + b);

console.log(res);


const skillsTyple: readonly [number, string] = [1, 'Dev'];

const id = skillsTyple[0];
const skillName = skillsTyple[1];
const [idSkill, nameSkill] = skillsTyple;

const arr: [number, string, ...boolean[]] = [1, 'sdf', true, false];

const fkiilsReadonlyGenetic: ReadonlyArray<string> = ['Dev', 'DevOps'];
const fkiilsReadonly: readonly string[] = ['Dev', 'DevOps'];

enum StatusCode {
    SUCCESS = 1,
    IN_PROCESS,
    FAILED
};

const result = {
    message: 'Done',
    satusCode: StatusCode.SUCCESS
};

const enum Roles {
    ADMIN = 1,
    USER = 2
}

const res2 = Roles.ADMIN;

function logId(id: string | number | boolean) {
    if (typeof id === 'string') {
        console.log(id.toLowerCase());
    } else if (typeof id === 'number') {
        console.log(id.toFixed(2));
    } else {
        console.log(id);
    }
}

function logErrors(err: string | string[]) {
    if (Array.isArray(err)) {
        console.log(err);
    } else {
        console.log(err);
    }
}

function logObject(obj: { a: number } | { b: number }) {
    if ('a' in obj) {
        console.log(obj.a);
    } else {
        console.log(obj.b);
    }
}

function logMultipleIds(a: string | number, b: string | boolean) {
    if (a === b) {
        // значит оба параметры равны по типу
        a.toLowerCase()
    } else {
        console.log(a);
    }
}

const a = 1;
let b: 1 = 1;

// литеральные типы
function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    return 1;
}

fetchWithAuth('ff', 'get');

let method = 'post'; // => несоответствие типов, привести к const

fetchWithAuth('ff', method as 'post'); // нужно быть уверенным при использовании каста

// aliases
type httpMethod = 'post' | 'get';
type coolString = string;

function fetchWithAuthHttp(url: coolString, method: httpMethod): 1 | -1 {
    return 1;
}
fetchWithAuthHttp('ff', 'post');

type TUser = {
    name: string,
    age: number,
    skils: string[]
}

type TRole = {
    id: number;
    name: string;
}

//type UserWithRole = TUser & Role => чтоб не терять поля name
type TUserWithRole = {
    user: TUser,
    role: TRole
}

let user: TUserWithRole = {
    user: {
        name: 'asd',
        age: 33,
        skils: ['1', '2'],
    },
    role: {
        id: 1,
        name: 'asd',

    }
}

// interfaces
interface User {
    name: string,
    age: number,
    skils: string[],

    log: (id: number) => string
}

interface Role {
    roleId: number
}

interface UserWithRole extends User, Role {
    createdAdd: Date
}

type User2 = {
    name: string,
    age: number,
    skils: string[],

    log: (id: number) => string
}

let currUser: UserWithRole = {
    name: 'asd',
    lastName: 'dfff',
    age: 33,
    skils: ['1', '2'],
    roleId: 1,
    createdAdd: new Date(),
    log(id) {
        return '';
    }
}

// dictionary!
interface UserDictionary {
    [index: number]: User
}

type UserDict2 = {
    [index: number]: User
}

type ud = Record<number, User>

// дополняет тип выше
interface User {
    lastName: string;
}

const user3: User = {
    name: 'ff',
    age: 2,
    skils: [],
    log(id) {
        return 'ff'
    },
    lastName: 'fffff'
}

const dictionary: ud = { 1: user3, 2: currUser };

type voidFunc = () => void;

const f1: voidFunc = () => {

}

const f2: voidFunc = () => {
    return true;
}
//!! res will be void, not boolean
const resF2 = f2();

const userSkils = {
    s: ['s']
}

// void для сопоставления типов

skills.forEach((skill) => userSkils.s.push(skill))


let input: unknown;
input = 3;
input = ['dff', 'dfdsaa']

// const fr: string = input; - ошибка т.к. unknown нельзя положить в другой тип (только в такой же или в any), any помещается в любой тип

function run(i: unknown) {
    if (typeof i === 'number') {
        i++;
    } else {
        i
    }
}

run(input);

//ts 4.4 err was any, turnd into unknown
async function getData() {
    try {
        await fetch('');
    } catch (err) {
        if (err instanceof Error)
            console.log(err.message)
    }
}

async function getDataForce() {
    try {
        await fetch('');
    } catch (err) {
        const e = err as Error; // опасно!!!
    }
}

type U1 = unknown | null; // unknown с любым типом будет unknown, union тип берет более широкий 
type I1 = unknown & string; // intersection тип берет более узкий, переменная будет string

// unknown использовать для входящих извне данных вместо any


function generateError(msg: string): never {
    throw new Error(msg);
}

const n: null = null;
const n1: any = null;
const n2: unknown = null;

const aT = 5;
const bT: string = a.toString();
let eT: string = new String(a).valueOf();
let dT: number = parseInt(bT);

// тип null - осознанное возвращение ничего, тогда как undefined может быть и ошибочным дефолтным возвращением

interface MyUser {
    name: string;
    email: string;
    login: string;
}

const vasya: MyUser = {
    name: 'Вася',
    email: 'vasilii@yandex.ru',
    login: 'vasyok'
}

interface Admin {
    name: string;
    role: number;
}

const admin: Admin = { // плохо, т.к. есть лишние поля по факту у админа из васи
    ...vasya,
    role: 1
}

// хорошая практика функция маппинга
function vasyaToAdmin(user: MyUser): Admin {
    return {
        name: user.name,
        role: 1
    }
}

// сужение типов, Type Guard (ограничение/сужение типа) - функция проверки типа

function logNewId(id: string | number) {
    if (isString(id)) {
        console.log(id);
    } else {
        console.log(id);
    }
}

// простой Type Guard, для простых типов смысла не имеет, т.к. проверить можно через typeof
function isString(x: string | number): x is string {
    return typeof x === 'string';
}

function isAdmin(user: MyUser | Admin): user is Admin {
    return 'role' in user; // проверка, что поле есть в объекте
}

function setRoleZero(user: MyUser | Admin) {
    if (isAdmin(user)) {
        user.role = 0;
    } else {
        throw new Error('Пользователь не админ');
    }
}

// Asserts - проверка, что это именно конкретный тип или ошибка!!! чтоб меньше if, используются в тестах

interface ShortUser {
    name: string;
}

const aOut = {};
assertUser(aOut);
aOut.name = 'Vasya';

// unknown т.к. объект приходит извне
function assertUser(obj: unknown): asserts obj is ShortUser {
    if (typeof obj === 'object' && !!obj && 'name' in obj) {
        return;
    }

    throw new Error('Не пользователь');
}