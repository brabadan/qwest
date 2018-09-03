import { Component } from 'react';

class Date2Rus extends Component {
    render() {
        let date = this.props.date || null;
        let d = new Date(date);
        let day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        return day + '.' + month + '.' + year;
    }
}

export default Date2Rus;