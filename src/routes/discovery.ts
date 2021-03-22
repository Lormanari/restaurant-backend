import express from 'express';
import discoveryService from '../services/discoveryService';
// import entry from '../utils';


const router = express.Router();

router.get('/', (req, res) => {
	const lng = Number(req.query.lon);
	const lat = Number(req.query.lat);
	console.log(lng, lat);
	res.send(discoveryService.getDiscoveries(lng, lat));
});

export default router;