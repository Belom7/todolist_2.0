import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    editableCallBack: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(props.title)
    const [error, setError] = useState<string | null>(null)

    const onDoubleClickHandler = () => setEdit(true)
    const onBlurHandler = () => {
        if (value.trim() !== '') {
            props.editableCallBack(value)
            setError('')
            setEdit(false)
        } else {
            setError('Вы ничего не ввели!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    return (
        edit ? <TextField value={value} onBlur={onBlurHandler} autoFocus onChange={onChangeHandler} helperText={error}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
