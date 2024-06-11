// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require('./routes/userRoute.js')
// Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//for testing user controller
app.use('/user', userRouter);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// app.post('/api/data', (req, res) => {
//     // Handle POST request data
//     res.send(req.body);
// });
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});