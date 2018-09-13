import React, { Component, Fragment } from "react";

class Test extends Component {
  state = {
    title: "",
    body: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  // componentWillMount() {
  //   console.log("componentWillMount...");
  // }

  componentDidUpdate = (prevProps, prevState) => {
    console.log("componentDidUpdate...");
  };

  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log("componentWillReceiveProps...");
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      test: "something"
    };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate...");
    return null;
  }

  render() {
    console.log("render...");
    const { title, body } = this.state;
    return (
      <div>
        {title && body ? (
          <Fragment>
            <h1>{this.state.title}</h1>
            <p className="lead">{this.state.body}</p>
          </Fragment>
        ) : (
          <p className="text-info">LOADING...</p>
        )}
      </div>
    );
  }
}

export default Test;
