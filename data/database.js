
const mongoose = require("mongoose");
require("dotenv").config();

//mongoose.connect('mongodb://localhost:27017/store');

mongoose
  .connect(`${process.env.LINK_TO_ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo db is connected"))
  .catch((error) => {
      console.log(error);
  })
