import React, { Component } from "react";
class logout extends Component {
  state = {};
  componentDidMount = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    return <div></div>;
  }
}

export default logout;
