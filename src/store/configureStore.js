import { createStore, applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
import Reducers from "../reducers";

const configureStore = () => {
  return createStore(Reducers, applyMiddleware(thunk));
};
export default configureStore;
