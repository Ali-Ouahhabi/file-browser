export class SubTree {

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
        this.data=null;
    }

    setPath(path) { this.path = path }
    setName(name) { this.name = name }
    setParent(parent) { this.parent = parent }
    setChildren(children) { this.children = children }
    setStatus(status) { this.status = status }
    setData(object){
        this.data=object;
    }
    setFrom(dict){
        if(dict["path"]) this.path=dict["path"];
        if(dict["children"]) this.children = this.children;
        if(dict["name"]) this.name = dict["name"];
        if(dict["parent"]) this.parent = dict["parent"];
        if(dict["isFile"]) this.isFile = dict["isFile"];
        if(dict["status"]) this.status = dict["status"];
        if(dict["data"]) this.status = dict["data"];
    }   

    removeElAt(index) {
        index.shift();
        if(index.length>1){
            this.children[index[0]].removeElAt(index)
        }else{
            this.children = [...this.children.slice(0, index[0]) ,...this.children.slice(index[0] + 1)]
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

export class Status{
    constructor(state,object){
        if(state in ["up","er","sc","s"]) this.state = state;
        else this.state = "er";
        this.object = object;
    }
}

// export default {SubTree,Status};