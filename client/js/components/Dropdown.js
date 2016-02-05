import React from 'react';

import {Icon, ButtonIcon} from "./Icons";
import {Action} from "./Icons";

let DropdownItem = React.createClass({

    clickHandler(event) {
        event.preventDefault();
        this.props.onSelect(this.props.index, this.props.value, this.props.label, this.props.icon);
    },

    render() {
        // slds-has-icon--left
        return (
            <li className="slds-dropdown__item" role="menuitem option" tabIndex="-1">
                <a href="#" tabIndex="-1" className="slds-truncate" onClick={this.clickHandler}>
                    {this.props.label}
                    {this.props.icon ?
                        <Icon category="utility" name={this.props.icon} size="small" position="right"/>
                        : ""}
                </a>
            </li>
        );
    }

});


export default React.createClass({

    getDefaultProps() {
        return {position: "right"};
    },

    render() {
        let items;
        if (this.props.data) {
            items = this.props.data.map((item, index) =>
                <DropdownItem
                    index={index}
                    key={item[this.props.valueField] || item.id}
                    value={item[this.props.valueField] || item.id}
                    label={item[this.props.labelField] || item.name}
                    onSelect={this.props.onChange}/>);
        }
        let className = "slds-dropdown slds-dropdown--menu";
        if (this.props.position) className = className + " slds-dropdown--" + this.props.position;
        if (this.props.size) className = className + " slds-dropdown--" + this.props.size;
        return (
            <div className={className} style={{maxHeight: "250px", minWidth: "200px", overflow: "scroll"}}>
                {this.props.header ?
                    <div className="slds-dropdown__header">
                        <span className="slds-text-heading--label">{this.props.header}</span>
                    </div> : null}
                <ul className="slds-dropdown__list" role="menu" style={{textAlign: "left"}}>
                    {items}
                </ul>
            </div>
        );
    }

});
