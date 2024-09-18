const env = process.env;


if (process.env.NODE_ENV !== "test") {
  const mongoose = require('mongoose');
  const uri = process.env.MONGODB_URI;
  
  const clientOptions = {
    useNewUrlParser: true, 
    useCreateIndex: true,
    serverApi: { version: '1', strict: true, deprecationErrors: true } 
  };

  var db = mongoose.connect(uri, clientOptions).then(
    () => {
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    },
    err => {
      console.log("Failed to continue using mongodb. ", err)
      mongoose.disconnect();
    }
  );
  
  module.exports = {
    port: env.PORT || 8000,
    jwtSecret: 'znz@lighters',
    db: db
  };
}
