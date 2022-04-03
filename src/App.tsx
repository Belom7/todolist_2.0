import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

function App() {

    const tasks1 = [
        {id:1, title:'HTML', isDone:true},
        {id:2, title:'CSS', isDone:true},
        {id:3, title:'JS', isDone:true},
        {id:4, title:'REACT', isDone:false},
    ]
    const tasks2 = [
        {id:1, title:'HTML2', isDone:true},
        {id:2, title:'CSS2', isDone:true},
        {id:3, title:'JS2', isDone:false},
        {id:4, title:'REACT2', isDone:false},
    ]

    return (
        <div className="App">
            <TodoList title={'List 1'} tasks={tasks1}/>
            <TodoList title={'List 2'} tasks={tasks2}/>
        </div>
    );
}

export default App;
