import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './EditableSpan.module.css';

type PropsType = {
    title: string
    editTask: (inputValue: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {

    const {title, editTask} = props;

    const [value, setValue] = useState<string>(title);
    const [edit, setEdit] = useState<boolean>(false);
    let [err, setErr] = useState("");

    const activateEditModeOnDoubleClick = () => {
        setEdit(true);
    };
    const applyEditionOnBlur = () => {
        if (value.trim()) {
            setEdit(false);
            editTask(value);
        } else { setErr("err"); }
    };
    const applyEditionByEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            applyEditionOnBlur();
        }
    };
    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErr("");
        setValue(e.currentTarget.value)
    };

    const editCondition = edit
                            ? <input value={value}
                                     onBlur={applyEditionOnBlur}
                                     autoFocus={true}
                                     onChange={inputOnChange}
                                     onKeyPress={applyEditionByEnterKey}/>

                            : <span onDoubleClick={activateEditModeOnDoubleClick}>{title}</span>;

    const errCondition = err && <div className={s.errMsg}>Text something...</div>;

    return (
        <div className={s.editableSpanWrap}>
            {editCondition}
            {errCondition}
        </div>
    );
});
