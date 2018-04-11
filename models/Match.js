const mongoose = require("mongoose")
const findOrCreate = require("mongoose-find-or-create")
const matchSchema = new mongoose.Schema({
  userSlot1:{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    liked: Boolean
  },
  userSlot2:{
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    liked: Boolean
  },
  meetUp: {type: Array},
  messages: [String]


})

matchSchema.plugin(findOrCreate)

const Match = mongoose.model("Match", matchSchema)

module.exports= Match