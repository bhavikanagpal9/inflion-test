import { GET_USERS,EDIT_USERS } from "./action";
import store from './store';
const axios = require('axios');

export const GetUsers = () => {
    return dispatch => {
        axios.get(`https://reqres.in/api/users?page=1`)
        .then(res => {
            const persons = res.data.data;

            dispatch({
                type: GET_USERS,
                users: persons
            });
        })
    };
};


export const EditUser = (user) => {
    var updatedList=store.getState().appReducer.Users.map(u=>{
        if(u.id==user.id){
            u=user;
        }
        return u;
    })
    
    return dispatch => {
            dispatch({
                type: GET_USERS,
                users: updatedList
            });
    };
}