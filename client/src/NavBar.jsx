import React from 'react'
import { Link } from 'react-router-dom'
import httpClient from "./httpClient"

class NavBar extends React.Component {

	state={
		matches:[],
		show: false
	}

handleShow(){
	httpClient.getMatches(this.props.currentUser._id).then((serverResponse)=>{
	this.setState({
		matches: serverResponse.data,
		show: true
	})
})
}

handleNoShow(){
	this.setState({
		show:false
	})
}

render(){
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{this.props.currentUser
				? (
					<span>
						<Link to="/feed"> Start Matching </Link>
						<Link onMouseEnter={this.handleShow.bind(this)} id="dropdown" to="/profile">{this.props.currentUser.name}</Link>
						{this.state.show
					? (
						<span onMouseEnter={this.handleShow.bind(this)} onMouseLeave={this.handleNoShow.bind(this)}>
						<Link to="/matches">Matches<span>({this.state.matches.length})</span></Link>
						<Link to="/profile">Profile</Link>
						<Link to="/logout">Log Out</Link>					
						</span>
						)
					: (
						<span></span>
						)
					}
					
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}
}

export default NavBar