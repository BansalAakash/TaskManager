require('./db/mongoose')

const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

console.clear()

app.listen(port, () => {
    console.log('Listening on port', port)
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('628e06b3e2e34fae8868a5fe')
    // await task.populate('createdBy')        
    // console.log(task.createdBy)

    const user = await User.findById('628e0445ef0deaf50381091c')
    await user.populate('tasks')
    console.log(user.tasks)
}
// main()