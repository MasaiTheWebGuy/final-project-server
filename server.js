const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image  = require('./controllers/image')

//save database connect to a variable
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'spr1tgun',
        database : 'smart-brain'
    }
})

db.select('*').from('users').then(data => {
    console.log(data)
})


app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res)=> { res.send(database.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(3000, () => {
    console.log('Im working')
})

/*
/ --> Root route respins with res = working
/ signin ---> Post = success or fail
/register --> Post = creates new user
/profile --> userId --> GET = user
 /image --> PUT --> user

*/