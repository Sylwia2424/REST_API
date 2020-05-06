const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;	  
  next();	  
}); 
app.use(cors({
  origin: 'http://localhost:8000'
}));

app.use(express.static(path.join(__dirname, '/client/build')));

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: '404 not found' });
});

app.use(helmet());
//mongoose.connect('mongodb+srv://sylwia:<password>@cluster0-6thq1.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 9000, () => {
  console.log('Server is running on port: 9000');
});

const io = socket(server); 
io.on('connection', (socket) => {	
  console.log('client with ID:', socket.id, ' has just logged');
	socket.on('disconnect', () => {
    console.log('client ID: ', socket.id, ' has just left');
  });	 
});

const server2 = app.listen('6000', () => {
  console.log('Server is running on port: 6000');
});
module.exports = server2;