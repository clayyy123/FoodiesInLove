import React from 'react';
import httpClient from '../httpClient';

// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      password: '',
      bio: '',
      topThree: [],
      imageUrl: [],
      age: '',
      topThree1: '',
      topThree2: '',
      topThree3: ''
    },
    autocompleteField: [],
    topThree1: false,
    topThree2: false,
    topThree3: false
  };

  onInputChange(evt) {
    var targetShow = evt.target.name;
    if (evt.target.name.includes('topThree')) {
      httpClient.yelpFood(evt.target.value).then(serverResponse => {
        console.log(serverResponse);
        if (serverResponse.data.data) {
          this.setState({
            autocompleteField: serverResponse.data.data.businesses,
            [targetShow]: true
          });
        } else if (!serverResponse.data.data) {
          this.setState({
            autocompleteField: [],
            [targetShow]: false
          });
        }
      });
    }
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    });
  }
  handleOff(evt) {
    var targetShow = evt.target.name;
    setTimeout(
      () =>
        this.setState({
          [targetShow]: false
        }),
      20
    );
  }

  handleSelect(evt) {
    var targetShow = document.activeElement.name;
    console.log(evt.target.innerText);
    this.setState({
      fields: {
        ...this.state.fields,
        [targetShow]: evt.target.innerText
      }
    });
  }

  onFormSubmit(evt) {
    var first = document.querySelector('#first').value;
    var second = document.querySelector('#second').value;
    var third = document.querySelector('#third').value;
    var firstPic = document.querySelector('#firstPic').value;
    var secondPic = document.querySelector('#secondPic').value;
    var thirdPic = document.querySelector('#thirdPic').value;
    evt.preventDefault();
    this.state.fields.topThree.push(first);
    this.state.fields.topThree.push(second);
    this.state.fields.topThree.push(third);
    this.state.fields.imageUrl.push(firstPic, secondPic, thirdPic);
    httpClient.signUp(this.state.fields).then(user => {
      this.setState({
        fields: {
          name: '',
          email: '',
          password: '',
          bio: '',
          topThree: [],
          age: '',
          imageUrl: []
        }
      });
      if (user) {
        this.props.onSignUpSuccess(user);
        this.props.history.push('/feed');
      }
    });
  }

  render() {
    const {
      name,
      email,
      password,
      bio,
      age,
      imageUrl,
      topThree1,
      topThree2,
      topThree3
    } = this.state.fields;
    return (
      <div className="sign-up">
        <h1>Sign Up</h1>
        <form
          className="signup-form"
          onChange={this.onInputChange.bind(this)}
          onSubmit={this.onFormSubmit.bind(this)}
        >
          <label for="nameField">Full Name</label>
          <input type="text" name="name" value={name} />
          <label for="nameField">Email</label>
          <input type="text" name="email" value={email} />
          <label for="nameField">Password</label>
          <input type="password" name="password" value={password} />
          <label for="nameField">Deescribe Yourself In 5 Words or Less</label>
          <textarea
            name="bio"
            placeholder="Tell us something about yourself"
            value={bio}
          />
          <label for="nameField">Load Up To Three Pictures</label>
          <input
            type="text"
            id="firstPic"
            placeholder="First Picture"
            name="pic1"
            value={imageUrl[0]}
          />
          <input
            type="text"
            id="secondPic"
            placeholder="Second Picture"
            name="pic2"
            value={imageUrl[1]}
          />
          <input
            type="text"
            id="thirdPic"
            placeholder="Third Picture"
            name="pic3"
            value={imageUrl[2]}
          />
          <label for="nameField">Three Restaurants You Want To Eat At</label>
          <a
            href="https://www.yelp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Yelp
          </a>
          <input
            onBlur={this.handleOff.bind(this)}
            type="text"
            id="first"
            placeholder="First Restaurant"
            name="topThree1"
            value={topThree1}
          />
          {this.state.topThree1 && (
            <ul className="drop-down">
              {this.state.autocompleteField.map(rec => {
                return (
                  <li
                    className="list-items"
                    onMouseDown={this.handleSelect.bind(this)}
                  >
                    {rec.name}
                  </li>
                );
              })}
            </ul>
          )}
          <input
            onBlur={this.handleOff.bind(this)}
            type="text"
            id="second"
            placeholder="Second Restaurant"
            name="topThree2"
            value={topThree2}
          />
          {this.state.topThree2 && (
            <ul className="drop-down">
              {this.state.autocompleteField.map(rec => {
                return (
                  <li
                    className="list-items"
                    onMouseDown={this.handleSelect.bind(this)}
                  >
                    {rec.name}
                  </li>
                );
              })}
            </ul>
          )}
          <input
            onBlur={this.handleOff.bind(this)}
            type="text"
            id="third"
            placeholder="Third Restaurant"
            name="topThree3"
            value={topThree3}
          />
          {this.state.topThree3 && (
            <ul className="drop-down">
              {this.state.autocompleteField.map(rec => {
                return (
                  <li
                    className="list-items"
                    onMouseDown={this.handleSelect.bind(this)}
                  >
                    {rec.name}
                  </li>
                );
              })}
            </ul>
          )}
          <label for="nameField">Age</label>
          <input type="text" name="age" value={age} />

          <button class="signup-btn">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
