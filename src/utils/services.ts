import axios from 'axios';
import { LoginInfoState, RegisterInfoState } from '../context/AuthContext';
export const baseUrl = 'http://localhost:3000/api';

export const postRequest = async(url:string,body:RegisterInfoState|LoginInfoState)=>{
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.post(url,JSON.stringify(body),headers);
    const data = await response.data;
    if (response.status === 400||response.status === 500) {
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
export const getRequest = async(url:string)=>{
    const headers = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await axios.get(url,headers);
    const data = await response.data;
    if (response.status === 400||response.status === 500) {
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