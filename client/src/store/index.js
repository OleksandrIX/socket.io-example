import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {userReducer} from "./userReducer";
import {messageReducer} from "./messageReducer";
import {socketReducer} from "./socketReducer";

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))