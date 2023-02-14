const express = require("express");
const router = express.Router();
const UserModel = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//Sign up rest API
router.post("/signup", (req, res) => {
  const { fullName, email, company, password, profileImg } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Please enter all mandotary fields" });
  }
  UserModel.findOne({ email: email })
    .then((userInDb) => {
      if (userInDb) {
        return res
          .status(500)
          .json({ error: "User with same email already exist" });
      }
      bcryptjs
        .hash(password, 16)
        .then((hashedPassword) => {
          const user = new UserModel({
            fullName,
            email,
            password: hashedPassword,
            profileImg,
            company,
          });
          user
            .save()
            .then((newUser) => {
              res.status(200).json({ result: "User signed up successfully" });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
//Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all mandotary fields" });
  }
  UserModel.findOne({ email: email })
    .then((userInDb) => {
      if (!userInDb) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      bcryptjs
        .compare(password, userInDb.password)
        .then((didMatch) => {
          if (didMatch) {
            const jwtToken = jwt.sign({ _id: userInDb._id }, JWT_SECRET);
            const userInfo = {
              _id: userInDb._id,
              email: userInDb.email,
              fullName: userInDb.fullName,
              profileImg: userInDb.profileImg,
            };
            res
              .status(200)
              .json({ result: { token: jwtToken, user: userInfo } });
          } else {
            return res.status(401).json({ error: "Invalid Credentials" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
