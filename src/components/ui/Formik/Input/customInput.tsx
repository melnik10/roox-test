import React, {FC} from 'react';
import style from './customInput.module.scss'
import {FieldInputProps, FormikValues} from "formik";

interface Props {
    field: FieldInputProps<string>
    form: FormikValues
}

const CustomInput: FC<Props> = ({field, form: {touched, errors}, ...props}) => {
    const isError = touched[field.name] && errors[field.name]
    const classNames = [style.input]
    if (isError) {
        classNames.push(style.input_error)
    }
    return (
        <>
            <input className={classNames.join(' ')} type="text" {...field} {...props} />
        </>
    );
};

export default CustomInput;