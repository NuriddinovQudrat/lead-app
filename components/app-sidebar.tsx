'use client';

import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import { ROUTER } from '@/constants/router';
import { sidebarMenuOptions } from '@/constants/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavUser } from './nav-user';

const data = {
    user: {
        name: 'Admin',
        avatar: '/icons/man.png',
    },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    const { toggleSidebar, isMobile } = useSidebar();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className='flex items-center h-14'>
                    <h2 className='text-3xl font-bold text-center'>alma</h2>
                </div>
                <SidebarMenu>
                    {sidebarMenuOptions.map(item => (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname.includes(item.url)}
                                onClick={() => (isMobile ? toggleSidebar() : null)}
                                className={cn(
                                    'text-lg',
                                    pathname.includes(item.url) && 'font-bold',
                                )}
                                size={'lg'}
                            >
                                <Link href={ROUTER.ADMIN + item.url}>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>{/* We create a SidebarGroup for each parent. */}</SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
