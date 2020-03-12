const express = require('express');
const db = require('../db.js');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  let newDb = db.filter((item) => { 
    return item.id == req.params.id;
  })
  res.json(newDb);
});

router.route('/testimonials/').post((req, res) => {
  const { author, text } = req.body;
  db.push({id: (db[db.length -1].id +1), author, text});
  res.send({ message: 'OK' }); 
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const { id } = req.params;

  db.map((item) => {
    // console.log(item);
    if(item.id == id){
      item.author = author;
      item.text = text;
      return item;
    }
    return item;
  });
  // console.log(db);
  res.send({ message: 'OK' }); 
});

router.route('/testimonials/:id').delete((req, res) => {
  const {id} = req.params;
  db = db.filter((item) => {
    return item.id != id
  });
  res.send({ message: 'OK' }); 
});

module.exports = router;