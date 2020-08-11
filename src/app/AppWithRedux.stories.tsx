
import React from "react";
import { action } from '@storybook/addon-actions';
import { AppWithRedux } from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProvicerDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProvicerDecorator],
}

const callbackTextChanged = action('text has been changed');


export const AppWithReduxBaseExample = () => {
    return (
        <AppWithRedux />
    );
};