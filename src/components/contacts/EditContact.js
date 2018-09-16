import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../../context";
import axios from "axios";
// import * from 'react-router-dom'

class EditContact extends Component {
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

  componentDidMount = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    );

    const { name, email, phone } = res.data;

    this.setState({
      name,
      email,
      phone
    });
  };

  handleEditContact = async (dispatch, e) => {
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

    const newContact = { phone, name, email };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      newContact
    );

    dispatch({
      type: "EDIT_CONTACT",
      payload: res.data
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
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.handleEditContact.bind(this, dispatch)}>
                  {this.state.name &&
                    Object.keys(this.state).map((key, i) => {
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
                    value="Update Contact"
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

export default EditContact;
