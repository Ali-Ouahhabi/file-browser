import { Actions } from "../actions/Actions";
import {SubTree} from "../models/subTree"
const initialState = {
    fileTree: new SubTree("root"),
    connected: false,
    selected:{
        isFile:null,
        path:null,
        name:null
    },
    signInUp:{
        logIn:{
            error:""
        },
        register:{
            error:""
        }
    },
    notification:{
        type:"",
        message:""
    }
}

export default function reduce(state = initialState, action) {
console.log("REDUCER <=",action);
    if (action.type[2] === Actions.ACTION.REMOTE)
        throw new Error("Reducer invalid actions " + action.type.join('/'))
    switch (action.type[0]) {
        case Actions.ACTION.USER:
            switch (action.type[1]) {
                case Actions.ACTION.REGISTER:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            return { ...state, LOADING: true };
                        case Actions.ACTION.SUCCESS:
                            localStorage.setItem("refresh", action.payload.data.refresh)
                            localStorage.setItem("jwt", action.payload.data.jwt)
                            return { ...state, connected: true };
                        case Actions.ACTION.ERROR:
                            console.log("register ",action.payload)
                            if(action.payload.data.msg==="dupKey")
                                return { ...state, 
                                    signInUp:{ 
                                        ...state.signInUp,
                                        register:{
                                            error:"Email address already in use"
                                        }
                                    } } ;
                        default:
                            return{state};                            
                    }
                case Actions.ACTION.SIGN_IN:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            //loading
                            return { ...state, LOADING: true };
                        case Actions.ACTION.SUCCESS:
                            //success
                            console.log("jwt", action.payload)
                            localStorage.setItem("refresh", action.payload.data.refresh)
                            localStorage.setItem("jwt", action.payload.data.jwt)
                            return { ...state, connected: true };
                        case Actions.ACTION.ERROR:
                            return { ...state, 
                                signInUp:{ 
                                    ...state.signInUp,
                                    logIn:{
                                        error:"Bad credentials"
                                    }
                                } } ;
                        default:
                            return{state};
                    }
                case Actions.ACTION.LOG_OUT:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality " + action.type.join("/"))
                            // return;
                        case Actions.ACTION.SUCCESS:
                            localStorage.removeItem("jwt")
                            localStorage.removeItem("refresh")
                            return { ...state, 
                                connected: false, 
                                signInUp:{ 
                                    ...state.signInUp,
                                    logIn:{
                                        error:"You've been logged out"
                                    }
                                } };
                        case Actions.ACTION.ERROR:
                            if(localStorage.getItem("jwt"))localStorage.removeItem("jwt")
                            if(localStorage.getItem("refresh"))localStorage.removeItem("refresh")
                            return { ...state, 
                                connected: false, 
                                signInUp:{ 
                                    ...state.signInUp,
                                    logIn:{
                                        error:"you've been unexpectedly logged out"
                                    }
                                } };
                        default:
                            return{state};
                    }
                default:
                    return{state};
                }
 
        case Actions.ACTION.TREE:
            switch (action.type[1]) {
                case Actions.ACTION.REFRESH:
                    console.log(action.type,action.payload)
                    if(action.payload!=='')
                        return {...state,fileTree:action.payload};
                    else return state
                case Actions.ACTION.UPDATE:
                    return {...state,fileTree:action.payload};                
                default:
                    return state;

            }
        case Actions.ACTION.SELECTED:
            return {...state,selected:action.payload} 
        case Actions.ACTION.FOLDER:
            switch (action.type[1]) {
                case Actions.ACTION.CREATE:{
                    return triggerNotifier(state,action.type[3],action.payload)
                }
                case Actions.ACTION.RENAME:{
                    return triggerNotifier(state,action.type[3],action.payload)
                }
                case Actions.ACTION.DELETE:{
                    console.log("DELETE",action.type)
                    return triggerNotifier(state,action.type[3],action.payload)
                }
                case Actions.ACTION.DOWNLOAD:{
                    return triggerNotifier(state,action.type[3],action.payload)
                }
                case Actions.ACTION.UPLOAD:{
                    return triggerNotifier(state,action.type[3],action.payload)
                }
                case Actions.ACTION.MOVE:{
                    return triggerNotifier(state,action.type[3],action.payload)
                }    
            }
        default:
            return state;
    }
}

function triggerNotifier(state,type,message){
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("triggerNotifier !!!!!!!!!!!!!!!!!!11");
    console.log("type ",type);
    console.log("message",message)
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    return {
        ...state,    
        notification:{
            type:type,
            message:message
    }
}
}