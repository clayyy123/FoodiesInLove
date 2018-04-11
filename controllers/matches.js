const Match = require("../models/Match.js")

module.exports = {
  index:(req,res) =>{
    Match.find({}, (err, allMatches)=>{
      res.json(allMatches)
    })
  },

  match:(req,res)=>{

    const queryFilter = {
      $and:[
       {$or:[{"userSlot1.user":req.user._id},{"userSlot2.user":req.user._id}]},
       {$or:[{"userSlot1.user":req.params.id},{"userSlot2.user":req.params.id}]}
      ]
    }
    
    Match.findOne(queryFilter)
    .populate('userSlot1.user')
    .populate('userSlot2.user')
    .exec((err, foundMatch) => {
        if(!foundMatch) {
          Match.create({
            userSlot1:{
              user: req.user,
              liked: true
            },
            userSlot2:{
              user: req.params.id,
              liked: false
            },
          }, (err, newMatch) => {
            return res.json({ success: true, message: 'match created. pending other user.', match: newMatch})
          })
        } else if(foundMatch && foundMatch.userSlot1.user.email === req.user.email) {
          res.json({message: "match exists, and waiting for other user", match: foundMatch})
        } else {
          foundMatch.userSlot2.liked = true
          foundMatch.save((err, completedMatch) => {
            res.json({ success: true, message: "💑👩‍❤️‍👩👨‍❤️‍👨", matchCreated: completedMatch})
          })
        }
    })
  },

  retrieve:(req,res)=>{
    Match.find({ $or: [
      { "userSlot1.user": req.user._id },
      { "userSlot2.user": req.user._id}
    ], 'userSlot1.liked': true, 'userSlot2.liked': true})
    .populate('userSlot1.user').populate('userSlot2.user')
    .exec((err, matches) => {
      res.json(matches)
    })
  },
  
  destroy:(req,res)=>{
    Match.findByIdAndRemove(req.params.id, (err,deletedMatch)=>{
      res.json({message: "match deleted", success: true, match: deletedMatch})
    })
  }
}