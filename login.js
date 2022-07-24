const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });
const axios = require("axios");

const app = express();
app.use("/assets",express.static("assets"));

app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

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

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/tasks");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// quando o logado com sucesso
app.get("/tasks",function(req,res){
    connection.query("SELECT loginuser.user_name, tasks.task_name FROM nodejs.loginuser loginuser JOIN nodejs.tasks tasks ON loginuser.user_id = tasks.fk_user_id;",[],function(error,result){
        if(error){
            res.status(200).send(error);
        }
        res.render('tasks', { lista : result });
    });
});

// consumindo API de Pokémon

axios.get("https://pokeapi.co/api/v2/pokemon").then(function(response){
    console.log(response.data);
});

app.listen(4000);