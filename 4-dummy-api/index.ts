import axios, { AxiosResponse } from 'axios';
import type { TResponseData, TUsersGetFunc } from './types';

function isSuccessResponse(resp: AxiosResponse<any>): resp is AxiosResponse<any> {
    return typeof resp === 'object'
        && !!resp
        && 'status' in resp
        && 'data' in resp
        && resp.status === 200;
}

function isUsersArray(obj: any): obj is TResponseData {
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

function assertUsers(resp: AxiosResponse<any>): asserts resp is AxiosResponse<TResponseData> {
    if (isSuccessResponse(resp)) {
        if (isUsersArray(resp.data)) {
            return;
        }

        throw new Error('В списке не пользователи');
    }

    throw new Error('Не список пользователей');
}

const getUser: TUsersGetFunc = async () => {
    try {
        const response: AxiosResponse<any> = await axios.get('https://dummyjson.com/users');
        assertUsers(response);

        const usersInfo: string[] = response.data.users.map(user => `${user.firstName} ${user.lastName}${user.maidenName ? ' ' + user.maidenName : ''}`);
        console.log(`Count ${response.data.users.length}: ${usersInfo.join(', ')}`);
    } catch (error) {
        console.error(error);
    }
}

getUser();
