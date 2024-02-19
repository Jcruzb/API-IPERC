const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    rs:{
        type: String,
        required: true
    },
    ruc:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        //vinculado al ID del usuario
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Client', clientSchema);