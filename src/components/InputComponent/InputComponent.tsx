import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './InputComponent.module.css';

type PropsType = {
    addItem: (inputValue: string) => void
    btnName: string
    ph?: string
    disabled: boolean
}

export const InputComponent = React.memo( (props: PropsType) => {

    const {addItem, btnName, disabled} = props;

    let [inputValue, setInputValue] = useState("");
    let [err, setErr] = useState("");

    const addTask = () => {
        if (inputValue.trim() !== "") {
            addItem(inputValue);
            setInputValue("");
        } else { setErr("err"); }

        setInputValue("");
    };
    const addTaskByEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) { addTask() }
    };
    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (err.length > 0) { setErr("") }
        setInputValue(e.currentTarget.value)
    };

    return (
        <div className={s.inputComponentWrap}>
            <div className={s.inputComponentInnerWrap}>
                <input className={err ? `${s.inputComponent} ${s.err}` : `${s.inputComponent}`}
                       value={inputValue}
                       onChange={inputOnChange}
                       onKeyPress={addTaskByEnterKey}
                       placeholder={props.ph} disabled={disabled}/>
                <button onClick={addTask} disabled={disabled}>{btnName}</button>
            </div>
            {err && <div className={s.errMsg}>Text something...</div>}
        </div>
    );
} );
