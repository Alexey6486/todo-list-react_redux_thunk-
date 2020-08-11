import React from "react";
import { action } from '@storybook/addon-actions';
import { EditableSpan } from "./EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan,
}

const callbackTextChanged = action('text has been changed');


export const EditableSpanBaseExample = (props: any) => {
    return (
        <EditableSpan title={'test'} editTask={callbackTextChanged}/>
    );
};