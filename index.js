const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const port = 4200;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0dyf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const agencyCollection = client.db("creativeAgency").collection("serviceOrder");
  
    // app.post('/addServiceOrder', (req, res) => {
    //     const serviceOrder = res.body;
    //     agencyCollection.insertOne(serviceOrder)
    //     .then( result => {
    //         res.send(result.insertedCount)
    //     })
    // })
    console.log('db connected success');
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  


  app.listen(process.env.PORT || port);