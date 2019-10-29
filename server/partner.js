const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get partner
router.get('/', async (req,res) => {
    const data = await loadPartnersCollection();
    res.socket.setNoDelay();
    res.send(await data.find({}).toArray());
});

//insert partner
router.post('/', async(req,res) => {
    const data = await loadPartnersCollection();
    
    await data.insertOne(
        req.body
    );
    res.status(201).send();
});

//edit partner
router.put("/", async (req,res) => {
    //console.log(req.body);
    
    const data = await loadPartnersCollection();
    let querry = {_id: new mongodb.ObjectID(req.body._id)}

    let updateObj = { $set :{  
        localId: req.body.localId,
        name: req.body.name,
        active: req.body.active
    }}
        
    data.updateOne(querry, updateObj, function(err, res) {
        if (err) throw err;
    });
        
    res.status(200).send();
});

//delete partner
router.delete('/:id', async(req,res) => {
    const data = await loadPartnersCollection();
    await data.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPartnersCollection() {
    //'mongodb://localhost/podaci'
    //'mongodb+srv://nikola:Thenikgame93@cluster0-b924k.mongodb.net/test?retryWrites=true&w=majority'

    const uri = 'mongodb+srv://rajovicmirko:Mirkasin.12345@cluster0-folf1.mongodb.net/admin?retryWrites=true&w=majority'
    const dbName = 'orders'
    const collection = 'partner'

    const client = await mongodb.MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const data = client.db(dbName).collection(collection);

    return data;
}
module.exports = router;
