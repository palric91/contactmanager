import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired
  };

  state = {
    showContent: false
  };

  contentShowHandler = () => {
    this.setState({
      showContent: !this.state.showContent
    });
  };

  onDeleteClick = (id, dispatch) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => dispatch({ type: "DELETE_CONTACT", payload: id }));
  };

  render() {
    const { id, name, email, phone } = this.props.contact;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <i
                  className="fas fa-sort-down"
                  onClick={this.contentShowHandler}
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-times"
                  style={{ float: "right", color: "red", cursor: "pointer" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
              </h4>
              {this.state.showContent ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
