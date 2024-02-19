const Process = require('../models/Process.model');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

module.exports.createProcess = (req, res) => {
    const { name, description } = req.body;
    const process = new Process({ name, description });
    process.save()
        .then((createdProcess) => {
            res.status(HttpStatus.StatusCodes.CREATED).json(createdProcess);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getAllProcesses = (req, res) => {
    Process.find()
        .then((processes) => {
            res.status(HttpStatus.StatusCodes.OK).json(processes);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.getProcessById = (req, res) => {
    const { id } = req.params;
    Process.findById(id)
        .then((process) => {
            if (!process) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, 'Process not found');
            }
            res.status(HttpStatus.StatusCodes.OK).json(process);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.updateProcess = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body
    Process.findByIdAndUpdate(id, { name, description }, { new: true })
        .then((process) => {
            if (!process) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, 'Process not found');
            }
            res.status(HttpStatus.StatusCodes.OK).json(process);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.deleteProcess = (req, res) => {
    const { id } = req.params;
    Process.findByIdAndDelete(id)
        .then((process) => {
            if (!process) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, 'Process not found');
            }
            res.status(HttpStatus.StatusCodes.NO_CONTENT).json();
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}