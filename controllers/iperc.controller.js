const IPERC = require('../models/IPERC.model');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

module.exports.createIPERC = (req, res) => {
   
    const { name, client, process, dangers, date, status, user} = req.body;

    let expirationDate = new Date(date);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const iperc = new IPERC({ name, client, process, dangers, date, status, user, expirationDate});
    iperc.save()
    .then((createdIPERC) => {
            res.status(HttpStatus.StatusCodes.CREATED).json(createdIPERC);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getAllIPERCs = (req, res) => {
    IPERC.find()
        .then((ipercs) => {
            res.status(HttpStatus.StatusCodes.OK).json(ipercs);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getIPERCById = (req, res) => {
    const { id } = req.params;
    IPERC.findById(id)
        .then((iperc) => {
            if (!iperc) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `IPERC with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.OK).json(iperc);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.updateIPERC = (req, res) => {
    const { id } = req.params;
    const { name, description, process, danger } = req.body;
    IPERC.findByIdAndUpdate(id, { name, description, process, danger }, { new: true })
        .then((updatedIPERC) => {
            if (!updatedIPERC) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `IPERC with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.OK).json(updatedIPERC);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.deleteIPERC = (req, res) => {
    const { id } = req.params;
    IPERC.findByIdAndDelete(id)
        .then((iperc) => {
            if (!iperc) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, `IPERC with id ${id} not found`);
            }
            res.status(HttpStatus.StatusCodes.NO_CONTENT).json();
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}
