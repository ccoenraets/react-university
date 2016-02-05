import React from 'react';

import StudentForm from './StudentForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#student/" + this.props.student.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <StudentForm ref="form" student={this.props.student} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});