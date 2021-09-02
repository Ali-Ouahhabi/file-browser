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
            cursor=cursor.children[i]
        })
        return cursor;
    }

    static getSubtreeAt(tree,index){
        if(index === undefined || tree===undefined) return tree;
        let tmp=tree;
        for(let i=0;i<index.length;i++){
            if(tmp.children&&tmp.children.length>i)tmp = tmp.children[index[i]];

        }
        return tmp;
    }

    static addChildTo(subtree,subT) { 
        // if we assume that subtree it's nodes per layer are sorted by file type and name 
        // but it could also be sorted by size modification date 
        // if we choose sort while insert
        // at each insertion for n element we will have n sort + the update of siblings index
        // instead if we choose to sort at render  
        // at each render we will sort the children list, and rendering will happen continuously 
        // more often than insertion
        // we have the simple problem of sorting already sorted set
        // an already sorted set will tak at least n-1 comparison and with the new element at most n comparison
        // wiche is 2n-1 sorting in already sorted array of size n plus new element
        // then if we have n sibling we should update the index wiche is  update at index 3op
        // 2n-1+n*3 ==  5n-1 
        // but if we know how the element are sorted we say by some ref method compareSibllings() ret{-1|0|1} 
        // it may be with  size or ...... 
        // we have two part the big tree if we are in tree view or a subtree of depth 1 in case of list and grid view
        // if we sort in depth 1, we can do a sort at display because if we sort it in memory the big tree
        // may have incoherent sorting between subtree
        // if we take a default sort we say by name 
        // in the insertion we are sur that every subtree is sorted by mane 
        // wich mean at eache insertion while im not well compared check next until position 
        // we do a cut concat, form that pos to end update index which is we de a comp until then we 
        // do n-a update 3op == a + 3(n-a) == 3n -2a <<< 5n - 1 
        //  
        let i = 0;
        for (; i<subtree.children.length && Comparators.byTnN(subT,subtree.children[i])===1; i++);
        // if Comparators.byTnN(subT,subtree.children[i])!=1 subT<=subtree.children[i] which mean 
        //  subT should reside in i and what's before i should be pushed
        let arr =  subtree.children.slice(0,i).concat(subT,subtree.children.slice(i));
        // if we want to update the index of the following sibling
        //  for each self.index = parent.index concate to my index 
        // we simply need to change the last value in my index (increment by 1)
        // but for self children (call it theirs) one of them it.index = self.index concate index
        // which mean all the descendent of self should be updated wich will turn up to be too costly
        // the necessity of the index 
        // if an element is selected we can refer to it in the tree by the index
        // how long will it take to recompute the index form the view it will take the walk length
        // from the node to the root
        // do we really need an index??
        //  on select we can refer the hall part of the tree
        // if we do a move or upload or rename we send the two node reference in the tree to be 
        // updated the index is somehow useless 
        // if we do note compute it 
        // it will still be computed in the view fileTag.props.index
        // so we end up by the most satisfactory decision to forget about index cause I now how 
        // to get it for otherwhere    
        subT.path = subT.isFile?subtree.path:subtree.path+subT.name+"/";
        subtree.children = arr;
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

export const Comparators={
    byTnN : (a,b)=>{
        if(a.isFile&&b.isFile||!a.isFile&&!b.isFile){
            return a.name>b.name?1:-1;
        }
        return a.isFile?1:-1;
    },

    byTnS : (a,b)=>{
        if(a.isFile&&b.isFile||!a.isFile&&!b.isFile){
            return a.size>b.size?1:a.size<b.size?-1:0;
        }
        return a.isFile?1:-1;
    },

    //modeification date compare dates.
}