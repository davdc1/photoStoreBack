const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/store');




// const mongoose = require("mongoose");
// require("dotenv").config();
// mongoose
//   .connect(`${process.env.LINK_TO_ATLAS}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("mongo local db is connected"));
