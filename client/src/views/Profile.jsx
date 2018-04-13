import React from "react"
import httpClient from '../httpClient'
import {Link} from "react-router-dom"

class Profile extends React.Component{
  state ={
  fields: { id:"", name:"", password:"", email:"" ,bio:"", topThree:[],topThree1:"",topThree2:"",topThree3:"",imageUrl:[],pic1:"",pic2:"",pic3:"", age:""},
  autocompleteField: [],
  topThree1: false,
  topThree2: false,
  topThree3: false
  
  }
componentDidMount(){
  httpClient.datUser(this.props.current._id).then((serverResponse)=>{
    const {age, bio, email, name,topThree,_id,password, imageUrl} = serverResponse.data
    this.setState({
      fields: { _id:_id, name:name, password:"", email:email ,bio:bio, topThree:[],topThree1:topThree[0],topThree2:topThree[1],topThree3:topThree[2],imageUrl:[],pic1:imageUrl[0],pic2:imageUrl[1],pic3:imageUrl[2], age:age}
    })
  })
}

onInputChange(evt) {
  var targetShow = evt.target.name
  var inputChange = document.querySelector("#first")
  if(evt.target.name.includes("topThree")){
    httpClient.yelpFood(evt.target.value).then((serverResponse)=>{
      if (serverResponse.data.data){
      this.setState({
        autocompleteField:serverResponse.data.data.businesses,
        [targetShow]: true
      })
    } else if(!serverResponse.data.data){
      this.setState({
        autocompleteField:[],
        [targetShow]: false
      })
    }
    })
  }
  this.setState({
    fields: {
      ...this.state.fields,
      [evt.target.name]: evt.target.value
    }
  })
}

handleOff(evt){
  var targetShow = evt.target.name
  setTimeout(()=>this.setState({
    [targetShow]: false
  }),20)
}


handleSelect(evt){
  var targetShow = document.activeElement.name
  console.log(evt.target.innerText)
  this.setState({
    fields:{
      ...this.state.fields,
      [targetShow]:  evt.target.innerText
    }
  })
}


handleSubmit(evt){
  evt.preventDefault()
  this.setState({
    fields:{
      ...this.state.fields,
     [this.state.fields.topThree]: this.state.fields.topThree.push(this.state.fields.topThree1, this.state.fields.topThree2,this.state.fields.topThree3),
     [this.state.fields.imageUrl]: this.state.fields.imageUrl.push(this.state.fields.pic1, this.state.fields.pic2,this.state.fields.pic3)
    }
  })
  console.log(this.state.fields)
  httpClient.updateUsers(this.state.fields).then((serverResponse)=>{
    if(serverResponse){
      this.props.history.push('/feed')
    }
  })
}




  render(){
    const { name, email, password, bio, age,topThree1, topThree2,topThree3, pic1,pic2,pic3 } = this.state.fields
    return(
      <div className="Profile">
        <div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Profile</h1>
						<form onSubmit={this.handleSubmit.bind(this)} onChange={this.onInputChange.bind(this)}>
						  <label for="nameField">Full Name</label>
							<input type="text" name="name" value={name} />
							<label for="nameField">Email</label>
							<input type="text" name="email" value={email} />
							<label for="nameField">Password</label>
							<input type="password" name="password" value={password} />
							<label for="nameField">Bio</label>
							<textarea name="bio" placeholder="Tell us something about yourself" value={bio} ></textarea>
              <label for="nameField">Load Up To Three Pictures</label>
							<input type="text" id="firstPic" placeholder="First Picture" name="pic1" value={pic1} />
							<input type="text" id="secondPic" placeholder="Second Picture" name="pic2" value={pic2} />
							<input type="text" id="thirdPic" placeholder="Third Picture" name="pic3" value={pic3} />
							<label for="nameField">Top Three Restaurants You Want To Eat At</label> <a href="https://www.yelp.com/" target="_blank">Search Yelp</a>
							<input focus onBlur={this.handleOff.bind(this)} type="text" id="first" placeholder="First Restaurant" name="topThree1" value={topThree1} />
              {this.state.topThree1 && <ul className="drop-down">{this.state.autocompleteField.map((rec)=>{
                return <li className="list-items" onMouseDown={this.handleSelect.bind(this)} >{rec.name}</li>
              })}
              </ul>}
							<input onBlur={this.handleOff.bind(this)} type="text" id="second" placeholder="Second Restaurant" name="topThree2" value={topThree2} />
              {this.state.topThree2 && <ul className="drop-down">{this.state.autocompleteField.map((rec)=>{
                return <li className="list-items" onMouseDown={this.handleSelect.bind(this)}>{rec.name}</li>
              })}
              </ul>}
							<input onBlur={this.handleOff.bind(this)} type="text" id="third" placeholder="Third Restaurant" name="topThree3" value={topThree3} />
              {this.state.topThree3 && <ul className="drop-down">{this.state.autocompleteField.map((rec)=>{
                return <li className="list-items" onMouseDown={this.handleSelect.bind(this)}>{rec.name}</li>
              })}
              </ul>}
							<label for="nameField">Age</label>
							<input type="text" name="age" value={age} />

							<button>Edit</button>
						</form>
					</div>
				</div>
      </div>
    )
  }
}

export default Profile