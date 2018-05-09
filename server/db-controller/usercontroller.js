import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import models from '../models/index';

dotenv.config();
// import config from '../../config';

// const user = require('../models').User;
const userModel = models.User;
class BusinessUser {
  static createUser(req, res) {
    return userModel
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((users) => {
        if (users) {
          return res.status(409).json({
            message: 'user already exist',
          });
        }
        return userModel
          .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
          })
          .then((newUser) => {
            const accessToken = jwt.sign(
              {
                username: newUser.username,
                userId: newUser.id,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: 60 * 60,
              },
            );
            res.status(201).send({
              message: 'user created successfully',
              token: accessToken,
            });
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }

  static userLogin(req, res) {
    return userModel
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((businessUser) => {
        if (!businessUser) {
          return res.status(404).json({
            message: 'wrong username or password',
          });
        }
        if (bcrypt.compareSync(req.body.password, businessUser.password)) {
          const userToken = jwt.sign(
            {
              id: businessUser.id,
              username: businessUser.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: 60 * 60 },
          );

          return res.status(200).json({
            token: userToken,
            message: 'Login successful',
          });
        }
        return res.status(401).json({
          message: 'Sorry you dont have access to this resources',
        });
      })
      .catch(err => res.status(400).send(err));
  }
}

export default BusinessUser;
