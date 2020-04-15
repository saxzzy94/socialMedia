const express = require('express');
// const mongoose = require('mongoose');
const {
  MongoClient
} = require('mongodb');

const users = require('./route/api/users');
const profile = require('./route/api/profile');
const post = require('./route/api/post');

const app = express();

//DB Config
const uri = require('./config/keys').mongoUrl;

//Connect to Mongoose

// Solution from stackoverflow
// mongoose.set('useFindAndModify', true);
// mongoose.set('useCreateIndex', true);
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err))
// async function main() {

//Connect to MongoDB Atlas
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

//   try {
//     await client.connect();
//     await listDatabases(client);
//   } catch (e) {
//     console.log(e)
//   } finally {
//     await client.close();
//   }
// }
// main().catch(console.error);

app.get('/', (req, res) => res.send('Hello'));

//User Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`));