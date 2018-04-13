const User = require('../models/User.js')
require("dotenv").config()
const apiKey = process.env.API_KEY
const signToken = require('../serverAuth.js').signToken
'use strict';
const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

module.exports = {
	// list all users
	index: (req, res) => {
		const query= {
			$and:[
			{$or: [{ "topThree": req.user.topThree[0] },{ "topThree": req.user.topThree[1] },{ "topThree": req.user.topThree[2]}]},
			{"_id": {$nin: [req.user._id]}}
		]
		}
		User.find(query, (err, users) => {
			res.json(users)
		})
	},

	// get one user
	show: (req, res) => {
		console.log("Current User:")
		console.log(req.user)
		User.findById(req.params.id, (err, user) => {
			res.json(user)
		})
	},

	// create a new user
	create: (req, res) => {
		User.create(req.body, (err, user) => {
			if(err) return res.json({success: false, code: err.code})
			// once user is created, generate a token to "log in":
			const token = signToken(user)
			res.json({success: true, message: "User created. Token attached.", token})
		})
	},

	// update an existing user
	update: (req, res) => {
		User.findById(req.params.id, (err, user) => {
			if(!req.body.password) delete req.body.password
			console.log(req.body)
			Object.assign(user, req.body)
			console.log(user)
			user.save((err, updatedUser) => {
				if (err) console.log(err)
				res.json({success: true, message: "User updated.", updatedUser})
			})
		})
	},

	// delete an existing user
	destroy: (req, res) => {
		User.findByIdAndRemove(req.params.id, (err, user) => {
			res.json({success: true, message: "User deleted.", user})
		})
	},

	yelpSearch: (req,res)=>{
				client.search({
					term:req.params.name,
  				location: "Los Angeles"
				}).then(response => {
					res.json({data:response.jsonBody})
				}).catch(e => {
					console.log(e);
				});
	},

	// the login route
	authenticate: (req, res) => {
		// check if the user exists
		User.findOne({email: req.body.email}, (err, user) => {
			// if there's no user or the password is invalid
			if(!user || !user.validPassword(req.body.password)) {
				// deny access
				return res.json({success: false, message: "Invalid credentials."})
			}

			const token = signToken(user)
			res.json({success: true, message: "Token attached.", token})
		})
	}
}