import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";


export default {                        //создание всей компоненты
    title: 'TodoList/Task',             //имя в сторибуке в данном случае будет папка TodoList в которой лежит Task
    component: Task,                    // компонент который мы используем
    args: {                             // свойства args которые попадут в компонент ( чтоб не дублировать)
        todoListId: '1'
    }
} as ComponentMeta<typeof Task>         //типизация

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneStory = Template.bind({})
export const TaskIsNotDonefStory = Template.bind({})

TaskIsDoneStory.args = {
    task: {id: '1', title: 'JS', isDone: true},
    // сюда вторым попадут args с 8 строки
}

TaskIsNotDonefStory.args = {
    task: {id: '2', title: 'HTML', isDone: false},
    // сюда вторым попадут args с 8 строкиа
}

