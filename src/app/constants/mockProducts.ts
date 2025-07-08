import { ProductItemData } from '@types';

export const mockProducts: ProductItemData[] = [
	{
		Id_items_showcase: 1,
		Id_showcase: 101,
		Name_items_showcase: 'Silla Vintage de Madera',
		slug: '/producto/silla-vintage',
		Status_items_showcase: 'available',
		Price_items_showcase: 15000,
		Original_price_items_showcase: 20000,
		Discount_items_showcase: 15000,
		Min_price_offeritems_showcase: 12000,
		Delivery_items_showcase: '1',
		Height_items_showcase: 85,
		Width_items_showcase: 45,
		Length_items_showcase: 50,
		Id_origin: '1',
		user_type_id: '2',
		fullname: 'María García',
		Images_items_showcase: '',
		Image_crop_items_showcase: JSON.stringify({
			list: 'https://via.placeholder.com/720x460?text=Imagen+Principal',
		}),
		Additional_Images_crop_items_showcase: JSON.stringify({
			img1: { list: 'https://via.placeholder.com/720x460?text=Extra+1' },
			img2: { list: 'https://via.placeholder.com/720x460?text=Extra+2' },
		}),
		fav: false,
	},
	{
		Id_items_showcase: 2,
		Id_showcase: 102,
		Name_items_showcase: 'Mesa Ratona Reciclada',
		slug: '/producto/mesa-ratona',
		Status_items_showcase: 'sold',
		Price_items_showcase: 22000,
		Original_price_items_showcase: 28000,
		Discount_items_showcase: 22000,
		Min_price_offeritems_showcase: 0,
		Delivery_items_showcase: '0',
		Id_origin: '2',
		Images_items_showcase: '',
		Image_crop_items_showcase: JSON.stringify({
			list: 'https://via.placeholder.com/720x460?text=Imagen+Mesa',
		}),
		Additional_Images_crop_items_showcase: JSON.stringify({
			img1: { list: 'https://via.placeholder.com/720x460?text=Extra+Mesa' },
		}),
		fav: true,
	},
];
