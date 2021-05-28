import { createStore, applyMiddleware } from "redux";
import reduce from "./reducers/reducer"
import apiService from "./midellwares/middelware-api";
import DataConverter from "./midellwares/data-converter"
import treeApi from "./midellwares/tree-api";
import errorHandler from "./midellwares/error-handler" 
const store = createStore(reduce,applyMiddleware(DataConverter,apiService,treeApi,errorHandler));

export default store;