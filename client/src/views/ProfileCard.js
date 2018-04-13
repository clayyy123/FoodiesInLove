import React from "react"

class ProfileCard extends React.Component{
  
  state={
    selection: 0
  }


  handleCycle(){
   if (this.props.potential.imageUrl[this.state.selection + 1]===undefined){
    this.setState({
      selection: 0
     })
   } else {
    this.setState({
      selection: this.state.selection + 1 
     })
   }
  }

render(){
  console.log(this.props.potential)
  return(
    <div className="Card">
      <img onClick= {this.handleCycle.bind(this)} id="profile-image" src={this.props.potential.imageUrl[this.state.selection]} alt={this.props.potential.name}/>
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