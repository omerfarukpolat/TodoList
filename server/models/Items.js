const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please provide a valid text!"],
    },
    thumbnailImage: mongoose.Schema.Types.Mixed,
    file: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
