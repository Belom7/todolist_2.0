import React from "react";
import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import {TaskReducer} from "./TaskReducer";
import {TodoListsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    tasks: TaskReducer,
    todoLists: TodoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All'},
        {id: 'todolistId2', title: 'What to buy', filter: 'All'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


// export const ReduxStoreProviderDecorator = (Components: () => React.ReactElement) => <Provider store={store}>{Components()}</Provider>