import React, {Component} from 'react';
import './DropDownList.css';

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