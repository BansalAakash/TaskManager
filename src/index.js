require('./db/mongoose')

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Listening on port', port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id: 'dummyId'}, 'aSeriesOfCharacters', {expiresIn:'2 days'})
    console.log(token)

    const data = jwt.verify(token, 'aSeriesOfCharacters')
    console.log(data)
    
}

// myFunction()