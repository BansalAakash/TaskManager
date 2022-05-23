require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('628a57605162271eb13c475c').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((count)=>{
//     console.log("Count is", count)
// }).catch((e)=>{
//     console.log(e)
// })


const updateTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed : false })
    return count
}

updateTaskAndCount('628a47f482d1e65781d688ab').then((count)=>{
    console.log(count)
}).catch((error)=>{
    console.log(error)
})