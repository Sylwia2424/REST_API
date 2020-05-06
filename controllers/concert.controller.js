const Concert = require('../models/concerts.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Concert.findOne().skip(rand);
    if(!item) res.status(404).json({ message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
};

exports.getOne = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getPerformer = async (req, res) => {
  try {
    const con = await Concert.find(req.params.performer);
    await con.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const con = await Concert.find(req.params.genre);
    await con.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const con = await Concert.find(req.params.priceMin || req.params.priceMax);
    await con.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPriceDay = async (req, res) => {
  try {
    const con = await Concert.find(req.params.day);
    await con.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {

  try {


    const { performer, genre, price, day, image  } = req.body;
    const newConcert = new Concert({ performer: performer, 
    genre: genre, 
    price: price, 
    day: day, 
    image:image  
    });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.putOne = async (req, res) => {
  const { performer, genre, price, day, image  } = req.body;

  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      con.performer = performer, 
      con.genre = genre,
      con.price = price, 
      con.day = day, 
      con.image = image
      await con.save();
      res.json( await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteOne = async (req, res) => {

  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json( await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};