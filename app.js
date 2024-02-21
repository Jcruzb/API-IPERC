require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');

require('./config/db.config');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
    });

//Routes
const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);
const clientRoutes = require('./routes/client.routes');
app.use('/client', clientRoutes);
const processRoutes = require('./routes/process.routes');
app.use('/process', processRoutes);
const dangerRoutes = require('./routes/danger.routes');
app.use('/danger', dangerRoutes);
const ipercRoutes = require('./routes/iperc.routes');
app.use('/iperc', ipercRoutes);


app.use((error, req, res, next) => {
    res.status(error.status || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



