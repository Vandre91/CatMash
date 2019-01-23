/* eslint-disable */
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cats = require('./src/assets/Cats.json');
const app = express();
const publicRoot = '/dist';

let con = mysql.createConnection({
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "b06fcdea6ae955",
    password: "696f5092",
    database:"heroku_6bd658b7a5d6f32"
  });
  
con.connect(async function(err) {
    if (err) throw err;
    console.log("Connected!");
    await con.query('CREATE TABLE Cat (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,url VARCHAR(250) NOT NULL,cat_id VARCHAR(250) NOT NULL,vote INT(100))')
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

app.use(express.static(publicRoot))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {  
    res.sendFile("index.html", { root: publicRoot })
})

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
    con.query('select * from Cat ORDER BY vote DESC LIMIT 100', function (err, recordset) {
        
        if (err) console.log(err)
        res.send(recordset);
        
    });
});

app.listen(8080);