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
    const sea = await Seat.findOne().skip(rand);
    if(!sea) res.status(404).json({message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
}
exports.getOne = async (req, res) => {

  try {
    const sea = await Seat.findById( req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
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

    /*if(!day || !seat || !client || !email) throw new Error('Invalid data');
    else if(!userLogged());
    else {
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.status(201).json({ message: 'OK' });
    }*/
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

    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      sea.day = day;
      sea.seat = seat;
      sea.client = client;
      sea.email = email;
      await sea.save();
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
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json( await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};