import React from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTodoListAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksType, TodoListWitchRedux} from "./components/TodoListWitchRedux";

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state=> state.todoLists )
    const dispatch = useDispatch()

    const addTodoList = (value: string) => {
        let action = addTodoListAC(value)
        dispatch(action)
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
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoListWitchRedux
                                        key={todoList.id}
                                        todoList={todoList}
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
