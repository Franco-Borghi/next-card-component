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
