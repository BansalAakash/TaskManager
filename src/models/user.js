const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    },
    tokens : [{
        token : {
            type : String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {                   //instance method
    const token = jwt.sign({_id : this._id.toString()}, 'someRandomChars')
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {         //static method
    const user = await User.findOne({email})
    
    if(!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to Login!')
    }
    return user
}


//Hash the plain text password
userSchema.pre('save', async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User