import React from "react";

// Displays when a device that is unsupported tries to access the website (mobile)
class UnsupportedDevicePage extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-around h-100">
          <p className="text-center">Sorry, mobile devices are not supported!</p>
      </div>
    );
  }
}

export default UnsupportedDevicePage;
