//FIX ME on addnew child the path and the index should be set
export default class SubTreeHelper{

    static removeElAt(subtree,index) {
        index.shift();
        if (index.length > 1) {
            SubTreeHelper.removeElAt(subtree.children[index[0]],index)
        } else {
            subtree.children = [...subtree.children.slice(0, index[0]), ...subtree.children.slice(index[0] + 1)]
        }
    }

    static addChildTo(subtree,subT) { 
        let index = subtree.children.push(subT) - 1 
        subT.index = [].concat(subtree.index,index)
        subT.path = subT.isFile?subtree.path:subtree.path+subT.name+"/"
        
    }

    static setIndex(subtree,index) { 
        subtree.index = index 
    }

    static setNewPath(subtree, newPath){
        if(subtree.isFile){
            subtree.path = newPath;
        }else{
            subtree.path = newPath+subtree.name+"/";
            for(e in subtree.children){
                SubTreeHelper.setNewPath(e,subtree.path)
            }
        }
    }

    static rename(subtree,newName){
        if(subtree.isFile){
            subtree.name = newName;
        }else{
            subtree.path.replace(RegExp("/"+subtree.name+"/$","/"+newName+"/"))
            subtree.name= newName;
            for(e in subtree.children){
                SubTreeHelper.setNewPath(e,subtree.path)
            }
        }
    }

    static propStatus(subtree,status) {
        subtree.status=status;
        if(subtree.isFile) return;
        if(subtree.children.length)subtree.children.forEach(e => SubTreeHelper.propStatus(e,status))
    }

}