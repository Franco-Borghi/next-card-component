import { ItemStatus } from './itemStatus';

export interface ItemShowcase {
	Id_items_showcase: number;
	Id_showcase: number;
	Name_items_showcase: string;
	Status_items_showcase: ItemStatus | string;
	Price_items_showcase: number;
	Original_price_items_showcase?: number | null;
	Discount_items_showcase?: number | null;
	Min_price_offeritems_showcase?: number | null;
	Delivery_items_showcase?: '1' | '0';
	Height_items_showcase?: number | null;
	Width_items_showcase?: number | null;
	Length_items_showcase?: number | null;
	Id_origin?: string | null;
	user_type_id?: string | null;
	fullname?: string | null;
	Images_items_showcase?: string | null;
	Image_crop_items_showcase?: string | null;
	Additional_Images_crop_items_showcase?: string | null;
	slug: string;
	fav?: boolean;
	Date_insertion_items_showcase?: string | Date | null;
	Date_expired_showcase?: string | Date | null;
}
