import React from 'react';
import { Link } from 'react-router-dom';
import httpClient from './httpClient';

class NavBar extends React.Component {
  state = {
    matches: [],
    show: false
  };

  handleShow() {
    httpClient.getMatches(this.props.currentUser._id).then(serverResponse => {
      this.setState({
        matches: serverResponse.data,
        show: !this.state.show
      });
    });
  }

  handleNoShow() {
    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div className="nav">
        <div className="horizontal">
          <div className="logo">
            <Link to="/">FoodiesInLove</Link>
          </div>
          <div className="links">
            {this.props.currentUser ? (
              <span className="span-container">
                <Link className="start-matching" to="/feed">
                  Eat!
                </Link>
                <div
                  className="hidden-links"
                  onClick={this.handleShow.bind(this)}
                >
                  {this.props.currentUser.name}

                  {this.state.show ? (
                    <div>
                      <Link className="right-flex" to="/matches">
                        Matches<span>({this.state.matches.length})</span>
                      </Link>
                      <Link className="right-flex" to="/profile">
                        Profile
                      </Link>
                      <Link
                        className="right-flex"
                        to="/logout"
                        onClick={this.handleNoShow.bind(this)}
                      >
                        Log Out
                      </Link>
                    </div>
                  ) : (
                    <span />
                  )}
                </div>
              </span>
            ) : (
              <span className="horizontal">
                <Link to="/login">Log In</Link>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
