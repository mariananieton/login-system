const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
});

// conectando ao banco de dados
connection.connect(function(error){
    if (error) throw error 
    else console.log("Conectado ao Banco de Dados com sucesso!")
})


app.get("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// quando o logado com sucesso
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

// setando app port
app.listen(4500);