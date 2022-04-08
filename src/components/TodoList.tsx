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
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickTaskDeleteButtonHandler = (tId: string) => {
        props.deleteTask(tId)
    }
    const onClickAddTaskButtonHandler = () => {
        props.addTask(valueInput)
        setValueInput('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key==='Enter'){onClickAddTaskButtonHandler()}
    }

    const [valueInput, setValueInput] = useState('')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={valueInput} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickAddTaskButtonHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => <li key={task.id}>
                    <button onClick={() => onClickTaskDeleteButtonHandler(task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>)}
            </ul>
            <div>
                <button onClick={() => props.filterTask('All')}>All</button>
                <button onClick={() => props.filterTask('Active')}>Active</button>
                <button onClick={() => props.filterTask('Completed')}>Completed</button>
            </div>
        </div>
    );
};
