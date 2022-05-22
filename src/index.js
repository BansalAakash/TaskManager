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


app.get('/users', (req, res) => {
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user=>{
        if(!user) return res.status(404).send()
        res.status(200).send(user)
    })).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/tasks', (req, res)=>{
    Task.find().then((task)=>{
        res.status(200).send(task)
    }).catch((error)=>{
        res.status(500).send(task)
    })
})

app.get('/tasks/:id', (req, res)=>{
    Task.findById(req.params.id).then((task)=>{
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})


app.listen(port, () => {
    console.log('Listening on port', port)
})