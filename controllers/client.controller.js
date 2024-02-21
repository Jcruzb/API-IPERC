const Client = require('../models/Client.model');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

module.exports.createClient = (req, res) => {
    const { rs, ruc, address, phone, email, contact } = req.body;
    const client = new Client({ rs, ruc, address, phone, email, contact });
    client.save()
        .then((createdClient) => {
            res.status(HttpStatus.StatusCodes.CREATED).json(createdClient);
        })
        .catch((error) => {
            console.error(error);
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
        });
}

module.exports.getAllClients = (req, res) => {
    Client.find()
        .then((clients) => {
            res.status(HttpStatus.StatusCodes.OK).json(clients);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.getClientById = (req, res) => {
    const { id } = req.params;
    Client.findById(id)
        .then((client) => {
            console.log(client);
            if (!client) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, 'Client not found');
            }
            res.status(HttpStatus.StatusCodes.OK).json(client);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}

module.exports.updateClient = (req, res) => {
    console.log("entre a update client");
    const { rs, ruc, address, phone, email, contact } = req.body
    Client.findByIdAndUpdate(id, { rs, ruc, address, phone, email, contact }, { new: true })
        .then((client) => {
            if (!client) {
                throw createError(HttpStatus.StatusCodes.NOT_FOUND, 'Client not found');
            }
            res.status(HttpStatus.StatusCodes.OK).json(client);
        })
        .catch((error) => {
            res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
}


