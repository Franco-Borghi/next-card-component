import { mockProducts } from './constants';
import { ProductItem } from './components';
import styles from './styles.module.scss';

export default function Products() {
	return (
		<section className={styles.cardsWrapper}>
			{mockProducts.map((prod, i) => (
				<ProductItem key={i} item={prod} />
			))}
		</section>
	);
}
