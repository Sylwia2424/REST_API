const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getOne);
router.post('/concerts', ConcertController.postOne);
router.put('/concerts/:id', ConcertController.putOne);
router.delete('/concerts/:id', ConcertController.deleteOne);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice)
router.get('/concerts/price/day/:day', ConcertController.getPriceDay)


module.exports = router;
