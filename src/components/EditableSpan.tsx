import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    editableCallBack: (value: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(props.title)

    const onDoubleClickHandler = () => setEdit(true)
    const onBlurHandler = () => {
        setEdit(false)
        props.editableCallBack(value)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    return (
        edit ? <input value={value} onBlur={onBlurHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
