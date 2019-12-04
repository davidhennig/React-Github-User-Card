import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    followers: []
    // followerText: ""
  };

  componentDidMount() {
    console.log("cDM");
    axios
      .get("https://api.github.com/users/davidhennig/followers")
      .then(response => {
        this.setState({ followers: response.data });
        console.log(response.data);
      });

    // window.addEventListener("resize", this.handleResize);
  }

  fetchFollowers = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/davidhennig/followers`)
      .then(response => {
        console.log(response.data);
        this.setState({ followers: response.data });
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello Followers</h1>
        <button onClick={this.fetchFollowers}>Fetch followers</button>
        <div className="followers">
          {this.state.followers.map(follower => (
            <div className="pDiv" key={follower.login}>
              <p>{follower.login}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

export default App;
