const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');
//const uuidv1 = require('uuid/v1');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seats = await Seat.findOne().skip(rand);
    if(!seats) res.status(404).json({message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
}
exports.getOne = async (req, res) => {

  try {
    const seats = await Seat.findById( req.params.id);
    if(!seats) res.status(404).json({ message: 'Not found' });
    else res.json(seats);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.postOne = async (req, res) => {

  try {
    const { day, seat, client, email  } = req.body;
    //const io = req.io; 
    const clean = sanitize(client);

    const newSeat = new Seat({ 
      day: day,
      seat: seat,
      client: clean,
      email: email,
    });

    await newSeat.save();
    res.json({ message: 'OK' });
    req.io.emit('seatsUpdated', db.seats);


  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.putOne = async (req, res) => {

  try {
    const { day, seat, client, email  } = req.body;

    const seats = await(Seat.findById(req.params.id));
    if(seats) {
      seats.day = day;
      seats.seat = seat;
      seats.client = client;
      seats.email = email;
      await seats.save();
      res.json( await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteOne = async (req, res) => {

  try {
    const seats = await(Seat.findById(req.params.id));
    if(seats) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json( await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};