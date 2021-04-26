import { Actions, setAction } from "../actions/Actions"
import { User, Folder, File, Error_log } from "../models/request"
import { Status, SubTree } from "../models/subTree";

export default function apiService({ dispatch }) {
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
                                        )
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

                    case Actions.ACTION.FILE:
                        switch (action.type[1]) {
                            case Actions.ACTION.CREATE:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FILE.CREATE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                // create file request
                                File.fileCreate(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.CREATE.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.CREATE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;

                            case Actions.ACTION.RENAME:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FILE.RENAME.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //rename file request
                                File.fileRename(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.RENAME.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.RENAME.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.DELETE:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FILE.DELETE.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //delete file request
                                File.fileDelete(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.DELETE.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.DELETE.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.DOWNLOAD:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FILE.DOWNLOAD.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //download file request
                                File.fileDownload(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.DOWNLOAD.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.DOWNLOAD.LOCAL.ERROR,
                                                error
                                            )
                                        )
                                    })
                                return;
                            case Actions.ACTION.UPLOAD:
                                //dispatch loading status
                                dispatch(
                                    setAction(
                                        Actions.FileManager.FILE.UPLOAD.LOCAL.LOADING,
                                        action.payload
                                    )
                                )
                                //upload file request
                                File.fileUpload(action.payload)
                                    .then((data) => {
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.UPLOAD.LOCAL.SUCCESS,
                                                data
                                            )
                                        )
                                    })
                                    .catch((error) => {
                                        console.log(action + " [error] " + error)
                                        dispatch(
                                            setAction(
                                                Actions.FileManager.FILE.UPLOAD.LOCAL.ERROR,
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
                            case Actions.ACTION.UPLOAD:
                                console.log("<<",Actions.ACTION.UPLOAD)
                                let data = action.payload.data;
                                let subtree = action.payload.subTree;
                                console.log("subtree",subtree)
                                debugger;
                                //dispatch loading status
                                next(
                                    setAction(
                                        Actions.Tree.ADD,
                                        {subTree:subtree}
                                    )
                                )
                                //upload folder request
                                return Folder.folderUpload(data)
                                    .then((data) => {
                                        subtree.propStatus(new Status("sc", "uploaded"))
                                        let subtreeSc = new SubTree(subtree.getName());
                                        subtreeSc.setFrom(subtree);
                                        console.log("Upload success")
                                        console.log("subtreeSc ",subtreeSc)
                                        debugger;
                                        return next(
                                            setAction(
                                                Actions.Tree.ADD,
                                                {subTree:subtreeSc}
                                            )
                                        );
                                    })
                                    .catch((error) => {
                                        console.log("ERROR",error)
                                        console.log("subtree",subtree)
                                        console.log("subtree",subtree)
                                        debugger;
                                        subtree.propStatus(new Status("er", error))
                                        let subtreeEr = new SubTree(subtree.getName());
                                        subtreeEr.setFrom(subtree);
                                        return next(
                                            setAction(
                                                Actions.Tree.ADD,
                                                {subTree:subtreeEr}
                                            )
                                        );
                                    })
                            default:
                                Error_log(action)
                                return;
                        }

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

