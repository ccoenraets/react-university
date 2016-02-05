import React from 'react';

import CourseForm from './CourseForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#course/" + this.props.course.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <CourseForm ref="form" course={this.props.course} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});