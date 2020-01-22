import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
    name: '',
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mx-4">{ login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-col">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt-4">
          <div className="cursor-pointer mr-2 btn btn-gray" onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </div>
          <div
            className="cursor-pointer btn btn-gray"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async () => {
    // TODO
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

export default Login;
