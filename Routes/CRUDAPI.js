//CRUD Api
const express = require("express");
const mongoose =  require("mongoose");
// const Users = require('..Model/Users.js');
const users = require('../Model/Users');
const Users = require("../Model/Users");
const router = express.Router();

//creating API[users is api name]
router.post('/users',async ( req,res) => {
    try{
        const email = req.body.email;
        console.log(email)//vaishaliteli8@gmail.com
        const findUser = await users.findOne({email});
        console.log(findUser);
        if(findUser){
            return res.status(402).json({message : "user/email already exist"});

        }

        const newUser =  await users.create({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            gender:req.body.gender,
            password:req.body.password,
        });
        // newUser.save()
        return res.status(200).json({message: "user created successfully"});


    } catch (err) {
        return res.status(500).json({message : err.message});
    }
 
    
});

//put method..path-->email
router.put('/users/:email',async ( req,res) => {
    try{
        const {email} = req.params;
        console.log(email);
        const findEmail = await Users.findOne({email});


        if(!findEmail){
            return res.status(402).json({message : "email doesn't exist"});

        }
        
        const newUser = {
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            gender:req.body.gender,
            password:req.body.password,
        };

        const updatedData = await Users.findOneAndUpdate({email}, newUser);
 
        return res.status(200).json({message: "user updated successfully", newUser});


    } catch (err) {
        return res.status(500).json({message : err.message});
    }
 
    
});

//GET nethod
router.get("/users" , async(req,res) => {
    try{
      const getUsersData = await Users.find();
      return res.status(200).json( getUsersData);
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});

//GET nethod if u want only only data
router.get("/users/:email" , async(req,res) => {
    try{
      const {email} = req.params;
      const getUsersData = await Users.findOne({email});
      return res.status(200).json( getUsersData);
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});


// Delete method()
router.delete("/users/:email" , async(req,res) => {
    try{
      const {email} = req.params;
      const getUsersData = await Users.findOneAndDelete({email});
      return res.status(200).json( {message :" user deleted successfully.."});
    }catch(err){
        return res.status(500).json({ message: err.message});
    }
});



module.exports =  router;

