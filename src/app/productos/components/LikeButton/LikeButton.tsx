'use client';
import { useState } from 'react';
import { ProductItemData } from '../../types';
import styles from '../../styles.module.scss';

type Props = {
	item: ProductItemData;
	size?: number;
};

export const LikeButton: React.FC<Props> = ({ item, size = 30 }) => {
	const [fav, setFav] = useState(item.fav || false);

	return (
		<button
			className={styles['like-btn']}
			style={{ width: size, height: size }}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				setFav(!fav);
			}}
		>
			{fav ? '♥️' : '🤍'}
		</button>
	);
};
