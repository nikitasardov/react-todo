import React, {Component} from "react";
import './item-add-form.css';

export default class ItemAddForm extends Component{
    state = {
        label: ''
    };
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
            label: ''
        })
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} className="item-add-form d-flex">
                <input className="form-control"
                 type="text" 
                 placeholder="What needs to do..." 
                 onChange={this.onLabelChange} value={this.state.label} />
                <button className="btn btn-outline-secondary" disabled={this.state.label === ''}>Add</button>
            </form>
        )
    }
}