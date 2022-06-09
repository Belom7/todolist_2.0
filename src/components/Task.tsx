import React, {useCallback} from 'react';
import {changeCheckboxAC, deleteTaskAC, updateTaskAC} from "../state/TaskReducer";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {UniversalCheckBox} from "./UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {TasksType} from "./TodoListWitchRedux";


type TaskPropsType = {
    task: TasksType
    todoListId: string
}

export const Task = React.memo(({task, todoListId}: TaskPropsType) => {
    console.log('Task render')

    const dispatch = useDispatch()

    const onClickTaskDeleteButtonHandler = useCallback(() => dispatch(deleteTaskAC(todoListId, task.id)), [todoListId, task.id])
    const onClickCheckboxHandler = useCallback((value: boolean) => dispatch(changeCheckboxAC(todoListId, task.id, value)), [todoListId, task.id])
    const editableTaskCallBackHandler = useCallback((value: string) => dispatch(updateTaskAC(todoListId, task.id, value)), [todoListId, task.id])

    return <div className={task.isDone ? 'is-done' : ''}>
        <IconButton onClick={onClickTaskDeleteButtonHandler}>
            <Delete color={'primary'}/>
        </IconButton>
        <UniversalCheckBox isDone={task.isDone}
                           callBack={(value) => onClickCheckboxHandler(value)}/>
        <EditableSpan title={task.title}
                      editableCallBack={(value) => editableTaskCallBackHandler(value)}/>
    </div>
})
