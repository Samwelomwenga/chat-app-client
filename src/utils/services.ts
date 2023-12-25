import axios from 'axios';
import { UserInfoState } from '../context/AuthContext';
export const baseUrl = 'http://localhost:3000/api';

export const registerUser = async(url:string,body:UserInfoState)=>{
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post(url,JSON.stringify(body),headers);
    const data = await response.data;
    if (!response) {
        let message
        if (data?.message) {
            message = data.message;
            
        }else{
            message = data;
        }
        return {error:true,message};
    }
    return data;
}