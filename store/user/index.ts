import { AuthTokenProps } from '@/types/auth';
import { clearUser, getUser, setUserToCookie } from '@/utils/user';
import { create } from 'zustand';

interface UserStoreProps {
    user: any;
    hasAccess: boolean;
    setUser: (user: AuthTokenProps) => void;
    setClearUser: () => void;
}

export const useUserStore = create<UserStoreProps>(set => ({
    user: getUser(),
    hasAccess: !!getUser()?.token,
    setUser: user => {
        setUserToCookie(user);
        set({ hasAccess: true, user: user });
    },
    setClearUser: () => {
        clearUser();
        set({ hasAccess: false, user: undefined });
    },
}));
