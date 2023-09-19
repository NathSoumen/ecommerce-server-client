const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  // country: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("hashedPassword",hashedPassword);

    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare a given password with the stored hashed password
userSchema.methods.comparePassword =  (candidatePassword,hash, callback) =>{
  console.log(candidatePassword,'this.password',this.password);
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// Create the User model
const User = mongoose.model('Users', userSchema);

module.exports = User;
