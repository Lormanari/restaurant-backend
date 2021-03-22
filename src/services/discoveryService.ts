import restaurantsData from '../../data/restaurant';
import { Discoveries, restaurantEntry, Title } from '../types';

const toRad = (Value: number) => Value * Math.PI / 180;

const calcCrow = (lat1:number, lon1:number, lat2:number, lon2:number) => {
  const R = 6371; // km
  const dLat = toRad(lat2-lat1);
  const dLon = toRad(lon2-lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(rLat1) * Math.cos(rLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
};
const opendDays = (LDate:string) => {
	const diff = Date.now().valueOf() - (new Date(LDate)).valueOf();
	return Math.floor(diff / (1000 * 60 * 60 * 24));
};
const getDiscoveries = (lng:number, lat:number): Discoveries => {
	const restaurantsWithinDis = restaurantsData.restaurants.filter(r => calcCrow(lat, lng, r.location[1], r.location[0]) <= 1.5);
	const open = restaurantsWithinDis.filter(r => r.online);
	const close = restaurantsWithinDis.filter(r => !r.online);

	const popular = open.sort((a:restaurantEntry, b:restaurantEntry) => b.popularity - a.popularity);
	const popularClosed = close.sort((a:restaurantEntry, b:restaurantEntry) => b.popularity - a.popularity);
	const popRestaurants = popular.length < 10 ? [...popular, ...popularClosed.slice(0, 10 - popular.length)] : popular.slice(0, 10);

	const newOpen = open.filter(r => {
		return opendDays(r.launch_date) <= 120;
	}).sort((a:restaurantEntry, b:restaurantEntry) => opendDays(a.launch_date) - opendDays(b.launch_date));
	const newClose = close.filter(r => {
		return opendDays(r.launch_date) <= 120;
	}).sort((a:restaurantEntry, b:restaurantEntry) => opendDays(a.launch_date) - opendDays(b.launch_date));
	const newRestaurants = newOpen.length < 10 ? [...newOpen, ...newClose.slice(0, 10 - newOpen.length)] : newOpen.slice(0, 10);

	const nearOpen = open.sort((a:restaurantEntry, b:restaurantEntry) => calcCrow(lat, lng, a.location[1], a.location[0]) - calcCrow(lat, lng, b.location[1], b.location[0]));
	const nearClose = close.sort((a:restaurantEntry, b:restaurantEntry) => calcCrow(lat, lng, a.location[1], a.location[0]) - calcCrow(lat, lng, b.location[1], b.location[0]));
	const nearbyRestaurants = nearOpen.length < 10 ? [...nearOpen, ...nearClose.slice(0, 10 - nearOpen.length)] : nearOpen.slice(0, 10);

	return {
		"sections": [
			{
				"title": Title.Popular,
				"restaurants": popRestaurants
			},
			{
				"title": Title.New,
				"restaurants": newRestaurants
			},
			{
				"title": Title.Nearby,
				"restaurants": nearbyRestaurants
			}
		]
	};
};

export default {
	getDiscoveries,
};