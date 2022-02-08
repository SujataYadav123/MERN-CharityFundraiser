const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FundRaiser = require('./FundRaiser');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required:true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailID: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    // validate(value) {
    //   if (!this.validate.isStrongPassword(value)) {
    //     throw new Error('Password does not match requirement');
    //   }
    // },
  },
  commisionFee: {
    type: Number,
    validate(value) {
      if (value >= 100 && value <= 0) {
        throw new Error('Invalid commision entry');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.virtual('fundRaisers', {
  ref: 'FundRaiser',
  localField: '_id', //_id is the user _id
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
//generate token
userSchema.methods.generateAuthToken = async function () {
  console.log('Hit');
  const user = this;
  //generate jwt
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
  console.log(token);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
//login : used bcryptjs
userSchema.statics.findByCredentials = async (emailID, password) => {
  const user = await CharityPartner.findOne({ emailID });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};
//for hashing passwords, minLength of 8
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const CharityPartner = mongoose.model('CharityPartner', userSchema);
module.exports = CharityPartner;
