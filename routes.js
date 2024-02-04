import app from "./config/config.js"
import MySQlConnect from "./db/database.js"
import express from "express"



app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Hello World')
})
