const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DangersAndRisksSchema = new Schema({
    danger: {
        name: {
            type: String,
            required: true
        },
        risks:[{
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
    }
}, { timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('DangersAndRisks', DangersAndRisksSchema);
    