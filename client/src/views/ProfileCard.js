import React from "react"

class ProfileCard extends React.Component{
  state={
    images: this.props.potential.imageUrl
  }

  handleCycle(){
   var image = document.querySelector("#profile-image")
   var index = this.state.images.indexOf(image.src)
   if (this.state.images[index+1]===undefined){
   image.src = this.state.images[0]
   } else {
   image.src = this.state.images[index+1]
   }
  }

render(){
  return(
    <div className="Card">
      <img onClick= {this.handleCycle.bind(this)} id="profile-image" src={this.state.images[0]} alt={this.props.potential.name}/>
      <h2>{this.props.potential.name}</h2>
      <p class="title">{this.props.potential.age} years old</p>
      <p>{this.props.potential.bio}</p> <br/>
      <img onClick={this.props.noEat} id="no" class="icons" src="https://image.flaticon.com/icons/svg/685/685352.svg"/>
      <img onClick={this.props.next} id="yes" class="icons" src="https://image.flaticon.com/icons/svg/45/45332.svg"/>
    </div>
  )
}
}
export default ProfileCard