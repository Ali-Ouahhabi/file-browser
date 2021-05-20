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
        return subtree.children.push(subT) - 1 
    }

    static setIndex(subtree,index) { 
        console.log("SubTreeHelper ","setIndex ")
        console.log("subTree",subtree)
        console.log("index ",index)
        subtree.index = index 
    }

    static propStatus(subtree,status) {
        subtree.status=status;
        if(subtree.isFile) return;
        if(subtree.children.length)subtree.children.forEach(e => SubTreeHelper.propStatus(e,status))
    }

}