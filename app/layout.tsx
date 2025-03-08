import NextTopLoaderProvider from '@/components/shared/next-top-loader';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import './globals.css';
import { Suspense } from '@/components/suspense';
import { ToastContainer } from 'react-toastify';
import { ContainerToastProps } from '@/configs/toast';

const onest = Onest({
    weight: ['200', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
    title: 'Lead App',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={onest.className}>
                <Suspense>
                    <NextTopLoaderProvider />
                    <ToastContainer {...ContainerToastProps} theme='light' />
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
