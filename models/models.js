const mongoose = require("mongoose");
const schema = mongoose.Schema;
const schema1 = new schema({
  name: {
    type: String,
  },
  image:{
    type:Object
  },
  id:{
    type:String
  },
  role:{
    type:String
  }
});
module.exports = mongoose.model("record", schema1);
