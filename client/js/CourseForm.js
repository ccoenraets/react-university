import React from 'react';

import * as CourseService from './services/CourseService';
import * as PeriodService from './services/PeriodService';
import * as TeacherService from './services/TeacherService';

import ComboBox from './components/ComboBox';

export default React.createClass({

    getInitialState() {
        return {course:{}, periods:[], teachers:[]};
    },

    componentWillReceiveProps(props) {
        let course = props.course;
        this.setState({course});
    },

    componentDidMount() {
        PeriodService.findAll().then(periods => this.setState({periods}));
        TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    codeChangeHandler(event) {
        let course = this.state.course;
        course.code = event.target.value;
        this.setState({course});
    },

    nameChangeHandler(event) {
        let course = this.state.course;
        course.name = event.target.value;
        this.setState({course});
    },

    periodChangeHandler(index, value, label) {
        let course = this.state.course;
        course.period_id = value;
        this.setState({course});
    },

    teacherChangeHandler(index, value, label) {
        let course = this.state.course;
        course.teacher_id = value;
        this.setState({course});
    },

    creditsChangeHandler(event) {
        let course = this.state.course;
        course.credits = event.target.value;
        this.setState({course});
    },

    save() {
        let saveItem = this.state.course.id ? CourseService.updateItem : CourseService.createItem;
        saveItem(this.state.course).then(savedCourse => {
            if (this.props.onSaved) this.props.onSaved(savedCourse);
        });
    },

    render() {
        let course = this.state.course;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Code</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.code} onChange={this.codeChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.name} onChange={this.nameChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Teacher</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.teachers} value={course.teacher_id} onChange={this.teacherChangeHandler}/>
                        </div>
                    </div>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Period</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.periods} value={course.period_id} onChange={this.periodChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Credits</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.credits} onChange={this.creditsChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});