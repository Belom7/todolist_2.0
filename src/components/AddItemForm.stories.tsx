import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemForm',
    component: AddItemForm,

    argsType: {
        callBack: {
            description: 'callBack'
        }
    }
} as ComponentMeta<typeof AddItemForm>

const Template : ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({})

AddItemFormStory.args = {
     callBack: action('Button clicked inside formf')
}

