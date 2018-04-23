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
		show: !this.state.show
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
			<div className="horizontal">
			<Link id="logo" to="/">FoodiesInLove</Link>
			{this.props.currentUser
				? (
					<span >
						<Link id="start-matching" to="/feed"> Start Matching </Link>
						<span onClick={this.handleShow.bind(this)}>
						<Link className="right-flex" id="dropdown" to="#">{this.props.currentUser.name}</Link>
						</span>
						{this.state.show
					? (
						<span className="horizontal">
						
						<Link className="right-flex" to="/matches">Matches<span>({this.state.matches.length})</span></Link>
						<Link className="right-flex" to="/profile">Profile</Link>
						<Link className="right-flex" to="/logout">Log Out</Link>			
							
						</span>
						)
					: (
						<span></span>
						)
					}
					
					</span>
				)
				: (
					<span className="horizontal">
						<Link to="/login">Log In</Link>
					</span>
				)
			}
			</div>
		</div>
	)
}
}

export default NavBar