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

// router.get('/:id', (req, res) => {
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// 	res.send(patientService.getPatientById(req.params.id));
// });

// router.post('/', (req, res) => {
// 	console.log(req.body);
// 	try {
// 		const newPatientEntry = entry.toNewPatientEntry(req.body);

// 		const addedPatient = patientService.addPatient(newPatientEntry);
// 		res.json(addedPatient);
// 	} catch (e) {
// 		res.status(400).send(e.message);
// 	}
// });

// router.get('/:id/entries', (req, res) => {
// 	const patient = patientService.getPatientById(req.params.id);
// 	res.send(patient?.entries);
// });

// router.post('/:id/entries', (req, res) => {
// 	try {
// 		const newEntry = entry.toNewEntry(req.body);
// 		const patient = patientService.getPatientById(req.params.id);
// 		const entryData = patient? patient.entries: [];
// 		const addedEntry = patientService.addEntry(newEntry, entryData);
// 		res.json(addedEntry);
// 	} catch (e) {
// 		res.status(400).send(e.message);
// 	}
// });

export default router;