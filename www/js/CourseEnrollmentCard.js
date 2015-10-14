import React from 'react';

import * as EnrollmentService from './services/EnrollmentService';

import DataGrid from './components/DataGrid';
import StudentSearchBox from './StudentSearchBox';

import {Icon} from './components/Icons';

export default React.createClass({

    getInitialState() {
        return {enrollments:[]};
    },

    componentWillReceiveProps(props) {
        this.getEnrollments(props.course.id);
    },

    getEnrollments(courseId) {
        if (courseId) {
            EnrollmentService.findByCourse(courseId).then(enrollments => this.setState({enrollments}));
        }
    },

    studentLinkHandler(enrollment) {
        window.location.hash = "#student/" + enrollment.student_id;
    },

    actionHandler(data, index, value, label) {
        switch(index) {
            case 0:
                this.studentLinkHandler(data);
                break;
            case 1:
                EnrollmentService.deleteItem(data.id)
                    .then(() => this.getEnrollments(this.props.course.id));
                break;
        }
    },
    studentSelectHandler(index, value, label) {
        EnrollmentService.createItem({course_id: this.props.course.id, student_id: value})
            .then(() => this.getEnrollments(this.props.course.id))
            .catch((error) => {
                let event = new CustomEvent('notify', {detail:'Student already enrolled in this course'});
                document.dispatchEvent(event);
            });

    },

    render() {
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="lead" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">Students</h3>
                        </div>
                    </div>
                    <div className="slds-no-flex">
                        <StudentSearchBox placeholder="Search to enroll..." onSelect={this.studentSelectHandler}/>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid data={this.state.enrollments} keyField="id" actions={["View Student", "Delete"]} onAction={this.actionHandler}>
                        <div header="First Name" field="first_name" sortable={true} onLink={this.studentLinkHandler}/>
                        <div header="Last Name" field="last_name" sortable={true} onLink={this.studentLinkHandler}/>
                        <div header="Phone" field="phone"/>
                        <div header="Mobile Phone" field="mobile_phone"/>
                    </DataGrid>
                </section>

            </div>
        );
    }

});