import React from 'react';

import * as StudentService from './services/StudentService';

import SearchBox from './components/SearchBox';

export default React.createClass({

    getInitialState() {
        return {students:[]}
    },

    keyChangeHandler(name) {
        if (name) {
            StudentService.findByName(name).then(students => this.setState({students}));
        }
    },

    render() {
        return (
            <SearchBox data={this.state.students}
                       placeholder={this.props.placeholder}
                       onKeyChange={this.keyChangeHandler}
                       onSelect={this.props.onSelect}/>
        );
    }

});