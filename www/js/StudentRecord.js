import React from 'react';
import moment from 'moment';

import * as StudentService from './services/StudentService';

import {RecordHeader, HeaderField} from './components/PageHeader';

export default React.createClass({

    getInitialState() {
        return {student:{}};
    },

    componentDidMount() {
        this.getStudent(this.props.params.studentId);
    },

    componentWillReceiveProps(props) {
        this.getStudent(props.params.studentId);
    },

    getStudent(id) {
        StudentService.findById(id).then(student => this.setState({student}));
    },

    formatDOB(dob) {
        return dob ? moment(dob).format("l") + ' (' + moment(dob).fromNow() +')' : "";
    },

    deleteHandler() {
        StudentService.deleteItem(this.state.student.id).then(() => window.location.hash = "students");
    },

    editHandler() {
        window.location.hash = "#student/" + this.state.student.id + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Student" icon="lead"
                              title={this.state.student.first_name + ' ' + this.state.student.last_name}
                              onEdit={this.editHandler}
                              onDelete={this.deleteHandler}
                              onClone={this.cloneHandler}>
                    <HeaderField label="Date of Birth" value={this.state.student.dob} format={this.formatDOB}/>
                    <HeaderField label="Mobile Phone" value={this.state.student.mobile_phone}/>
                    <HeaderField label="Home Phone" value={this.state.student.phone}/>
                    <HeaderField label="Email" value={this.state.student.email}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {student: this.state.student})}

            </div>
        );
    }
});