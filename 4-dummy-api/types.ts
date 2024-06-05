export type TResponseData = {
    users: IUser[];
}

const enum GENDER {
    FEMALE = 'female',
    MALE = 'male'
}

const enum BLOODGROUP {
    OPositive = 'O+',
    ONegative = 'O-',
    APositive = 'A+',
    ANegative = 'A-',
    BPositive = 'B+',
    BNegative = 'B-',
    ABPositive = 'AB+',
    ABNegative = 'AB-',
}

const enum HAIRTYPE {
    Curly = 'Curly',
    Straight = 'Straight',
    Wavy = 'Wavy',
    Kinky = 'Kinky',
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: GENDER;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: BLOODGROUP;
    height: number;
    weight: number;
    eyeColor: string;
    ip: string;
    macAddress: string;
    university: string;
    ein: string;
    ssn: string;
    userAgent: string;
    role: string;
    hair: Hair;
    address: Address;
    bank: Bank;
    company: Company;
    crypto: Crypto;
}

interface Hair {
    color: string;
    type: HAIRTYPE;
}

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
    coordinates: Coordinates;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
}

interface Crypto {
    coin: string;
    wallet: string;
    network: string;
}