import React, {Component} from 'react';
import Issue from './Issue';

/**
 * @props.issues - масcив issue: {
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