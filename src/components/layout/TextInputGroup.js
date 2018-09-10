import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class TextInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { name, value, onChange, error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}:
        </label>
        <input
          type={name}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          name={name}
          placeholder={`Enter ${name}...`}
          value={value}
          onChange={onChange}
        />
        {error && <p className="invalid-feedback">{this.props.error}</p>}
      </div>
    );
  }
}

export default TextInputGroup;
