import React from 'react';
import DataGrid from './components/DataGrid';

export default React.createClass({

    courseLinkHandler(course) {
        window.location.hash = "#course/" + course.id;
    },

    teacherLinkHandler(course) {
        window.location.hash = "#teacher/" + course.teacher_id;
    },

    rowClick(data) {
        if (this.props.onRowClick) {
            this.props.onRowClick(data);
        }
    },

    render() {
        return (
            <DataGrid data={this.props.courses} onRowClick={this.rowClick} ignoreLinks={this.props.ignoreLinks}>
                <div header="Period" field="period_name"/>
                <div header="Code" field="code" onLink={this.courseLinkHandler}/>
                <div header="Name" field="name" onLink={this.courseLinkHandler}/>
                <div header="Teacher" field="teacher_name" onLink={this.teacherLinkHandler}/>
                <div header="Credits" field="credits" textAlign="right"/>
                <div header="#Enrolled" field="student_count" textAlign="right"/>
            </DataGrid>
        );
    }

});