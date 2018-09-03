import React, {Component} from 'react';
import './DropDownList.css';

/** Выпадающий список репозитариев при вводе USER/REPO
      @props:
        dropDownHidden: boolean, - Равен аттрибуту hidden
        onFocusDropDown() {}, - Функция, если фокус с ввода user/repo перешел на выпадающий список - список не скрываем
        setDropDownEl() {}, - Функция для ref - передаёт родителю DOM элемент списка для установки размера
        onSelectDropDown() {}, - Функция обрабатывает выбор репозитария из списка
        repoFilter: '', - Параметр по которому фильтруется список репозитариев
        repos: [{ - массив репозитариев
            name: 'name', - Название репозитария
            full_name: 'full_name', - Полное название = ПОЛЬЗОВАТЕЛЬ/РЕПОЗИТАРИЙ
            open_issues: 1 - Количество ISSUE для данного репозитария
        }]
 */
class DropDownList extends Component {
    render() {
        return (
            <div className="DropDownList-div"
                 hidden={this.props.dropDownHidden}
                 onFocus={this.props.onFocusDropDown}
                 ref={this.props.setDropDownEl}
            >
                <ul>
                    {this.props.repos.map((repo, index) => {
                        return (
                            <li key={index} data-index={index}
                                onClick={this.props.onSelectDropDown}
                                hidden={!repo.name.startsWith(this.props.repoFilter)}>
                                ({repo.open_issues}){repo.full_name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default DropDownList;