import React from "react";
import { action } from '@storybook/addon-actions';
import { Task } from "./Task";

export default {
    title: 'Task',
    component: Task,
}

const callbackRemove = action('task has been removed');
const callbackRename = action("task's name has been changed");
const callbackStatus = action("task's status has been changed");

export const TaskBaseExample = (props: any) => {
    return (
        <div className="tdl-wrap">
            <ul>
                <Task tskId={'1'}
                      title={'test'}
                      description={'test'}
                      status={0}
                      priority={0}
                      startDate={'test'}
                      deadline={'test'}
                      remTask={callbackRemove}
                      updateTask={callbackStatus}/>
            </ul>
        </div>
    );
};