const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async ({body} = {}, res) => {
    console.log(body)
    const user = new User(body)
    try {
        await user.save()
        res.status(200).send(user)
    }catch(error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const result = await User.find()
        res.status(200).send(result)
    }catch(error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).send('No user found')
        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.status(202).send(user)
    }catch(error){
        res.status(500).send({error})
    }
})


router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid =  updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid) return res.status(400).send({error : 'This operation is not allowed'})
    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) return res.status(404).send()
        res.status(200).send(user)
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router