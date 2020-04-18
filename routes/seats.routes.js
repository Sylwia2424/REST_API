const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);
router.get('/seats/random', SeatController.getRandom);
router.get('/seats/:id', SeatController.getOne);
router.post('/seats', SeatController.postOne);
router.put('/seats/:id', SeatController.putOne);
router.delete('/seats/:id', SeatController.deleteOne);

module.exports = router;
/*const express = require('express');
const db = require('../db.js');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for (let post of db.seats) {
    if (req.params.id === post.id) {
      res.json(post);
    }
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  console.log(req.body)
  const io = req.io; 

  let check = true;
  for (let post of db.seats) {
    if (post.day == day && post.seat == seat) {
      res.status(400).json({ message: 'The slot is already taken.' });
      check = false;
    }
  }
  if (check === true) {
    const newPost = {
      day: day,
      seat: seat,
      client: client,
      email: email,
      id:  uuidv1(),
    };
    db.seats.push(newPost);
    res.json({ message: 'OK' });
    io.emit('seatsUpdated', db.seats);
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  for (let post of db.seats) {
    if (post.day == day && post.seat == seat) {
      res.status(400).json({ message: 'The slot is already taken.' });
    } else {
      post.day = day;
      post.seat = seat;
      post.client = client;
      post.email = email;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  for (let post of db.seats) {
    if (post.id == req.params.id) {
      db.seats.splice(post.id, db.seats.indexOf(post));
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;*/