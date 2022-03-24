const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

//This line gives a Password and a Username to the Model also it sees if it unique
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);