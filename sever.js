const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  await contact.save();
  res.send('<h2>Thanks for contacting us!</h2><a href="/">Go Back</a>');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
