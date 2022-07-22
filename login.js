const mysql = require("mysql");
const express = require("express");

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


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


// setando app port
app.listen(4500);