import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <div className="Home">
      <div className="banner">
        <div className="banner-text">
          <h1 className="header">Foodies in Love</h1>
          <h3 className="header">
            Foodies in Love brings foodies together to experience <br />
            restaurants they have always wanted to try!
          </h3>
          <Link to="/signup">
            <button id="sign-up-button"> Sign Up </button>
          </Link>
          <a href="#slide">
            <button class="test">test</button>
          </a>
        </div>
      </div>
      <div className="row" id="slide">
        <div className="col">
          <h3 id="alignment" className="centered-title">
            Step One
          </h3>
        </div>
        <div className="col">
          <h5 className="centered-title">Enter your favorite Restaurants</h5>
          <div class="pic-wrapper">
            <img class="pic" src="https://i.imgur.com/97VfGl6.png" alt="pic1" />
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h5>See potential candidates that have the same interests!</h5>
          <div class="pic-wrapper">
            <img class="pic" src="https://i.imgur.com/Ig9C0ZB.png" alt="pic2" />
          </div>
        </div>
        <div className="col">
          <h3 id="step-two">Step Two </h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h3 id="alignment" className="centered-title">
            Step 3{' '}
          </h3>
        </div>
        <div className="col">
          <h5 className="centered-title">Chat and meet up!</h5>
          <div className="pic-wrapper">
            <img
              className="pic"
              src="https://i.imgur.com/k2WJFEE.png"
              alt="pic3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
