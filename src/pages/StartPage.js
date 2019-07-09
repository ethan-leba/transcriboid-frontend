import React from 'react';
import { Link } from 'react-router-dom';

class StartPage extends React.Component {
  render() {
    return (
      <div>
      <p>start page!</p>
      <Link to="/main"> start </Link>
      </div>
    )
  }
}

export default StartPage;
