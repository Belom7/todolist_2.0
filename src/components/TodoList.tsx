import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";

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
}

export const TodoList = (props: TodoListPropsType) => {

    const [valueInput, setValueInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickTaskDeleteButtonHandler = (todoListID: string, taskID: string) => {
        props.deleteTask(todoListID, taskID)
    }
    const onClickAddTaskButtonHandler = () => {
        if (valueInput.trim() !== '') {
            props.addTask(props.todoListID, valueInput)
            setValueInput('')
        } else {
            setError('Вы ничего не ввели!')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
        setError('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskButtonHandler()
        }
    }

    const onClickCheckboxHandler = (todoListID: string, taskID: string, value: boolean) => {
        props.changeCheckbox(todoListID, taskID, value)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''} value={valueInput} onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddTaskButtonHandler}>+</button>
            </div>
            {error && <div className={'error_message'}>{error}</div>}
            <ul>
                {props.tasks.map(task => <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <button onClick={() => onClickTaskDeleteButtonHandler(props.todoListID, task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}
                           onClick={() => onClickCheckboxHandler(props.todoListID, task.id, !task.isDone)}/>
                    <span>{task.title}</span>
                </li>)}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID,'All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID,'Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => props.filterTask(props.todoListID,'Completed')}>Completed
                </button>
            </div>
        </div>
    );
};
