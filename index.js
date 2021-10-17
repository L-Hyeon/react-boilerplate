const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://LHyun:c7Bb3hZKdv3MiRVU@boilerplate.p91ny.mongodb.net/Boilerplate?retryWrites=true&w=majority', {
}).then(() => console.log('connected')).catch((err) => console.log('error'));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
