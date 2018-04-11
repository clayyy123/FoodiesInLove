const express =require("express")
const matchesRouter = new express.Router()
const matchesCtrl = require("../controllers/matches.js")
const { verifyToken } = require('../serverAuth.js')


matchesRouter.use(verifyToken)

matchesRouter.route("/")
  .get(matchesCtrl.index)
  // .post(matchesCtrl.create)

matchesRouter.route("/:id")
  .put(matchesCtrl.match)
  .get(matchesCtrl.retrieve)
  .delete(matchesCtrl.destroy)

matchesRouter.route("/chat/:id")
  .get(matchesCtrl.chat)


module.exports = matchesRouter


