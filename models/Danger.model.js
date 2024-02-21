const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Danger = new Schema({

    name: {
        type: String,
        required: true
    },
    risks: [{
        riskName: {
            type: String,
            required: true
        },
        riskDescription: {
            type: String,
        },
        probability: {
            type: Number,
            required: true
        },
        impact: {
            type: Number,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        control: {
            type: String,
            required: true
        }
    }],
    description: {
        type: String,
    },
    law: {
        type: String,
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

module.exports = mongoose.model('Danger', Danger);
