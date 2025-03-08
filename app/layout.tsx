import type { Metadata } from 'next';
import { Geist, Geist_Mono, Onest } from 'next/font/google';
import './globals.css';

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
            <body className={onest.className}>{children}</body>
        </html>
    );
}
