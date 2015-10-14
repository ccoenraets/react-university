import React from 'react';

import * as CourseService from './services/CourseService';

import DataGrid from './components/DataGrid';
import {Icon, ButtonIcon} from './components/Icons';

export default React.createClass({

    getInitialState() {
        return {courses:[]};
    },

    componentWillReceiveProps(props) {
        this.getCourses(props.teacher.id);
    },

    viewAllHandler(event) {
        this.getCourses(this.props.teacher.id);
        event.preventDefault();
    },

    getCourses(teacherId, queryParams) {
        if (teacherId) {
            CourseService.findByTeacher(teacherId, queryParams).then(courses => this.setState({courses}));
        }
    },

    courseLinkHandler(course) {
        window.location.hash = "#course/" + course.id;
    },

    render() {
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="topic" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">Courses</h3>
                        </div>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid data={this.state.courses} keyField="id">
                        <div header="Period" field="period_name" sortable={true}/>
                        <div header="Code" field="code" sortable={true} onLink={this.courseLinkHandler}/>
                        <div header="Name" field="name" sortable={true} onLink={this.courseLinkHandler}/>
                        <div header="Credits" field="credits" sortable={true} textAlign="right"/>
                    </DataGrid>
                </section>

            </div>
        );
    }

});