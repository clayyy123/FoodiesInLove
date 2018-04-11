import React from "react"
import httpClient from "../httpClient.js"

class Chat extends React.Component{

  state={
    chat:[]
  }

  componentDidMount(){
    httpClient.getChat(this.props.match.params.id).then((serverResponse)=>{
      console.log(serverResponse)
      this.setState({
        chat: serverResponse.data.messages
      })
    })
  }

  render(){
    return(
      <div className="Chat">
        <div className="chatbox">
          {this.state.chat.map((message)=>{
            return <li>{message}</li>
          })}
        </div>
          <form>
            <textarea>

            </textarea>
            <button> Send </button>
          </form>
      </div>
    )
  }
}

export default Chat