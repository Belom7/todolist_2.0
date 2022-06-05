import React, {useReducer} from 'react';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeCheckboxAC, deleteTaskAC, TaskReducer, updateTaskAC} from "./state/TaskReducer";
import {addTodoListAC, deleteTodoListAC, filterTaskAC, TodoListsReducer, updateTodoListAC} from "./state/todolists-reducer";

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    [id: string]: { id: string, title: string, isDone: boolean }[]
}

function AppWithReducer() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoListDispatch] = useReducer(TodoListsReducer, [
        {id: todoListID1, title: 'ToDoList 1', filter: 'All'},
        {id: todoListID2, title: 'ToDoList 2', filter: 'All'},
    ])

    const [tasks, setTaskDispatch] = useReducer(TaskReducer, {
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

    const deleteTask = (todoListID: string, taskID: string) => setTaskDispatch(deleteTaskAC(todoListID, taskID))
    const addTask = (todoListID: string, value: string) => setTaskDispatch(addTaskAC(todoListID, value))
    const changeCheckbox = (todoListID: string, taskID: string, value: boolean) => setTaskDispatch(changeCheckboxAC(todoListID, taskID, value))
    const updateTask = (todoListID: string, taskID: string, value: string) => setTaskDispatch(updateTaskAC(todoListID,taskID,value))

    const deleteTodoList = (todoListID: string) => {
        let action = deleteTodoListAC(todoListID)
        setTodoListDispatch(action)
        setTaskDispatch(action)
    }
    const addTodoList = (value: string) => {
        let action = addTodoListAC(value)
        setTodoListDispatch(action)
        setTaskDispatch(action)
    }
    const updateTodoList = (todoListID: string, value: string) => setTodoListDispatch(updateTodoListAC(todoListID,value))
    const filterTask = (todoListID: string, value: FilterType) => setTodoListDispatch(filterTaskAC(todoListID, value))


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

export default AppWithReducer;
