import React from 'react';
import httpClient from '../httpClient';

class LogIn extends React.Component {
  state = {
    fields: { email: '', password: '' }
  };

  onInputChange(evt) {
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    });
  }

  onFormSubmit(evt) {
    evt.preventDefault();
    httpClient.logIn(this.state.fields).then(user => {
      this.setState({ fields: { email: '', password: '' } });
      if (user) {
        this.props.onLoginSuccess(user);
        this.props.history.push('/feed');
      }
    });
  }

  render() {
    const { email, password } = this.state.fields;
    return (
      <div className="log-in">
        <h1>Log In</h1>
        <form
          onChange={this.onInputChange.bind(this)}
          onSubmit={this.onFormSubmit.bind(this)}
          className="log-form"
        >
          <input type="text" placeholder="Email" name="email" value={email} />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default LogIn;
