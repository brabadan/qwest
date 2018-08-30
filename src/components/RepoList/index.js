import React, { Component } from 'react';

class RepoList extends Component {
    render() {
        return (
            <select onChange={this.props.onSelectRepo} >
                {this.props.repos.map((repo, index) => (
                    <option key={index} data-index={index}
                            hidden={!repo.name.startsWith(this.props.repoFilter)}>{repo.name}({repo.open_issues})</option>
                ))}
            </select>
        );
    }
}

export default RepoList;