const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL)

const User = mongoose.model('User', {
    name : {
        type: String,
        required: true,
        trim: true
    },
    age : {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email : {
        type : String,
        required:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password : {
        type : String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Not safe!')
            }
        }
    }
})

// const me = new User({
//     name : 'what Bansal   ',
//     email : 'aAakash6025@GMAIL.COM   ',
//     password: 'qwe1ljnasdf'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })


const Task = mongoose.model('Task', {
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

const task1 = new Task({description : 'Task number 1', completed : false})
task1.save().then(() => {
    console.log(task1)
}).catch((error) => {
    console.log(error)
})