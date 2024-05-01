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