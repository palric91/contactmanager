import React, { Component } from "react";
import PropTypes from "prop-types";

class TextInputGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { name, value, onChange } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}:
        </label>
        <input
          type={name}
          className="form-control form-control-lg"
          name={name}
          placeholder={`Enter ${name}...`}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    );
  }
}

export default TextInputGroup;
