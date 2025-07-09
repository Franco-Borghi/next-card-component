'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';
import { ProductCarousel, ProductInfo, TagLabels } from '..';
import { ProductItemData } from '../../types';
import styles from '../../styles.module.scss';

type Props = {
	item: ProductItemData;
};

export const ProductItem: FC<Props> = ({ item }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const originMap = {
		1: 'Outlet',
		2: 'Materiales reciclados',
		3: 'Reacondicionado',
		4: 'Restaurado',
		5: 'Showroom',
		6: 'Particular preloved',
		7: 'Feria',
	};

	const images = useMemo(() => {
		const imgs: string[] = [];

		try {
			const main = JSON.parse(item.Image_crop_items_showcase || '{}')?.list;
			if (main) imgs.push(main);

			const additional = JSON.parse(item.Additional_Images_crop_items_showcase || '{}') as { [key: string]: { list: string } };
			Object.values(additional).forEach((img) => {
				if (img?.list) imgs.push(img.list);
			});
		} catch (e) {
			console.warn('Error parsing images:', e);
		}

		return imgs;
	}, [item]);

	const discount = useMemo(() => {
		const p1 = item.Discount_items_showcase ?? item.Price_items_showcase;
		const p2 = item.Original_price_items_showcase ?? item.Price_items_showcase;
		return Math.round(100 - (p1 * 100) / p2);
	}, [item]);

	return (
		<div className={clsx(styles['product-item-wrapper'], { [styles['item-sold']]: item.Status_items_showcase !== 'available' })}>
			{item.Status_items_showcase === 'available' ? (
				<Link href={item.slug} className={styles['product-img-wrapper']}>
					<ProductCarousel images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} discount={discount} name={item.Name_items_showcase} />
				</Link>
			) : (
				<div className={styles['product-img-wrapper']}>
					<ProductCarousel images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} name={item.Name_items_showcase} disabled />
				</div>
			)}

			<TagLabels item={item} originMap={originMap} />

			{item.Status_items_showcase === 'available' ? (
				<Link href={item.slug} className={styles['product-info-wrapper']}>
					<ProductInfo item={item} originMap={originMap} discount={discount} />
				</Link>
			) : (
				<div className={styles['product-info-wrapper']}>
					<ProductInfo item={item} originMap={originMap} discount={discount} disabled />
				</div>
			)}
		</div>
	);
};
