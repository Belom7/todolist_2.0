import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REST-API', isDone: false},
        {id: v1(), title: 'MSQL', isDone: false},
        {id: v1(), title: 'MOB-X', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('All')

    const deleteTask = (tId: string) => setTasks(tasks.filter(task => task.id !== tId))
    const filterTask = (value: FilterType) => setFilter(value)
    const addTask = (value: string) => setTasks([{id:v1(), title:value, isDone:false}, ...tasks])

    let filteredTasks = filter === 'Active' ? tasks.filter(task => !task.isDone)
        : filter === 'Completed' ? tasks.filter(task => task.isDone)
            : tasks

    return (
        <div className="App">
            <TodoList title={'List 1'} tasks={filteredTasks} deleteTask={deleteTask} filterTask={filterTask}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
