const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantModel = new Schema({
  full_name: { type: String },
  date_naissance: { type: String, default: new Date().toLocaleDateString() },
  CIN: {type: String},
  emil: {type: String},
  phone_num: {type: String},
  university: {type: String},
  field: {type: String},
  occupation: {type: String},
  masquer: {type: Boolean, default: true},
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

module.exports = mongoose.model("Participant", participantModel);
