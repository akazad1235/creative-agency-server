const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0dyf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const agencyCollection = client.db("creativeAgency").collection("serviceOrder");
  
//     app.post('/newOrder', (req, res) => {
//         const serviceOrder = res.body;
//         agencyCollection.insertOne(serviceOrder)
//         .then( result => {
//             res.send(result.insertedCount>0)
//         })
//         console.log(serviceOrder);
//     })
//    // console.log('db connected success');
// });

app.post('/newOrder', (req, res) => {
  const newOrder = req.body;
  agencyCollection.insertOne(newOrder)
  .then( result => {
      res.send(result.insertedCount > 0);
    
  })
  console.log(newOrder);
});

app.get('/orderList', (req, res) => {
  agencyCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})





});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  


  // app.listen(process.env.PORT || port)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })