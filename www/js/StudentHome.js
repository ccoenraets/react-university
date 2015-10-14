import React from 'react';

import * as StudentService from './services/StudentService';

import {HomeHeader} from './components/PageHeader';
import StudentList from './StudentList';
import StudentFormWindow from './StudentFormWindow';

export default React.createClass({

    getInitialState() {
        return {students: []};
    },

    componentDidMount() {
        StudentService.findAll().then(students => this.setState({students}));
    },

    newHandler() {
        this.setState({addingStudent:true});
    },

    savedHandler(student) {
        this.setState({addingStudent: false});
        window.location.hash = "#student/" + student.id;
    },

    cancelHandler() {
        this.setState({addingStudent: false});
    },

    render() {
        return (
            <div>
                <HomeHeader type="Students"
                            title="Recent Students"
                            newLabel="New Student"
                            actions={[{value:"new", label:"New Student"}]}
                            itemCount={this.state.students.length}
                            views={[{id:1, name:"Recent Students"}]}
                            viewId="1"
                            onNew={this.newHandler}/>
                <StudentList students={this.state.students}/>
                {this.state.addingStudent?<StudentFormWindow onSaved={this.savedHandler} onCancel={this.cancelHandler}/>:null}
            </div>
        );
    }

});