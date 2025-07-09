'use client';
import { ReactNode } from 'react';
import tableSvg from '@public/Table.svg';
import bedSvg from '@public/Bed.svg';
import chairSvg from '@public/Chair.svg';
import vaultSvg from '@public/Vault.svg';
import chesterSvg from '@public/Chester.svg';
import clsx from 'clsx';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuIcon from '@mui/icons-material/Menu';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import styles from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

type Item = { label: string; icon: ReactNode };

export const Header = () => {
	const items: Item[] = [
		{ label: 'E-mail', icon: <EmailOutlinedIcon /> },
		{ label: 'Contacto', icon: <LocalPhoneRoundedIcon /> },
		{ label: 'Carrito', icon: <ShoppingCartOutlinedIcon /> },
		{ label: 'Identifícate', icon: <PersonOutlineOutlinedIcon /> },
	];

	const navItems = ['CATÁLOGO', 'MARCAS', 'MUEBLES', 'ILUMINACIÓN', 'DECORACIÓN', 'PROFESIONALES', 'SOBRE NOSOTROS'];

	const pathname = usePathname();
	const router = useRouter();

	return (
		<header className={styles.header}>
			<div className={styles.disclaimer}>
				<p className={styles.disclaimerText}>Muebles únicos, espacios sostenibles.</p>
			</div>

			<div className={styles.center}>
				<div className={styles.information}>
					<Link href={'/'} className={styles.logo} />

					<label className={styles.search}>
						<SearchRoundedIcon className={styles.icon} />
						<input className={styles.input} type='text' />
					</label>

					<button onClick={() => router.push('/crear')} className={clsx(styles.button, styles.primary)}>
						Vender
					</button>
					<button className={clsx(styles.button, styles.secondary)}>AlaskaPRO</button>

					<div className={styles.items}>
						{items.map((item) => (
							<div key={item.label} className={styles.item}>
								{item.icon}
								<p>{item.label}</p>
							</div>
						))}
					</div>

					<MenuIcon className={styles.menuIcon} />
				</div>

				<nav>
					<ul>
						{navItems.map((item) => (
							<li onClick={() => router.push('/productos')} key={item}>
								<p>{item}</p>
							</li>
						))}
					</ul>
				</nav>

				<div className={styles.promos}>
					<div className={clsx(styles.promoItem, styles.primary)}>
						<div className={styles.circle}>NEW</div>
						<p>NOVEDADES</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							-40% <span>o más</span>
						</div>
						<p>DESCUENTOS</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							<Image src={tableSvg} alt='table icon' />
						</div>
						<p>MESAS</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							<Image src={bedSvg} alt='bed icon' />
						</div>
						<p>DORMITORIO</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							<Image src={chairSvg} alt='chair icon' />
						</div>
						<p>SILLAS</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							<Image src={vaultSvg} alt='vault icon' />
						</div>
						<p>ALMACENAJE</p>
					</div>
					<div className={styles.promoItem}>
						<div className={styles.circle}>
							<Image src={chesterSvg} alt='chester icon' />
						</div>
						<p>SOFÁS</p>
					</div>
				</div>

				<div className={styles.breadScrum}>
					{['Inicio', ...pathname.split('/')]
						.filter((el) => el)
						.map((el) => (el.length > 1 ? el[0].toUpperCase() + el.slice(1) : el))
						.join(' / ')}
				</div>
			</div>
		</header>
	);
};
