/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');
const urlmongo = process.env.MONGODB_URI || "mongodb://localhost:27017/CatMash";
const port = process.env.PORT || 8000;
const publicRoot = './dist'

mongoose.connect(urlmongo);
 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 

let catSchema = mongoose.Schema({
    url: String, 
    id: String, 
    vote: Number   
}); 
 
let cat = mongoose.model('cats', catSchema);

app.use(bodyParser.json())
app.use(express.static(publicRoot))

app.get("/", (req, res, next) => {  
    res.sendFile("index.html", { root: publicRoot })
})

app.post('/api/Vote',async function(req, res) {
    console.log("record "+req.body.id);
    await cat.findOne({ id: req.body.id})
      .then((data) => {
            res.status(200);
            console.log("data "+data);
            if(data != null){
                console.log("data Not Null ");
                cat.updateOne({"vote": parseInt(data.vote)},{$set: {"vote": parseInt(data.vote+1)}})
                    .then(e => console.log(e));;
            }
            else{
                const newCat = new cat(req.body);
                newCat.vote = 1
                console.log("data not find "+newCat);
                newCat.save()
                .then(e => console.log(e));
            }
            
        })
      .catch((error) => {
        console.log("data error "+error);
        res.status(500);
      });
    

    res.send('You well vote');
});

app.get('/api/GetStatistic',async function(req, res) {
    await cat.find({}).sort({vote: -1}).then((data) => {
        console.log("data true "+data);
        res.send(data);
      }).catch((error) => {
          console.log("data error ");
          res.status(500);
      });
});

app.listen(port);