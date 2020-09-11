const INITIAL_STATE={
    username:'',
    password:'',
    id:0,
    isLogin:false
}


export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':        
            return {...state,...action.payload,isLogin:true}  
        default:
            return state
    }
}