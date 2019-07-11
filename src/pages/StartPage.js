import React from 'react';
import { Link } from 'react-router-dom';

// The initial page that the user sees when they load the website
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
