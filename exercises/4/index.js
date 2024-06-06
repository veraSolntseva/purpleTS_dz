"use strict";
class CUser {
    constructor() {
        this.skills = [];
    }
    addSkill(skillOrSkils) {
        if (typeof skillOrSkils === 'string') {
            this.skills.push(skillOrSkils);
        }
        else {
            this.skills.push(...skillOrSkils);
        }
    }
}
const us = new CUser();
us.addSkill('foo');
us.addSkill(['roo', 'goo']);
console.log(us.skills);
function runUser(distance) {
    if (typeof distance === 'string') {
        return distance;
    }
    else {
        return distance * 2;
    }
}
runUser(5);
