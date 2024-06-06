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
const skills = ['Dev', 'DevOps', 'Admin', 'Testing'];
for (const skill of skills) {
    console.log(skill.toLowerCase());
}
const res = skills
    .filter((s) => s !== 'DevOps')
    .map(s => s + '!')
    .reduce((a, b) => a + b);
console.log(res);
const skillsTyple = [1, 'Dev'];
const id = skillsTyple[0];
const skillName = skillsTyple[1];
const [idSkill, nameSkill] = skillsTyple;
const arr = [1, 'sdf', true, false];
const fkiilsReadonlyGenetic = ['Dev', 'DevOps'];
const fkiilsReadonly = ['Dev', 'DevOps'];
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
    StatusCode[StatusCode["IN_PROCESS"] = 2] = "IN_PROCESS";
    StatusCode[StatusCode["FAILED"] = 3] = "FAILED";
})(StatusCode || (StatusCode = {}));
;
const result = {
    message: 'Done',
    satusCode: StatusCode.SUCCESS
};
const res2 = 1 /* Roles.ADMIN */;
function logId(id) {
    if (typeof id === 'string') {
        console.log(id.toLowerCase());
    }
    else if (typeof id === 'number') {
        console.log(id.toFixed(2));
    }
    else {
        console.log(id);
    }
}
function logErrors(err) {
    if (Array.isArray(err)) {
        console.log(err);
    }
    else {
        console.log(err);
    }
}
function logObject(obj) {
    if ('a' in obj) {
        console.log(obj.a);
    }
    else {
        console.log(obj.b);
    }
}
function logMultipleIds(a, b) {
    if (a === b) {
        // значит оба параметры равны по типу
        a.toLowerCase();
    }
    else {
        console.log(a);
    }
}
const a = 1;
let b = 1;
// литеральные типы
function fetchWithAuth(url, method) {
    return 1;
}
fetchWithAuth('ff', 'get');
let method = 'post'; // => несоответствие типов, привести к const
fetchWithAuth('ff', method); // нужно быть уверенным при использовании каста
function fetchWithAuthHttp(url, method) {
    return 1;
}
fetchWithAuthHttp('ff', 'post');
let user = {
    user: {
        name: 'asd',
        age: 33,
        skils: ['1', '2'],
    },
    role: {
        id: 1,
        name: 'asd',
    }
};
let currUser = {
    name: 'asd',
    lastName: 'dfff',
    age: 33,
    skils: ['1', '2'],
    roleId: 1,
    createdAdd: new Date(),
    log(id) {
        return '';
    }
};
const user3 = {
    name: 'ff',
    age: 2,
    skils: [],
    log(id) {
        return 'ff';
    },
    lastName: 'fffff'
};
const dictionary = { 1: user3, 2: currUser };
const f1 = () => {
};
const f2 = () => {
    return true;
};
//!! res will be void, not boolean
const resF2 = f2();
const userSkils = {
    s: ['s']
};
// void для сопоставления типов
skills.forEach((skill) => userSkils.s.push(skill));
let input;
input = 3;
input = ['dff', 'dfdsaa'];
// const fr: string = input; - ошибка т.к. unknown нельзя положить в другой тип (только в такой же или в any), any помещается в любой тип
function run(i) {
    if (typeof i === 'number') {
        i++;
    }
    else {
        i;
    }
}
run(input);
//ts 4.4 err was any, turnd into unknown
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch('');
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
        }
    });
}
function getDataForce() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetch('');
        }
        catch (err) {
            const e = err; // опасно!!!
        }
    });
}
// unknown использовать для входящих извне данных вместо any
function generateError(msg) {
    throw new Error(msg);
}
const n = null;
const n1 = null;
const n2 = null;
const aT = 5;
const bT = a.toString();
let eT = new String(a).valueOf();
let dT = parseInt(bT);
const vasya = {
    name: 'Вася',
    email: 'vasilii@yandex.ru',
    login: 'vasyok'
};
const admin = Object.assign(Object.assign({}, vasya), { role: 1 });
// хорошая практика функция маппинга
function vasyaToAdmin(user) {
    return {
        name: user.name,
        role: 1
    };
}
// сужение типов, Type Guard (ограничение/сужение типа) - функция проверки типа
function logNewId(id) {
    if (isString(id)) {
        console.log(id);
    }
    else {
        console.log(id);
    }
}
// простой Type Guard, для простых типов смысла не имеет, т.к. проверить можно через typeof
function isString(x) {
    return typeof x === 'string';
}
function isAdmin(user) {
    return 'role' in user; // проверка, что поле есть в объекте
}
function setRoleZero(user) {
    if (isAdmin(user)) {
        user.role = 0;
    }
    else {
        throw new Error('Пользователь не админ');
    }
}
const aOut = {};
assertUser(aOut);
aOut.name = 'Vasya';
// unknown т.к. объект приходит извне
function assertUser(obj) {
    if (typeof obj === 'object' && !!obj && 'name' in obj) {
        return;
    }
    throw new Error('Не пользователь');
}
