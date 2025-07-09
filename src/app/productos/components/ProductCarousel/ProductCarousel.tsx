/* eslint-disable @next/next/no-img-element */
'use client';
import clsx from 'clsx';
import styles from '../../styles.module.scss';

type Props = {
	images: string[];
	currentIndex: number;
	setCurrentIndex: (i: number) => void;
	discount?: number;
	name: string;
	disabled?: boolean;
};

export const ProductCarousel: React.FC<Props> = ({ images, currentIndex, setCurrentIndex, discount, name, disabled }) => {
	const showArrows = images.length > 1 && !disabled;

	return (
		<div className={styles['product-carousel']}>
			<div className={styles['carousel-content']}>
				{images.map((img, index) => (
					<div
						key={index}
						className={clsx(styles['carousel-slide'], { [styles.active]: index === currentIndex })}
						style={{
							transform: `translateX(${100 * (index - currentIndex)}%)`,
						}}
					>
						<img src={img} alt={`${name} ${index}`} className={styles['carousel-image']} />
						{discount && discount >= 10 && !disabled && <div className={styles['discount']}>-{discount}%</div>}
					</div>
				))}
			</div>

			{showArrows && (
				<>
					<button
						className={clsx(styles['carousel-button'], styles.prev, styles.small)}
						onClick={(e) => {
							e.preventDefault();
							setCurrentIndex(Math.max(0, currentIndex - 1));
						}}
						disabled={currentIndex === 0}
					>
						<span className={styles.arrow}>&#10094;</span>
					</button>
					<button
						className={clsx(styles['carousel-button'], styles.next, styles.small)}
						onClick={(e) => {
							e.preventDefault();
							setCurrentIndex(Math.min(images.length - 1, currentIndex + 1));
						}}
						disabled={currentIndex === images.length - 1}
					>
						<span className={styles.arrow}>&#10095;</span>
					</button>
				</>
			)}

			{showArrows && (
				<div className={clsx(styles['carousel-indicators'], styles.small)}>
					{images.map((_, index) => (
						<button
							key={index}
							className={clsx(styles['indicator'], { [styles.active]: index === currentIndex })}
							onClick={(e) => {
								e.preventDefault();
								setCurrentIndex(index);
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};
