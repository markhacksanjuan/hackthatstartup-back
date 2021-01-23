const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        academics:{
            type: [Schema.Types.ObjectId],
            ref: 'Academic'
        },
        works:{
            type: [Schema.Types.ObjectId],
            ref: 'Work'
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User