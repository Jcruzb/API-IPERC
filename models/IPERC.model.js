const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATUS = {
    values: ['Pendiente', 'Aprobado', 'Rechazado']
}

const IPERC = new Schema({

    name: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    process: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process'
    },
    dangers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Danger'
    }],
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: STATUS,
        default: 'Pendiente'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    expirationDate: {
        type: Date,
        required: true
    }

}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('IPERC', IPERC);