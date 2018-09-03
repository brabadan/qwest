import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import IssueList from './IssueList';

it('renders IssueList without crashing', () => {
    const div = document.createElement('div');
    const props = {
        issues: [
            {
                number: 1,
                title: 'навание проблемы',
                created_at: new Date(),
                user: {
                    login: 'имя пользователя Github',
                    avatar_url: 'ссылка на аватарку',
                    html_url: 'ссылка на страницу пользователя'
                }
            }
        ]
    };

    ReactDOM.render(
        <HashRouter>
            <table>
                <IssueList {...props} />
            </table>
        </HashRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
})
;
