import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Date2Rus from '../Date2Rus/index';

class Issue extends Component {
    render() {
        let {number, title, user, created_at} = this.props.issue;
        return (
            <tr>
                <td><Link to={`/issue/${number}`}>{number}</Link></td>
                <td><Date2Rus date={created_at} /></td>
                <td><Link to={`/issue/${number}`}>{title}</Link></td>
                <td>
                    <img src={user.avatar_url} alt="avatar"/>
                    <a href={user.html_url}>{user.login}</a>
                </td>
            </tr>
        )
    }

}

export default Issue;