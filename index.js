const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send({message: 'Hello World!'})
});

const server = app.listen(3000, () => {
  console.log(`listening http://localhost:${server.address().port}/`)
})