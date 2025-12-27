const mongoose = require("mongoose");

const loadingSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Loading = mongoose.model("Loading", loadingSchema);
module.exports = Loading;