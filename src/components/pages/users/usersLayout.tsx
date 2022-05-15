import React, {useEffect, useState} from 'react';
import UsersList from "./usersList";
import {User} from "./UserItem";
import {api} from "../../../services/api";
import Loader from "../../ui/Loader/Loader";

const UsersLayout = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const users = await api.usersService.getUsers()
            setUsers(users)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Список пользователей</h1>
            {
                isLoading ?
                    <Loader/>
                    :
                    users.length > 0 &&
                    <UsersList users={users}/>
            }
        </div>
    );
};

export default UsersLayout;