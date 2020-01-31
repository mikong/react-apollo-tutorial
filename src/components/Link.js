import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    createVote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt-2 items-start">
        <div className="flex items-center">
          <span className="text-gray-600">{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
            >
              {createVote => (
                <div
                  className="ml-1 text-gray-600 text-xs"
                  onClick={createVote}
                >
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml-1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="text-sm leading-normal text-gray">
            {this.props.link.votes.length} votes | by {' '}
            {this.props.link.postedBy.name}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
