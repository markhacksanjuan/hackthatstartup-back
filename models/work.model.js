const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workSchema = new Schema(
    {
        company: String,
        position: String,
        started: Date,
        ended: Date,
        job: String,
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
)

const Work = mongoose.model('Work', workSchema)
module.exports = Work