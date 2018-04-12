import React from "react"
import httpClient from "../httpClient.js"

class Chat extends React.Component{

  state={
    chatId: this.props.match.params.id,
    userInfo:null,
    messages:[]
  }

  componentDidMount(){
    httpClient.getChat(this.props.match.params.id).then((serverResponse)=>{
      console.log(serverResponse)
      this.setState({
        userInfo: serverResponse.data,
        messages: serverResponse.data.messages
      })
    })
  }

  handleSubmit(evt){
    var textValue = document.querySelector("#textArea").value
    evt.preventDefault()
    this.setState({
      messages: [...this.state.messages,textValue]
    })
    httpClient.addMessage(textValue, this.state.chatId).then((serverResponse)=>{
      document.querySelector("#textArea").value = `${this.props.current.name}: `
    })
  }

  render(){
    return(
      <div className="Chat">
         <h3 id="chat-name">{ this.state.userInfo && this.props.current.name !== this.state.userInfo.userSlot1.user.name
          ?(this.state.userInfo.userSlot1.user.name)
          :(this.state.userInfo && this.state.userInfo.userSlot2.user.name)
          } </h3>
        <div className="chatbox">
        <ul>
          {this.state.messages.map((message)=>{
            return <li>{message}</li>
          })}
        </ul>
        </div>
        <div className="text-box">
          <form>
            <textarea id="textArea" placeholder="Thyme fries when you're having fun!Peas, coordinut and orange okra?" defaultValue={`${this.props.current.name}: `}>
            
            </textarea>
            <button onClick={this.handleSubmit.bind(this)}> Send </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Chat