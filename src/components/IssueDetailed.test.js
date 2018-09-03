import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import IssueDetailed from './IssueDetailed';

it('renders IssueList without crashing', () => {
    const div = document.createElement('div');
    const props = {
        issues: [
            {
                number: 1,
                title: 'навание проблемы',
                created_at: new Date(),
                body: 'полное описание проблемы',
                status: 'closed',
                user: {
                    login: 'имя пользователя Github',
                    avatar_url: 'ссылка на аватарку',
                    html_url: 'ссылка на страницу пользователя'
                }
            }
        ],
        repo: {
            full_name: 'user/repo'
        },
        match: {
            params: {
                number: 1
            }
        }
    };

    ReactDOM.render(
        <HashRouter>
                <IssueDetailed {...props} />
        </HashRouter>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
