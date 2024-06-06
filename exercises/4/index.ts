class CUser {
    skills: string[] = [];

    addSkill(newSkil: string): void;
    addSkill(newSkils: string[]): void;
    addSkill(skillOrSkils: string | string[]): void {
        if (typeof skillOrSkils === 'string') {
            this.skills.push(skillOrSkils);
        } else {
            this.skills.push(...skillOrSkils);
        }
    }
}

const us = new CUser();
us.addSkill('foo');
us.addSkill(['roo', 'goo']);
console.log(us.skills);

function runUser(distance: number): number;
function runUser(distance: string): string;
function runUser(distance: number | string): number | string {
    if (typeof distance === 'string') {
        return distance;
    } else {
        return distance * 2;
    }
}

runUser(5)