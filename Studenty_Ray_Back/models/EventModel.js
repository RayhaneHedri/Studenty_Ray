const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventModel = new Schema({
  titre: { type: String },
  description: { type: String },
  date: { type: String, default: new Date().toLocaleDateString() },
  image: { type: String, default: "EVENT.jpeg", required: false },
  like: {type: Number, default: 0},
  masquer: {type: Boolean, default: true},
  nombreCommentaire: {type: Number, default:0},
  category: {type: String},
  location: {type :String},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentaires: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaire",
    }
  ]
});

module.exports = mongoose.model("Event", eventModel);
