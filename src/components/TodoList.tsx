import React from 'react';
import {FilterType} from "../App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    deleteTask:(tId:number)=>void
    filterTask:(value:FilterType)=>void
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickTaskDeleteButtonHandler = (tId:number) => {props.deleteTask(tId)}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task => <li key={task.id}>
                    <button onClick={()=>onClickTaskDeleteButtonHandler(task.id)}>X</button>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>)}
            </ul>
            <div>
                <button onClick={()=>props.filterTask('All')}>All</button>
                <button onClick={()=>props.filterTask('Active')}>Active</button>
                <button onClick={()=>props.filterTask('Completed')}>Completed</button>
            </div>
        </div>
    );
};
