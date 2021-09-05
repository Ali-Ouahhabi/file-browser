import { Actions, setAction } from "../actions/Actions"
import { User, Folder, Tree, Error_log } from "../models/request"
import { Status } from "../models/subTree";
import SubTreeHelper from "../models/subTreeHelper";


export default function apiService({ getState, dispatch }) {
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
                                return User.userRegister(action.payload)
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
                                                error.response
                                            )
                                        )
                                    })
                            case Actions.ACTION.SIGN_IN:
                                next(
                                    setAction(
                                        Actions.UserManager.USER.SIGN_IN.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return User.userSignIn(action.payload)
                                    .then((data) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.SIGN_IN.LOCAL.SUCCESS,
                                                data
                                            )
                                        );
                                    })
                                    .catch((error) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.SIGN_IN.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            case Actions.ACTION.LOG_OUT:
                                next(
                                    setAction(
                                        Actions.UserManager.USER.LOG_OUT.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return User.userLogOut()
                                    .then((data) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.LOG_OUT.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        next(
                                            setAction(
                                                Actions.UserManager.USER.LOG_OUT.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })

                            default:
                                Error_log(action)
                                return;
                        }
                    case Actions.ACTION.FOLDER:
                        switch (action.type[1]) {
                            case Actions.ACTION.CREATE:
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.CREATE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                console.log(" Create bf insert ",action.payload.selectedV.self)

                                let childIndex = SubTreeHelper.addChildTo(action.payload.selectedV.self, {
                                    name: action.payload.name,
                                    isFile: false,
                                    children: [],
                                    status: new Status("s")
                                })
 
                                console.log(" Create bf update tree ",action.payload.selectedV.self)
                                return Tree.updateTree(getState().fileTree).then((resp) => {
                                    return next(
                                        setAction(
                                            Actions.FileManager.FOLDER.CREATE.LOCAL.SUCCESS, resp)
                                    )
                                }
                                ).catch(resp => {
                                    SubTreeHelper.removeChildAt(getState().fileTree, childIndex);
                                    return next(
                                        setAction(
                                            Actions.FileManager.FOLDER.CREATE.LOCAL.ERROR, resp)
                                    )
                                });
                            case Actions.ACTION.RENAME:
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.RENAME.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return Folder.folderRename(
                                    action.payload.req
                                )
                                    .then((data) => {
                                        SubTreeHelper.rename(action.payload.ref.branch, action.payload.ref.newName)
                                        return next(setAction(Actions.Tree.UPDATE, getState().fileTree))
                                    })
                                    .catch((error) => {
                                        return next(
                                            setAction(
                                                Actions.FileManager.FOLDER.RENAME.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            case Actions.ACTION.DELETE:
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.DELETE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return Folder.folderDelete({
                                    isFile: action.payload.isFile,
                                    path: action.payload.path,
                                    name: action.payload.name
                                })
                                    .then((data) => {
                                        console.log("middelware Api ",action)
                                        if (action.payload.isFile)
                                            SubTreeHelper.removeLeafAtPath(getState().fileTree, action.payload.path, action.payload.name);
                                        else
                                            SubTreeHelper.removeElAtPath(getState().fileTree, action.payload.path);
                                        return next(setAction(Actions.Tree.UPDATE, getState().fileTree))
                                    })
                                    .catch((error) => {
                                        console.log("middelware Api err ",action)
                                        return next(
                                            setAction(
                                                Actions.FileManager.FOLDER.DELETE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            case Actions.ACTION.DOWNLOAD:
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return Folder.folderDownload(action.payload)
                                    .then((data) => {
                                        // dispatch(
                                        //     setAction(
                                        //         Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.SUCCESS,
                                        //         data
                                        //     )
                                        // )
                                        let blb = new Blob([data.data])
                                        var objectUrl = URL.createObjectURL(blb);
                                        const link = document.createElement('a');

                                        link.href = objectUrl;
                                        link.setAttribute('download', data.headers["content-disposition"]); //any other extension

                                        document.body.appendChild(link);

                                        link.click();

                                        link.remove();
                                    })
                                    .catch((error) => {
                                        return next(
                                            setAction(
                                                Actions.FileManager.FOLDER.DOWNLOAD.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            case Actions.ACTION.UPLOAD:
                                let data = action.payload.data;
                                let subtree = action.payload.subTree;
                                let reference = action.payload.reference;
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.UPLOAD.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return Folder.folderUpload(data)
                                    .then((data) => {
                                        SubTreeHelper.propStatus(subtree, new Status("sc", "uploaded"))
                                        return next(setAction(Actions.Tree.UPDATE, getState().fileTree))
                                    })
                                    .catch((error) => {
                                        subtree.children = subtree.children.slice(0, reference)
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FOLDER.UPLOAD.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            case Actions.ACTION.MOVE:
                                let from = action.payload.from
                                let to = action.payload.to
                                let tmp = {
                                    name: from.isFile ? action.payload.from.getName : null,
                                    from: from.path,
                                    to: to.path
                                }
                                next(
                                    setAction(
                                        Actions.FileManager.FOLDER.MOVE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                return Folder.folderMove(tmp)
                                    .then((data) => {
                                        if (from.isFile)
                                            SubTreeHelper.removeLeafAtPath(getState().fileTree, from.path);
                                        else
                                            SubTreeHelper.removeElAtPath(getState().fileTree, from.path);
                                        SubTreeHelper.addChildTo(to, from)

                                        return next(setAction(Actions.Tree.UPDATE, getState().fileTree))

                                    })
                                    .catch((error) => {
                                        return next(
                                            setAction(
                                                Actions.FileManager.FOLDER.MOVE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                            default:
                                Error_log(action)
                                return;
                        }
                    case Actions.ACTION.TREE:
                        switch (action.type[1]) {
                            case Actions.ACTION.FETCH:
                                return Tree.fetchTree(action.payload).then(
                                    (e) => {
                                        return next(setAction(
                                            Actions.Tree.REFRESH.SUCCESS,
                                            e.data
                                        ))
                                    }
                                )
                                    .catch((e) => {
                                        return next(setAction(
                                            Actions.Tree.REFRESH.ERROR,
                                            e
                                        ))
                                    });
                            default:
                                Error_log(action)
                                return;
                        }
                    default:
                        return next(action);
                }
            default:
                return next(action);
        }

    }
}


