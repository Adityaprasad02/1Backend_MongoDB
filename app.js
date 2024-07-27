//npx nodemon app.js
const express = require('express');
const app = express();

const userModel = require('./model/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path = require('path');
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/' , function(req,res){
 res.render("create");
})

//READ
app.get('/read' , async function(req,res){
let readData = await userModel.find();
res.render("read", {readData}) //readData is an Array
})

//CREATE
app.post('/create', async function(req,res){
    let createdUser = await userModel.create(
        {
            name : req.body.name,
            email : req.body.email,
            image : req.body.img
        }
    )
    res.redirect('/read');
})

//DELETE
app.get('/delete/:id' , async function(req,res){
    let deleteUser = await userModel.findOneAndDelete({_id : req.params.id})
    res.redirect('/read');
})

//READ-CHECK
app.get('/readmydata' , async function(req,res){
    let readmyData = await userModel.find();
    res.send(readmyData) //readData is an Array
    })

//EDIT
app.get('/edit/:id' ,async function(req,res){
let editData = await userModel.findOne({_id : req.params.id});
res.render("update",{editData})
})
//UPDATE
 app.post('/update/:id' , async function(req,res){
   await userModel.findOneAndUpdate({_id: req.params.id},{name : req.body.name,email : req.body.email,image : req.body.img},{new:true})
    res.redirect('/read')
 })
app.listen(3000);
