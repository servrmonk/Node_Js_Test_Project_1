const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./config/db')

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoute')

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());


app.use('/post',postRoutes)
app.use('/comment',commentRoutes)

db.sync().then(()=>{
    console.log("All the table synced successfully");
    app.listen(3002,()=>{
        console.log("App started on localhost 3002");
    })
}).catch(err=>console.log("Error in syncing the tables ",err))