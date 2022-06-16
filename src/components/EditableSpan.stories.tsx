import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'TodoList/EditableSpan',
    component: EditableSpan,

    argsType: {
        title: '11',
        editableCallBack: {
            description: 'callBack'
        },
        args: {
            edit:true
        }
    }
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    editableCallBack: action('Button clicked inside formf')
}

