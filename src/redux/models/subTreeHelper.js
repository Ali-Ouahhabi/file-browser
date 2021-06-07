export default class SubTreeHelper{

    static removeElAt(subtree,index) {
        if(index.length===0||!index) throw new Error("SubTreeHelper.removeElAt param2 can't be null or empty")
        let parent = SubTreeHelper.getSubtreeParentByIndex(subtree,index)
        if(index[index.length-1]===(parent.children.length-1)){
            parent.children = parent.children.slice(0, parent.children.length-1);
            return;
        }
        parent.children.slice(index[index.length-1] + 1).forEach(child=>{
            child.index[index.length-1]=child.index[index.length-1]-1
        })
        parent.children = [...parent.children.slice(0, index[index.length-1]), ...parent.children.slice(index[index.length-1] + 1)]
        return;
    }

    static getSubtreeParentByIndex(subtree,index){
        if(index.length===0||!index) throw new Error("SubTreeHelper.getSubtreeParentByIndex param2 can't be null or empty")
        let cursor = subtree;  
        index.slice(0,index.length-1).forEach(i=>{
            console.log(i+" at ", cursor)
            cursor=cursor.children[i]
        })
        return cursor;
    }

    static addChildTo(subtree,subT) { 
        console.log("addChildTo ",subtree)
        let index = subtree.children.push(subT) - 1 
        subT.index = [].concat(subtree.index,index)
        subT.path = subT.isFile?subtree.path:subtree.path+subT.name+"/"
        return subT;
    }

    static setIndex(subtree,index) { 
        subtree.index = index 
    }

    static setNewPath(subtree, newPath){
        if(subtree.isFile){
            subtree.path = newPath;
        }else{
            subtree.path = newPath+subtree.name+"/";
            for(let e in subtree.children){
                SubTreeHelper.setNewPath(e,subtree.path)
            }
        }
    }

    static rename(subtree,newName){
        if(subtree.isFile){
            subtree.name = newName;
        }else{
            subtree.path=subtree.path.replace(RegExp("/"+subtree.name+"/$"),"/"+newName+"/")
            subtree.name= newName;
            subtree.children.forEach((e)=> SubTreeHelper.setNewPath(e,subtree.path))
        }
    }

    static propStatus(subtree,status) {
        subtree.status=status;
        if(subtree.isFile) return;
        if(subtree.children.length)subtree.children.forEach(e => SubTreeHelper.propStatus(e,status))
    }

}