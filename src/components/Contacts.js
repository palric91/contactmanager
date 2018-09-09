import React, { Component, Fragment } from "react";
import Contact from "./Contact";
import { Consumer } from "../context";

class Contacts extends Component {
  onClickHandler = (dispatch, action) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: {
        id: 0,
        name: "Palkó Richárd",
        phone: "06304321142",
        email: "palric91@gmail.com"
      }
    });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { contacts, dispatch } = value;
          return (
            <Fragment>
              {contacts.map(contact => (
                <Contact contact={contact} key={contact.id} />
              ))}
              <button
                className="btn btn-primary"
                onClick={this.onClickHandler.bind(this, dispatch)}
              >
                click
              </button>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
