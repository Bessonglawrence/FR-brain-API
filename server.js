const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

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

app.post('/signin', (req, res) => {sigin.handleSignin(req, res, db)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{
	const { id }= req.params;
	db.select('*').from('users').where({ id })
	.then(user => {
		if(user.length){
			res.json(user[0]);
		} else {
			res.status(400).json('User not found')
		}
	})
	.catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res)=>{
	const { id }= req.body;
	db('users').where('id', '=', id )
	.increment('entries', 1)
	.select('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable to add entry'))
})


app.listen(3000, ()=>{
	console.log("App is running on port 3000");
});