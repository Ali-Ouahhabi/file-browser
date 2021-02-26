import React from "react"


class FileTag extends React.Component{
/**/
    state = {
		parent :"",
		name:"",
		isFile:"",
		children:[],
		index:"",//optional if not by reference
		isToggeld:false 
	}
	
	constructor(isFile, name, parent, children){
		setState((props, state)=>{
			return{...state, 
			parent : props.parent,
			name: props.self.name,
			isFile: props.self.isfile,
			children: props.self.children}
		})
		this.getSelf= this.getSelf.bind(this);
	}
	
	getSelf(){
		return this;
	}
	
	onDrop(target){
		
		setState((state)=>{
			st = {...state}
			st.parent.removeChild(st)// here or on drag 
			st.parent = target.getSelf()
			target.addChild.push(st).sort()
			
		})
		
	}

    emit(str,obj){}
	
	removeChild(){}
	
	getPath(){}
	
	sortBy(){}
	togel(){}

	render (){
		return(
            <div class={props.class} onclick={()=>{setState({isToggeld:!isToggeld}); emit("selected",this)}} >
                <span className="name">{this.state.name}</span>
                
                <div>
                {
                this.state.children.map((child)=>{
                <FileTag class={child.isFile?"file":"folder"} parent = {this} self = {child} />})
                }
                </div>
            </div>
        )
		
	}
	
} 
export default FileTag;