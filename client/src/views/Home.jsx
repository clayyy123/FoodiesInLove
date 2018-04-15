import React from 'react'

const Home = (props) => {
	return (
		<div className='Home'>
			<div id="banner">
			<h1 className="header">Foodies in Love</h1>
			<h3 className="header">
				Foodies in Love brings foodies together to experience <br/>restaurants they have always wanted to try!
			</h3>
			<button id="sign-up-button"> Sign Up </button>
			</div>
			<div className="row">
				<div className="column">
				<h3 id="alignment" className="centered-title">Step One </h3>
				</div>
				<div className="column column-50 column-offset-25">
				<h5 className="centered-title">Enter your favorite Restaurants</h5>
				<img id="top3-pic" src="https://i.imgur.com/97VfGl6.png"/>
				</div>
			</div>
			<div className="row">
				<div className="column">
				<h5 >See potential candidates that have the same interests!</h5>
				<img src="https://i.imgur.com/Ig9C0ZB.png"/>
				</div>
				<div className="column column-50 column-offset-25">
				<h3 className="centered-title">Step Two </h3>
			</div>
				<div className="row">
				</div>
			</div>

</div>
	)
}

export default Home