import {combineReducers, compose, legacy_createStore as createStore} from 'redux';
import {TaskReducer} from "./TaskReducer";
import {TodoListsReducer} from "./todolists-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: TaskReducer,
    todoLists: TodoListsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, composeEnhancers());
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
