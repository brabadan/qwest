import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Date2Rus from '../Date2Rus/index';

class IssueDetailed extends Component {
    render() {
        let {repo, issues, match: {params: {number}}} = this.props;
        let issue;
        if (issues) {
            issue = issues.find(iss => +iss.number === +number);
        }
        if (!issue) {
            return (
                <strong>Не найден issue с номером {number}
                    <Link to="/">
                        <button>{`<<`}Назад</button>
                    </Link>
                </strong>
            );
        }
        return (
            <div className="App-issue-detailed">
                <table>
                    <caption>
                        <strong>Подробное ИНФО по проблеме №{number} для {repo.full_name}</strong>
                    </caption>
                    <tbody>
                    <tr>
                        <td>Дата</td>
                        <td><Date2Rus date={issue.created_at}/></td>
                    </tr>
                    <tr>
                        <td>Автор</td>
                        <td><img src={issue.user.avatar_url} alt="avatar"/>
                            <a href={issue.user.html_url}>{issue.user.login}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Тема</td>
                        <td>{issue.title}</td>
                    </tr>
                    <tr>
                        <td>Текст</td>
                        <td>{issue.body}</td>
                    </tr>
                    <tr>
                        <td>Статус</td>
                        <td>{issue.state}</td>
                    </tr>
                    </tbody>
                </table>
                <Link to="/">
                    <button>{`<<`}Назад</button>
                </Link>
            </div>
        )
    }
}

export default IssueDetailed;