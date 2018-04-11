import React from "react"

class Modal extends React.Component {


  render(){
    return(
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h3>Eating Time!</h3>
        </div>

      </div>
    )
  }
}

export default Modal 