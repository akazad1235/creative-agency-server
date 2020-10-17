const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileUpload');
require('dotenv').config();
const port = 4200;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('service'));
app.use(fileUpload());

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0dyf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const agencyCollection = client.db("creativeAgency").collection("serviceOrder");
  const reviewsCollection = client.db("creativeAgency").collection("reviews");
  const addServiceCollection = client.db("creativeAgency").collection("services");
  
app.post('/newOrder', (req, res) => {
  const newOrder = req.body;
  agencyCollection.insertOne(newOrder)
  .then( result => {
      res.send(result.insertedCount > 0);
    
  })
  console.log(newOrder);
});

//customer order list
app.get('/orderList', (req, res) => {
  agencyCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

//admin order list
app.get('/adminOrderList', (req, res) => {
  agencyCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

//review collection
app.post('/addReview', (req, res) => {
  const addReview = req.body;
  reviewsCollection.insertOne(addReview)
  .then( result => {
      res.send(result.insertedCount > 0);
    
  })
  console.log(addReview);
});
//Client Review
app.get('/clientReview', (req, res) => {
  reviewsCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})


//Service add
  app.post('/addService', (req, res) =>{
    const file = req.files.file;
    const title = req.body.title;
    const desc = req.body.desc;
    const fileName = file.name;
    file.mv(`${__dirname}/service/${file.name}`, err => {
      if(err){
        console.log(err);
        return res.status(500).send({msg:'filed to upload image'});
      }
      return res.send({name: file.name, path:`/${file.name}`})
    })

    addServiceCollection.insertOne({ title, desc, fileName })
        .then(result => {
            res.send(result.insertedCount > 0);
        })
  })


    //send service to home page
app.get('/serviceList', (req, res) => {
  addServiceCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})


});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  


  app.listen(process.env.PORT || port);

  