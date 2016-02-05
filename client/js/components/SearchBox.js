import React from 'react';

import Dropdown from './Dropdown';

export default React.createClass({

    mixins: [
        require('react-onclickoutside')
    ],

    getInitialState: function() {
        return {searchKey: "", open: false};
    },

    handleClickOutside: function(evt) {
        this.setState({open: false});
    },

    searchHandler: function(event) {
        let searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.onKeyChange(searchKey);
        this.setState({open:true});
    },

    selectHandler(index, value, label) {
        this.setState({searchKey: "", open: false});
        if (this.props.onSelect) {
            this.props.onSelect(index, value, label);
        }
    },

    render: function () {
        return (
            <form className="slds-form--inline">
                <div className="slds-form-element">
                    <div className="slds-form-element__control">
                        <input className="slds-input" type="text"
                               placeholder={this.props.placeholder || 'Search...'}
                               value={this.state.searchKey}
                               style={{minWidth:"200px",marginTop:"1px"}}
                               onChange={this.searchHandler}/>
                    </div>
                    {this.state.open && this.props.data && this.props.data.length>0?
                    <Dropdown data={this.props.data}
                              position="left"
                              valueField={this.props.valueField}
                              labelField={this.props.labelField}
                              onChange={this.selectHandler}/>
                    :null}
                </div>
            </form>
        );
    }

});