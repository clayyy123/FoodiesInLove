import React from 'react'
import httpClient from '../httpClient'
import {Link} from "react-router-dom"


// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: '',bio:"", topThree:[],imageUrl:[], age:""}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		var first = document.querySelector("#first").value
		var second = document.querySelector("#second").value
		var third = document.querySelector("#third").value
		var firstPic = document.querySelector("#firstPic").value
		var secondPic = document.querySelector("#secondPic").value
		var thirdPic = document.querySelector("#thirdPic").value
		evt.preventDefault()
		this.state.fields.topThree.push(first)
		this.state.fields.topThree.push(second)
		this.state.fields.topThree.push(third)
		this.state.fields.imageUrl.push(firstPic, secondPic, thirdPic)
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '',bio:"", topThree:[], age:"", imageUrl:[] } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { name, email, password, bio, topThree, age, imageUrl } = this.state.fields
		return (
			<div className='SignUp'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Sign Up</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
						<label for="nameField">Full Name</label>
							<input type="text" name="name" value={name} />
							<label for="nameField">Email</label>
							<input type="text" name="email" value={email} />
							<label for="nameField">Password</label>
							<input type="password" name="password" value={password} />
							<label for="nameField">Bio</label>
							<textarea name="bio" placeholder="Tell us something about yourself" value={bio} ></textarea>
							<label for="nameField">Load Up To Three Pictures</label>
							<input type="text" id="firstPic" placeholder="First Picture" name="pic1" value={imageUrl[0]} />
							<input type="text" id="secondPic" placeholder="Second Picture" name="pic2" value={imageUrl[1]} />
							<input type="text" id="thirdPic" placeholder="Third Picture" name="pic3" value={imageUrl[2]} />
							<label for="nameField">Three Restaurants You Want To Eat At</label><a href="https://www.yelp.com/" target="_blank">Search Yelp</a>
							<input type="text" id="first" placeholder="First Restaurant" name="topThree1" value={topThree[0]} />
							<input type="text" id="second" placeholder="Second Restaurant" name="topThree2" value={topThree[1]} />
							<input type="text" id="third" placeholder="Third Restaurant" name="topThree3" value={topThree[2]} />
							<label for="nameField">Age</label>
							<input type="text" name="age" value={age} />

							<button>Sign Up</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp