export interface ITripData {
	shipper_data: IShipperData;
	receiver_data: IReceiverData;
}

export interface IReceiverData {
	receiver_name: string;
	user_id: string;
	receiver_pickup_point: Location;
	receiver_delivery_point: Location;
	item_information: any[]; // Replace 'any' with the specific type for the items if known
}

export interface IShipperData {
	name: string;
	user_id: string;
	delivery_id: string;
	shipper_from_location: Location;
	shipper_to_location: Location;
	max_permissible_weight: string;
	max_permissible_size: Size;
	price_per_kg: string;
	arrival_date: string;
}

interface Location {
	name: string;
	lat: string;
	long: string;
}

interface Size {
	length: string;
	breadth: string;
}
