import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack:(value: string)=>void
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
                <input className={error ? 'error' : ''}
                       value={valueInput}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
    );
};
