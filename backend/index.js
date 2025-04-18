require('dotenv').config(); // Add this line to load .env file

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const personalRoute = require("./routes/personalRoute");
const port = process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB connected!!!");
});

// Replace 'your-ngrok-url' with the actual ngrok URL provided
const mongoUrl = process.env.MONGODB_URI || "";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("DB connected!!!"))
.catch(err => console.error("DB connection error:", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://personal-finance-frontend-xhc7.onrender.com'
}));

app.use("/personal", personalRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

