import React from 'react';
import {TodoList} from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeCheckboxAC, deleteTaskAC, updateTaskAC} from "./state/TaskReducer";
import {addTodoListAC, deleteTodoListAC, filterTaskAC, updateTodoListAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskType = {
    [id: string]: { id: string, title: string, isDone: boolean }[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state=> state.todoLists )
    const tasks = useSelector<AppRootStateType, TaskType >(state => state.tasks)
    const dispatch = useDispatch()




    const deleteTask = (todoListID: string, taskID: string) => dispatch(deleteTaskAC(todoListID, taskID))
    const addTask = (todoListID: string, value: string) => dispatch(addTaskAC(todoListID, value))
    const changeCheckbox = (todoListID: string, taskID: string, value: boolean) => dispatch(changeCheckboxAC(todoListID, taskID, value))
    const updateTask = (todoListID: string, taskID: string, value: string) => dispatch(updateTaskAC(todoListID,taskID,value))

    const deleteTodoList = (todoListID: string) => dispatch(deleteTodoListAC(todoListID))
    const addTodoList = (value: string) => {

        let action = addTodoListAC(value)
        dispatch(action)
    }
    const updateTodoList = (todoListID: string, value: string) => dispatch(updateTodoListAC(todoListID,value))
    const filterTask = (todoListID: string, value: FilterType) => dispatch(filterTaskAC(todoListID, value))


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

export default AppWithRedux;
