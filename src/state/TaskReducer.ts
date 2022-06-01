import {TaskType} from "../App";
import {v1} from "uuid";
import {addTodoListACType} from "./todolists-reducer";

const DELETE_TASK = 'DELETE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_CHECKBOX = 'CHANGE-CHECKBOX'
const UPDATE_TASK = 'UPDATE-TASK'
const ADD_TODOLIST = 'ADD-TODOLIST'

export const TaskReducer = (state: TaskType = {}, action: GeneralType) => {
    switch (action.type) {
        case DELETE_TASK: {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(task => task.id != action.payload.taskID)
            }
        }
        case ADD_TASK : {
            let newTask = {id: v1(), title: action.payload.value, isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }
        case CHANGE_CHECKBOX: {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    isDone: action.payload.value
                } : task)
            }
        }
        case UPDATE_TASK: {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(task => task.id === action.payload.taskID ? {
                    ...task,
                    title: action.payload.value
                } : task)
            }
        }
        case ADD_TODOLIST: {
            return {[action.payload.todolistId]: [], ...state}
        }
        default :
            return state
    }
}




type GeneralType = deleteTaskACType
    | addTaskACType
    | changeCheckboxACType
    | updateTaskACType
    | addTodoListACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeCheckboxACType = ReturnType<typeof changeCheckboxAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>


export const deleteTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: DELETE_TASK,
        payload: {
            todoListID,
            taskID
        }
    } as const
}
export const addTaskAC = (todoListID: string, value: string) => {
    return {
        type: ADD_TASK,
        payload: {
            todoListID,
            value
        }
    } as const
}
export const changeCheckboxAC = (todoListID: string, taskID: string, value: boolean) => {
    return {
        type: CHANGE_CHECKBOX,
        payload: {
            todoListID,
            taskID,
            value
        }
    } as const
}
export const updateTaskAC = (todoListID: string, taskID: string, value: string) => {
    return {
        type: UPDATE_TASK,
        payload: {
            todoListID,
            taskID,
            value
        }
    } as const
}
