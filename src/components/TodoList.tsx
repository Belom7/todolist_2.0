import React from 'react';
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./UniversalCheckBox";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    deleteTask: (todoListID: string, taskID: string) => void
    filterTask: (todoListID: string, value: FilterType) => void
    addTask: (todoListID: string, value: string) => void
    changeCheckbox: (todoListID: string, taskID: string, value: boolean) => void
    filter: FilterType
    deleteTodoList: (todoListID: string) => void
    editableCallBack: (todoListID: string, taskID: string, value: string) => void
    updateTodoList: (todoListID: string, value: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickTaskDeleteButtonHandler = (todoListID: string, taskID: string) => {
        props.deleteTask(todoListID, taskID)
    }
    const onClickCheckboxHandler = (todoListID: string, taskID: string, value: boolean) => {
        props.changeCheckbox(todoListID, taskID, value)
    }
    const onClickTodoListDeleteButtonHandler = (todoListID: string) => {
        props.deleteTodoList(todoListID)
    }
    const callBackHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const editableTaskCallBackHandler = (taskID: string, value: string) => {
        props.editableCallBack(props.todoListID, taskID, value)
    }
    const editableTodoListCallBackHandler = (value: string) => {
        props.updateTodoList(props.todoListID, value)
    }

    return (
        <div>
            <h3>
                <IconButton onClick={() => onClickTodoListDeleteButtonHandler(props.todoListID)}>
                    <Delete color={'primary'}/>
                </IconButton>
                <EditableSpan title={props.title} editableCallBack={editableTodoListCallBackHandler}/>
            </h3>
            <AddItemForm callBack={callBackHandler}/>
            <ul>
                {props.tasks.map(task => <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <IconButton onClick={() => onClickTaskDeleteButtonHandler(props.todoListID, task.id)}>
                        <Delete color={'primary'}/>
                    </IconButton>
                    <UniversalCheckBox isDone={task.isDone}
                                       callBack={(value) => onClickCheckboxHandler(props.todoListID, task.id, value)}/>
                    <EditableSpan title={task.title}
                                  editableCallBack={(value) => editableTaskCallBackHandler(task.id, value)}/>
                </li>)}
            </ul>
            <div>
                <Button variant={props.filter === 'All' ? 'outlined' : 'text'}
                        onClick={() => props.filterTask(props.todoListID, 'All')}
                        color={'inherit'}>All
                </Button>
                <Button variant={props.filter === 'Active' ? 'outlined' : 'text'}
                        onClick={() => props.filterTask(props.todoListID, 'Active')}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                        onClick={() => props.filterTask(props.todoListID, 'Completed')}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    );
};
