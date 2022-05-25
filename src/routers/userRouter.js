const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users', async ({body} = {}, res) => {
    console.log(body)
    const user = new User(body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            user, 
            token
        })}catch(error) {
            console.log(error)
            res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({
            user,
            token
        })
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send({'Message' : 'Logged out!'})
    }catch (error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send(req.user)
    } catch(error){
        console.log(error)
        res.status(500).send(error)
    }

})

// router.get('/users', auth, async (req, res) => {
//     try {
//         const result = await User.find()
//         res.status(200).send(result)
//     }catch(error) {
//         res.status(500).send(error)
//     }
// })

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user)
})

// router.get('/users/:id', auth, async (req, res) => {                 //User shouldn't be able to fetch other user even by ID
//     try{
//         const user = await User.findById(req.params.id)
//         if(!user) return res.status(404).send('No user found')
//         res.status(200).send(user)
//     } catch(error) {
//         res.status(500).send(error)
//     }
// })

// router.delete('/users/:id', auth, async (req, res) => {
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user) return res.status(404).send()
//         res.status(202).send(user)
//     }catch(error){
//         res.status(500).send({error})
//     }
// })

router.delete('/users/me', auth, async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user.id)       //Changed to remove method for cleaner code
        // if(!user) return res.status(404).send()                      //User will always exist if we are here
        await req.user.remove()
        res.status(200).send(req.user)
    }catch(error){
        console.log(error)
        res.status(500).send({error})
    }
})


// router.patch('/users/:id', auth, async (req, res) => {               //No longer needed as users shouldn't be able to update other users
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValid =  updates.every((update)=>allowedUpdates.includes(update))
//     if(!isValid) return res.status(400).send({error : 'This operation is not allowed'})
//     try{
//         const user = await User.findById(req.params.id)
//         updates.forEach((update)=>user[update] = req.body[update])
//         await user.save()

//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         if(!user) return res.status(404).send()
//         res.status(200).send(user)
//     }catch(error){
//         res.status(400).send(error)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValid =  updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid) return res.status(400).send({error : 'This operation is not allowed'})
    try{
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router