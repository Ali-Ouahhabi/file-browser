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
                case Actions.ACTION.REFRESH:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Creating ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return {...state,fileTree:action.payload};
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while creating ...")
                        }
                        default:
                            return;
                    } 
                }

                case Actions.ACTION.UPDATE:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Creating ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return {...state,fileTree:action.payload};
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while creating ...")
                        }
                        default:
                            return;
                    } 
                }            
                default:
                    return state;

            }
        case Actions.ACTION.SELECTED:
            return {...state,selected:action.payload} 
        case Actions.ACTION.FOLDER:
            switch (action.type[1]) {
                case Actions.ACTION.CREATE:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Creating ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... created successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while creating ...")
                        }
                        default:
                            return;
                    }           
                }
                case Actions.ACTION.RENAME:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Renaming ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... renamed successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while renaming ...")
                        }
                        default:
                            return;
                    }
                }
                case Actions.ACTION.DELETE:{
                    console.log("DELETE",action.type)
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Deleting ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... deleted successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while deleting ...")
                        }
                        default:
                            return;
                    }
                }
                case Actions.ACTION.DOWNLOAD:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Downloading ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... Downloaded successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while downloading ...")
                        }
                        default:
                            return;
                    }
                }
                case Actions.ACTION.UPLOAD:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Uploading ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... uploaded successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while uploading ...")
                        }
                        default:
                            return;
                    }
                }
                case Actions.ACTION.MOVE:{
                    switch (action.type[3]){
                        case Actions.ACTION.LOADING:{
                            return triggerNotifier(state,action.type[3],"Moving ...")
                        }
                        case Actions.ACTION.SUCCESS:{
                            return triggerNotifier(state,action.type[3],"... moved successfully")
                        }
                        case Actions.ACTION.ERROR:{
                            return triggerNotifier(state,action.type[3],"Error occurred while")
                        }
                        default:
                            return;
                    }
                }    
            }
        default:
            return state;
    }
}

function triggerNotifier(state,type,message){
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log("triggerNotifier !!!!!!!!!!!!!!!!!!11");
    // console.log("type ",type);
    // console.log("message",message)
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    return {
        ...state,    
        notification:{
            type:type,
            message:message
    }
}
}