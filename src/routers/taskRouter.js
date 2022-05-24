const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async ({body}, res) =>{
    const task = new Task(body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    }catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async ({params}, res) => {
    try{
        const task = await Task.findById(params.id)
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    } catch(error){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedOps = ['description', 'completed']
    const isValid = updates.every((update)=>allowedOps.includes(update))
    try{
        if(!isValid) return res.status(400).send({'Error' : 'This operation is not allowed'})

        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    } catch(error){
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router