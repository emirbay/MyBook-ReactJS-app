import axios from 'axios';
import {
    USER_LOGIN
} from '../types';

/*****************USER********************/

export function loginUser({email,password}) {

    const request = axios.post('/api/users/login', {email,password})
    .then(response => response.data)

    return {
        type: USER_LOGIN,
        payload: request
    }

}

