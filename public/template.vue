<template>
	<div class="test-container">
		<div class="product-item-wrapper" :class="{ 'item-sold': item.Status_items_showcase !== 'available' }">
			<!-- SOLO imagen clickeable -->
			<NuxtLink :to="item.slug" v-if="item.Status_items_showcase === 'available'" class="product-img-wrapper">
				<div class="product-carousel" v-if="getGalleryImages(item).length > 1">
					<div class="carousel-content">
						<div v-for="(img, index) in getGalleryImages(item)" :key="index" class="carousel-slide" :class="{ active: productCurrentIndices[item.Id_items_showcase] === index }" :style="{ transform: `translateX(${100 * (index - productCurrentIndices[item.Id_items_showcase])}%)` }">
							<img :src="img" :alt="`${item.Name_items_showcase} ${index}`" class="carousel-image" />
							<div v-if="item.Status_items_showcase == 'available' && (item.Discount_items_showcase || item.Original_price_items_showcase) && discount >= 10" class="discount">-{{ discount }}%</div>
						</div>
					</div>

					<button class="carousel-button prev small" @click.stop.prevent="prevProductSlide($event, item.Id_items_showcase)" :disabled="productCurrentIndices[item.Id_items_showcase] === 0">
						<span class="arrow">&#10094;</span>
					</button>

					<button class="carousel-button next small" @click.stop.prevent="nextProductSlide($event, item.Id_items_showcase)" :disabled="productCurrentIndices[item.Id_items_showcase] === getGalleryImages(item).length - 1">
						<span class="arrow">&#10095;</span>
					</button>

					<div class="carousel-indicators small">
						<button v-for="(_, index) in getGalleryImages(item)" :key="index" class="indicator" :class="{ active: productCurrentIndices[item.Id_items_showcase] === index }" @click.stop.prevent="goToProductSlide(item.Id_items_showcase, index)"></button>
					</div>
				</div>

				<!-- En caso de que haya solo 1 imagen -->
				<div class="product-carousel" v-else>
					<img :src="getGalleryImages(item)[0]" :alt="item.Name_items_showcase" class="carousel-image" />
				</div>
			</NuxtLink>

			<!-- Si está deshabilitado (vendido, alquilado, etc.) imagen sin link -->
			<div class="product-img-wrapper" v-else>
				<div class="product-carousel" v-if="getGalleryImages(item).length > 1">
					<div class="carousel-content">
						<div v-for="(img, index) in getGalleryImages(item)" :key="index" class="carousel-slide" :class="{ active: productCurrentIndices[item.Id_items_showcase] === index }" :style="{ transform: `translateX(${100 * (index - productCurrentIndices[item.Id_items_showcase])}%)` }">
							<img :src="img" :alt="`${item.Name_items_showcase} ${index}`" class="carousel-image" />
						</div>
					</div>
				</div>
				<div class="product-carousel" v-else>
					<img :src="getGalleryImages(item)[0]" :alt="item.Name_items_showcase" class="carousel-image" />
				</div>
			</div>

			<div class="label-wrapper">
				<!-- Etiquetas -->
				<div v-if="item.Delivery_items_showcase === '1'" class="delivery">Gratis</div>
				<!-- <div v-if="setIsNew(item.Date_insertion_items_showcase)" class="new">Nuevo</div> -->
				<div v-if="item.Status_items_showcase === 'sold'" class="tag sold">Vendido</div>
				<div v-if="item.Status_items_showcase === 'donado'" class="tag donated">Donado</div>
				<div v-if="item.Status_items_showcase === 'rented'" class="tag rented">Alquilado</div>
				<LikeButton
					class="like-btn"
					:item="item"
					:size="30"
					@update="
						(ev) =>
							updateShowcase({
								idShowcase: item.Id_showcase,
								item,
								idProduct: item.Id_items_showcase,
								fav: ev,
							})
					"
				/>
			</div>

			<!-- SOLO esta parte también debe ser clickeable -->
			<NuxtLink :to="item.slug" v-if="item.Status_items_showcase === 'available'" class="product-info-wrapper">
				<div class="product-header">
					<div class="outlet-badge" v-if="item.Id_origin && item.Id_origin !== '0' && originMap[String(item.Id_origin)]">
						{{ originMap[String(item.Id_origin)] }}
					</div>

					<div class="nuevo-badge">NUEVO</div>
				</div>

				<div class="product-title-measure-price">
					<p class="product-title mb-0">
						{{ item.Name_items_showcase }}
						<span v-if="item.user_type_id == '2' && item.fullname"> {{ item.fullname }}</span>
					</p>

					<!-- Medidas -->
					<div class="measures-container" v-if="item.Height_items_showcase || item.Width_items_showcase || item.Length_items_showcase">
						<template v-if="item.Height_items_showcase">
							<p class="measure">Alto: {{ item.Height_items_showcase }}cm</p>
							<span class="divider">|</span>
						</template>
						<template v-if="item.Width_items_showcase">
							<p class="measure">Ancho: {{ item.Width_items_showcase }}cm</p>
							<span class="divider">|</span>
						</template>
						<template v-if="item.Length_items_showcase">
							<p class="measure">Fondo: {{ item.Length_items_showcase }}cm</p>
						</template>
					</div>

					<div class="product-info" :class="{ home: home }">
						<div class="chip-price-wrapper">
							<p class="price" v-if="item.Status_items_showcase !== 'rented'">
								<template v-if="item.Status_items_showcase != 'available'">
									<div class="price-block">
										<span class="final-price disabled">
											{{ item.Price_items_showcase | currency }}
										</span>
									</div>
								</template>

								<template v-else-if="!item.Original_price_items_showcase && !item.Discount_items_showcase">
									<div class="price-block">
										<span class="final-price">
											{{ item.Price_items_showcase | currency }}
										</span>
									</div>
								</template>

								<template v-else>
									<div class="price-block">
										<p>
											<span class="final-price">
												{{ item.Discount_items_showcase || item.Price_items_showcase | currency }}
											</span>
											<span class="old-price">
												{{ item.Original_price_items_showcase || item.Price_items_showcase | currency }}
											</span>
										</p>
										<span v-if="item.Min_price_offeritems_showcase && item.Min_price_offeritems_showcase != 0 && $route.name !== 'prolove'" class="negotiable"> Negociable </span>
									</div>
								</template>
							</p>
						</div>
					</div>
				</div>
			</NuxtLink>

			<!-- Si NO está disponible -->
			<div v-else class="product-info-wrapper">
				<div class="product-header">
					<div class="outlet-badge" v-if="item.Id_origin && item.Id_origin !== '0' && originMap[String(item.Id_origin)]">
						<span>{{ originMap[String(item.Id_origin)] }}</span>
					</div>
					<div class="nuevo-badge">NUEVO</div>
				</div>

				<p class="product-title mb-0">
					{{ item.Name_items_showcase }}
					<span v-if="item.user_type_id == '2' && item.fullname">{{ item.fullname }}</span>
				</p>

				<div class="measures-container" v-if="item.Height_items_showcase || item.Width_items_showcase || item.Length_items_showcase">
					<template v-if="item.Height_items_showcase">
						<p class="measure">Alto: {{ item.Height_items_showcase }}cm</p>
						<span class="divider">|</span>
					</template>
					<template v-if="item.Width_items_showcase">
						<p class="measure">Ancho: {{ item.Width_items_showcase }}cm</p>
						<span class="divider">|</span>
					</template>
					<template v-if="item.Length_items_showcase">
						<p class="measure">Fondo: {{ item.Length_items_showcase }}cm</p>
					</template>
				</div>

				<div class="product-info" :class="{ home: home }">
					<div class="chip-price-wrapper">
						<p class="price" v-if="item.Status_items_showcase !== 'rented'">
							<template v-if="item.Status_items_showcase != 'available'">
								<div class="price-block">
									<span class="final-price disabled">
										{{ item.Price_items_showcase | currency }}
									</span>
								</div>
							</template>

							<template v-else-if="!item.Original_price_items_showcase && !item.Discount_items_showcase">
								<div class="price-block">
									<span class="final-price">
										{{ item.Price_items_showcase | currency }}
									</span>
								</div>
							</template>

							<template v-else>
								<div class="price-block">
									<span class="final-price">
										{{ item.Discount_items_showcase || item.Price_items_showcase | currency }}
									</span>
									<span class="old-price">
										{{ item.Original_price_items_showcase || item.Price_items_showcase | currency }}
									</span>

									<span v-if="item.Min_price_offeritems_showcase && item.Min_price_offeritems_showcase != 0 && $route.name !== 'prolove'" class="negotiable"> Negociable </span>
								</div>
							</template>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import LikeButton from '~/components/LikeButton.vue';

export default {
	components: {
		LikeButton,
	},
	data() {
		return {
			disabled: false,
			productCurrentIndices: {},
			home: false,
			originMap: {
				1: 'Outlet',
				2: 'Materiales reciclados',
				3: 'Reacondicionado',
				4: 'Restaurado',
				5: 'Showroom',
				6: 'Particular preloved',
				7: 'Feria',
			},
			// Mock data for testing
			item: {
				Id_items_showcase: 1,
				Id_showcase: 1,
				Name_items_showcase: 'Silla Vintage de Madera',
				Status_items_showcase: 'available',
				Price_items_showcase: 150,
				Original_price_items_showcase: 200,
				Discount_items_showcase: 150,
				Min_price_offeritems_showcase: 120,
				Delivery_items_showcase: '1',
				Height_items_showcase: 85,
				Width_items_showcase: 45,
				Length_items_showcase: 50,
				Id_origin: '1',
				user_type_id: '2',
				fullname: 'María García',
				Images_items_showcase: 'https://storage.googleapis.com/cloudframework.io/documents/files/alaskadeco/alaskadeco_uploads/alaskadeco_documents/20240909101309_upload66f517959acef29ee1a2a295a6222aae1a19156fde37b.png',
				Image_crop_items_showcase: JSON.stringify({
					list: 'https://storage.googleapis.com/cloudframework.io/documents/files/alaskadeco/alaskadeco_uploads/alaskadeco_documents/item_showcase/20240909101309_upload66f517959acef29ee1a2a295a6222aae1a19156fde37b_resize_720x460.png',
				}),
				Additional_Images_crop_items_showcase: JSON.stringify({
					img1: { list: 'https://storage.googleapis.com/cloudframework.io/documents/files/alaskadeco/alaskadeco_uploads/alaskadeco_documents/item_showcase/20240910091110_upload66f5090e859f2586f02fe628a2d4e0a2ab2e2de0c5697_resize_720x460.png' },
					img2: { list: 'https://storage.googleapis.com/cloudframework.io/documents/files/alaskadeco/alaskadeco_uploads/alaskadeco_documents/item_showcase/20240903095703_upload66f513cf8e9e108240d4d7a7d8980a2628eb1deb92e75_resize_720x460.png' },
				}),
				slug: '/producto/test',
				fav: false,
			},
		};
	},
	methods: {
		getProductImageUrl(payload) {
			if (!payload.item || !payload.item.Images_items_showcase) return null;
			if (!payload.item.Image_crop_items_showcase || payload.size === 'original') return payload.item.Images_items_showcase;
			let crops = JSON.parse(payload.item.Image_crop_items_showcase);
			return crops[payload.size] ? crops[payload.size] : payload.item.Images_items_showcase;
		},

		updateShowcase(val) {
			this.$set(val.item, 'fav', val.fav);
		},

		setIsNew(date) {
			date = new Date(date);
			const currentDate = new Date();
			currentDate.setUTCDate(currentDate.getUTCDate() - 7);
			return date >= currentDate;
		},

		getGalleryImages(item) {
			// Asegura que haya índice inicial para este producto
			if (this.productCurrentIndices[item.Id_items_showcase] === undefined) {
				this.$set(this.productCurrentIndices, item.Id_items_showcase, 0);
			}

			const images = [];
			const main = this.getProductImageUrl({ item, size: 'list' });
			if (main) images.push(main);

			if (item.Additional_Images_crop_items_showcase) {
				try {
					const additional = JSON.parse(item.Additional_Images_crop_items_showcase);
					Object.values(additional).forEach((imgObj) => {
						if (imgObj.list) images.push(imgObj.list);
					});
				} catch (e) {
					console.warn('Error en imágenes adicionales', e);
				}
			}

			return images;
		},

		prevProductSlide(event, id) {
			event.preventDefault();
			event.stopPropagation();

			if (!this.productCurrentIndices[id]) this.$set(this.productCurrentIndices, id, 0);
			if (this.productCurrentIndices[id] > 0) this.productCurrentIndices[id]--;
		},

		nextProductSlide(event, id) {
			event.preventDefault();
			event.stopPropagation();

			const max = this.getGalleryImages(this.item).length - 1;
			if (!this.productCurrentIndices[id]) this.$set(this.productCurrentIndices, id, 0);
			if (this.productCurrentIndices[id] < max) this.productCurrentIndices[id]++;
		},

		goToProductSlide(id, index) {
			this.$set(this.productCurrentIndices, id, index);
		},
	},
	computed: {
		...mapState(['isDesktop']),
		timeLeft() {
			if (!this.item || !this.item.Date_expired_showcase) return '';
			var today = new Date();
			var expDate = new Date(this.item.Date_expired_showcase);
			let timeLeft = expDate - today;

			let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

			if (days > 0) return `${days} días`;
			if (hours > 0) return `${hours} horas`;
			if (mins > 0) return `${mins} minutos`;
			if (seconds > 0) return `${seconds} segundos`;
			return '';
		},
		discount() {
			if (!this.item.Original_price_items_showcase && !this.item.Discount_items_showcase) return null;

			let p1 = this.item.Discount_items_showcase ?? this.item.Price_items_showcase;
			let p2 = this.item.Original_price_items_showcase ?? this.item.Price_items_showcase;

			let discount = 100 - (p1 * 100) / p2;
			return Math.round(discount);
		},
	},
};
</script>
<style lang="scss" scoped>
.product-carousel {
	position: relative;
	overflow: hidden;
	height: 200px;
}

p {
	margin-bottom: 0;
}

.carousel-content {
	width: 100%;
	height: 100%;
	position: relative;
}

.carousel-slide {
	position: absolute;
	width: 100%;
	height: 100%;
	transition: transform 0.5s ease;
	opacity: 0;
	z-index: 0;
}

.carousel-slide.active {
	opacity: 1;
}

.carousel-image {
	width: 100%;
	height: 100%;
	object-fit: contain; // o cover, si querés que rellene
	display: block;
}

.measure {
	white-space: nowrap;
	min-width: 60px;
	/* o el ancho que quieras mínimo para que queden parejos */
}

.carousel-button {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background-color: rgba(203, 133, 103, 0.8);
	color: white;
	border: none;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.3s ease;
}

@media (max-width: 899px) {
	.carousel-button {
		width: 24px;
		height: 24px;
	}
}

a.product-info-wrapper {
	text-decoration: none;

	&:hover {
		text-decoration: none;
	}
}

.carousel-button:hover {
	background-color: rgba(203, 133, 103, 1);
}

.carousel-button:disabled {
	background-color: rgba(203, 133, 103, 0.4);
	cursor: not-allowed;
}

.carousel-button.prev {
	left: 5px;
}

.carousel-button.next {
	right: 5px;
}

.arrow {
	font-size: 14px;
	font-weight: bold;
}

.carousel-indicators {
	position: absolute;
	bottom: 4px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 5px;
}

.indicator {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.5);
	border: 1px solid rgba(203, 133, 103, 1);
	cursor: pointer;
	padding: 0;
}

.indicator.active {
	background-color: rgba(203, 133, 103, 1);
}

.product-item-wrapper {
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 25px;
	border-radius: 8px;
	width: auto;
	max-width: 18rem;
	height: 100%;
	color: $alaska-black;

	&:hover {
		text-decoration: none !important;
	}

	&.item-sold {
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #e9ded8a6;
		}
	}

	.product-title-measure-price {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.label-wrapper {
		display: flex;
		align-items: center;
		margin-top: 5px;

		.delivery,
		.new,
		.tag {
			height: 18px;
			padding: 0 7px;
		}

		.delivery {
			flex-direction: row;
			padding-left: 27px;
			background-color: $alaska-secondary-color;
			background-image: url('/transporte.svg');
			background-position: 7px 3px;
			background-size: 14px auto;
			color: $alaska-white;
			line-height: 0.4rem;
			font-size: 10px;
			vertical-align: baseline;
			border: 1px solid $alaska-secondary-color;
		}

		.new {
			color: $alaska-main-color;
			background-color: white;
			border: 1px solid $alaska-main-color;
		}

		.tag {
			font-weight: bold;
			top: 1.5rem;
			right: 1rem;
			border: 1px solid $alaska-black;
		}

		.delivery,
		.new,
		.tag {
			display: flex;
			width: auto;
			margin-right: 5px;
			justify-content: center;
			align-items: center;
			font-size: 10px;
			font-weight: bold;
			border-radius: 40px;
		}

		.like-btn {
			width: auto;
			margin-left: auto;
		}
	}

	.discount {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 10px;
		z-index: 2000;
		right: 10px;
		border-radius: 50%;
		background: $alaska-main-color;
		color: white;
		font-weight: 600;
		padding: 4px 2px;
		width: 30px;
		height: 30px;
		font-size: 60%;
	}

	.furniture-tag-list {
		position: absolute;
		top: 0.5rem;
		right: 0;
		list-style: none;
		padding: 0;
		font-weight: bold;

		li {
			border-radius: 8px;
			padding: 0.25rem 1.125rem;
			font-size: 0.75rem;
		}

		.tag-sold {
			background-color: $alaska-secondary-color;
			color: #f0f0f0;
		}

		.tag-donated {
			background-color: $alaska-main-color;
			color: #f0f0f0;
		}
	}
}

.product-img-wrapper {
	position: relative;
	max-height: 100%;
	background-color: $alaska-white;
	width: 100%;
	justify-self: center;
	align-self: center;
	text-align: center !important;

	img {
		width: 100%;
		aspect-ratio: 1/1 !important;
		object-fit: contain;
	}
}

.product-info-wrapper {
	.product-header {
		display: flex;
		align-items: center;
		margin-top: 0.2rem;
		justify-content: space-between;
		margin-bottom: 3px;
	}

	.outlet-badge {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 12px;
		color: #666;
		font-weight: 500;
		text-transform: uppercase;
	}

	.nuevo-badge {
		background-color: #fff;
		color: $alaska-main-color;
		border: 1px solid $alaska-main-color;
		border-radius: 20px;
		padding: 2px 10px;
		justify-content: center;
		display: flex;
		align-items: center;
		height: 22px;
		font-size: 12px;
		font-weight: 500;
	}

	.measures-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		font-size: 12px;
		color: #888;

		p {
			margin: 0;
			padding: 0;
		}

		.divider {
			margin: 0 6px;
			color: #ccc;
		}
	}

	.product-partner {
		font-size: 1rem;
		margin: 0;
	}

	.product-title {
		margin-top: 5px;
		font-size: 82%;
		font-weight: bold;
		line-height: 1.2em;
	}

	.product-info {
		display: flex;
		gap: 8px;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: baseline;
	}

	.province {
		display: flex;
		flex-grow: 20;
		margin-top: 7px;
		font-size: 14px;
		color: #9b9999;
	}

	.chip-price-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		flex-grow: 1;
	}

	@media (max-width: 899px) {
		.chip-price-wrapper {
			gap: 0.5rem;
		}
	}

	.negotiable {
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.6);
		font-size: 0.675em;
		padding: 2px 8px;
		color: rgba(0, 0, 0, 0.6);
	}

	.price {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: baseline;
		position: relative;

		.final-price {
			font-weight: bold;
			font-size: 16px;
			margin-right: 0.5rem;
			line-height: 1em;
			color: #262626;

			&.disabled {
				color: #d9d9d9;
			}
		}

		.old-price {
			font-size: 14px;
			font-weight: 500;
			line-height: 1em;
			color: #9b9999;
			opacity: 0.6;
			text-decoration: line-through;
		}
	}

	.expire {
		display: flex;
		align-items: center;
	}
}

@media (max-width: 899px) {
	.product-item-wrapper {
		padding: 0 !important;
	}
}

@media only screen and (min-width: 480px) {
	.product-info-wrapper {
		.product-title {
			font-size: 100%;
		}
	}

	.product-item-wrapper {
		.label-wrapper {
			.like-btn {
				right: 15px;
			}
		}

		.discount {
			width: 35px;
			height: 35px;
			top: 15px;
			right: 15px;
		}
	}
}

@media only screen and (min-width: 768px) {
	.product-item-wrapper {
		.discount {
			width: 48px;
			height: 48px;
			font-size: 80%;
		}

		.delivery,
		.new,
		.tag {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 20px;
			font-size: 10px;
		}
	}

	.product-info-wrapper {
		.negotiable {
			font-size: 0.6125rem;
			padding: 2px 6px;
		}

		.price {
			.final-price {
				font-size: 1rem;
			}

			.old-price {
				font-size: 0.85rem;
			}
		}
	}
}

.price-block {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

@media only screen and (min-width: 1024px) {
	#home-products-wrapper {
		.product-img-wrapper {
			img {
				max-height: 100px;
			}
		}
	}

	.product-item-wrapper {
		.label-wrapper {
			margin-top: 10px;
		}

		.discount {
			width: 35px;
			height: 35px;
			top: 15px;
			right: 15px;
			font-size: 60%;
		}
	}
}

@media only screen and (min-width: 1200px) {
	#home-products-wrapper {
		.product-img-wrapper {
			img {
				max-height: 135px;
			}
		}
	}
}

@media only screen and (min-width: 1280px) {
	.product-item-wrapper {
		.discount {
			width: 40px;
			height: 40px;
			font-size: 80%;
		}
	}
}

.test-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	padding: 20px;
	background-color: #f5f5f5;
}
</style>
