import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type TaskType = {
    [id: string]: { id: string, title: string, isDone: boolean }[]
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoListID1, title: 'ToDoList 1', filter: 'All'},
        {id: todoListID2, title: 'ToDoList 2', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TaskType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REST-API', isDone: false},
            {id: v1(), title: 'MSQL', isDone: false},
            {id: v1(), title: 'MOB-X', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'HTML2', isDone: true},
            {id: v1(), title: 'CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'REACT2', isDone: false},
            {id: v1(), title: 'REST-API2', isDone: false},
            {id: v1(), title: 'MSQL2', isDone: false},
            {id: v1(), title: 'MOB-X2', isDone: false},
        ]

    })


    const deleteTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id != taskID)})
    }
    const filterTask = (todoListID: string, value: FilterType) => {
        setTodoList(todoLists.map(list => list.id === todoListID ? {...list, filter: value} : list))
    }
    const addTask = (todoListID: string, value: string) => {
        let newTask = {id: v1(), title: value, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeCheckbox = (todoListID: string, taskID: string, value: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(task => task.id === taskID ? {...task, isDone: value} : task)
        })
    }


    return (
        <div className="App">
            {todoLists.map(todoList => {

                let filteredTasks = tasks[todoList.id]
                if (todoList.filter === 'Active') {
                    filteredTasks = tasks[todoList.id].filter(task => !task.isDone)
                }
                if (todoList.filter === 'Completed') {
                    filteredTasks = tasks[todoList.id].filter(task => task.isDone)
                }

                return <TodoList key={todoList.id}
                                 todoListID={todoList.id}
                                 title={todoList.title}
                                 tasks={filteredTasks}
                                 deleteTask={deleteTask}
                                 filterTask={filterTask}
                                 addTask={addTask}
                                 changeCheckbox={changeCheckbox}
                                 filter={todoList.filter}
                />
            })}
        </div>
    );
}

export default App;
