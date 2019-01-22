const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cats = require('./src/assets/Cats.json')
const app = express(); 

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"catmash"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    LoadData();
});

function LoadData(){
    let data_in_array = [];
    for(i = 0; i < cats.images.length; i++){
        insert = [];
        insert = [cats.images[i].url,cats.images[i].id];
        data_in_array.push(insert)
    }
    con.query('INSERT INTO Cat (url, cat_id) VALUES ?',[data_in_array]);
}

function insertVote(e){
    con.query('UPDATE Cat SET vote='+e.vote+' WHERE id= ?',e.id.toString());
}

app.use(bodyParser.json())

app.post('/api/Vote', function(req, res) {
    let product = {};
    record = JSON.parse(JSON.stringify(req.body));
    
    con.query("SELECT * FROM Cat WHERE cat_id = ?",record.id.toString(), function (err, result, fields) {
        if (err) throw err;
        product = result[0];
        product.vote++;
        insertVote(product);
    });

    res.send('You well vote');
});

app.get('/api/GetStatistic', function(req, res) {
    con.query('select * from Cat ORDER BY vote DESC LIMIT 10', function (err, recordset) {
        
        if (err) console.log(err)
        console.log(JSON.stringify(recordset));
        res.send(recordset);
        
    });
});

app.listen(8000);