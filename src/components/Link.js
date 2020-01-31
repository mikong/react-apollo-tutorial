import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex mt-2 items-start">
        <div className="flex items-center">
          <span className="text-gray-600">{this.props.index + 1}.</span>
          {authToken && (
            <div
              className="ml-1 text-gray-600 text-xs"
              onClick={() => this._voteForLink()}
            >
              ▲
            </div>
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
