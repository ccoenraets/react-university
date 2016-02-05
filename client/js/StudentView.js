import React from 'react';

import moment from 'moment';

import StudentEnrollmentCard from './StudentEnrollmentCard';

export default React.createClass({

    render() {
        let student = this.props.student;
        return (
            <div className="slds-m-around--medium">
                <div className="slds-grid slds-wrap slds-m-bottom--large">
                    <div className="slds-col--padded slds-size--1-of-1 slds-m-bottom--small">
                            <span className="slds-avatar slds-avatar--large" style={{height: "120px", width: "120px"}}>
                                <img src={student.pic || "assets/images/avatar2.jpg"} alt="portrait"/>
                            </span>
                    </div>
                    <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                        <dl className="page-header--rec-home__detail-item">
                            <dt>
                                <p className="slds-text-heading--label slds-truncate" title="Field 1">Address</p>
                            </dt>
                            <dd>
                                <p className="slds-text-body--regular slds-truncate" title="">{student.address}<br/>
                                    {student.city} {student.state} {student.zip}
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                        <dl className="page-header--rec-home__detail-item">
                            <dt>
                                <p className="slds-text-heading--label slds-truncate" title="Field 1">Registration Date</p>
                            </dt>
                            <dd>
                                <p className="slds-text-body--regular slds-truncate" title="">
                                    {student.registration ? moment(student.registration).format("l") + ' (' + moment(student.registration).fromNow() + ')' : ""}
                                </p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <StudentEnrollmentCard student={student} onNew={this.newCourseHandler}/>
            </div>
        );
    }

});