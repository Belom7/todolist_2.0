import {FilterType, TodoListType} from "../AppWithReducer";
import {v1} from "uuid";

export const DELETE_TODOLIST = 'DELETE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const UPDATE_TODOLIST = 'UPDATE-TODOLIST'
const FILTER_TASK = 'FILTER-TASK'

let initialState:TodoListType[] = []

export const TodoListsReducer = (state= initialState, action: GeneralType):TodoListType[] => {
    switch (action.type) {
        case DELETE_TODOLIST: {
            return state.filter(todoList => todoList.id !== action.payload.todoListID)
        }
        case ADD_TODOLIST: {
            return [{id:action.payload.todolistId, title:action.payload.value, filter:'All'}, ...state]
        }
        case UPDATE_TODOLIST: {
            return state.map(todoList => todoList.id === action.payload.todoListID ? {
                ...todoList,
                title: action.payload.value
            } : todoList)
        }
        case FILTER_TASK: {
            return state.map(list => list.id === action.payload.todoListID ? {
                ...list,
                filter: action.payload.value
            } : list)
        }
        default :
            return state
    }
}

type GeneralType = deleteTodoListACType
    | addTodoListACType
    | updateTodoListACType
    | filterTaskACType


export type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export type filterTaskACType = ReturnType<typeof filterTaskAC>

export const deleteTodoListAC = (todoListID: string) => {
    return {
        type: DELETE_TODOLIST,
        payload: {
            todoListID
        }
    } as const
}
export const addTodoListAC = (value: string) => {

    return {
        type: ADD_TODOLIST,
        payload: {
            value,
            todolistId: v1()
        }
    } as const
}
export const updateTodoListAC = (todoListID: string, value: string) => {
    return {
        type: UPDATE_TODOLIST,
        payload: {
            todoListID,
            value
        }
    } as const
}
export const filterTaskAC = (todoListID: string, value: FilterType) => {
    return {
        type: FILTER_TASK,
        payload: {
            todoListID,
            value
        }
    } as const
}