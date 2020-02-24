import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component{
    render() {
        const { label, onDeleted, onToggleDone, onToggleImportant,
        important, done } = this.props;
        const style = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };
        let classNames = "todo-list-item-label";
        if (done) {
            classNames += " done";
        }
        if (important) {
            classNames += " important";
        }
        return (
            <span className="todo-list-item">
                  <span
                      className={classNames}
                      style={style}
                        onClick={onToggleDone}>
                    {label}
                  </span>

                  <button type="button" onClick={onToggleImportant}
                          className="btn btn-outline-success btn-sm float-right">
                    <i className="fa fa-exclamation" />
                  </button>

                  <button type="button" onClick={onDeleted}
                          className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o" />
                  </button>
            </span>
        );
    }
};
