import React from 'react';
import {FilterType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    editableCallBack:(todoListID: string, taskID: string,value:string)=>void
    updateTodoList:(todoListID: string, value:string)=>void
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
    const callBackHandler = (title:string) => {
        props.addTask(props.todoListID, title)
    }
    const editableTaskCallBackHandler = (taskID:string, value:string) => {
        props.editableCallBack(props.todoListID, taskID, value)
    }
    const editableTodoListCallBackHandler = (value:string) => {
        props.updateTodoList(props.todoListID, value)
    }

    return (
        <div>
            <h3>
                <button onClick={() => onClickTodoListDeleteButtonHandler(props.todoListID)}>x</button>
                <EditableSpan title={props.title} editableCallBack={editableTodoListCallBackHandler}/>
            </h3>
            <AddItemForm callBack={callBackHandler}
            />
            <ul>
                {props.tasks.map(task => <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <button onClick={() => onClickTaskDeleteButtonHandler(props.todoListID, task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}
                           onClick={() => onClickCheckboxHandler(props.todoListID, task.id, !task.isDone)}/>
                    <EditableSpan title={task.title} editableCallBack={(value)=>editableTaskCallBackHandler(task.id, value)}/>
                </li>)}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID, 'All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID, 'Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID, 'Completed')}>Completed
                </button>
            </div>
        </div>
    );
};
