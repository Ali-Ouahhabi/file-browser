import { Actions, setAction } from "../actions/Actions"
import { Tree } from "../models/request"

export default function treeApi({ getState,dispatch }) {
    return (next) => (action) => {
        console.log("..........",action)
        switch (action.type) {
            case Actions.Tree.UPDATE:
                return Tree.updateTree(action.payload).then(resp=>{
                    return next(setAction(
                        Actions.Tree.REFRESH,
                        resp.data
                    ))
                })
            default:
                return next(action)
        }
    }
}

