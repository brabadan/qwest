import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './Pagination';

it('renders DropDownList without crashing', () => {
    const div = document.createElement('div');
    const props = {
        curPage: 1,
        maxPage: 2,
    };
    ReactDOM.render(<Pagination {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
