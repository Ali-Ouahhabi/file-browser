import { Actions } from "./Actions";

export function reduce(action) {

    if (action.type[2] == Actions.ACTION.REMOTE)
        throw new Error("Reducer invalid actions " + action.type.join('/'))

    switch (action.type[0]) {
        case Actions.ACTION.USER:
            console.log("TODO:/ implement Actions.ACTION.LOADING")
            switch(action.type[1]){
                case Actions.ACTION.REGISTER:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.SIGN_IN:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.LOG_OUT:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
            }
            return;
        case Actions.ACTION.FOLDER:
            console.log("TODO:/ implement Actions.ACTION.SUCCESS")
            switch(action.type[1]){
                case Actions.ACTION.CREATE:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.RENAME:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.DELETE:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.DOWNLOAD:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.UPLOAD:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
            }
            return;
        case Actions.ACTION.FILE:
            console.log("TODO:/ implement Actions.ACTION.ERROR")
            switch(action.type[1]){
                case Actions.ACTION.CREATE:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.RENAME:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.DELETE:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.DOWNLOAD:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
                case Actions.ACTION.UPLOAD:
                    switch(action.type[3]){
                        case Actions.ACTION.LOADING:
                            //loading
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.SUCCESS:
                            //success
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return;
                        case Actions.ACTION.ERROR:
                            //error
                            throw new Error(" unimplemented functionality "+action.type.join("/"))
                            return; 
                    }
                    return;
            }
            return;
    }
}