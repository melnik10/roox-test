import React, {FC} from 'react';
import style from './customTextarea.module.scss'
import {FieldInputProps, FormikValues} from "formik";

interface Props {
    field: FieldInputProps<string>
    form: FormikValues
}

const CustomTextarea: FC<Props> = ({
                                    field,
                                    form: {touched, errors},
                                    ...props
                                }) => {

    return (
        <>
            <textarea rows={4} className={style.textarea} {...field} {...props} />
        </>
    );
};

export default CustomTextarea;