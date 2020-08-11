import React from "react";
import { action } from '@storybook/addon-actions';
import { InputComponent } from "./InputComponent";


export default {
    title: 'InputComponent',
    component: InputComponent,
    btnName: 'string'
}

const callback = action('input has been sent');

export const InputComponentBaseExample = (props: any) => {
    return <InputComponent addItem={callback} btnName={props.btnName}/>
};