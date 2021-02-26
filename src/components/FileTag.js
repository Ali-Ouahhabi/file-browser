import React from "react"
import "./FileTag.scss"
import { ImFolder, ImFolderOpen, ImFileText2 } from "react-icons/im";

class FileTag extends React.Component {
	/**/
	state = {
		parent: "",
		name: "",
		isFile: "",
		children: [],
		index: "",//optional if not by reference
		isToggeld: false
	}

	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			parent: props.parent,
			...props.self
		}
		this.getSelf = this.getSelf.bind(this);
	}


	getSelf() {
		return this;
	}

	onDrop(target) {

		this.setState((state) => {
			let st = { ...state }
			st.parent.removeChild(st)// here or on drag 
			st.parent = target.getSelf()
			target.addChild.push(st).sort()// ?? sorts

		})

	}

	emit(str, obj) { }

	removeChild() { }

	getPath() {
		return (this.state.parent ? this.state.parent.getPath() + "/" : "") + this.state.name;
	}

	sortBy() { }
	togel() { }

	render() {
		let children = () => {
			if (this.props.self.children && this.state.isToggeld) {
				return this.props.self.children.map((child) => {
					console.log("child", child);
					return (
						<FileTag parent={this} self={child} level={this.props.level + " |"} />
				)
				})
			}
		};
		let name = "file-tag-" + (this.state.isFile ? "file" : "folder")

		return ([
			<div className={name}
				onClick={(e) => { e.preventDefault(); this.setState({ isToggeld: !this.state.isToggeld }) }}
				
			>
				<span className={"file-tag"+"-icon"}>
					{this.state.isFile ? <ImFileText2/> : this.state.isToggeld ? <ImFolderOpen/> : <ImFolder/>}
				 </span>
				 <span className={"file-tag"+"-name"}> {this.props.self.name}</span>				
				
			</div>,
			<div className={name+"-children"}>
				{
					children()
				}
			</div>
		])

	}

}
export default FileTag;