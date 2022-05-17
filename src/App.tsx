import React, {useState} from 'react';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";

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
    const deleteTodoList = (todoListID: string) => {
        setTodoList(todoLists.filter(todoList => todoList.id !== todoListID))
    }
    const addTodoList = (value: string) => {
        const newTodoListID = v1()
        let newTodoList: TodoListType = {id: newTodoListID, title: value, filter: 'All'}
        setTodoList([newTodoList, ...todoLists])
        setTasks({[newTodoListID]: [], ...tasks})
    }
    const updateTask = (todoListID: string, taskID: string, value: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(task => task.id === taskID ? {...task, title: value} : task)
        })
    }
    const updateTodoList = (todoListID: string, value: string) => {
        setTodoList(todoLists.map(todoList => todoList.id === todoListID ? {...todoList, title: value} : todoList))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(todoList => {

                        let filteredTasks = tasks[todoList.id]
                        if (todoList.filter === 'Active') {
                            filteredTasks = tasks[todoList.id].filter(task => !task.isDone)
                        }
                        if (todoList.filter === 'Completed') {
                            filteredTasks = tasks[todoList.id].filter(task => task.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList key={todoList.id}
                                              todoListID={todoList.id}
                                              title={todoList.title}
                                              tasks={filteredTasks}
                                              deleteTask={deleteTask}
                                              filterTask={filterTask}
                                              addTask={addTask}
                                              changeCheckbox={changeCheckbox}
                                              filter={todoList.filter}
                                              deleteTodoList={deleteTodoList}
                                              editableCallBack={updateTask}
                                              updateTodoList={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
