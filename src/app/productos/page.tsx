'use client';
import { ProductItem } from './components';
import { ProductItemData } from './types';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

export default function Products() {
	const [products, setProducts] = useState<ProductItemData[]>([]);

	async function fetchProducts() {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			throw new Error(`Error HTTP: ${res.status}`);
		}

		const data = await res.json();

		if (Array.isArray(data)) {
			setProducts(data);
		}
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<section className={styles.cardsWrapper}>
			{products.map((prod, i) => (
				<ProductItem key={i} item={prod} />
			))}
		</section>
	);
}
