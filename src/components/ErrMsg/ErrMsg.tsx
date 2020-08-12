import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {AppGlobalStateType, errTC} from "../../app/appReducer";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ErrMsg = () => {

    const dispatch = useDispatch();
    const appState = useSelector<AppRootState, AppGlobalStateType>(state => state.app)
    const {err} = appState;

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errTC(null));
    };

    return (
        <Snackbar open={err !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {err}
            </Alert>
        </Snackbar>
    );
}