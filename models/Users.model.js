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
    }
}, {
    timestamps: true
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