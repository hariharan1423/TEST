const express = require('express');

//create a class for the pg and assigning it in the variable
const Pool = require('pg').Pool;
const app = express();


//bodyparser is used for the destructuring purpose!!!
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

//setting up the pug!!
app.set('view engine','pug');

//for rendering static files(css)!
app.use(express.static('../FORM/static'));

const port=3000;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'TEST',
    port:5432,
    password:'studywell333'
})

pool.connect((err)=>{
    if(err) throw err;

    console.log('DATABASE CONNECTED!');
})

//rendering html in port 3000(server port) through express 
app.get('/',(req,res)=>{
    res.status(200).sendFile('index.html',{root:__dirname});
})


//for showing the data in the html using pug template(HTML TEMPLATE WHICH USES js objects as arguments and render it as a string in the web)
app.get('/details',(req,res)=>{
    pool.query('select * from details',(err,results)=>{
        if(err) throw err;
        res.render('details',{title:'Details',items:results.rows});
        //console.log(results.rows)
    })
})


//for submitting and storing data into sql!!!
app.post('/submit',(req,res)=>{
    const {fname,lname,email,phn,gender,address,city,country,state,zip}=req.body;


    pool.query('insert into details(firstName,lastName,email,phonenumber,gender,address,city,country,state,zipcode) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[fname,lname,email,phn,gender,address,city,country,state,zip],(err)=>{
        if(err) throw err;

        res.render('success',{title:"SUCCESSFULL",message:'DATA HAS BEEN STORED SUCCESSFULL!!!'})
    })
})


app.listen(port,(err)=>{
    if(err) throw err;
    console.log('PORT CONNECTED')
})