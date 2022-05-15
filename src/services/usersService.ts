import axios from "axios";
import {User} from "../components/pages/users/UserItem";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const usersService = {
    async getUsers() {
        const response = await instance.get<User[]>('users')
        return response.data
    },
    async getUser(userId: string) {
        const response = await instance.get<User>(`users/${userId}`)
        return response.data
    }
}

