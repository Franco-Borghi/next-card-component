import { ProductItem } from './components';
import styles from './styles.module.scss';
import { ProductItemData } from './types';

async function fetchProducts(): Promise<ProductItemData[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error(`Error HTTP: ${res.status}`);
	}

	const data = await res.json();
	console.log(data);

	return data;
}
export default async function Products() {
	let products = [];
	products = await fetchProducts();

	return (
		<section className={styles.cardsWrapper}>
			{products.map((prod, i) => (
				<ProductItem key={i} item={prod} />
			))}
		</section>
	);
}
