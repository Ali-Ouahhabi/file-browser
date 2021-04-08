import { createStore, applyMiddleware } from "redux";
import reduce from "./reducer"
import apiService from "./middelware-api";

const store = createStore(reduce,applyMiddleware(apiService));

export default store;