const mysql = require("mysql");

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
