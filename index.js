require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const activityRouter = require('./api/activity/activity.router'); 
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = require('./docs/swagger.option');

const spacs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spacs));



app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// app.use("/users", userRouter);
// app.use("/kegiatan", kegiatanRouter);
app.use("/activity", activityRouter); // Add this line

app.listen(process.env.APP_PORT, () => {
  console.log('Example app listening on port : ', process.env.APP_PORT);
});
