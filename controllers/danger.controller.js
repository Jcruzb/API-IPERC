const Danger = require('../models/Danger.model.js');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

module.exports.createDanger = (req, res) => {
    const { name, risks, description, law } = req.body;
    const danger = new Danger({ name, risks, description, law });
    danger.save()
        .then((createdDanger) => {
            res.status(HttpStatus.StatusCodes.CREATED).json(createdDanger);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getAllDangers = (req, res) => {
    Danger.find()
        .then((dangers) => {
            res.status(HttpStatus.StatusCodes.OK).json(dangers);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getDangerById = (req, res) => {
    const { id } = req.params;
    Danger.findById(id)
        .then((danger) => {
            if (!danger) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `Danger with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.OK).json(danger);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.updateDanger = (req, res) => {
    const { id } = req.params;
    const { name, risks, description, law } = req.body;
    Danger.findByIdAndUpdate(id, { name, risks, description, law }, { new: true })
        .then((updatedDanger) => {
            if (!updatedDanger) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `Danger with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.OK).json(updatedDanger);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.deleteDanger = (req, res) => {
    const { id } = req.params;
    Danger.findByIdAndDelete(id)
        .then((deletedDanger) => {
            if (!deletedDanger) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `Danger with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.NO_CONTENT).json();
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}