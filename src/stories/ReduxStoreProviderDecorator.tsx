import React from "react";
import {Provider} from "react-redux";
import {store} from "../app/store";



export const ReduxStoreProvicerDecorator = (story: any) => {
    return <Provider store={store}>{story()}</Provider>
};