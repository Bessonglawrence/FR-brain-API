const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const image = require('./controllers/image');

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'base@123',
    database : 'smart_brain'
  }
});


const app = express();

app.use(cors());

app.use(bodyParser.json());


app.get('/', (req,res)=>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {sigin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res)=>{image.handleApiCall(req, res)})


app.listen(3000, ()=>{
	console.log("App is running on port 3000");
});