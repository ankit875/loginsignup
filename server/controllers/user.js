import pool from './../db/pool';
import nodemailer from 'nodemailer';
import randtoken from 'rand-token';

const { MAIL_USER = 'abc123', MAIL_PASSWORD = 'abc123', APP_URL } = require('./../../config');
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 6)
    return res.status(400).json({ message: 'email and password is required to login' });

  const GET_USER_QUERY = `select * from userDetails where email = ?`;
  try {
    const userArr = await pool.query(GET_USER_QUERY, [email]);
    if (userArr && Array.isArray(userArr) && userArr.length === 1 && userArr[0]) {
      const user = userArr[0];
      const { password: pwd, name, email } = user;

      if (pwd === password) return res.status(200).json({ authorized: true, name, email, message: "User login Successfully" });

      else return res.status(403).json({ authorized: false, message: "Unauthorized user" })
    }
    else throw new Error("unauthorized user");
  }
  catch (error) {
    res.status(403).json({ authorized: false, message: error.message });
  }
}

const signup = async (req, res) => {
  const { name = '', email, password = '' } = req.body;
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ message: 'first name, email and password(minimum 6 character) is required to create user' });
  const GET_USER_QUERY = `select count(*) as count from userDetails where email= ?`;
  const INSERT_USER_QUERY = `insert into userDetails(name,email,password) values (?,?,?)`
  try {
    const userCount = await pool.query(GET_USER_QUERY, [email]);


    if (userCount && Array.isArray(userCount) && userCount.length === 1 && userCount[0].count !== 0)
      return res.status(403).json({ message: 'user with mentioned email already exist' });

    const result = await pool.query(INSERT_USER_QUERY, [name, email, password]);
    res.status(200).json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', errorMsg: error.message });
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  }
});

const forgot = async (req, res) => {
  const { email } = req.body;
  const GET_USER_QUERY = `select * from userDetails where email=?`;
  const userArr = await pool.query(GET_USER_QUERY, [email]);

  const user = userArr[0];
  const UPDATE_TOKEN_QUERY = `update userDetails set resetPasswordToken = ? ,resetPasswordExpires = ? where email = ?`;
  if (!user || !Array.isArray(userArr) || userArr.length < 1)
    return res.status(403).json({ message: 'user with mentioned email does not exist' });

  const token = randtoken.generate(16);
  const time = new Date();
  time.setTime(time.getTime() + 3600000);
  const updateTokenResult = pool.query(UPDATE_TOKEN_QUERY, [token, time, email]);

  const mailOptions = {
    from: MAIL_USER,
    to: req.body.email,
    subject: 'Activate your account',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
      Please click on the following link, or paste this into your browser to complete the process:\n
      http://${APP_URL}/reset/${token} \n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("error:: ", err);
      res.status(500).json({ message: err.message })
    }
    else {
      res.status(200).json({ message: "Mail sent successffully" });
    }
  })
}

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  const QUERY_TOKEN = `select * from userDetails where resetPasswordToken = ?`;
  const userArr = await pool.query(QUERY_TOKEN, [token]);
  const user = userArr[0];
  
  if (!user || !Array.isArray(userArr) || userArr.length < 1) {
    return res.status(403).json({ message: 'user with mentioned email does not exist' });
  }
  const { email, password: pwd, resetPasswordToken, resetPasswordExpires } = user;
  if (password === pwd) {
    return res.status(400).json({ message: "You can not use previous password" })
  }
  if (token === resetPasswordToken && resetPasswordExpires > Date.now() && password.length > 6) {
    const UPDATE_TOKEN_QUERY = `update userDetails set password = ? where email = ?`;
    await pool.query(UPDATE_TOKEN_QUERY, [password, email])
    return res.status(200).json({ message: 'password updated successfully' });
  }
  else {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  login,
  signup,
  forgot,
  resetPassword
}