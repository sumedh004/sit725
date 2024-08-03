const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = "mongodb+srv://s223654321:H7uDcmOy0UTjPVAl@cluster0.opevcdh.mongodb.net/"
const port = process.env.PORT || 3000;
let contactCollection;
let scheduleCollection;

app.use(express.static(__dirname + '/public'));


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        contactCollection = client.db().collection('Contacts');
        scheduleCollection = client.db().collection('Schedule');
        console.log('Connected to database');
    } catch (ex) {
        console.error(ex);
    }
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    contactCollection.insertOne({ name, email, message }, (err, result) => {
        if (err) {
            res.status(500).json({ statusCode: 500, message: 'Error saving contact' });
        } else {
            res.status(201).json({ statusCode: 201, message: 'Contact form submitted successfully.' });
        }
    });
});

// Fetch schedule data
app.get('/api/schedule', (req, res) => {
    scheduleCollection.find({}).toArray((err, result) => {
        if (err) {
            res.status(500).json({ statusCode: 500, message: 'Error fetching schedule' });
        } else {
            res.status(200).json({ statusCode: 200, data: result });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    runDBConnection();
});