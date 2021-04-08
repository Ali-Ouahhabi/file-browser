class SubTree {

    /*
    name :String
    path: String
    parent:SubTree
    children:Subtree[]
    status:FileStatus    
    */

    constructor(name) {
        this.name = name;
        this.path = "/";
        this.parent=null;
        this.children=[];
        this.status = new Status("s",null);
        this.isFile=false;
    }

    setPath(path) { this.path = path }
    setName(name) { this.name = name }
    setParent(parent) { this.parent = parent }
    setChildren(children) { this.children = children }
    setStatus(status) { this.status = status }
    setThis(object){
        if (object instanceof SubTree)
            this = {...object}
        else throw console.error("SubTree.setThis");
    }
    setFrom(dict){
        if(dict["path"]) this.path=dict["path"];
        if(dict["children"]) this.children = this.children;
        if(dict["name"]) this.name = dict["name"];
        if(dict["parent"]) this.parent = dict["parent"];
        if(dict["isFile"]) this.isFile = dict["isFile"];
        if(dict["status"]) this.status = dict["status"];
    }   

    removeElAt(index) {
        index.shift();
        if(index.length>1){
            this.children[index[0]].removeElAt(index)
        }else{
            this.children = [...this.children.slice(0, index[i]) ,...this.children.slice(index[i] + 1)]
        }
      }
  
    addElAt(index, el) {
        index.shift();
        if(index.length>1){
            this.children[index[0]].addElAt(index,el)
        }else{
            this.children = [...this.children, el]
        }
      }
  
    getElAt(index) {
        index.shift();
        if(index.length>1){
            return this.children[index[0]].getElAt(index)
        }else{
            return this.children[index[0]];
        }
      }
}

class Status{
    constructor(stat,object){
        if(state in ["up","er","sc","s"]) this.stat = stat;
        else throw console.error("asd'salkdb'lsabfkdsjfbg");
        this.object = object;
    }
}

export default {Status,SubTree};