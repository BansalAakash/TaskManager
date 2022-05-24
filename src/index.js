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

const bcrypt = require('bcrypt')

const myFunction = async () => {
    const password = "Welcome@123"
    const hashedPass = await bcrypt.hash(password, 8)
    console.log(password, hashedPass)

    const isMatch = await bcrypt.compare(password, hashedPass)
    console.log(isMatch)
}

myFunction()