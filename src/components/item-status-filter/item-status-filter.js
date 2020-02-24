import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' },
    ];
    render() {
        const { filter, onFilterChange } = this.props;
        const button = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const classButton = isActive ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button type="button" key={name}
                    className={`btn ` + classButton} onClick={() => onFilterChange(name)}>{label}</button>
            )
        })
        return (
            <div className="btn-group">
                {button}
            </div>
        );
    }
};
