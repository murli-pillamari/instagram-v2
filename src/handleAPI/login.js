import axios from 'axios';
import { BACKEND_URL } from '../constants';
export const checkUser = async({email, password}) => {
    console.log("email password",email, password);
    const getUsersEndpoint = `${BACKEND_URL}/check-users`;
    const getDbUsers = await axios.get(getUsersEndpoint);
    // const { user }
    console.log("getDbUsers::",getDbUsers.data.data)
}