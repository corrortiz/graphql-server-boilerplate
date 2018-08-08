import _ from 'lodash';
import Users from '../models/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const create = userProps => {
  const user = new Users(userProps);
  return user.save();
};

// export const delete = (_id) => Users.findByIdAndRemove({ _id })

export const edit = (_id, userProps) =>
  Users.findByIdAndUpdate({ _id }, userProps);

export const find = _id => Users.findById(_id);

export const findAll = () => Users.find({});

export const login = credentials => {
  return Users.findOne({ name: credentials.name }).then(user => {
    return bcrypt.compare(credentials.password, user.password).then(isMatch => {
      return new Promise((resolve, reject) => {
        if (isMatch === false) {
          reject(new Error('Incorrect Password'));
        }

        const token = jwt.sign(
          {
            user: _.pick(user, ['_id', 'name', 'type'])
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '30d'
          }
        );
        user.jwt = token;
        resolve(user);
      }).catch(error => new Error(error));
    });
  });
};
