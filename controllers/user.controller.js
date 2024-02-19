const User = require('../models/Users.model');
const createError = require('http-errors');
const  HttpStatus  = require('http-status-codes');

module.exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    console.log(user);
    user.save()
        .then((createdUser) => {
            res.status(HttpStatus.CREATED).json(createdUser); // Envía el usuario creado como respuesta
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error); // Maneja el error de manera adecuada
        });
}


module.exports.getAllUsers = (req, res) => {
    User.find()
        .then((users) => {
            res.status(HttpStatus.OK).json(users);
        })
        .catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.getUserById = (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => {
            if (!user) {
                throw createError(HttpStatus.NOT_FOUND, 'User not found');
            }
            res.status(HttpStatus.OK).json(user);
        })
        .catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body

    User.findByIdAndUpdate(id, { name, email, password }, { new: true })
        .then((user) => {
            if (!user) {
                throw createError(HttpStatus.NOT_FOUND, 'User not found');
            }
            res.status(HttpStatus.OK).json(user);
        })
        .catch((error) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}
