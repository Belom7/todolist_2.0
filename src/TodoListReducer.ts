import {FilterType, TodoListType} from "./App";

const DELETE_TODOLIST = 'DELETE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const UPDATE_TODOLIST = 'UPDATE-TODOLIST'
const FILTER_TASK = 'FILTER-TASK'

export const TodoListReducer = (state: TodoListType[], action: GeneralType) => {
    switch (action.type) {
        case DELETE_TODOLIST: {
            return state.filter(todoList => todoList.id !== action.payload.todoListID)
        }
        case ADD_TODOLIST: {
            return [action.payload.newTodoList, ...state]
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


type deleteTodoListACType = ReturnType<typeof deleteTodoListAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type updateTodoListACType = ReturnType<typeof updateTodoListAC>
type filterTaskACType = ReturnType<typeof filterTaskAC>

export const deleteTodoListAC = (todoListID: string) => {
    return {
        type: DELETE_TODOLIST,
        payload: {
            todoListID
        }
    } as const
}
export const addTodoListAC = (value: string, newTodoList: TodoListType) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            value,
            newTodoList
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