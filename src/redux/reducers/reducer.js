import { Actions } from "../actions/Actions";
import {SubTree} from "../models/subTree"
const initialState = {
    fileTree: new SubTree("root"),
    connected: false,
    selected:{
        isFile:null,
        path:null,
        name:null
    }
}

export default function reduce(state = initialState, action) {

    if (action.type[2] == Actions.ACTION.REMOTE)
        throw new Error("Reducer invalid actions " + action.type.join('/'))
console.log("payload ",action.payload)
    switch (action.type[0]) {
        case Actions.ACTION.USER:
            switch (action.type[1]) {
                case Actions.ACTION.REGISTER:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            return { ...state, LOADING: true };
                        case Actions.ACTION.SUCCESS:
                            localStorage.setItem("jwt", action.payload.data.jwt)
                            return { ...state, connected: true };
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality " + action.type.join("/"))
                            return;
                    }
                    return;
                case Actions.ACTION.SIGN_IN:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            //loading
                            return { ...state, LOADING: true };
                        case Actions.ACTION.SUCCESS:
                            //success
                            console.log("jwt", action.payload)
                            localStorage.setItem("jwt", action.payload.data.jwt)
                            return { ...state, connected: true };
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality " + action.type.join("/"))
                            return;
                    }
                    return;
                case Actions.ACTION.LOG_OUT:
                    switch (action.type[3]) {
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality " + action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            localStorage.setItem("jwt", "")
                            return null;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality " + action.type.join("/"))
                            return;
                    }
                    return;
                default:
                    return{state};
                }
 
        case Actions.ACTION.TREE:
            switch (action.type[1]) {
                case Actions.ACTION.REFRESH:
                    console.log(action.type,action.payload)
                    if(action.payload!='')
                        return {...state,fileTree:action.payload};
                    else return state
                case Actions.ACTION.UPDATE:
                    return {...state,fileTree:action.payload};                
                default:
                    return state;

            }
        case Actions.ACTION.SELECTED:
            return {...state,selected:action.payload} 
        default:
            return state;
    }
}
