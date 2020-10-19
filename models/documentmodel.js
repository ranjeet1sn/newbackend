const mongoose = require("mongoose");
const schema = mongoose.Schema;
const document = new schema({
  data: {
    type: String,
  },
});
module.exports = mongoose.model("document", document);
