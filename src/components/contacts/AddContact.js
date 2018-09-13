import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../../context";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddContact = (dispatch, contact, contacts, e) => {
    e.preventDefault();

    //Check for errors
    const { phone, name, email } = this.state;

    if (name === "") {
      this.setState({
        errors: { name: "name is required!" }
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: { email: "email is required!" }
      });
      return;
    }

    if (phone === "") {
      this.setState({
        errors: { phone: "phone is required!" }
      });
      return;
    }

    dispatch({
      type: "ADD_CONTACT",
      payload: { ...contact, id: contacts[contacts.length - 1].id + 1 }
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
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
                  {Object.keys(this.state).map((key, i) => {
                    if (key !== "errors") {
                      return (
                        <TextInputGroup
                          key={i}
                          name={key}
                          value={this.state[key]}
                          onChange={this.onChange}
                          error={this.state.errors[key]}
                        />
                      );
                    }
                    return null;
                  })}
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
