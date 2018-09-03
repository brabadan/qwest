import React, {Component} from 'react';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';
import './App.css';
import IssueList from './components/IssueList';
import Pagination from './components/Pagination';
import Request from './components/Request';
import DropDownList from './components/DropDownList';
import IssueDetailed from './components/IssueDetailed';

const UrlUser = 'https://api.github.com/users/';
const FirstStatusText = `Введите пользователя и репозитарий например: laravel/ideas`;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputUserRepo: '',
            user: '',
            repoFilter: '',
            repoNum: -1,
            repo: {},
            repos: [],
            issues: [],
            perPage: 10,
            curPage: 1,
            maxPage: 0,
            dropDownHidden: true,
            statusText: FirstStatusText,
        };
        this.setDropDownEl = this.setDropDownEl.bind(this);
        this.onChangeInputUser = this.onChangeInputUser.bind(this);
        this.onBlurInputUser = this.onBlurInputUser.bind(this);
        this.onFocusDropDown = this.onFocusDropDown.bind(this);
        this.onSelectDropDown = this.onSelectDropDown.bind(this);
        this.onClickFindIssues = this.onClickFindIssues.bind(this);
        this.showIssuesFirst = this.showIssuesFirst.bind(this);
        this.showIssuesPage = this.showIssuesPage.bind(this);
        this.onChangePerPage = this.onChangePerPage.bind(this);
        this.onChoicePage = this.onChoicePage.bind(this);

        this.request = new Request();
        this.inputUser = React.createRef(); // DOM элемент поля ввода пользователя(для координат DropDownList)
        this.statusBar = React.createRef();
    }

    // Получаем DOM элемент DropDownList
    setDropDownEl(el) {
        this.dropDownEl = el
    };

    // Устанавливаем размеры DOM элементу DropDownList
    setDropDownSize() {
        this.dropDownEl.style.left = this.inputUser.current.offsetLeft + 'px';
        this.dropDownEl.style.top = (this.inputUser.current.offsetTop + this.inputUser.current.offsetHeight) + 'px';
        this.dropDownEl.style.width = (this.inputUser.current.offsetWidth - 2) + 'px';
    }

    // Показываем строку состояния
    showStatusText(statusText) {
        this.statusBar.current.classList.remove('hidden');
        this.setState({statusText});
    }

    // Прячем строку состояния
    hideStatusText() {
        this.statusBar.current.classList.add('hidden');
    }

    // При нажатии на номер страницы в Пагинаторе - переключаем её
    onChoicePage(e) {
        let curPage = e.target.value;
        this.setState({curPage}, this.showIssuesPage);
    }

    // При изменении количества одновременно выводимых issue - выводим заново таблицу
    onChangePerPage(e) {
        let perPage = e.target.valueAsNumber, repo = this.state.repo || {open_issues: 0};
        if (perPage < 1) perPage = 1;

        let maxPage = repo.open_issues > 0 ? Math.ceil(repo.open_issues / perPage) : 0;
        this.setState({maxPage, perPage, curPage: 1}, this.showIssuesPage);
    }

    /**
     *  Событие ввода имени пользователя и репозитария по шаблону: user/repo
     **/
    onChangeInputUser(e) {
        let inputUserRepo = e.target.value.trim();
        // Регулярка для шаблона "user/repo"
        let reg = /([^/]*)(?:\/([^/]*))*/;
        let [, user = '', repoFilter = ''] = reg.exec(inputUserRepo);
        // Если имя пусто - очищаем список репозитариев
        if (user === '') {
            this.showStatusText(FirstStatusText);
            this.setState({inputUserRepo, user, repoFilter, repos: [], repoNum: -1});
            return;
        }
        // иначе показываем DropDownList с репозитариями по фильтру
        this.setDropDownSize(); // Устанавливаем координаты для всплывающего окна
        this.setState({inputUserRepo, repoFilter, dropDownHidden: false});
        //Если имя изменилось - ищем и показываем ЕГО репозитарии
        if (user !== this.state.user) {
            this.showStatusText(`Идёт поиск репозитариев для ${inputUserRepo} ...`);
            this.setState({user, repos: [], repoNum: -1}, this.findUsersRepos);
        }
    }

    /**
     * Событие ухода с поля ввода имени и репо
     */
    onBlurInputUser() {
        // Скрываем всплывающий список репо. Задержка на случай если ушли на список, чтоб отменить его скрытие.
        this.timeoutHiddenDropDown = setTimeout(() => {
            this.setState({dropDownHidden: true});
        }, 200);
    }

    /**
     * Событие выбора репозитария из выпадающего списка
     */
    onFocusDropDown() {
        // отменяем скрытие списка, чтобы обработать выбор репозитария
        clearTimeout(this.timeoutHiddenDropDown);
    }

    // Поиск репозитариев для введенного Пользователя
    findUsersRepos() {
        let user = this.state.user;
        // Получаем с Github данные для введенного пользователя
        this.request(UrlUser + user)
            .then(res => {
                if (res.repos_url) { // Если есть, получаем ссылку на репозитарии и запрашиваем их с Github
                    return this.request(res.repos_url)
                } else { // иначе прокидываем ошибку
                    throw new Error(`!!!Не получен url списка репозитариев для: ${user}`);
                }
            })
            .then(res => {
                let repos = res.slice();
                // Если найдены репозитарии - показываем их
                if (repos.length > 0) {
                    this.hideStatusText();
                    this.setState({repos});
                } else { //  иначе сообщение в строке статуса
                    this.showStatusText(`!!!Репозитарии для ${this.state.user} не найдены`);
                }
            })
            .catch(err => { // Если произошла ошибка - выводим её в строку статуса
                this.showStatusText('!!!Ошибка при поиске репозитариев: ' + err);
                console.log('error:', err)
            });
    }

    // Событие выбора репозитария в выпадающем списке
    onSelectDropDown(e) {
        let repoNum = e.target.dataset.index;
        let repo = this.state.repos[repoNum];
        let inputUserRepo = repo.full_name;
        let repoFilter = repo.name;
        this.setState({repoNum, repo, inputUserRepo, repoFilter}, this.showIssuesFirst);
    }

    // Событие нажатия на кнопку Поиск
    onClickFindIssues() {
        let repoNum = -1;
        // Ищем репозитарий с введенным названием
        this.state.repos.forEach((repo, index) => {
            if (repo.name === this.state.repoFilter) repoNum = index;
        });
        if (repoNum >= 0) { // Если нашли - выводим список его Issues
            this.setState({repoNum}, this.showIssuesFirst);
        } else {
            this.showStatusText(`!!!Не найден репозитарий: ${this.state.inputUserRepo}`);
            this.setState({curPage: 1, maxPage: 0, repoNum, issues: []});
        }
    }

    // Начинаем показывать Issues с первой страницы
    showIssuesFirst() {
        if (this.state.repoNum > 0
            && this.state.repos[this.state.repoNum]
            && this.state.repos[this.state.repoNum].open_issues > 0) {
            let repo = this.state.repos[this.state.repoNum];
            let inputUserRepo = repo.full_name;
            let repoFilter = repo.name;
            let maxPage = Math.ceil(repo.open_issues / this.state.perPage);
            this.setState({inputUserRepo, repoFilter, repo, curPage: 1, maxPage}, this.showIssuesPage);
        }
    }

    // Показываем Issues на установленной странице
    showIssuesPage() {
        let {curPage, perPage, repo = {issues_url: ''}} = this.state;
        if (!repo.open_issues || !repo.issues_url) return;
        let url = repo.issues_url.replace('{/number}', '/');
        let promises = []; // массив промисов для запроса Issues
        let issueFrom = (curPage - 1) * perPage + 1;
        let issueTo = Math.min(repo.open_issues, issueFrom + perPage - 1);
        for (let issueNum = issueFrom; issueNum <= issueTo; issueNum++) {
            let promise = this.request(url + issueNum.toString());
            promises.push(promise);
        }
        this.showStatusText(`Ищем ${curPage} страницу issues для ${repo.full_name} ...`);
        Promise.all(promises) // Запрашиваем Issues с Github
            .then(issues => { // Сохраняем их в this.state.issues - для обновления на экране
                this.hideStatusText();
                this.setState({issues});
            })
            .catch(err => {
                this.showStatusText(`!!!Ошибка при поиске ${curPage} страницы issues для ${repo.full_name}: ` + err);
                console.log('error:', err);
            });
    }


    render() {
        return (
            <HashRouter>
                <div>
                    {/*Фиксированная шапка с логотипом*/}
                    <div className="App-header">
                        <Link to="/">
                            <strong className="App-title">G I V - Github's issues viewer</strong>
                        </Link>
                    </div>
                    {/*Содержимое под шапкой*/}
                    <div className="App-body">
                        {/*Панель ввода имени и репо + кнопка Поиск*/}
                        <div className="App-chooser">
                            <div className="App-input-bar">
                                <label>user/repo:</label>
                                <input type="search"
                                       placeholder="формат: пользователь/репозитарий"
                                       title="Введите имя пользователя  Github и репозиторий для поиска его issues"
                                       value={this.state.inputUserRepo}
                                       ref={this.inputUser}
                                       onChange={this.onChangeInputUser}
                                       onBlur={this.onBlurInputUser}
                                       id="user"
                                />
                                <Link to="/"><button onClick={this.onClickFindIssues}>Поиск</button></Link>
                            </div>
                            {/*Всплывающая строка статуса*/}
                            <div className="App-status-bar"
                                 ref={this.statusBar}
                            >
                                <span>{this.state.statusText}</span>
                            </div>
                            {/*Выпадающий список РЕПО введенного пользователя и по фильтру после "/" */}
                            <DropDownList repos={this.state.repos}
                                          setDropDownEl={this.setDropDownEl}
                                          onSelectDropDown={this.onSelectDropDown}
                                          onFocusDropDown={this.onFocusDropDown}
                                          repoFilter={this.state.repoFilter}
                                          dropDownHidden={this.state.dropDownHidden}/>
                        </div>
                        <Switch>
                            {/*Детальный просмотр одного ISSUE*/}
                            <Route path="/issue/:number"
                                   render={props => {
                                       return (
                                           <IssueDetailed {...this.state} {...props} />
                                       )
                                   }
                                   }/>
                            {/*Таблица с пагинацией - Все ISSUE данного репо */}
                            <Route exact path="/" render={() => {
                                return (
                                    <div className="App-data">
                                        <table>
                                            <caption>
                                                {/*Панель пагинации*/}
                                                <Pagination onChoicePage={this.onChoicePage}
                                                            curPage={this.state.curPage}
                                                            maxPage={this.state.maxPage}/>
                                                <div className="App-data__input-per-page">
                                                    <label>Выводить по:</label>
                                                    <input type="number"
                                                           min="1"
                                                           value={this.state.perPage}
                                                           onChange={this.onChangePerPage}/>
                                                </div>
                                            </caption>
                                            <thead>
                                            <tr>
                                                <th>№</th>
                                                <th>Дата</th>
                                                <th>Название</th>
                                                <th>Автор</th>
                                            </tr>
                                            </thead>
                                            <IssueList issues={this.state.issues} repo={this.state.repo}/>
                                        </table>
                                    </div>
                                )
                            }
                            }/>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;
