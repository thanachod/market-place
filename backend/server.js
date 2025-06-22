const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const users = require('./routes/users');
const items = require('./routes/items');
const test = require('./routes/test');
const db = require('./database/mysql_connection');

require('dotenv').config();
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cookieParser());


server.use('/images', express.static(path.join(__dirname, '/images')));


const PORT = process.env.PORT || 5000;

server.use('/users', users);
server.use('/items', items);
server.use('/test', test);

server.listen(PORT, () => {
    console.log(`starting port on ${PORT}`);
    
})