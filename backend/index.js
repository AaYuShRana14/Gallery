import { z } from 'zod';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const TheUsers=require('./Model/User.cjs')
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authenticateJwt=require('./Middleware/Authjwt.cjs');
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
const secret="isdjdsodefrk545";
mongoose.connect('mongodb+srv://antineutrino1464:G8lVrHHHj9q5mnuw@cluster0.vyhktec.mongodb.net/coursesretryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const userdata = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(25)
})
app.post('/user/signup', async(req, res) => {
    const data = userdata.safeParse(req.body);
    if (data.success) {
        const { email, password } = data.data;
        let images=[];
        const user=await TheUsers.findOne({email});
        if(user){
            res.status(403).send({message:"User already exists"});
            return;
        }
        else{
            const newUser= new TheUsers({email,password,images});
            await newUser.save();
            const token=jwt.sign({password,email},secret, { expiresIn: '12h' });
            res.status(200).json({message: 'User created successfully', token});
            return;
        }
    }
    res.status(401).send("invalid");
})
app.post('/user/login',async(req,res)=>{
    const data = userdata.safeParse(req.body);
    console.log("**********");
    console.log(data);
    if(data.success){
        const { email, password } = data.data;
        const user=await TheUsers.findOne({email,password});
        if(!user){
            res.status(403).json({ message: 'Invalid credentials' });
        }
        else{
            const token=jwt.sign({password,email},secret, { expiresIn: '12h' });
            res.status(200).json({message: 'Logged in successfully', token});
        }
    }
})
app.post('/upload',authenticateJwt,async(req,res)=>{
    const{email,password}=req.user;
    const {img}=req.body;
    if(img){
        const user=await TheUsers.findOne({email,password});
        user.images.push(img);
        await user.save();
    }
    res.sendStatus(200);
})
app.get('/photos',authenticateJwt, async(req, res) => {
    const{email,password}=req.user;
    const user=await TheUsers.findOne({email,password});
    res.json({images:user.images})
})
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
