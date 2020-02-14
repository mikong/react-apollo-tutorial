import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    allLinks(filter: {
      urlContains: $filter
      or: [{
        descContains: $filter
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

class Search extends Component {
  state = {
    links: [],
    filter: '',
  };

  render() {
    return (
      <div>
        <div className="flex flex-row">
          <div className="mr-3">
            <input
              className="border input"
              type="text"
              onChange={e => this.setState({ filter: e.target.value })}
              placeholder="Query"
            />
          </div>
          <button
            className="btn btn-gray"
            onClick={() => this._executeSearch()}
          >
            search
          </button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }

  _executeSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });
    const links = result.data.allLinks;
    this.setState({ links });
  }
}

export default withApollo(Search);
