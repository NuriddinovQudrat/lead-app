'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { sidebarMenuOptions } from '@/constants/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [pageTitle, setPageTitle] = useState<string>('');

    useEffect(() => {
        const l = pathname.split('/')[2];

        if (l) {
            let arr = sidebarMenuOptions.filter(item => item.url === `/${l}`);
            if (arr.length > 0) {
                setPageTitle(arr[0].title);
            }
        }
    }, [pathname]);

    return (
        <section className=''>
            <SidebarProvider
                style={
                    {
                        '--sidebar-width': '300px',
                    } as React.CSSProperties
                }
            >
                <AppSidebar />
                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4 fixed bg-background z-10 w-full'>
                        <SidebarTrigger className='-ml-1' />
                        <Separator orientation='vertical' className='mr-2 h-4' />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className='block'>
                                    <Link href={``}>Admin</Link>
                                </BreadcrumbItem>
                                {pageTitle && (
                                    <>
                                        <BreadcrumbSeparator className='block' />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <main className='p-4 pt-20'>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </section>
    );
}
