require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('628a4baac37ba3ee2b7981ce', {
//     $inc : {
//         age : 1
//     }
// }).then((response)=>{
//     console.log(response)
//     return User.countDocuments({age : 0})
// }).then((response)=> {
//     console.log(response)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    return await User.countDocuments({ age })
}

updateAgeAndCount('628a4baac37ba3ee2b7981ce', 3).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})