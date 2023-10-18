import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
//slices
import userSlice from "../features/userSlice";


//saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user",["user"]);

//persist config
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms: [saveUserOnlyFilter]
}

const rootReducer = combineReducers({
    user:userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true,
});

export const persist = persistStore(store);