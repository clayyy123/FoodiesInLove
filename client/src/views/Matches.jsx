import React from 'react';
import httpClient from '../httpClient';
import { Link } from 'react-router-dom';

class Matches extends React.Component {
  state = {
    matches: []
  };
  componentDidMount() {
    httpClient.getMatches(this.props.current._id).then(serverResponse => {
      // console.log(serverResponse)
      this.setState({
        matches: serverResponse.data
      });
    });
  }

  handleDelete(id) {
    httpClient.deleteMatch(id).then(serverResponse => {
      // console.log(serverResponse)
      this.setState({
        matches: this.state.matches.filter(
          match => match._id !== serverResponse.data.match._id
        )
      });
    });
  }

  render() {
    return (
      <div className="Matches">
        <h1 id="matches-head"> Your Matches </h1>
        {this.state.matches.map(match => {
          return (
            <div className="matchbox">
              <Link to={`/matches/${match._id}`}>
                <div className="match-names">
                  {match.userSlot1.user.name !== this.props.current.name
                    ? match.userSlot1.user.name
                    : match.userSlot2.user.name}
                </div>
              </Link>
              <span
                onClick={() => {
                  this.handleDelete(match._id);
                }}
                className="fa fa-remove"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Matches;
