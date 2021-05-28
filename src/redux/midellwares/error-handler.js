import { Actions, setAction } from "../actions/Actions"


export default function errorHandler({ getState,dispatch }) {
    return (next) => (action) => {
        console.log("..........",action)
        if(action.type[3]==Actions.ACTION.ERROR)
        {
            if(action.payload =="logout"){
                return dispatch(setAction(Actions.UserManager.USER.LOG_OUT.REMOTE))
            }
        }

        return next(action)
    }
}