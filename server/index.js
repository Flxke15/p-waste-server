const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

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

app.listen('3001',() =>{
    console.log('Server is running on port 3001')
});


