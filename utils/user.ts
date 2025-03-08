import Cookies from 'js-cookie';
import { AuthTokenProps } from '@/types/auth';

export const clearUser = () => {
    Cookies.remove('user');
};

export const setUserToCookie = (data: AuthTokenProps) => {
    const user = JSON.stringify(data);
    Cookies.set('user', user);
};

export const getUser = () => {
    const user: AuthTokenProps = JSON.parse(Cookies.get('user') || '{}');
    return user;
};
