const mongoose = require("mongoose");

const bookedClassSchema = new mongoose.Schema({
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  const BookedClass = mongoose.model("BookedClass", bookedClassSchema);
  
  module.exports = BookedClass;
  
