require("./config/database").connect();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRegistration = require('./routers/userRegistrationRoutes')
app.use('/user', userRegistration);

const postsRoutes = require('./routers/postsRoutes')
app.use('/post', postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
