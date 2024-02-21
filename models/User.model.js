const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'user'],
        default: 'user'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    process: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process'
    }],
    iperc: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IPERC'
    }]
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);