import { applyMiddleware } from "redux";
import {legacy_createStore as createStore} from 'redux'

import createSagaMiddleware from "redux-saga"
import gameReducer from "./reducers";
import watcherSagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(gameReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watcherSagas);
export default store;

