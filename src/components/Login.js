import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
      email
      name
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    signInUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

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
              className="mb-2 input"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            className="mb-2 input"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            className="mb-2 input"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex">
          {login ? (
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{ email, password }}
              onCompleted={data => this._confirm(data)}
            >
              {signInUser => (
                <div
                  className="cursor-pointer mr-2 btn btn-gray"
                  onClick={signInUser}
                >
                  login
                </div>
              )}
            </Mutation>
          ) : (
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ email, password, name }}
              onCompleted={data => this._load_login(data)}
            >
              {createUser => (
                <div
                  className="cursor-pointer mr-2 btn btn-gray"
                  onClick={createUser}
                >
                  create account
                </div>
              )}
            </Mutation>
          )}
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

  _confirm = async data => {
    const { token } = data.signInUser;
    this._saveUserData(token);
    this.props.history.push(`/`);
  }

  _load_login = async data => {
    this.setState({ login: true });
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

export default Login;
