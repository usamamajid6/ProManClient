import { Component } from "react";
class logout extends Component {
  state = {};
  componentDidMount = () => {
    sessionStorage.clear();
    localStorage.clear();
    this.props.history.push("/");
  };
  render() {
    return null;
  }
}

export default logout;
