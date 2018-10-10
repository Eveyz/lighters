const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');

// Format of token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer is undefined
  if(typeof(bearerHeader) !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token to req
    req.body.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function verifyAdmin(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  let token;
  if(authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if(token) {
    jwt.verify(token, config.jwtSecret, (err, tokenData) => {
      if(err) { 
        res.status(401).json({error: 'Failed to authenticate token'}); 
      } else {
        User.findById({'_id': tokenData.userTokenData.id}, function(err, user) {
          if(err) throw err;

          if(!user) {
            res.status(404).json({error: 'No such user'});
          }
          if(!user.isAdmin) {
            res.status(401).json({error: 'Unauthorized!'});
          }

          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    next();
  }
}

module.exports = {
  verifyToken: verifyToken,
  verifyAdmin: verifyAdmin
}