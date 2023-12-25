require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
require('./DB/connection');

const blogServer = express();

blogServer.use(cors());
blogServer.use(express.json());
blogServer.use(router);
blogServer.use('/uploads', express.static('./uploads'));

const PORT = process.env.PORT || 4000;

blogServer.listen(PORT, () => {
    console.log(`blog app server started at port: ${PORT} and waiting for client requests`);
});

// http get request resolving to http://localhost:4000/
blogServer.get('/', (req, res) => {
    res.send('<h1>blog app server started and waiting for client requests !!!</h1>');
});
