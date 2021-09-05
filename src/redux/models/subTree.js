export class SubTree {

    constructor(name) {
        this.name = name?name:null;
        this.path = name+"/";
        this.parent = null;
        this.children = [];
        this.status = new Status("s", null);
        this.isFile = false;
        this.data = null;
    }

    setFrom(dict) {
        if (dict["path"]) this.path = dict["path"];
        if (dict["children"]) this.children = dict["children"];
        if (dict["name"]) this.name = dict["name"];
        if (dict["parent"]) this.parent = dict["parent"];
        if (dict["isFile"]) this.isFile = dict["isFile"];
        if (dict["status"]) this.status = dict["status"];
        if (dict["data"]) this.data = dict["data"];
    }
    setName(name) { this.name = name }
    setParent(parent) { this.parent = parent }
    setChildren(children) { this.children = children }    
    setStatus(status) { this.status = status }
    setData(object) { this.data = object }
    setPath(path) { this.path = path }
    
    getName() { return this.name }
    getPath() { return this.path }
        
    addChild(subT) { return this.children.push(subT) - 1 }

    removeElAt(index) {
        index.shift();
        if (index.length > 1) {
            this.children[index[0]].removeElAt(index)
        } else {
            this.children = [...this.children.slice(0, index[0]), ...this.children.slice(index[0] + 1)]
        }
    }

    addElAt(el, index) {
        if (!index) index = el.getIndex();
        index.shift();
        if (index.length > 1) {
            this.children[index[0]].addElAt(el,index)
        } else {
            this.children = [...this.children, el]
        }
    }

    getElAt(index) {
        index.shift();
        if (index.length > 1) {
            return this.children[index[0]].getElAt(index)
        } else {
            return this.children[index[0]];
        }
    }


    propStatus(status) {
        this.setStatus(status);
        if(this.children.length)this.children.forEach(e => e.propStatus(status))
    }
}

export class Status {
    constructor(state, object) {
        if ("uperscs".match(state)) this.state = state;
        else this.state = "er";
        this.object = object;
    }
}
