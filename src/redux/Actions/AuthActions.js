import Axios from 'axios'
import { API_URL } from '../../helpers/idrformat'
export const LoginFunc=(obj)=>{
    return{
        type:'LOGIN',
        payload:obj
    }
}

export const Clearfunc=()=>{
    // return (dispatch)=>{
    //     dispatch({type:'CLEAR'})
    // }
    return{
        type:'CLEAR'
    }
}
export const LoginThunk=(username,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.get(`${API_URL}/users`,{
            params:{
                username:username,
                password:password
            }
        }).then((res)=>{
            if(res.data.length){
                localStorage.setItem('id',res.data[0].id)
                dispatch({type:'LOGIN',payload:res.data[0]})
            }else{
                dispatch({type:'Error',payload:'kayaknya nb dari redux'})
            }
        }).catch((err)=>{
            dispatch({type:'Error',payload:'servernya error bro'})
        })
    }
}
