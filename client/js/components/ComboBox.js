import React from 'react';

import {ButtonIcon} from './Icons';
import Dropdown from './Dropdown';

export default React.createClass({

    getInitialState() {
        return {open:false, label:""};
    },

    componentWillReceiveProps(props) {
        let label;
        let icon;
        let items = props.data;
        for (let i=0; i<items.length; i++) {
            let item = items[i];
            if (item[props.valueField || "id"] == props.value) {
                label = item[props.labelField || "name"];
                icon = item[props.iconField];
                break;
            }
        }
        this.setState({value:this.props.value, label});
    },

    changeHandler(index, value, label) {
        this.setState({value, label, open:false});
        if (this.props.onChange) {
            this.props.onChange(index, value, label);
        }
    },

    buttonClickHandler() {
        this.setState({open:true});
    },

    render() {
        return (
            <div className="slds-dropdown-trigger">
                <button className="slds-button slds-button--icon-more" style={{textAlign:"left"}} aria-haspopup="true" onClick={this.buttonClickHandler}>
                    <span style={{display:"inline-block", width: "200px"}}>{this.state.label}</span>
                    <ButtonIcon name="down"/>
                </button>
                {this.state.open?
                    <Dropdown position="left" header={this.props.header}
                               valueField={this.props.valueField}
                               labelField={this.props.labelField}
                               data={this.props.data}
                               onChange={this.changeHandler}/>
                :null}
            </div>
        );
    }

});