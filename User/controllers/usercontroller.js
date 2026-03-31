const userModel = require('../models/userModel');
const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// const getUsers = async (req, res) => {
//     // const allusers = await userModel.find();
//     res.json(req.user)
// }

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id, { password: 0 });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const foundUser = await userModel.findOne({ email: email });
        if (foundUser) {
            res.status(400).json({ message: "user already exists" })
        } else {
            const user = await UserModel.create({
                email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                phone: req.body.phone,
                gender: req.body.gender
            })
            res.json(user.id)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
      
        if (user && (await bcrypt.compare(password, user.password))) {
          const accessToken = jwt.sign(
            {
              user: {
                email: user.email,
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                phone: user.phone,
                gender: user.gender
              },
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "5m" }
          );
          res.status(200).json({ token: accessToken, user: user });
          console.log(accessToken);
        } else {
          res.status(401).json({ message: "Wrong email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
    // getUsers,
    getUser,
    userRegister,
    loginUser
}