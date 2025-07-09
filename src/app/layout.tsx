import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@shared/components';
import styles from './layout.module.scss';
import './globals.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Alaska Circular, tu tienda de muebles preloved de calidad',
	description: 'ALASKA CIRCULAR es la tienda de muebles de segunda mano líder en Madrid, Barcelona, Valencia, Sevilla y muchas más ciudades.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Header />
				<main className={styles.main}>{children}</main>
			</body>
		</html>
	);
}
