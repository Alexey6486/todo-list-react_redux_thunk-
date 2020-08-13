import React, {useEffect} from "react";
import s from './Login.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {authMeTC, AuthStateType, loginTC} from "./loginReducer";
import {Redirect} from "react-router-dom";
import {Formik, useFormik} from "formik";

export const Login = () => {

    const dispatch = useDispatch();
    const authState = useSelector<AppRootState, AuthStateType>(state => state.auth);
    const {isAuth} = authState;

    useEffect(() => {
        dispatch(authMeTC());
    }, [isAuth]);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            // const payload = {
            //     email: values.email,
            //     password: values.password,
            //     rememberMe: values.rememberMe,
            // }
            dispatch(loginTC(values));
        },
    });

    if (isAuth) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className={s.loginBlock}>
            <div className={'container'}>
                <form className={s.loginForm} onSubmit={formik.handleSubmit}>
                    <div className={s.loginFormGroup}>
                        <input type="text" placeholder={'email'} name={'email'} onChange={formik.handleChange} value={formik.values.email}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                    </div>
                    <div className={s.loginFormGroup}>
                        <input type="password" placeholder={'password'} name={'password'} onChange={formik.handleChange} value={formik.values.password}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                    </div>
                    <div className={s.loginFormGroup}>
                        <input type="checkbox" id={'rememberMe'} name={'rememberMe'} onChange={formik.handleChange} checked={formik.values.rememberMe}/>
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}