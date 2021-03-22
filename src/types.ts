interface location {
	lng: number;
	lat: number;
}

interface location {
	lng: number;
	lat: number;
}

export enum Title {
	Popular = "Popular Restaurants",
	New = "New Restaurants",
	Nearby = "Nearby Restaurants"
}

export interface restaurantEntry {
	blurhash: string;
	launch_date: string;
	location: [location['lng'], location['lat']];
	name: string;
	online: boolean;
	popularity: number
}

export interface restaurants {
	restaurants: restaurantEntry[];
}

export interface PopularRestaurants {
	title: Title.Popular;
	restaurants: Array<restaurantEntry>;
}

export interface NewRestaurants {
	title: Title.New;
	restaurants: Array<restaurantEntry>;
}

export interface NearbyRestaurants {
	title: Title.Nearby;
	restaurants: Array<restaurantEntry>;
}

export type Discovery =
  | PopularRestaurants
  | NewRestaurants
  | NearbyRestaurants;

export interface Discoveries {
	sections: Discovery[];
}