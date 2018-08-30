import React, {Component} from 'react';
import Issue from '../Issue/index';

class IssueList extends Component {
    render() {
        return (
                <tbody>
                {this.props.issues.map((issue, index) => (
                    <Issue issue={issue} key={index}/>
                ))}
                </tbody>
        )
    }
}

export default IssueList;