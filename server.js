const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register') 
const siginin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'eugene',
		password: '',
		database : 'smart-brain'
	}
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
})

app.post('/signin', siginin.handleSignin(db,bcrypt))

app.post('/register', (req,res) => {register.handleRegister(req,res,db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(3003, () => {
	console.log('app is running on port 3003')
})

/*
/ => res = this is working
/signin => POST = success/fail
/register => POST = user
/profile/:userId => GET = user
/image => PUT => updated user


*/