import React from 'react';
import DataGrid from './components/DataGrid';

export default React.createClass({

    linkHandler(student) {
        window.location.hash = "#student/" + student.id;
    },

    actionHandler(data, value, label) {
        if (label === "Delete") {
            this.props.onDelete(data);
        } else if (label === "Edit") {
            this.props.onEdit(data);
        }
    },

    render() {
        return (
            <DataGrid data={this.props.students}>
                <div header="First Name" field="first_name" onLink={this.linkHandler}/>
                <div header="Last Name" field="last_name" onLink={this.linkHandler}/>
                <div header="Address" field="address"/>
                <div header="City" field="city"/>
                <div header="State" field="state"/>
            </DataGrid>
        );
    }

});