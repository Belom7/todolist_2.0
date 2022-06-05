import {addTodoListAC, deleteTodoListAC, filterTaskAC, TodoListsReducer, updateTodoListAC} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterType, TodoListType} from '../AppWithReducer';

let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {

    const endState = TodoListsReducer(startState, deleteTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = TodoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'UPDATE-TODOLIST',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = TodoListsReducer(startState, updateTodoListAC(action.id, action.title));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "Completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = TodoListsReducer(startState, filterTaskAC(action.id, action.filter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});


