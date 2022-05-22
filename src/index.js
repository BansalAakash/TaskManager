const express = require('express')

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

console.clear()

app.post('/users', ({body} = {}, res) => {
    console.log(body)
    const me = new User(body)
    me.save().then(()=>{
        res.status(201).send(me)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


app.post('/tasks', ({body}, res) => {
    console.log(body)
    const myTask = new Task(body)
    myTask.save().then(() => {
        res.status(201).send(myTask)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})




app.listen(port, () => {
    console.log('Listening on port', port)
})