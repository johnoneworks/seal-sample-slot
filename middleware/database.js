import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vendor_dev01:<password>@seal-sample-vendor.jhbma.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); 
*/

const uri = "mongodb+srv://vendor_dev01:y49yNDfUBtN3NCc@seal-sample-vendor.jhbma.mongodb.net/SEAL-SAMPLE-VENDOR";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('SEAL-SAMPLE-VENDOR');
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;