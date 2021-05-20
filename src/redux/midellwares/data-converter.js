import { Actions, setAction } from "../actions/Actions"
import { Status, SubTree } from "../models/subTree";
import SubTreeHelper from "../models/subTreeHelper";
import mime from "mime-types"
// const MaxBatchSize = ??
// TODO group by batch size 
//TODO add OnCreate folder

export default function DataConverter({ getState,dispatch }) {
    return (next) => (action) => {
        console.log("..........",action)
        switch (action.type) {
            case Actions.DataConverter.UPLOAD:
                let items = action.payload.items;
                let subtree = action.payload.subTree;
                return getFileStructure(items, subtree).then(e => {//TODO catch .......
                    return Promise.all(e).then(leafs => {
                        let files = new FormData();
                        let meta = []
                        let size=0;
                        Array.from(leafs).forEach(elements => {
                            Array.from(elements).forEach(element => {
                                console.log("file ",element.data)
                                if (element.isFile) {
                                    files.append("files", element.data);
                                    meta.push({
                                        "path": element.path,
                                        "name": element.name,
                                        "index":element.index,
                                        "lastModified":element.data.lastModified,
                                        "size":element.data.size,
                                        "type":mime.lookup(element.data.type?element.data.type:element.name.split(".").pop())
                                    })
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
                        return next(setAction(Actions.FileManager.FOLDER.UPLOAD.REMOTE , { subTree: subtree, data: files }))

                    })
                })
            case Actions.DataConverter.DOWNLOAD:{
                console.log("Download......")
                let branch = getState().branch
                let payload={
                    isFile:branch.isFile?"true":"false",
                    path:branch.path,
                    name:branch.name
                };
                return next(setAction(Actions.FileManager.FOLDER.DOWNLOAD.REMOTE,payload))
            }
            case Actions.DataConverter.DELETE:{
                let branch = getState().branch
                let payload={
                    isFile:branch.isFile,
                    path:branch.path,
                    name:branch.name,
                    index:branch.index
                };
                return next(setAction(Actions.FileManager.FOLDER.DELETE.REMOTE,payload))
            }
            case Actions.DataConverter.RENAME:{
                let branch = getState().branch
                let payload={
                    branch:branch,
                    newName:payload.newName
                };
                //return next(setAction(Actions.FileManager.FOLDER.DOWNLOAD.REMOTE,payload))
                return;
            }
            case Actions.DataConverter.SELECTED:
                let self = action.payload.self;
                let view = action.payload.view;
              
                let tmpS=getState()
                if(tmpS.view) {
                    tmpS.view();
                }
                view.selected=true;
                tmpS.view=view;
                tmpS.branch=self;
                tmpS.view();
                return;
                

            default:
                console.log("DataConverter forwarding ",action)
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
                path: subtree.path,
            }
            leaf.index=[].concat(subtree.index, SubTreeHelper.addChildTo(subtree, leaf))
            return new Promise((resolve) => {
                item.file((file) => {
                    leaf.data=file
                    resolve([leaf])
                })
            });
        } else if (item.isDirectory) {

            let subTree = {
                name: item.name,
                isFile: item.isFile,
                children: [],
                status: new Status("up", "init"),
                path: subtree.path + item.name + "/"
            }
            subTree.index=[].concat(subtree.index, SubTreeHelper.addChildTo(subtree, subTree))

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
