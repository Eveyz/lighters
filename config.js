const env = process.env;


if (process.env.NODE_ENV !== "test") {
  const mongoose = require('mongoose');
  mongoose.set('strictQuery', false);
  const uri = process.env.MONGODB_URI;
  
  const clientOptions = {
    // useNewUrlParser: true, 
    // useCreateIndex: true,
  };

  var db = mongoose.connect(uri, clientOptions).then(
    async () => {
      const ddb = mongoose.connection.db;
      const collections = await ddb.listCollections().toArray();
      // console.log(collections);
      mongoose.connection.db.admin().command({ ping: 1 }).then(
        () => {
          console.log("Pinged your deployment. You successfully connected to MongoDB! ", uri);
        },
        err => { console.error(err) }
      )
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
