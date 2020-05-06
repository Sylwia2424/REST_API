const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Testimonial.findOne().skip(rand);
    if(!item) res.status(404).json({message: 'Not found' });
    else res.json(item);
  }
  catch(err) {
    res.json(err);
  }
};

exports.getOne = async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.postOne = async (req, res) => {

  try {

    const { author, text } = req.body;

    const newTestimonial = new Testimonial({ 
      author: author,
      text: text,
    });

    await newTestimonial.save({id: (db[db.length -1].id +1), author, text});
    res.json({ message: 'OK' });


  } 
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.putOne = async (req, res) => {
  const { author, text  } = req.body;
  const { id } = req.params;

  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(item.id == id) {
      item.author = author;
      item.text = text;

      await tes.save();
      res.json( await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteOne = async (req, res) => {

  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json( await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};