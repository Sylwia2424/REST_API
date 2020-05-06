const Concert = require('../models/concerts.model');

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
    const concert = await Concert.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.getPerformer = async (req, res) => {
  try {
    const concert = await Concert.find(req.params.performer);
    await concert.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const concert = await Concert.find(req.params.genre);
    await concert.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const concert = await Concert.find(req.params.priceMin || req.params.priceMax);
    await concert.save();
    res.json( await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPriceDay = async (req, res) => {
  try {
    const concert = await Concert.find(req.params.day);
    await concert.save();
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

  } 
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.putOne = async (req, res) => {
  const { performer, genre, price, day, image  } = req.body;

  try {
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      concert.performer = performer, 
      concert.genre = genre,
      concert.price = price, 
      concert.day = day, 
      concert.image = image
      await concert.save();
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
    const concert = await(Concert.findById(req.params.id));
    if(concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json( await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};