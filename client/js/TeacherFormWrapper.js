import React from 'react';

import TeacherForm from './TeacherForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#teacher/" + this.props.teacher.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <TeacherForm ref="form" teacher={this.props.teacher} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});