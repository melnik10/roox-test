import React, {FC} from 'react';
import UserItem, {User} from "./UserItem";
import {SortContext, SortEnum} from "../../../App";

interface Props {
    users: User[],
}

const UsersList: FC<Props> = (props) => {
    const users = props.users
    const usersSort = (value?: SortEnum) => {
        if (!value) {
            return users.map((user: User) => <UserItem key={user.id} user={user}/>)
        }
        if (value === 'sort_company') {
            return users.sort((a, b) => a.company?.name > b.company?.name ? 1 : -1)
                .map((user) => <UserItem key={user.id} user={user}/>)
        }
        if (value === 'sort_city') {
            return users.sort((a, b) => a.address?.city > b.address?.city ? 1 : -1)
                .map((user) => <UserItem key={user.id} user={user}/>)
        }
    }
    return (
        <>
            <SortContext.Consumer>
                {
                    (value) => {
                        return usersSort(value)
                    }
                }
            </SortContext.Consumer>
            <div className={'users__footer'}>Найдено {props.users.length} пользователей</div>
        </>
    );
};

export default UsersList;