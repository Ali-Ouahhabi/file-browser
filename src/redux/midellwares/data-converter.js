import { Actions, setAction } from "../actions/Actions"
import { Status } from "../models/subTree";
import SubTreeHelper from "../models/subTreeHelper";
import mime from "mime-types"

//TODO: check for duplicate name or path


// const MaxBatchSize = ??
// TODO group by batch size 

export default function DataConverter({ getState, dispatch }) {
    return (next) => (action) => {
        console.log("data converter ", action)
        switch (action.type) {
            case Actions.DataConverter.UPLOAD_File_Set: {
                let items = action.payload.items;
                let subtree = getState().branch.self || getState().fileTree;
                let reference = subtree.children.length
                let files = new FormData();
                let meta = []
                //let size=0;
                Array.from(items).forEach(element => {
                    let leaf = {
                        name: element.name,
                        isFile: true,
                        children: null,
                        status: new Status("up", "init"),
                        data: element,

                    }
                    leaf.meta = {
                        "path": subtree.path,
                        "name": leaf.name,
                        "lastModified": leaf.data.lastModified,
                        "size": leaf.data.size,
                        "type": mime.lookup(leaf.data.type ? leaf.data.type : leaf.name.split(".").pop()) || "application/octet-stream"
                    }
                    SubTreeHelper.addChildTo(subtree, leaf)
                    files.append("files", leaf.data);
                    meta.push(leaf.meta)
                })
                files.append(
                    'metadata',
                    new Blob(
                        [JSON.stringify(meta)],
                        { type: 'application/json' }
                    )
                );
                return next(setAction(Actions.FileManager.FOLDER.UPLOAD.REMOTE, { subTree: subtree, data: files, reference: reference }))
            }
            case Actions.DataConverter.UPLOAD:
                let items = action.payload.items;
                let subtree = action.payload.subTree;
                let reference = subtree.children.length;
                return getFileStructure(items, subtree).then(e => {
                    return Promise.all(e).then(leafs => {
                        let files = new FormData();
                        let meta = []
                        //let size=0;
                        Array.from(leafs).forEach(elements => {
                            Array.from(elements).forEach(element => {
                                if (element.isFile) {
                                    files.append("files", element.data);
                                    element.meta = {
                                        "path": element.path,
                                        "name": element.name,
                                        "lastModified": element.data.lastModified,
                                        "size": element.data.size,
                                        "type": mime.lookup(element.data.type ? element.data.type : element.name.split(".").pop()) || "application/octet-stream"
                                    }
                                    meta.push(element.meta)
                                }
                            })
                        });
                        files.append(
                            'metadata',
                            new Blob(
                                [JSON.stringify(meta)],
                                { type: 'application/json' }
                            )
                        );
                        return next(setAction(Actions.FileManager.FOLDER.UPLOAD.REMOTE, { subTree: subtree, data: files, reference: reference }))
                    })
                })
            case Actions.DataConverter.DOWNLOAD: {
                let branch = getState().selectedV.self
                let payload = {
                    isFile: branch.isFile ? "true" : "false",
                    path: branch.path,
                    name: branch.name
                };
                return next(setAction(Actions.FileManager.FOLDER.DOWNLOAD.REMOTE, payload))
            }
            case Actions.DataConverter.DELETE: {
                console.log("DC state ", getState())
                let branch = getState().selectedV.self
                let payload = {
                    isFile: branch.isFile,
                    path: branch.path,
                    name: branch.name,
                };
                return next(setAction(Actions.FileManager.FOLDER.DELETE.REMOTE, payload))
            }
            case Actions.DataConverter.RENAME: {
                let branch = getState().selectedV.self
                let payload = {
                    ref: {
                        branch: branch,
                        newName: action.payload.newName
                    },
                    req: {
                        isFile: branch.isFile,
                        path: branch.path
                    }
                };
                if (branch.isFile) {
                    payload.req = {
                        ...payload.req,
                        name: branch.name,
                        newName: action.payload.newName
                    }
                } else {
                    payload.req = {
                        ...payload.req,
                        newPath: branch.path.replace(RegExp("/" + branch.name + "/$"), "/" + action.payload.newName + "/")
                    }
                }
                return next(setAction(Actions.FileManager.FOLDER.RENAME.REMOTE, payload))
            }
            case Actions.DataConverter.CREATE: {
                let payload = {
                    selectedV: getState().branch,
                    name: action.payload.name
                }
                return next(setAction(Actions.FileManager.FOLDER.CREATE.REMOTE, payload))
            }
            case Actions.DataConverter.SELECTED:

                let tmpS = getState()
                if ("selectedV" in tmpS && typeof tmpS.selectedV.view === 'function') {
                    tmpS.selectedV.view();
                }
                tmpS.selectedV = action.payload.selectedV;
                tmpS.selectedV.view();
                // return next(setAction(Actions.SELECTED, {selectedV:tmpS.selectedV}));
                return;

            default:
                return next(action);
        }
    }
}

const getFileStructure = (items, subtree) => {

    return new Promise((R) => R(Array.from(items).map(item => {
        if (item instanceof DataTransferItem) item = item.webkitGetAsEntry();
        if (item.isFile) {
            let leaf = {
                name: item.name,
                isFile: item.isFile,
                children: null,
                status: new Status("up", "init"),
                meta: {
                    path: '',
                    name: '',
                    lastModified: '',
                    size: '',
                    type: ''
                }
            }
            SubTreeHelper.addChildTo(subtree, leaf)

            return new Promise((resolve) => {
                item.file((file) => {
                    leaf.data = file
                    resolve([leaf])
                })
            });
        } else if (item.isDirectory) {

            let subTree = {
                name: item.name,
                isFile: item.isFile,
                children: [],
                status: new Status("up", "init")
            }
            SubTreeHelper.addChildTo(subtree, subTree);

            var dirReader = item.createReader();

            return new Promise((resolve) => {
                dirReader.readEntries((entries) =>
                    getFileStructure(entries, subTree).then(e => {
                        Promise.all(e).then(leafs => resolve([].concat(...leafs)))
                    })
                );
            })
        }
        else
            return [];
    })));
}
