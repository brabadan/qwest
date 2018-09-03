import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Date2Rus from './Date2Rus';

/**
 * @props: {
 *     number: number - номер проблемы
 *     title: string - навание проблемы
 *     created_at: date - дата создания issue
 *     user: {
 *         login: string - имя пользователя Github
 *         avatar_url: string - ссылка на аватарку
 *         html_url: string - ссылка на страницу пользователя
 *     }
 * }
 */
class Issue extends Component {
    render() {
        let {number, title, user, created_at} = this.props.issue;
        return (
            <tr>
                <td>{number}</td>
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