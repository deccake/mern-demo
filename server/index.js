import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import userRoute from './routes/users.js'

const app = express();



app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use('/',userRoute)
//
const CONNECTION_URL = ""
const PORT = process.env.PORT || 5001

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{app.listen(PORT,()=>
        console.log(`Server Successfully listen on ${PORT}`)
    )})
    .catch((error)=>console.log(error.message))



    
