const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    }
});

UserSchema.plugin(uniqueValidator)

// encrypting password in server
// before saving any record, execute the function given
UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash
        next()
    })
})

// export model
const User = mongoose.model('User', UserSchema);
module.exports = User