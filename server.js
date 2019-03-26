const express = require('express');
const bp = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register =require('./controller/register');      
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');


const pdb= knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : '123456',
          database : 'face_server'
        }
      });
const app = express();
app.use(bp.json());
app.use(cors());
   

app.get('/',(req,res)=>{
    res.send('it was not working');
})
app.post('/signin',(req,res) =>{ signin.handlesignin(req,res,pdb,bcrypt)})
app.post('/register',(req,res) =>{register.handleRegister(req,res,pdb,bcrypt)})
app.get('/profile/:id',(req,res) =>{profile.handleprofile(req,res,pdb)})
app.put('/image',(req,res)=>{ image.handleimage(req,res,pdb)})
app.post('/imageurl',(req,res)=>{ image.handleapi(req,res)})
app.listen(process.env.PORT ||3000,() =>{
    console.log(`app is running ${process.env.PORT}`);
})



/*
/---res =working
/sigin --->post =success/fail
/register --->Post = user
/profile/userid --->Get = user
/image --->Put -->count



*/