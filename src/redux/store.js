import { createStore, applyMiddleware } from "redux";
import reduce from "./reducers/reducer"
import apiService from "./midellwares/middelware-api";
import DataConverter from "./midellwares/data-converter"
import treeApi from "./midellwares/tree-api";
const store = createStore(reduce,applyMiddleware(DataConverter,apiService,treeApi));

export default store;