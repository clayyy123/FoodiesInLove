const
	express = require("express"),
	usersRouter = new express.Router(),
	usersCtrl = require("../controllers/users.js"),
	verifyToken = require("../serverAuth.js").verifyToken

usersRouter.route("/")
	.get(verifyToken, usersCtrl.index)
	.post(usersCtrl.create)

usersRouter.route("/yelp/:name")
	.get(usersCtrl.yelpSearch)

usersRouter.post("/authenticate", usersCtrl.authenticate)

usersRouter.use(verifyToken)

usersRouter.route("/:id")
	.get(usersCtrl.show)
	.patch(usersCtrl.update)
	.delete(usersCtrl.destroy)

module.exports = usersRouter