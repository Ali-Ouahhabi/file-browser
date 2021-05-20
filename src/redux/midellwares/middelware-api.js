import { Actions, setAction } from "../actions/Actions"
import { User, Folder, File, Tree,Error_log } from "../models/request"
import { Status, SubTree } from "../models/subTree";
import SubTreeHelper from "../models/subTreeHelper";


export default function apiService({getState , dispatch }) {
    console.log("apiMid ", dispatch)
    return (next) => (action) => {

        switch (action.type[2]) {
            case Actions.ACTION.REMOTE:
                switch (action.type[0]) {
                    case Actions.ACTION.USER:
                        switch (action.type[1]) {
                            case Actions.ACTION.REGISTER:
                                //dispatch loading status
                                next(
                                    setAction(
                                        Actions.UserManager.USER.REGISTER.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                // create file request
                                User.userRegister(action.payload)
                                    .then((data) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.REGISTER.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.REGISTER.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.SIGN_IN:
                                //dispatch loading status
                                next(
                                    setAction(
                                        Actions.UserManager.USER.SIGN_IN.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                // create file request
                                User.userSignIn(action.payload)
                                    .then((data) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.SIGN_IN.LOCAL.SUCCESS,
                                                data
                                            )
                                        );
                                        User.initSubtree().then((data)=>console.log("$$$$$$$",data))
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.SIGN_IN.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.LOG_OUT:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.UserManager.USER.LOG_OUT.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                // create file request
                                User.userLogOut(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.UserManager.USER.LOG_OUT.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.UserManager.USER.LOG_OUT.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            default:
                                Error_log(action)
                                return;
                        }
                    case Actions.ACTION.FOLDER:
                        switch (action.type[1]) {
                            case Actions.ACTION.CREATE:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FOLDER.CREATE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                // create folder request
                                Folder.folderCreate(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.CREATE.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.CREATE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.RENAME:
                                //dispatch loading status
                                // dispatch(
                                //     setAction(
                                //         Actions.FileManager.FOLDER.RENAME.LOCAL.LOADING,
                                //         action.payload
                                //     )
                                // )
                                //rename folder request
                                Folder.folderRename(      
                                   action.payload.req
                                   )
                                    .then((data) => {
                                        SubTreeHelper.rename(action.payload.ref.branch, action.payload.ref.newName)
                                        return next(setAction(Actions.Tree.UPDATE,getState().fileTree))
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.RENAME.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.DELETE:
                                return Folder.folderDelete({
                                    isFile:action.payload.isFile,
                                    path:action.payload.path,
                                    name:action.payload.name
                                })
                                    .then((data) => {
                                        SubTreeHelper.removeElAt(getState().fileTree,action.payload.index)
                                        return next(setAction(Actions.Tree.UPDATE,getState().fileTree))
                                    })
                                    .catch((error) => {
                                        // dispatch(
                                        //     setAction(
                                        //         Actions.FileManager.FOLDER.DELETE.LOCAL.ERROR,
                                        //         error
                                        //     )
                                        // )
                                    })
                                return;
                            case Actions.ACTION.DOWNLOAD:
                                //dispatch loading status
                                // dispatch(
                                //     setAction(
                                //         Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.LOADING,
                                //         action.payload
                                //     )
                                // )
                                //download folder request
                                console.log("Calling download request")
                                return Folder.folderDownload(action.payload)
                                    .then((data) => {
                                        // dispatch(
                                        //     setAction(
                                        //         Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.SUCCESS,
                                        //         data
                                        //     )
                                        // )
                                        console.log("received Data",data)
                                        let blb  = new Blob([data.data])
                                        var objectUrl = URL.createObjectURL(blb);
                                        const link = document.createElement('a');

                                        link.href = objectUrl;
                                        console.log("HEADERS",data.headers)
                                        link.setAttribute('download', data.headers["content-disposition"]); //any other extension

                                        document.body.appendChild(link);

                                        link.click();

                                        link.remove();
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.UPLOAD:
                                let data = action.payload.data;
                                let subtree = action.payload.subTree;
                                return Folder.folderUpload(data)
                                    .then((data) => {
                                        SubTreeHelper.propStatus(subtree,new Status("sc", "uploaded"))
                                        let subtreeJs = JSON.stringify(subtree);                                     
                                        return next(setAction(Actions.Tree.UPDATE,getState().fileTree))
                                    })
                            case Actions.ACTION.MOVE:
                                let from=action.payload.from
                                let to = action.payload.to
                                let tmp = {
                                    name:from.isFile?action.payload.from.getName:null,
                                    from:from.path,
                                    to:to.path
                                }
                                return Folder.folderMove(tmp)
                                    .then((data) => {
                                        SubTreeHelper.removeElAt(getState().fileTree,from.index)
                                        to.children=[].concat(to.children,from)
                                        from.index=[].concat(to.index,to.children.length-1)
                                        return next(setAction(Actions.Tree.UPDATE,getState().fileTree))

                                    })
                                    .catch((error) => {
                                        console.error(action.type,error)
                                    })
                            default:
                                Error_log(action)
                                return;
                        }
                    case Actions.ACTION.TREE:
                        switch(action.type[1]){
                            case Actions.ACTION.FETCH:
                                return Tree.fetchTree(action.payload).then(
                                    (e)=>{
                                        return refreshTree(e,next);
                                    }
                                        ).catch(e=>console.log("ERROR FETCHING TREE ",e));
                            default:
                                Error_log(action)
                                return;
                }
            default:
                Error_log(action)
                return;
        }
    }
}
}


function refreshTree(response,next){
    return next(setAction(
        Actions.Tree.REFRESH,
        response.data
    ))
}

