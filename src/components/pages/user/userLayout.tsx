import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {User} from "../users/UserItem";
import {api} from "../../../services/api";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import customInput from "../../ui/Formik/Input/customInput";
import style from './userLayout.module.scss'
import customTextarea from "../../ui/Formik/Textarea/customTextarea";


interface InitialValuesForm {
    name: string
    username: string
    email: string
    street: string
    city: string
    zipcode: string
    phone: string
    website: string
    comment: string
}

const UserLayout: FC = () => {
    const params = useParams()
    const userId = params.id
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [initialValues, setInitialValues] = useState<InitialValuesForm>({
        name: '',
        city: '',
        street: '',
        zipcode: '',
        phone: '',
        username: '',
        email: '',
        website: '',
        comment: ''
    })
    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)
    const fetchUser = async () => {
        try {
            setIsLoading(true)
            if (userId) {
                const user = await api.usersService.getUser(userId)
                setInitialValues({
                    name: user.name,
                    city: user.address.city,
                    street: user.address.street,
                    zipcode: user.address.zipcode,
                    phone: user.phone,
                    username: user.username,
                    email: user.email,
                    website: user.website,
                    comment: ''
                })
                setUser(() => user)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className={'user'}>
            {
                isLoading ?
                    <Loader/> :
                    user ?
                        <div>
                            <div className={style.header}>
                                <div>
                                    <h1>Профиль пользователя <strong>{user.name}</strong></h1>
                                </div>
                                <div>
                                    <Button onClick={() => setIsReadOnly((disabled) => !disabled)}>Редактировать</Button>
                                </div>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validate={values => {
                                    const errors: any = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    for (const [key, value] of Object.entries(values)) {
                                        if (!value) {
                                            errors[key] = 'Required'
                                        }
                                    }
                                    delete errors['comment']

                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    console.log(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }}
                            >
                                {({isSubmitting}) => (
                                    <Form className={'user__form'}>
                                        {
                                            Object.keys(initialValues).map(value => {
                                                if (value === 'comment') {
                                                    return (
                                                        <React.Fragment key={value}>
                                                            <label htmlFor={value}>{value[0].toUpperCase() + value.slice(1)}</label>
                                                            <Field as={'textarea'} disabled={isReadOnly} type="text" name={value} component={customTextarea}/>
                                                        </React.Fragment>)
                                                }
                                                return (
                                                    <React.Fragment key={value}>
                                                        <label htmlFor={value}>{value[0].toUpperCase() + value.slice(1)}</label>
                                                        <Field id={value} disabled={isReadOnly} type="text" name={value} component={customInput}/>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        <div className={style.form__footer}>
                                            <Button style={{marginTop: '5px'}} variant={isReadOnly ? 'disabled' : 'success'} type="submit" disabled={isReadOnly}>
                                                Отправить
                                            </Button>
                                        </div>
                                    </Form>

                                )}
                            </Formik>
                        </div> :
                        <div>Пользователь не найден</div>
            }
        </div>
    )
};

export default UserLayout;