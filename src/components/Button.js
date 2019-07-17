import React from 'react';
import './Button.css'
import PropTypes from "prop-types";

class Button extends React.Component {
  render() {
    return (
      <div
      className={`button ${ this.props.className }`}
      onClick={this.props.function}
      >
        {this.props.children}
      </div>
    )
  }
}

Button.propTypes = {
  function: PropTypes.func
}

Button.defaultProps = {
  function: () => {}
}

export default Button
