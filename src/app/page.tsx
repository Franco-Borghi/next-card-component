import { mockProducts } from '@constants';
import { ProductItem } from '@components';

export default function Home() {
	return (
		<main>
			{mockProducts.map((prod, i) => (
				<ProductItem key={i} item={prod} />
			))}
		</main>
	);
}
