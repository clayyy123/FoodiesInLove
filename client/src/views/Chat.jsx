import React from "react"
import httpClient from "../httpClient.js"

class Chat extends React.Component{

  state={
    chatId: this.props.match.params.id,
    userInfo:null,
    messages:[]
  }

  componentDidMount(){
    var chatBox= document.querySelector(".chatbox")
    httpClient.getChat(this.props.match.params.id).then((serverResponse)=>{
      // console.log(serverResponse)
      this.setState({
        userInfo: serverResponse.data,
        messages: serverResponse.data.messages
      })
      chatBox.scrollTop = chatBox.scrollHeight
    })
  }

  handleSubmit(evt){
    var textValue = document.querySelector("#textArea").value
    var defaultValue= document.querySelector("#textArea").name
    var chatBox= document.querySelector(".chatbox")
    evt.preventDefault()
    this.setState({
      messages: [...this.state.messages, defaultValue + textValue]
    })
    httpClient.addMessage(defaultValue + textValue, this.state.chatId).then((serverResponse)=>{
      document.querySelector("#textArea").value = ""
      document.querySelector("#textArea").focus()
      setTimeout(function(){
        chatBox.scrollTop = chatBox.scrollHeight
    }, 100)
 
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
        <ul className="chatList">
          {this.state.messages.map((message)=>{
            return <li>{message}</li>
          })}
        </ul>
        </div>
        <div className="text-box">
          <form>
            <textarea id="textArea" placeholder="Thyme fries when you're having fun!Peas, coordinut and orange okra?" name={`${this.props.current.name}: `}>
            
            </textarea>
            <button onClick={this.handleSubmit.bind(this)}> Send </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Chat