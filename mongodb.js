// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const { MongoClient, ObjectID, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser : true }, (error, client) => {
    if(error)
        return console.log('Error : ' , error);
        const db = client.db(databaseName)
        db.collection('users').deleteMany({
            name : 'Aakash'
        }).then((result) => {
            console.log("Result : ", result)
        }).catch((error)=>{
            console.log("Error : ", error)
        })
})