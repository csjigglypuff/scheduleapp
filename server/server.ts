const path = require('path');
const cors = require('cors')
const express = require('express');

const app = express();
const port = 3000;

//middleware for CORS (?)
app.use(cors());

//serve static files
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../dist')));

module.exports = app.listen(port, () => 
console.log('Listening on port ${port}')
)