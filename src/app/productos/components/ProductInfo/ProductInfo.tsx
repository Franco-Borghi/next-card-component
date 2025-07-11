import clsx from 'clsx';
import { ProductItemData } from '../../types';
import styles from '../../styles.module.scss';

type Props = {
	item: ProductItemData;
	originMap: Record<string, string>;
	discount: number | null;
	disabled?: boolean;
};

export const ProductInfo: React.FC<Props> = ({ item, originMap, disabled }) => {
	const showNegotiable = item.Min_price_offeritems_showcase && item.Min_price_offeritems_showcase !== 0;

	return (
		<>
			<div className={styles['product-header']}>
				{item.Id_origin && item.Id_origin !== '0' && originMap[String(item.Id_origin)] && <div className={styles['outlet-badge']}>{originMap[String(item.Id_origin)]}</div>}
				<div className={styles['nuevo-badge']}>NUEVO</div>
			</div>

			<div className={styles['product-title-measure-price']}>
				<p className={clsx(styles['product-title'], styles['mb-0'])}>
					{item.Name_items_showcase}
					{item.user_type_id === '2' && item.fullname && <> {item.fullname}</>}
				</p>

				{(item.Height_items_showcase || item.Width_items_showcase || item.Length_items_showcase) && (
					<div className={styles['measures-container']}>
						{item.Height_items_showcase && (
							<>
								<p className={styles['measure']}>Alto: {item.Height_items_showcase}cm</p>
								<span className={styles['divider']}>|</span>
							</>
						)}
						{item.Width_items_showcase && (
							<>
								<p className={styles['measure']}>Ancho: {item.Width_items_showcase}cm</p>
								<span className={styles['divider']}>|</span>
							</>
						)}
						{item.Length_items_showcase && <p className={styles['measure']}>Fondo: {item.Length_items_showcase}cm</p>}
					</div>
				)}

				<div className={styles['product-info']}>
					<div className={styles['chip-price-wrapper']}>
						<div className={styles['price']}>
							<div className={styles['price-block']}>
								{disabled ? (
									<span className={clsx(styles['final-price'], styles['disabled'])}>{item.Price_items_showcase} €</span>
								) : !item.Original_price_items_showcase && !item.Discount_items_showcase ? (
									<span className={styles['final-price']}>{item.Price_items_showcase} €</span>
								) : (
									<>
										<p>
											<span className={styles['final-price']}>{item.Discount_items_showcase || item.Price_items_showcase} €</span>
											<span className={styles['old-price']}>{item.Original_price_items_showcase || item.Price_items_showcase} €</span>
										</p>
										{showNegotiable && <span className={styles['negotiable']}>Negociable</span>}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
