const express = require('express')
const app = express()
const parser = require('body-parser');
const db = require('./models');
const controllers = require('./controllers');

console.log(controllers);


db.sql.sync({force: true}).then(() => {
  db.beer.build({
  name: 'DFH 120',
  brewery: 'Dogfish Head',
  style: 'Triple IPA',
  abv: 18.00,
  rating: 5.00
}).save();
});


app.use(parser.json());
app.use('/api/v1', controllers.v1);

app.get('/', async function (req, res) {
  return res.status(200).send('Hello World!');
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

module.export = app;