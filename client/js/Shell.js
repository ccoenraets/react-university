import React from 'react';

import Spinner from './components/Spinner';
import Toast from './components/Toast';
import {Icon} from './components/Icons';
import StudentSearchBox from './StudentSearchBox';

export default React.createClass({

    selectHandler(index, value, label) {
        window.location.hash = "student/" + value;
    },

    render() {
        return (
            <div>
                <Spinner/>
                <Toast/>
                <header className="menu" style={{backgroundColor:"#01344E", verticalAlign:"middle"}}>
                    <ul className="slds-list--horizontal">
                        <li className="slds-list__item"><a href="#students"><Icon name="lead" theme={null}/>Students</a></li>
                        <li className="slds-list__item"><a href="#courses"><Icon name="orders" theme={null}/>Courses</a></li>
                        <li className="slds-list__item slds-m-right--xx-large"><a href="#teachers"><Icon name="user" theme={null}/>Teachers</a></li>
                        <li className="slds-list__item slds-m-top--xx-small">
                            <StudentSearchBox onSelect={this.selectHandler}/>
                        </li>
                    </ul>
                </header>
                {this.props.children}
            </div>
        );
    }
});