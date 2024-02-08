const app = require("./config/config.js")
const MySQlConnect = require("./db/database.js")
const express = require("express")
const queryIpFunction = require("./models/ip.js")
const prisma = require("./models/prisma.js")
const findUsersWhereIp = require("./find/findUsersIp.js")
const { engine } = require("express-handlebars")
const path = require("path")
const findUsersWhereEmail = require("./find/findUserEmail.js")
const updateUserIpWhereEmail = require("./update/updateUser.js")
const createUser = require("./models/createUser.js")
const sequelize = require("./db/sequelize.js")
const { Sequelize } = require("sequelize")
const Post = require("./post/post.js")
const User = require("./users/user.js")
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/public'));

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/perfil', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    console.log(user)
    if(user.length < 1){
        res.redirect('/login')
    }else{
        res.render('edit', {
            nome: user[0]['nome'],
            user
        })
    }
})

app.post('/perfil', async(req, res)=>{
    const { nome, email, descricao } = req.body
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [update, result] = await pool.query(`
    UPDATE User
    SET nome = '${nome}',
    email = '${email}',
    descricao = '${descricao}'
    WHERE ip = '${ip.query}'
    `)
    console.log(update)
    res.redirect('/perfil')
})

app.get('/', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`SELECT * FROM User WHERE ip = '${ip.query}'`)
    console.log(user)
    if(user.length < 1){
        res.redirect('/login')
    }else{
        const [posts, results] = await pool.query(`
        SELECT *
        FROM Posts`)
        res.render('home', { nome: user[0]['nome'], posts })
        
    }
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', async(req, res)=>{
    const { email, senha } = req.body
    // console.log(email, senha)
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE email = '${email}' AND senha = '${senha}'
    `)

    console.log(user.length)
    

    if(user.length < 1){
        const userInvalid = `
        <div class="alert alert-danger" role="alert">
            Usuário ou senha inválidos!
        </div>
        `
        res.render('login', {
            userInvalid
        })
    }else{
        const [update, results] = await pool.query(`
        UPDATE User
        SET ip = '${ip.query}'
        WHERE email = '${email}' AND senha = '${senha}'
        `)
        console.log(update)
        res.redirect('/')
        
    }
})

app.get('/cadastro', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    console.log(user)
    if(user){
        res.render('cadastro')
    }else{
        res.redirect('/login')
    }
})

app.post('/cadastro', async(req, res)=>{
    const { nome, email, senha } = req.body
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const usercreate = await createUser({
        nome,
        email,
        senha,
        ip: ip.query
    })
    console.log(usercreate)
    res.redirect('/login')
})

app.get('/publicar', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    console.log(user)
    if(user.length < 1){
        res.redirect('/login')
    }else{
        res.render('publicar')
    }
})

app.post('/publicar', async(req, res)=>{
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    console.log(user)
    const { titulo, post, fonte } = req.body
    const data = new Date()
    const newPost = await Post.create({
        nome: user[0]['nome'],
        titulo,
        post,
        fonte,
        data
    })
    const postPublished = `
    <div class="alert alert-success" role="alert">
        Olá ${user[0]['nome']}...<br>
        Seu post foi publicado com sucesso!<br>
        <a href='/${user[0]['nome']}/conteudos'>Clique aqui para ver seus posts</a>
    </div>
    `
    res.render('publicar', {
        postPublished
    })

})

app.get('/:nome/conteudos', async(req, res)=>{
    const nome = req.params.nome
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    console.log(user)
    if(user.length < 1){
        res.redirect('/login')
    }else{
        const [posts, results] = await pool.query(`
        SELECT *
        FROM Posts
        WHERE nome = '${nome}'
        `)
        res.render('usuario/conteudos', { nome, posts })

    }
})

app.get('/:nome', async(req, res)=>{
    const nome = req.params.nome
    const ip = await queryIpFunction()
    const pool = await MySQlConnect()
    const [user, results] = await pool.query(`
    SELECT *
    FROM User
    WHERE ip = '${ip.query}'
    `)
    if(user.length < 1){
        res.redirect('/login')
    }else{
        res.render('usuario/perfil', {
            nome,
            user
        })
    }
})

