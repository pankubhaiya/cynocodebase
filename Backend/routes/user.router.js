
const express = require("express")
const jwt = require("jsonwebtoken")
const { passport } = require("./auth");
const { authorization } = require("../middlewares/auth")
require("dotenv").config()
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const { usermodel } = require("../models/user.Schema")
userRouter.use(express.json())

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'jainpankaj0987@gmail.com',
    pass: process.env.secret_emailkey
  }
});

userRouter.post("/sign", async (req, res) => {
  const { email, name, password,Confrimpassword,number } = req.body
  try {
    if(!email || !name || !password || !Confrimpassword || !number){
       return  res.send({ "ok": false, "msg": "please fill all field " });
    }
    if(Confrimpassword !== password){
      return  res.send({ "ok": false, "msg": "please fill same password " });
    }
    let presentUser = await usermodel.findOne({ email })

    if (presentUser) {
      res.send({ "ok": false, "msg": "user already register" });
    } else {

      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ "ok": false, "err": "Something went wrong while hashing" });
        }
        const verificationToken = await jwt.sign({ email }, process.env.JWT_SECRET)
        const user = new usermodel({ name, email, password: hash, verificationToken,number });
        await user.save();


        // email to verify

        const verificationLink = `http://localhost:9090/user/verifyemail?token=${verificationToken}`;
        const mailOptions = {
          from: 'jainpankaj0987@gmail.com',
          to: email,
          subject: 'Email Verification',
          text: `Click the following link to verify your email:${verificationLink}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.send(error.message)
            // Handle error sending email
          } else {
            console.log('Email sent: ' + info.response);
            res.send({"ok":true, msg: "email send for verification" })
            // Handle successful email sending
          }
        })
      });
    }
   


  } catch (err) {
    res.send({ mes: err.message });
  }
})


userRouter.get('/verifyemail', async (req, res) => {
  const token = req.query.token;
  const user = await usermodel.findOne({ verificationToken: token });
  if (user && !user.verified) {
    // Mark the user account as verified in your database
    user.verified = true;
    await user.save()
    res.redirect(`http://localhost:3000/`)
  } else {
    res.send('Invalid or expired verification token');
  }
});

userRouter.post("/login", async (req, res) => {
  try {
 
    const { email, password } = req.body;
    if(!email  || !password){
      return  res.send({ "ok": false, "msg": "please fill all field " });
   }
    const user = await usermodel.findOne({ email });
    // console.log(user);
    if (!user) {
      res.send({ "ok": false, "msg": "User Not found, Please Register First" });
    } else {
      if (user.verified) {

        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "30m",
            });

            res.send({
              "ok": true,
              "mes": "login successfully",
              "user_details": { name: user.name, email: user.email },
              "token": token
            });
          } else {
            res.send({ "ok": false, "msg": "Wrong Credentials" });
          }
        });
      }else{
       res.send({ "ok": false, "msg": "Your email is not verified" });
          
      }
    }
  } catch (err) {
    res.send({ "msg": err.message });
  }
});

userRouter.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));
  userRouter.get("/auth/google/callback",passport.authenticate("google", {failureRedirect: "/login",session: false}),
  async function (req, res) {
    //in this request object you can get details of the user that we set in google.auth.js file
    const isPresent = await usermodel.findOne({ email: req.user.email });
    if (isPresent) {
      
              res.redirect(`http://localhost:3000/home`)
    } else {
      
              res.redirect(`http://localhost:3000/home`)
    }
  }
);

module.exports = { userRouter }