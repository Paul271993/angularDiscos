const express = require('express');
let mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let cors = require('cors');
app.use(cors());


let connection = mysql.createConnection(
{

    host: '127.0.0.1',
    user: 'root',
    password: null,
    database: 'angular'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('Conexion correcta');
    }
    
});

app.get('/', (req,res)=>{
    res.send('Hola')
});

app.get("/discos", function(req,res){
    let sql = 'SELECT * FROM discos';
    connection.query(sql, function(err,result){
        if(err) throw err;
        res.json({
            result
        })
    })
});


app.get("/discos/:id", function(req,res){
    // let {id } = req.params
    let sql = 'SELECT * FROM discos WHERE id='+req.params.id;
    connection.query(sql, function(err,result){
        if(err) throw err;
        res.json({
            result
        })
    })

});

app.post("/discos", function(req,res){
    let titulo = req.body.titulo;
    let interprete = req.body.interprete;
    let anyoPublicacion = req.body.anyoPublicacion;

    let sql = `INSERT INTO discos (titulo,interprete,anyopublicacion) VALUES ("${titulo}", "${interprete}", "${anyoPublicacion}")`;
    
  
    connection.query(sql, function(err,result){
        if(err) throw err;
        res.send(
            result
        )
    })

});

app.put("/discos", function(req,res){
    let id = req.body.id;
    let titulo = req.body.titulo;
    let interprete = req.body.interprete;
    let anyoPublicacion = req.body.anyoPublicacion;


    let sql = `Update discos SET titulo="${titulo}", interprete="${interprete}", anyoPublicacion="${anyoPublicacion}" WHERE id=${id}`;

    connection.query(sql, function(err,result){
        if(err) throw err;
        res.send(
            result
        )
    })
});

app.delete("/discos", function(req,res){

    let id = req.body.id;

    let sql = `DELETE FROM discos WHERE id=${id}`;

    connection.query(sql, function(err,result){
        if(err) throw err;
        res.send(
            result
        )
    })

});


app.listen(3000);
