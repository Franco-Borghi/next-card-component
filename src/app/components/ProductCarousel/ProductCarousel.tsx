/* eslint-disable @next/next/no-img-element */
'use client';
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
						className={`${styles['carousel-slide']} ${index === currentIndex ? styles['active'] : ''}`}
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
						className={styles['carousel-button prev small']}
						onClick={(e) => {
							e.preventDefault();
							setCurrentIndex(Math.max(0, currentIndex - 1));
						}}
						disabled={currentIndex === 0}
					>
						<span className={styles['arrow']}>&#10094;</span>
					</button>
					<button
						className={styles['carousel-button next small']}
						onClick={(e) => {
							e.preventDefault();
							setCurrentIndex(Math.min(images.length - 1, currentIndex + 1));
						}}
						disabled={currentIndex === images.length - 1}
					>
						<span className={styles['arrow']}>&#10095;</span>
					</button>
				</>
			)}

			{showArrows && (
				<div className={styles['carousel-indicators small']}>
					{images.map((_, index) => (
						<button
							key={index}
							className={`${styles['indicator']} ${index === currentIndex ? styles['active'] : ''}`}
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
