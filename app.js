"use strict";
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
