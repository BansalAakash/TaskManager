const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const TaskSchema = new mongoose.Schema({
    description : {
        type : String,
        trim: true,
        required: true
    },
    completed : {
        type : Boolean,
        default: false
    }
})

// TaskSchema.pre('save', async function(next){
    
//     next()
// })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task