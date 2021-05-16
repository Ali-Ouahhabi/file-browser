import { Actions, setAction } from "../actions/Actions"
import { User, Folder, File, Tree,Error_log } from "../models/request"
import { Status, SubTree } from "../models/subTree";
import SubTreeHelper from "../models/subTreeHelper";

//TODO restructure the Actions minise to necessary  

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
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FOLDER.RENAME.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //rename folder request
                                Folder.folderRename(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.RENAME.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
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
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FOLDER.DELETE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //delete folder request
                                Folder.folderDelete(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.DELETE.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.DELETE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.DOWNLOAD:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //download folder request
                                Folder.folderDownload(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
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
                            case Actions.ACTION.UPLOAD://----------------------------------------------------------------------------------------------------------------------------------
                                let data = action.payload.data;
                                let subtree = action.payload.subTree;
                                // next(
                                //     setAction(
                                //         Actions.Tree.ADD,
                                //         {subTree:subtree}
                                //     )
                                // )
                                //upload folder request
                                return Folder.folderUpload(data)
                                    .then((data) => {
                                        SubTreeHelper.propStatus(subtree,new Status("sc", "uploaded"))
                                        let subtreeJs = JSON.stringify(subtree);
                                        // subtreeSc.setFrom(subtree);
                                        // TODO upload tree
                                        
                                        return Tree.updateTree(getState().fileTree).then(e => console.log("resp Update Tree",e)); /*next(
                                            setAction(
                                                Actions.Tree.ADD,
                                                {subTree:subtreeSc}
                                            )
                                        );*/
                                    })
                                    .catch((error) => {
                                        SubTreeHelper.propStatus(subtree,new Status("er", error))
                                        // let subtreeEr = new SubTree(subtree.getName());
                                        // subtreeEr.setFrom(subtree);
                                        return /*next(
                                            setAction(
                                                Actions.Tree.ADD,
                                                {subTree:subtreeEr}
                                            )
                                        );*/
                                    })
                            case Actions.ACTION.MOVE:
                                //dispatch loading status
                                console.log("Mid received",action.payload)
                                let from=action.payload.from
                                let to = action.payload.to
                                let tmp = {
                                    name:from.isFile?action.payload.from.getName:null,
                                    from:from.path,
                                    to:to.path
                                }

                                return Folder.folderMove(tmp)
                                    .then((data) => {
                                        let index = from.index
                                        to.children=[].concat(to.children,from)
                                        from.index=[].concat(to.index,to.children.length)
                                        SubTreeHelper.removeElAt(getState().fileTree,index)
                                        // getState().fileTree.removeElAt(index)
                                        console.log("zzzzzz",getState().fileTree)
                                        //TODO uncomment after fixing sub directory issue 
                                        // Tree.updateTree(getState().fileTree).then(e => console.log("resp Update Tree",getState().fileTree)).catch((error) => {
                                        //     console.error(action.type,error)
                                        // })

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
                                console.log("Fetchinig tree")
                                return Tree.fetchTree(action.payload).then(
                                    (e)=>{
                                        console.log("received data ",e)
                                        return next(setAction(
                                                Actions.Tree.REFRESH,
                                                e.data
                                            ))
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

