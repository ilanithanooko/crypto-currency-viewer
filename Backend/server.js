require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const nodemailer = require("nodemailer");
const userRoutes = require("./routes/user");

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Enable CORS for all routes
const allowedOrigins = ['https://crypto-currency-viewer-frontend.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
  res.send('Welcome to Crypto Currency Viewer API');
});

app.use("/api/user", userRoutes);

app.use("/api/nodemailer", (req, res) => {
  const { name, email, subject, message, type } = req.body;
  let emailContent = "";

  if (type === "contact") {
    emailContent = `We have received your inquiry regarding "${subject}".<br/><br/>Message:<br/>${message}<br/><br/>One of our professionals will get back to you shortly.`;
  } else if (type === "signup") {
    emailContent = `Welcome to our platform! We are thrilled to have you on board.<br/><br/>You have successfully signed up with the following email: ${email}<br/><br/>Feel free to explore and let us know if you have any questions. We’re here to help!<br/><br/>Best regards,<br/>The Team`;
  } else {
    emailContent = `Error picking up email content`
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Secure your credentials using environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter
    .sendMail({
      to: email,
      subject: subject,
      html: `<div><h3>Dear ${name},</h3><br/>${emailContent}</div>`,
    })
    .then(() => {
      console.log("Email sent");
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to send email" });
    });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
