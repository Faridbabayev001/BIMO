const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('@models/users.model');
const config = require("@root/config");

module.exports = {
  add: (req, res) => {
    let result = {};
    let status = 201;
    if (req.body) {
      const { name, password } = req.body;
      const user = new User({ name, password }); // document = instance of a model
      // TODO: We can hash the password here before we insert instead of in the model
      user.save((err, user) => {
        if (!err) {
          result.result = user;
        } else {
          status = 500;
          result.error = err;
        }
      });
    } else {
      status = 500;
      result.error = 'Body is null or empty';
    }
    result.status = status;
    res.status(status).send(result);
  },
  login: (req, res) => {
    const { name, password } = req.body;

    let result = {};
    let status = 200;
    User.findOne({ name }, (err, user) => {
      if (!err && user) {
        // We could compare passwords in our model instead of below as well
        bcrypt.compare(password, user.password).then(match => {
          if (match) {
            status = 200;
            // Create a token
            const payload = { user: user.name };
            const options = { expiresIn: config.expiresIn, issuer: config.issuer };

            const secret = config.jwt_secret_token;
            const token = jwt.sign(payload, secret, options);

            result.token = token;
            result.result = user;
            res.status(status).send(result);
          } else {
            status = 401;
            result.error = `Authentication error`;
            res.status(status).send(result);
          }
        }).catch(err => {
          status = 500;
          result.error = err;
          res.status(status).send(result);
        });
      } else {
        status = 404;
        result.error = err;
        res.status(status).send(result);
      }
    });
    result.status = status;
    res.status(status).send(result);
    // res.status(status).send(result);
  },
  getAll: (req, res) => {
    let result = {};
    let status = 200;
    const payload = req.decoded;
    // TODO: Log the payload here to verify that it's the same payload
    //  we used when we created the token
    // console.log('PAYLOAD', payload);
    if (payload && payload.user === 'admin') {
      User.find({}, (err, users) => {
        if (!err) {
          result.error = err;
          result.result = users;
          res.status(status).send(result);
        } else {
          status = 500;
          result.error = err;
          res.status(status).send(result);
        }
      });
    } else {
      status = 401;
      result.error = `Authentication error`;
      res.status(status).send(result);
    }
    result.status = status;
    res.status(status).send(result);
  }
}