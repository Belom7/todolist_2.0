import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "../App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    deleteTask: (tId: string) => void
    filterTask: (value: FilterType) => void
    addTask: (value: string) => void
    changeCheckbox: (tID: string, value: boolean) => void
    filter: FilterType
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickTaskDeleteButtonHandler = (tId: string) => {
        props.deleteTask(tId)
    }
    const onClickAddTaskButtonHandler = () => {
        if (valueInput.trim() !== '') {
            props.addTask(valueInput)
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

    const onClickCheckboxHandler = (tID: string, value: boolean) => {
        props.changeCheckbox(tID, value)
    }

    const [valueInput, setValueInput] = useState('')
    const [error, setError] = useState<string | null>(null)

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
                    <button onClick={() => onClickTaskDeleteButtonHandler(task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}
                           onClick={() => onClickCheckboxHandler(task.id, !task.isDone)}/>
                    <span>{task.title}</span>
                </li>)}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                        onClick={() => props.filterTask('All')}>All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={() => props.filterTask('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={() => props.filterTask('Completed')}>Completed
                </button>
            </div>
        </div>
    );
};
