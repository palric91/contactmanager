import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../../context";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddContact = (dispatch, contact, contacts, e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_CONTACT",
      payload: { ...contact, id: contacts[contacts.length - 1].id + 1 }
    });
    this.setState({
      name: "",
      email: "",
      phone: ""
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, contacts } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  onSubmit={this.handleAddContact.bind(
                    this,
                    dispatch,
                    this.state,
                    contacts
                  )}
                >
                  {Object.keys(this.state).map((key, i) => (
                    <TextInputGroup
                      key={i}
                      name={key}
                      value={this.state[key]}
                      onChange={this.onChange}
                      required
                    />
                  ))}
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
