import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import './app.css';
import ItemAddForm from "../item-add-form";

export default class App extends Component{
    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '', 
        filter: 'all'
    };
    createTodoItem(label) {
        return {
          label,
          important: false,
          done: false,
          id: this.maxId++
        }
    }
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const index = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1)
            ];

            return {
                todoData: newArray
            }
        }); 
    };
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [...todoData, newItem];
            return {
                todoData: newArr
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    toggleProperty(arr, id, prorName) {
        const index = arr.findIndex((el) => el.id === id);
        const oldItem = arr[index];
        const newItem = {...oldItem, [prorName]: !oldItem[prorName]};
    
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ]
    }

    search = (items, term) => {
        if(term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }
    filter = (items, filter) => {
        switch(filter) {
            case 'all':
                return items
            case 'active':
                return items.filter((item) => !item.done)
            case 'done':
                return items.filter((item) => item.done)
        }
    }
    onSearchChange = (term) => {
        this.setState({
            term
        })
    }
    onFilterChange = (filter) => {
        this.setState({filter})
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter onFilterChange={this.onFilterChange} filter={this.state.filter}/>
                </div>
                <TodoList todos={visibleItems} onDeleted={(id) => this.deleteItem(id)} 
                        onToggleDone={(id) => this.onToggleDone(id)} onToggleImportant={(id) => this.onToggleImportant(id)} />
                <ItemAddForm addItem={ (text) => this.addItem(text) } />
            </div>
        );
    }
}