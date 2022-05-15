import React, {FC} from 'react';
import {Link} from "react-router-dom";
import './Users.scss'

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany
}

interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: string,
        lng: string
    }
}

interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string
}

interface Props {
    user: User
}

const UserItem:FC<Props> = ({user}) => {
    return (
        <div className={'users__item'}>
            <div className={'users__item_name'}><span style={{color: "#A3A3A3"}}>ФИО: </span>{user?.username}</div>
            <div className={'users__item_city'}><span style={{color: "#A3A3A3"}}>Город: </span>{user?.address?.city}</div>
            <div className={'users__item_company'}>
                <div><span style={{color: "#A3A3A3"}}>Компания: </span>{user?.company?.name}</div>
                <Link className={'link'} to={`/user/${user.id}`}>Подробнее</Link>
            </div>
        </div>
    );
};

export default UserItem;