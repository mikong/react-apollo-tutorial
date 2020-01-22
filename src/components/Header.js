import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div className="flex p-1 justify-between whitespace-no-wrap bg-orange-500">
        <div className="flex text-black">
          <div className="font-extrabold mr-1">Hacker News</div>
          <Link to="/" className="ml-1 no-underline text-black">
            new
          </Link>
          <div className="ml-1">|</div>
          <Link to="/create" className="ml-1 no-underline text-black">
            submit
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
