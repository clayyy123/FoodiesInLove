import React from "react"

const ProfileCard = function (props) {

  return(
    <div className="Card">
      <img src="img.jpg" alt="John"/>
      <h2>{props.potential.name}</h2>
      <p class="title">{props.potential.age} years old</p>
      <p>{props.potential.bio}</p> <br/>
      <img onClick={props.noEat} id="no" class="icons" src="https://image.flaticon.com/icons/svg/685/685352.svg"/>
      <img onClick={props.next} id="yes" class="icons" src="https://image.flaticon.com/icons/svg/45/45332.svg"/>
    </div>
  )
}
export default ProfileCard