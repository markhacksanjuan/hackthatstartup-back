const mongoose = require('mongoose')
const Schema = mongoose.Schema

const academicSchema = new Schema(
    {
        university: String,
        degree: String,
        dateEnded: Date,
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
)

const Academic = mongoose.model('Academic', academicSchema)
module.exports = Academic