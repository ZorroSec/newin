const app = require("./config/config.js")
const MySQlConnect = require("./db/database.js")
const express = require("express")
const queryIpFunction = require("./models/ip.js")
const prisma = require("./models/prisma.js")
const findUsersWhereIp = require("./find/findUsersIp.js")
const { engine } = require("express-handlebars")
const path = require("path")

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/public'));

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const user = await pool.query(`SELECT * FROM User WHERE ip = '${ip.ip}'`)
    console.log(user[0][0])
    if(user){
        res.render('home', { user: user[0][0]['nome'] })
    }else{
        res.send('Anauthorized')
    }
})
