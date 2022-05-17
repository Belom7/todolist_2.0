import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    callBack: (value: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [valueInput, setValueInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
        setError('')
    }
    const onClickButtonHandler = () => {
        if (valueInput.trim() !== '') {
            props.callBack(valueInput)
            setValueInput('')
        } else {
            setError('Вы ничего не ввели!')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    return (
        <div>
            <div>
                <TextField error={!!error}
                           value={valueInput}
                           onChange={onChangeInputHandler}
                           onKeyPress={onKeyPressHandler}
                           label={'Title'}
                           helperText={error}
                />
                <IconButton onClick={onClickButtonHandler} color={'primary'}>
                    <AddBox/>
                </IconButton>
            </div>
            {/*{error && <div className={'error_message'}>{error}</div>}*/}
        </div>
    );
};
