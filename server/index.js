const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const e = require("express");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Cookies = require("universal-cookie");
const cookies = new Cookies();

//app.options('*',cors())
app.use(express.json());
app.use(cors(
    {
    origin:["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
    }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));

app.use(session({
    key: "userID",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expries: 60*60*24,
    },
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "waste_management"
})



app.get("/login", (req,res) => {
    if (req.session.user){
        res.send({loggedIn : true, user: req.session.user});
    }else {
        res.send({loggedIn : false});
    }
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE user = ? AND password = ?",
        [username,password],
        (err,result) => {
            if (err) {
                res.send({err:err});
            }

            if (result.length > 0) {
                cookies.set('User',result,{path:'/'});
                res.send(result);
            } else {
                res.send({message: "Wrong username/password combination"});
            }
        }
    );
});


app.get('/showUser',(req,res) =>{
    db.query("SELECT * FROM users", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/showPoint',(req,res) =>{
    db.query("SELECT * FROM scanpoint", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/showHistory',(req,res) =>{
    db.query("SELECT * FROM history ORDER BY No DESC", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.post('/adduser', (req,res) => {
    const surname = req.body.surname;
    const lastname = req.body.lastname;
    const uid = req.body.uid;
    const address = req.body.address;

    db.query("INSERT INTO users (Surname,Lastname,UID,Address,Role) VALUES (?,?,?,?,?)",
        [surname,lastname,uid,address,"C"],
        (err,result) => {
            if (err) {
                console.log(err)
            }else {
                res.send("Adduser success")
            }
        });
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM users where ID = ?",id,(err,result) => {
        if (err){
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get('/getUID',(req,res) =>{
    db.query("SELECT UID FROM register ORDER BY ID DESC LIMIT 1", (err,result) => {
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.listen('3001',() =>{
    console.log('Server is running on port 3001')
});


