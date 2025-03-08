'use client';

import { ROUTER } from '@/constants/router';
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
    const { hasAccess } = useUserStore(state => state);
    const router = useRouter();

    useEffect(() => {
        if (!hasAccess) {
            router.push(ROUTER.LOGIN);
        }
    }, [hasAccess, router]);

    return <div>ADMIN HOME PAGE</div>;
};

export default Page;
