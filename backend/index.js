const cors = require('cors');
const express = require('express');
const { MongoClient, ObjectId  } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://medatwalnimish:test123@assignment.c0plkcu.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let currentId = 1;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase().catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post('/api/form-data', async (req, res) => {
  try {
    const { name, phoneNumber, email, hobbies } = req.body;
    const db = client.db('assignmentdata'); 
    const collection = db.collection('data'); 
    const dataWithId = { id: currentId++, name, phoneNumber, email, hobbies };

    const result = await collection.insertOne(dataWithId);
    console.log('Data inserted:', result);

    res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

app.get('/api/data', async (req, res) => {
    try {
      const db = client.db('assignmentdata'); 
      const collection = db.collection('data'); 
        
      const data = await collection.find().toArray();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });
  app.delete('/api/data/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const id1=id;
      console.log(id1);
      const db = client.db('assignmentdata');
      const collection = db.collection('data');
        const result = await collection.deleteOne({ id: Number(id1) });
      console.log('Data deleted:', result);
  
      res.status(200).json({ message: 'Data deleted successfully', result });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Failed to delete data' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
