// importing jsonwebtoken
import jwt from 'jsonwebtoken';
// import config from '../../config';

// importing dotenv
import dotenv from 'dotenv';

dotenv.config();

// environment secret key
const secretKey = process.env.SECRET_KEY;

/**
    *@returns{object} description
    *@param{*}request
    *@param{*}response
    *@param{*}next
*/
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(401).json({
      messsage: 'You do not have access to this resources, please login',
    });
  }
};
export default verifyToken;
