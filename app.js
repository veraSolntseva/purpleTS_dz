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
