const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

let db = [
  { id: 1, author: 'Jane Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];


app.get('/testimonials', (req, res) => {
  res.json('db');
});

app.get('/testimonials/:id', (req, res) => {
  let newDb = db.filter((item) => { 
    return item.id == req.params.id;
  })
  res.json(newDb);
});

app.get('/testimonials/random', (req, res) => {
});

app.post('/testimonials/', (req, res) => {
  const { author, text } = req.body;
  db.push({id: (db[db.length -1].id +1), author, text});
  res.send({ message: 'OK' }); 
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
  const {id} = req.params;
  db = db.filter((item) => {
    return item.id != id
  });
  res.send({ message: 'OK' }); 
});

app.use((req, res, next) => {
  res.send({ message: 'Not found' });
});

app.listen(9000, () => {
  console.log('Server is running on port: 9000');
});