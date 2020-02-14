import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { FEED_QUERY } from './LinkList';

const CREATE_LINK = gql`
  mutation CreateLink($url: String!, $description: String) {
    createLink(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-col mt-4">
          <input
            className="mb-2 input"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb-2 input"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={CREATE_LINK}
          variables={{ url, description }}
          onCompleted={() => this.props.history.push('/')}
          update={(store, { data: { createLink } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.allLinks.unshift(createLink);
            store.writeQuery({
              query: FEED_QUERY,
              data
            });
          }}
        >
          {createLink =>
            <button
              className="btn btn-gray"
              onClick={createLink}
            >
              Create Link
            </button>
          }
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
