const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const e = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


app.use(cors(
    // {
    // origin : ["http://localhost:3000"],
    // methods : ["POST","GET"],
    // credentials : true
    // }
));
app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure : false,
//         maxAge : 1000*60*60*24
//     }
// }))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "waste_management"
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
                // req.session.username = username;
                // console.log(req.session.username);
                res.send(result);
                //return res.json({Login: true})
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

// app.get('/',(req,res) => {
//     if(req.session.username){
//         return res.json({valid:true, username:req.session.username})
//     }else {
//         return res.json({valid:false})
//     }
// })

app.listen('3001',() =>{
    console.log('Server is running on port 3001')
});


