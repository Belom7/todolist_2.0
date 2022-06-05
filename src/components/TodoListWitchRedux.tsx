import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./UniversalCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodoListType} from "../AppWithRedux";
import {addTaskAC, changeCheckboxAC, deleteTaskAC, updateTaskAC} from "../state/TaskReducer";
import {deleteTodoListAC, filterTaskAC, updateTodoListAC} from "../state/todolists-reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoList: TodoListType
}

export const TodoListWitchRedux = ({todoList}: PropsType) => {

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[todoList.id])
    const dispatch = useDispatch()

    let filteredTasks = tasks
    if (todoList.filter === 'Active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (todoList.filter === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }


    const onClickTodoListDeleteButtonHandler = () => dispatch(deleteTodoListAC(todoList.id))
    const callBackHandler = (title: string) => dispatch(addTaskAC(todoList.id, title))
    const editableTodoListCallBackHandler = (value: string) => dispatch(updateTodoListAC(todoList.id, value))

    const onAllClickHandler = () => dispatch(filterTaskAC(todoList.id, 'All'))
    const onActiveClickHandler = () => dispatch(filterTaskAC(todoList.id, 'Active'))
    const onCompletedClickHandler = () => dispatch(filterTaskAC(todoList.id, 'Completed'))

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
                {filteredTasks.map(task => {

                    const onClickTaskDeleteButtonHandler = () => dispatch(deleteTaskAC(todoList.id, task.id))
                    const onClickCheckboxHandler = (value: boolean) => dispatch(changeCheckboxAC(todoList.id, task.id, value))
                    const editableTaskCallBackHandler = (value: string) => dispatch(updateTaskAC(todoList.id, task.id, value))

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <IconButton onClick={onClickTaskDeleteButtonHandler}>
                            <Delete color={'primary'}/>
                        </IconButton>
                        <UniversalCheckBox isDone={task.isDone}
                                           callBack={(value) => onClickCheckboxHandler(value)}/>
                        <EditableSpan title={task.title}
                                      editableCallBack={(value) => editableTaskCallBackHandler(value)}/>
                    </li>
                })}
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
};
