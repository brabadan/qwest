import React from 'react';
import ReactDOM from 'react-dom';
import DropDownList from './DropDownList';

it('renders DropDownList without crashing', () => {
    const div = document.createElement('div');
    const props = {
        dropDownHidden: false,
        onFocusDropDown() {},
        setDropDownEl() {},
        onSelectDropDown() {},
        repoFilter: '',
        repos: [{
            name: 'name',
            full_name: 'fullname',
            open_issues: 1
        }]
    };
    ReactDOM.render(<DropDownList {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
