import { ProductItemData } from '@types';
import { LikeButton } from '@components';
import styles from '../../styles.module.scss';
import clsx from 'clsx';

type Props = {
	item: ProductItemData;
	originMap: Record<string, string>;
};

export const TagLabels: React.FC<Props> = ({ item }) => {
	return (
		<div className={styles['label-wrapper']}>
			{item.Delivery_items_showcase === '1' && <div className={styles['delivery']}>Gratis</div>}
			{item.Status_items_showcase === 'sold' && <div className={clsx(styles.tag, styles.sold)}>Vendido</div>}
			{item.Status_items_showcase === 'donado' && <div className={clsx(styles.tag, styles.donated)}>Donado</div>}
			{item.Status_items_showcase === 'rented' && <div className={clsx(styles.tag, styles.rented)}>Alquilado</div>}

			<LikeButton item={item} />
		</div>
	);
};
