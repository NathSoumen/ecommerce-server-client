const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

async function getAllUsers(req, res, next) {
  const users = await userModel.find({});
  try {
    return res.status(200).json({ succss: true, data: users });
  } catch (error) {
    return res.status(500).json({ succss: false, data: [], error });
  }
}
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email Or Password is missing");
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      userModel.comparePassword("wrongPassword", (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else if (!isMatch) {
          console.log("Password does not match.");
        } else {
          const secretKey = process.env.SECRETKEY;

          // Generate the JWT token with an expiration time of 24 hours (in seconds)
          const expiresIn = 24 * 60 * 60; // 24 hours

          const token = jwt.sign(userData, secretKey, { expiresIn });
          console.log("Password is correct.");
          return res.status(200).json({success:true,data:token})
        }
      });
    } else {
      throw new Error("Invalid Email");
    }
  } catch (error) {
    return res.status(500).json({ succss: false, data: [], error });
  }
}
async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email Or Password is missing");
    }
    const user = await userModel.findOne({email:email});
    if(user) {
      return res.status(400).json({ succss: false, msg:"Email is already exists" });

    }else {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document and save it to the database
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    }
    return res.status(200).json({ succss: true, data: newUser });
  } catch (error) {
    return res.status(500).json({ succss: false, data: [], error });
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  login: login,
  register:register
};