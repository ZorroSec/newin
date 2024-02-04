import app from "./config/config.js"
import MySQlConnect from "./db/database.js"
import express from "express"
import queryIpFunction from "./models/ip.js"



app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', async(req, res)=>{
    const ip = await queryIpFunction()
    res.json(ip.ip)
})
