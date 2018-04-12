import React from "react"
import httpClient from "../httpClient.js"
import ProfileCard from "./ProfileCard.js"
import Modal from "./Modal.jsx"


class Feed extends React.Component {
  state={
    filteredUsers: [],
    potentialUser: null,
    modal: false
  }

  componentDidMount(){
    httpClient.getUsers().then((serverResponse)=>{
      // console.log(serverResponse.data)
      this.setState({
        filteredUsers: serverResponse.data,
        potentialUser: serverResponse.data[0]
      })
    })
  }

  handleEat(){
    var index = this.state.filteredUsers.indexOf(this.state.potentialUser)
    if(this.state.filteredUsers[index+1] === undefined){
      httpClient.seeMatch(this.state.potentialUser._id).then((serverResponse)=>{
        if(serverResponse.data.matchCreated){
          this.setState({
            modal: true,
          })
        }
        this.setState({
          potentialUser: this.state.filteredUsers[0]
      })})
    } else if(this.state.potentialUser){
      httpClient.seeMatch(this.state.potentialUser._id).then((serverResponse)=>{
        // console.log(serverResponse.data)
        if(serverResponse.data.matchCreated){
          this.setState({
            modal: true,
          })
        }
        this.setState({
        potentialUser: this.state.filteredUsers[index+1]
        })
      
      })
    }
  }

  handleNoEat(){
    var index = this.state.filteredUsers.indexOf(this.state.potentialUser)
    if(this.state.filteredUsers[index+1]===undefined){
      this.setState({
        potentialUser: {name: "No More Users", age: "Refresh", bio: "stick around!"}
      })
    }else if(this.state.filteredUsers[index]){
      this.setState({
        potentialUser: this.state.filteredUsers[index + 1]
        })
      }
    }


  handleModal(){
    // console.log("hi")
    this.setState({
      modal: !this.state.modal
    })
  }


  


 render(){
   var index = this.state.filteredUsers.indexOf(this.state.potentialUser)
   var matchedUser = this.state.filteredUsers[index-1] || this.state.filteredUsers[index]
   const { potentialUser } = this.state
  //  console.log(this.state.potentialUser)
   return(
     <div className="Feed">
     {potentialUser && (
       <ProfileCard potential={this.state.potentialUser} next={this.handleEat.bind(this)} noEat={this.handleNoEat.bind(this)}/>
     )}
      {this.state.modal
      ? (
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span onClick={this.handleModal.bind(this)} class="close">&times;</span>
            <h3>Eating Time!</h3>
            <h5> You matched with {matchedUser.name}</h5>
          </div>
        </div>
      )
      :(
      <span></span>
      )
      }
     </div>
     
   )
 }
}


export default Feed