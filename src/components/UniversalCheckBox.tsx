import React from 'react';
import {Checkbox} from "@material-ui/core";

type UniversalCheckBoxPropsType = {
    isDone: boolean
    callBack: (value: boolean) => void
}

export const UniversalCheckBox = React.memo((props: UniversalCheckBoxPropsType) => {
    return (
        <Checkbox checked={props.isDone}
                  onChange={(event) => props.callBack(event.currentTarget.checked)}
                  color={'primary'}
        />
    )
})