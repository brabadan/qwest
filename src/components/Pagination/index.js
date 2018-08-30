import React, { Component } from 'react';

/**
 * @props.curPage - текущая страница
 * @props.maxPage - номер последней страницы
 */
class Pagination extends Component {
    isDisabled(num) {
        return +num === +this.props.curPage;
    }

    render() {
        let curPage = +this.props.curPage;
        let maxPage = +this.props.maxPage;
        let buttonsArr = [];

        if (curPage <= 4) {
            for (let i = 1; i <= Math.min(curPage + 2, maxPage); i++) buttonsArr.push(i);
        } else {
            buttonsArr = [1, 0];
            for (let i = curPage - 2; i <= Math.min(curPage + 2, maxPage); i++) buttonsArr.push(i);
        }
        if (curPage < maxPage - 2) {
            if (curPage < maxPage -3) buttonsArr.push(0);
            buttonsArr.push(maxPage);
        }
        return (
            <div className="App-data-paginator">
                {buttonsArr.map((num, index) => {
                    if (num > 0) {
                        return (
                            <button key={index} onClick={this.props.onChoicePage} value={num} disabled={this.isDisabled(num)}>{num}</button>
                        )
                    } else {
                        return (
                            <span key={index}>...</span>
                        )
                    }
                })}
            </div>
        )
    }
}

export default Pagination;