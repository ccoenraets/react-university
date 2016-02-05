import React from 'react';
import CourseList from './CourseList';

import * as CourseService from './services/CourseService';
import * as PeriodService from './services/PeriodService';
import settings from './services/config';
import ComboBox from './components/ComboBox';


export default React.createClass({

    getInitialState() {
        return {courses:[], periodId:settings.currentPeriod};
    },

    componentDidMount() {
        CourseService.findAll({periodId: this.state.periodId}).then(courses => this.setState({courses}));
        PeriodService.findAll().then(periods => this.setState({periods}));
    },

    rowClickHandler(data) {
        this.selectedItem = data;
    },

    addHandler() {
        if (this.props.onSelected) {
            this.props.onSelected(this.selectedItem);
        }
    },

    changeHandler(index, periodId, label) {
        this.setState({periodId});
        CourseService.findAll({periodId}).then(courses => this.setState({courses}));
    },

    render() {
        return (
            <div>
                <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open">
                    <div className="slds-modal__container">
                        <div className="slds-modal__header" style={{borderBottom:"solid 1px #d8dde6"}}>
                            <ComboBox data={this.state.periods} value={this.state.periodId} onChange={this.changeHandler}/>
                            <button className="slds-button slds-modal__close">
                                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--inverse slds-button__icon--large">
                                </svg>
                                <span className="slds-assistive-text">Close</span>
                            </button>
                        </div>
                        <div className="slds-modal__content" style={{padding: 0}}>
                            <CourseList ref="form" courses={this.state.courses} ignoreLinks={true} onRowClick={this.rowClickHandler}/>
                        </div>

                        <div className="slds-modal__footer" style={{borderTop:"solid 1px #d8dde6"}}>
                            <button className="slds-button slds-button--neutral" onClick={this.props.onCancel}>Cancel</button>
                            <button className="slds-button slds-button--neutral slds-button--brand" onClick={this.addHandler}>Enroll</button>
                        </div>
                    </div>
                </div>
                <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>
            </div>
        );
    }

});