import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodoListType} from "../AppWithRedux";
import {addTaskAC} from "../state/TaskReducer";
import {deleteTodoListAC, filterTaskAC, updateTodoListAC} from "../state/todolists-reducer";
import {Task} from "./Task";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodoListType
}

export const TodoListWitchRedux = React.memo(({todoList}: PropsType) => {

    console.log('TodoListWitchRedux')

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()


    if (todoList.filter === 'Active') {
        tasks = tasks.filter(task => !task.isDone)
    }
    if (todoList.filter === 'Completed') {
        tasks = tasks.filter(task => task.isDone)
    }


    const onClickTodoListDeleteButtonHandler = useCallback(() => dispatch(deleteTodoListAC(todoList.id)), [todoList.id])
    const callBackHandler = useCallback((title: string) => dispatch(addTaskAC(todoList.id, title)), [todoList.id])
    const editableTodoListCallBackHandler = useCallback((value: string) => dispatch(updateTodoListAC(todoList.id, value)), [todoList.id])

    const onAllClickHandler = useCallback(() => dispatch(filterTaskAC(todoList.id, 'All')), [todoList.id])
    const onActiveClickHandler = useCallback(() => dispatch(filterTaskAC(todoList.id, 'Active')), [todoList.id])
    const onCompletedClickHandler = useCallback(() => dispatch(filterTaskAC(todoList.id, 'Completed')), [todoList.id])
    return (
        <div>
            <h3>
                <IconButton onClick={onClickTodoListDeleteButtonHandler}>
                    <Delete color={'primary'}/>
                </IconButton>
                <EditableSpan title={todoList.title} editableCallBack={editableTodoListCallBackHandler}/>
            </h3>
            <AddItemForm callBack={callBackHandler}/>
            <ul>
                {tasks.map(task => <li key={task.id}>
                    <Task task={task}
                          todoListId={todoList.id}
                    /></li>)}
            </ul>
            <div>
                <Button variant={todoList.filter === 'All' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}>All
                </Button>
                <Button variant={todoList.filter === 'Active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={todoList.filter === 'Completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
})
