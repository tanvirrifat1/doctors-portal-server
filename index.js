const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000

const app = express();

//middleWare
app.use(cors());
app.use(express.json());

//----------//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.afkplob.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions');
        const bookingCollection = client.db('doctorsPortal').collection('bookings')
        //api get
        app.get('/appointmentOptions', async (req, res) => {
            const query = {}
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options);
        });

        //api post
        app.post('/bookings', async (req, res) => {
            const booking = req.body
            console.log(booking);
            const result = await bookingCollection.insertOne(booking);
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))

app.get('/', async (req, res) => {
    res.send('Doctors Portal server is running')
})

app.listen(port, () => {
    console.log(`Doctors Portal running on ${port}`)
})