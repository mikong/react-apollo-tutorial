import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex p-1 justify-between whitespace-no-wrap bg-orange-500">
        <div className="flex text-black">
          <div className="font-extrabold mr-1">Hacker News</div>
          <Link to="/" className="ml-1 no-underline text-black">
            new
          </Link>
          {authToken && (
            <div className="flex">
              <div className="ml-1">|</div>
              <Link to="/create" className="ml-1 no-underline text-black">
                submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex">
          {authToken ? (
            <div
              className="ml-1 cursor-pointer text-black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml-1 no-underline text-black">
              login
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
