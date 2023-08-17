require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const userRouter = require('./api/users/user.router');
const kegiatanRouter = require('./api/kegiatan/kegiatan.router');
const activityRouter = require('./api/activity/activity.router'); // Add this line

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// app.use("/users", userRouter);
// app.use("/kegiatan", kegiatanRouter);
app.use("/activity", activityRouter); // Add this line

app.listen(process.env.APP_PORT, () => {
  console.log('Example app listening on port : ', process.env.APP_PORT);
});
