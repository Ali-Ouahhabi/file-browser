import { Actions, setAction } from "../actions/Actions"
import { Status, SubTree } from "../models/subTree";

export default function DataConverter({ dispatch }) {
    console.log("apiMid ", dispatch)
    return (next) => (action) => {
        console.log("action >>",action)
        switch (action.type) {
            case Actions.DataConverter.UPLOAD:
                console.log("<<",Actions.DataConverter.UPLOAD)
                let items = action.payload.items;
                let subtree = action.payload.subTree;
                return getFileStructure(items, subtree).then(e => {//catch .......
                    return Promise.all(e).then(leafs => {
                        console.log("leaf what?? ", leafs)
                        let files = new FormData();
                        let meta = []
                        Array.from(leafs).forEach(elements => {
                            Array.from(elements).forEach(element => {
                                if (element.isFile) {
                                    console.log(" seting a file in the FormData")
                                    files.append("files", element.data);
                                    meta.push({
                                        "path": element.getPath(),
                                        "name": element.getName(),
                                        "index":element.getIndex()
                                    })
                                } else {
                                    console.log("the leaf is not a leaf", element);
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
                        return next(setAction(["FOLDER", "UPLOAD", "REMOTE"], { subTree: subtree, data: files }))

                    })
                })
            default:
                console.log("DEFAULT")
                console.log("action >>",action)
                return next(action);
        }
    }
}

const getFileStructure = (items, subtree) => {

    return new Promise((R) => R(Array.from(items).map(item => {
        if (item instanceof DataTransferItem) item = item.webkitGetAsEntry();
        if (item.isFile) {
            let leaf = new SubTree(item.name)
            leaf.setFrom({
                name: item.name,
                isFile: item.isFile,
                children: null,
                status: new Status("up", "init"),
                path: subtree.getPath()
            })
            //
            leaf.setIndex(
                [].concat(subtree.getIndex(),/*??*/ subtree.addChild(leaf))
            )
            //
            return new Promise((resolve) => {
                item.file((file) => {
                    leaf.setData(file)
                    resolve([leaf])
                })
            });
        } else if (item.isDirectory) {

            let subTree = new SubTree(item.name);
            subTree.setFrom({
                name: item.name,
                isFile: item.isFile,
                children: [],
                status: new Status("up", "init"),
                path: subtree.getPath() + item.name + "/"
            })
            // 
            subTree.setIndex(
                [].concat(subtree.getIndex(),/*??*/ subtree.addChild(subTree))
            )
            // 
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
