import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    followers: [],
    followerText: ""
  };

  componentDidMount() {
    console.log("cDM");
    axios.get("https://api.github.com/users/davidhennig").then(response => {
      this.setState({ user: response.data.message });
      console.log(response.data);
    });

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    console.log("cDUN");
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("cDUP");
    if (prevState.followers !== this.state.followers) {
      console.log("new followers state");
      if (this.state.followerText === "") {
        axios
          .get(`https://api.github.com/users/davidhennig/followers`)
          .then(response => {
            this.setState({
              followers: response.data.message,
              followerText: ""
            });
            console.log(response);
          });
      }
    }
  }

  handleChanges = e => {
    this.setState({
      followerText: e.target.value
    });
  };

  fetchFollowers = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/davidhennig`).then(response => {
      this.setState({ followers: response.data.message });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello Followers</h1>
        <input
          type="text"
          value={this.state.followerText}
          onChange={this.handleChanges}
        />
        <button onClick={this.fetchFollowers}>Fetch followers</button>
        <div className="followers">
          {/* {this.state.followers.map(follower => (
            <img width="200" src={follower} key={follower} alt={follower} />
          ))} */}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

export default App;
