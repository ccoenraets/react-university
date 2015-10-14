import React from 'react';

import * as EnrollmentService from './services/EnrollmentService';
import settings from './services/Settings';

import DataGrid from './components/DataGrid';
import {Icon, ButtonIcon} from './components/Icons';

import CourseEnrollmentWindow from './CourseEnrollmentWindow';

export default React.createClass({

    getInitialState() {
        return {enrollments:[], period:"current", addingEnrollment:false};
    },

    componentWillReceiveProps(props) {
        this.getEnrollments(props.student.id);

    },

    newEnrollmentHandler() {
        this.setState({addingEnrollment:true});
    },

    newEnrollmentCancelHandler() {
        this.setState({addingEnrollment:false});
    },

    newEnrollmentSelectedHandler(course) {
        EnrollmentService.createItem({student_id: this.props.student.id, course_id: course.id})
            .then(() => {
                this.getEnrollments(this.props.student.id);
                this.setState({addingEnrollment:false});
            })
            .catch((error) => {
                let event = new CustomEvent('notify', {detail:'Student already enrolled in this course'});
                document.dispatchEvent(event);
            });
    },

    viewAllHandler(event) {
        this.getEnrollments(this.props.student.id, "all");
        event.preventDefault();
    },

    viewCurrentHandler(event) {
        this.getEnrollments(this.props.student.id, "current");
        event.preventDefault();
    },

    courseLinkHandler(enrollment) {
        window.location.hash = "#course/" + enrollment.course_id;
    },

    teacherLinkHandler(enrollment) {
        window.location.hash = "#teacher/" + enrollment.teacher_id;
    },

    actionHandler(data, index, value, label) {
        switch(index) {
            case 0:
                this.courseLinkHandler(data);
                break;
            case 1:
                this.teacherLinkHandler(data);
                break;
            case 2:
                EnrollmentService.deleteItem(data.id)
                    .then(() => this.getEnrollments(this.props.student.id));
                break;
        }
    },

    getEnrollments(studentId, newPeriodState) {
        let params;
        if ((newPeriodState && newPeriodState === "current") || !newPeriodState && this.state.period === "current") {
            params = {periodId: settings.currentPeriod};
        }
        if (studentId) {
            EnrollmentService.findByStudent(studentId, params)
                .then(enrollments => this.setState({enrollments, period:newPeriodState?newPeriodState:this.state.period}));
        }
    },

    render() {
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="orders" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">Courses</h3>
                        </div>
                    </div>
                    <div className="slds-no-flex">
                        <div className="slds-button-group">
                            <button className="slds-button slds-button--neutral slds-button--small" onClick={this.newEnrollmentHandler}>New</button>
                            <button className="slds-button slds-button--icon-border-filled">
                                <ButtonIcon name="down"/>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                        </div>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid data={this.state.enrollments} keyField="id" actions={["View Course", "View Teacher", "Delete"]} onAction={this.actionHandler}>
                        <div header="Code" field="code" onLink={this.courseLinkHandler}/>
                        <div header="Name" field="course_name" onLink={this.courseLinkHandler}/>
                        <div header="Period" field="period_name"/>
                        <div header="Teacher" field="teacher_name" onLink={this.teacherLinkHandler}/>
                        <div header="Credits" field="credits" textAlign="right"/>
                    </DataGrid>
                </section>
                {this.state.period === "current" ?
                    <footer className="slds-card__footer"><a href="#" onClick={this.viewAllHandler}>View All Periods</a></footer>
                    :
                    <footer className="slds-card__footer"><a href="#" onClick={this.viewCurrentHandler}>View Current Period</a></footer>
                }
                {this.state.addingEnrollment ?
                    <CourseEnrollmentWindow onSelected={this.newEnrollmentSelectedHandler} onCancel={this.newEnrollmentCancelHandler}/>
                    :null
                }
            </div>
        );
    }

});