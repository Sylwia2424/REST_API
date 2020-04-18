const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getOne);
router.post('/concerts', ConcertController.postOne);
router.put('/concerts/:id', ConcertController.putOne);
router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;
/*const express = require('express');
const db = require('../db.js');
const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  let newDb = db.concerts((item) => { 
    return item.id == req.params.id;
  })
  res.json(newDb);
});


router.route('/concerts/').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  db.push({id: (db[db.length -1].id +1),
    performer, genre, price, day, image});
  res.send({ message: 'OK' }); 
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const { id } = req.params;

  db.map((item) => {
    // console.log(item);
    if(item.id == id){
      item.performer = performer;
      item.genre = genre;
      item.price = price;
      item.day = day;
      item.image = image;
      return item;
    }
    return item;
  });
  // console.log(db);
  res.send({ message: 'OK' }); 
});

router.route('/concerts/:id').delete((req, res) => {
  const {id} = req.params;
  db = db.filter((item) => {
    return item.id != id
  });
  res.send({ message: 'OK' }); 
});

module.exports = router;*/