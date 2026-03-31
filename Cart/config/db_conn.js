const mongoose = require('mongoose');
// env vars loaded by server.js

// Use MONGO_URI from .env — works with both local and Atlas
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('ERROR: MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to MongoDB: ${mongoose.connection.name}`))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = mongoose;