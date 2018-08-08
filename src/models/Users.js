import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: String,
  password: String,
  type: String
});

UsersSchema.pre('save', function checkt(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

const Users = mongoose.model('users', UsersSchema);

export default Users;
