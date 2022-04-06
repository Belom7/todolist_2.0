import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/TodoList";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'REACT', isDone: false},
        {id: 5, title: 'REST-API', isDone: false},
        {id: 6, title: 'MSQL', isDone: false},
        {id: 7, title: 'MOB-X', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('All')

    const deleteTask = (tId: number) => setTasks(tasks.filter(task => task.id !== tId))
    const filterTask = (value: FilterType) => {
        setFilter(value)
    }

    let filteredTasks = filter === 'Active' ? tasks.filter(task => !task.isDone)
        : filter === 'Completed' ? tasks.filter(task => task.isDone)
            : tasks

    return (
        <div className="App">
            <TodoList title={'List 1'} tasks={filteredTasks} deleteTask={deleteTask} filterTask={filterTask}/>
        </div>
    );
}

export default App;
