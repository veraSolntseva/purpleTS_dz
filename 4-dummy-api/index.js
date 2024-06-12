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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function isSuccessResponse(resp) {
    return typeof resp === 'object'
        && !!resp
        && 'status' in resp
        && 'data' in resp
        && resp.status === 200;
}
function isUsersArray(obj) {
    if (typeof obj === 'object'
        && !!obj
        && 'users' in obj
        && Array.isArray(obj.users)) {
        if (obj.users.length === 0) {
            return true;
        }
        const firstItem = obj.users[0];
        if (typeof firstItem === 'object'
            && !!firstItem
            && 'firstName' in firstItem
            && 'lastName' in firstItem
            && 'maidenName' in firstItem) {
            return true;
        }
    }
    return false;
}
function assertUsers(resp) {
    if (isSuccessResponse(resp)) {
        if (isUsersArray(resp.data)) {
            return;
        }
        throw new Error('В списке не пользователи');
    }
    throw new Error('Не список пользователей');
}
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://dummyjson.com/users');
        assertUsers(response);
        const usersInfo = response.data.users.map(user => `${user.firstName} ${user.lastName}${user.maidenName ? ' ' + user.maidenName : ''}`);
        console.log(`Count ${response.data.users.length}: ${usersInfo.join(', ')}`);
    }
    catch (error) {
        console.error(error);
    }
});
getUser();
