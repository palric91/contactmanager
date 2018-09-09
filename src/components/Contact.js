import React, { Component } from "react";
import PropTypes from "prop-types";

class Contact extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired
  };

  state = {
    showContent: true
  };

  contentShowHandler = () => {
    this.setState({
      showContent: !this.state.showContent
    });
  };

  render() {
    const { name, email, phone } = this.props.contact;

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
            onClick={() => {
              this.props.deleteContact();
            }}
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
  }
}

export default Contact;
