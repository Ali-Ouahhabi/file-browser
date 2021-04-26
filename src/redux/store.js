import { createStore, applyMiddleware } from "redux";
import reduce from "./reducers/reducer"
import apiService from "./midellwares/middelware-api";
import DataConverter from "./midellwares/data-converter"
const store = createStore(reduce,applyMiddleware(DataConverter,apiService));

export default store;